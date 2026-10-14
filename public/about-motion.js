import { loadRenderTextures } from './render-assets.js';

const clamp = value => Math.max(0, Math.min(1, value));
const smooth = value => { const amount = clamp(value); return amount * amount * (3 - 2 * amount); };
const mix = (first, second, amount) => first + (second - first) * amount;
const orbitStrength = amount => smooth((amount - .65) / .2);
function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

function makeParticles(images) {
  const placed = [];
  // Three instances per source, with each group shuffled independently.
  const entries = Array.from({ length: 3 }, (_, group) => shuffle(images).map(image => ({ image, seed: group === 0 }))).flat();
  return entries.map((entry, index) => {
    let position, best = -1;
    for (let attempt = 0; attempt < 160; attempt++) {
      const latitude = Math.asin(Math.random() * 2 - 1);
      const longitude = Math.random() * Math.PI * 2;
      const cos = Math.cos(latitude);
      const candidate = { latitude, longitude, x: Math.sin(longitude) * cos, y: Math.sin(latitude), z: Math.cos(longitude) * cos };
      const score = placed.reduce((nearest, other) => {
        const distance = Math.hypot(candidate.x - other.x, candidate.y - other.y, candidate.z - other.z);
        const same = other.image === entry.image;
        return Math.min(nearest, distance / .4, same ? distance / 1.05 : Infinity, same ? Math.abs(latitude - other.latitude) / .28 : Infinity);
      }, Infinity);
      if (score > best) { position = candidate; best = score; }
      if (score >= 1) break;
    }
    placed.push({ ...position, image: entry.image });
    return {
      ...entry, latitude: position.latitude, longitude: position.longitude,
      origin: .1 + Math.random() * .8,
      delay: entry.seed ? index / images.length * .15 : .48 + Math.random() * .16,
      scale: .82 + Math.random() * .32,
      phase: Math.random() * Math.PI * 2,
      tilt: (Math.random() - .5) * .18
    };
  });
}

export function startAboutGlobe(sources, onHandoff = () => {}) {
  const section = document.querySelector('#about');
  const stage = section.querySelector('.globe-stage');
  const portrait = stage.querySelector('.globe-portrait');
  const word = document.querySelector('.create-slot');
  const backCanvas = stage.querySelector('.globe-back');
  const frontCanvas = stage.querySelector('.globe-front');
  const back = backCanvas.getContext('2d');
  const front = frontCanvas.getContext('2d');
  if (!back || !front) { portrait.style.opacity = '1'; return; }

  // Only the travel uses a viewport canvas; the settled globe stays inside its stage.
  const travelCanvas = document.createElement('canvas');
  travelCanvas.className = 'globe-handoff';
  travelCanvas.setAttribute('aria-hidden', 'true');
  travelCanvas.hidden = true;
  document.body.append(travelCanvas);
  const travel = travelCanvas.getContext('2d');
  if (!travel) { portrait.style.opacity = '1'; return; }
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let particles = [];
  let geometry;
  let progress = 0;
  let time = 0;
  let yaw = 0;
  let previous = 0;
  let frame = 0;
  let updateFrame = 0;

  function size(canvas, context, width, height, ratio) {
    const pixelWidth = Math.round(width * ratio), pixelHeight = Math.round(height * ratio);
    if (canvas.width === pixelWidth && canvas.height === pixelHeight) return;
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.imageSmoothingQuality = 'high';
  }

  function measure() {
    const box = stage.getBoundingClientRect();
    const source = word.getBoundingClientRect();
    const about = section.getBoundingClientRect();
    const header = document.querySelector('.site-header').getBoundingClientRect().height;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    const wordY = source.top + scrollY + source.height / 2;
    const sectionY = about.top + scrollY;
    const centerY = box.top + scrollY + box.height / 2;
    const start = Math.max(0, Math.min(wordY - header - 40, sectionY - innerHeight * .8));
    const end = Math.max(start + 160, Math.min(centerY - innerHeight * .48, sectionY - header - 24));
    geometry = {
      width: box.width, height: box.height, x: box.left, y: box.top + scrollY,
      source: { x: source.left, y: source.top + scrollY, width: source.width, height: source.height },
      start, end, header, photoRadius: portrait.getBoundingClientRect().width / 2 + 6,
      viewportWidth: document.documentElement.clientWidth, viewportHeight: innerHeight
    };
    size(backCanvas, back, box.width, box.height, ratio);
    size(frontCanvas, front, box.width, box.height, ratio);
    size(travelCanvas, travel, geometry.viewportWidth, innerHeight, ratio);
  }

  function project(latitude, longitude) {
    const cos = Math.cos(latitude);
    const x = Math.sin(longitude + yaw) * cos;
    const y = Math.sin(latitude);
    const z = Math.cos(longitude + yaw) * cos;
    // A tilted axis and depth projection make one complete sphere, not a flat ring.
    const tilt = .3;
    const perspective = 3 / (3 - z * .55);
    const radius = geometry.width * .355;
    return {
      x: geometry.width / 2 + (x * Math.cos(tilt) - y * Math.sin(tilt)) * radius * perspective,
      y: geometry.height / 2 + (x * Math.sin(tilt) + y * Math.cos(tilt)) * radius * perspective,
      z, perspective
    };
  }

  function paint(context, particle, position, extent, opacity, angle) {
    const aspect = particle.image.naturalWidth / particle.image.naturalHeight;
    const width = aspect >= 1 ? extent : extent * aspect;
    const height = aspect >= 1 ? extent / aspect : extent;
    context.save();
    context.globalAlpha = opacity;
    context.translate(position.x, position.y);
    context.rotate(angle);
    context.drawImage(particle.image.texture, -width / 2, -height / 2, width, height);
    context.restore();
  }

  function grid(opacity) {
    back.save();
    back.globalAlpha = opacity;
    back.strokeStyle = '#d5435735';
    back.lineWidth = .65;
    const line = getPoint => {
      back.beginPath();
      for (let index = 0; index <= 72; index++) {
        const point = getPoint(index / 72);
        if (index === 0) back.moveTo(point.x, point.y); else back.lineTo(point.x, point.y);
      }
      back.stroke();
    };
    for (const latitude of [-1.05, -.52, 0, .52, 1.05]) line(amount => project(latitude, amount * Math.PI * 2));
    for (let index = 0; index < 6; index++) line(amount => project((amount - .5) * Math.PI, index * Math.PI / 3));
    back.restore();
  }

  function clear() {
    back.clearRect(0, 0, geometry.width, geometry.height);
    front.clearRect(0, 0, geometry.width, geometry.height);
    travel.clearRect(0, 0, geometry.viewportWidth, geometry.viewportHeight);
  }

  function draw() {
    if (!geometry) return;
    clear();
    const still = preference.matches;
    const amount = still ? 1 : progress;
    // Reveal earlier during assembly, directly following the owner's scroll.
    const reveal = still || !particles.length ? 1 : smooth((amount - .60) / .18);
    portrait.style.opacity = String(reveal);
    stage.dataset.progress = amount.toFixed(3);
    stage.dataset.rotation = yaw.toFixed(3);
    stage.dataset.phase = still ? 'still' : amount === 0 ? 'idle' : amount < .995 ? 'assembling' : 'portrait';
    travelCanvas.hidden = still || !particles.length || amount === 0 || amount >= 1;
    if (amount === 0) return;
    grid(smooth((amount - .35) / .6));

    const orbit = particles.map(particle => {
      const drift = still ? 0 : orbitStrength(amount);
      const latitude = particle.latitude + Math.sin(time * .6 + particle.phase) * .024 * drift;
      const longitude = particle.longitude + Math.cos(time * .45 + particle.phase) * .035 * drift;
      return { particle, point: project(latitude, longitude) };
    }).sort((first, second) => first.point.z - second.point.z);
    const center = { x: geometry.width / 2, y: geometry.height / 2 };
    const photoRadius = geometry.photoRadius;

    travel.save();
    travel.beginPath();
    travel.rect(0, geometry.header + 1, geometry.viewportWidth, geometry.viewportHeight - geometry.header - 1);
    travel.clip();
    for (const { particle, point } of orbit) {
      const local = still ? 1 : smooth((amount - particle.delay) / (particle.seed ? .62 : .3));
      if (local <= 0) continue;
      const extent = geometry.width * .085 * particle.scale * point.perspective;
      const opacity = mix(.38, 1, (point.z + 1) / 2);
      const angle = particle.tilt + Math.sin(time * .5 + particle.phase) * .035;
      if (!particle.seed || local >= 1) {
        const spread = particle.seed ? 1 : mix(.65, 1, local);
        const position = { x: mix(center.x, point.x, spread), y: mix(center.y, point.y, spread) };
        const distance = Math.hypot(position.x - center.x, position.y - center.y);
        const clearance = smooth((distance - photoRadius) / (extent * .7));
        const alpha = opacity * (particle.seed ? 1 : local) * (1 - reveal * (1 - clearance));
        const context = point.z < 0 ? back : front;
        context.save();
        if (point.z >= 0 && reveal > .99) {
          context.beginPath();
          context.rect(0, 0, geometry.width, geometry.height);
          context.arc(center.x, center.y, photoRadius, 0, Math.PI * 2);
          context.clip('evenodd');
        }
        paint(context, particle, position, extent, alpha, angle);
        context.restore();
        continue;
      }
      const source = geometry.source;
      const origin = { x: source.x + source.width * particle.origin, y: source.y + source.height / 2 };
      const target = { x: geometry.x + point.x, y: geometry.y + point.y };
      const bend = Math.sin(particle.longitude) * Math.min(130, geometry.viewportWidth * .16);
      const remaining = 1 - local;
      const first = { x: origin.x + bend, y: mix(origin.y, target.y, .33) };
      const second = { x: target.x + bend * .3, y: mix(origin.y, target.y, .75) };
      const position = {
        x: remaining ** 3 * origin.x + 3 * remaining ** 2 * local * first.x + 3 * remaining * local ** 2 * second.x + local ** 3 * target.x,
        y: remaining ** 3 * origin.y + 3 * remaining ** 2 * local * first.y + 3 * remaining * local ** 2 * second.y + local ** 3 * target.y - scrollY
      };
      const size = mix(Math.min(32, source.height * .44), extent, local);
      paint(travel, particle, position, size, smooth(local / .08) * mix(.75, opacity, local), angle * local);
    }
    travel.restore();
  }

  function canRun() {
    const inView = geometry.y - scrollY < innerHeight && geometry.y + geometry.height - scrollY > geometry.header;
    return !preference.matches && !document.hidden && particles.length && progress > 0 && (progress < 1 || inView);
  }

  function tick(now) {
    frame = 0;
    if (previous) {
      const delta = Math.min(80, now - previous) / 1000;
      time += delta;
      yaw += delta * .14 * orbitStrength(progress);
    }
    previous = now;
    draw();
    if (canRun()) frame = requestAnimationFrame(tick);
  }

  function sync() {
    if (!geometry) measure();
    const measuredProgress = clamp((scrollY - geometry.start) / (geometry.end - geometry.start));
    // Anchor scrolling rounds fractional layout pixels; settle rather than stop just short.
    progress = measuredProgress >= .995 ? 1 : measuredProgress;
    onHandoff(preference.matches || !particles.length ? 0 : progress);
    if (!canRun()) {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
    }
    draw();
    if (canRun() && !frame) frame = requestAnimationFrame(tick);
  }

  function update(remeasure = false) {
    if (remeasure) measure();
    if (!updateFrame) updateFrame = requestAnimationFrame(() => { updateFrame = 0; sync(); });
  }

  window.addEventListener('scroll', () => update(), { passive: true });
  window.addEventListener('resize', () => update(true));
  document.addEventListener('visibilitychange', sync);
  preference.addEventListener('change', sync);
  new ResizeObserver(() => update(true)).observe(section);
  new ResizeObserver(() => update(true)).observe(document.querySelector('.hero'));
  measure();
  sync();
  loadRenderTextures(sources).then(images => {
    particles = makeParticles(images);
    stage.dataset.renderCount = String(particles.length);
    stage.dataset.sourceCount = String(images.length);
    update(true);
  });
}
