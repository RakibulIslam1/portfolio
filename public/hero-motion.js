import { loadRenderTextures } from './render-assets.js';

const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const mix = (from, to, amount) => from + (to - from) * amount;
const smooth = amount => amount * amount * (3 - 2 * amount);
const random = (min, max) => min + Math.random() * (max - min);
const HOLD = 1000;
const FLIGHT = 1350;
const STAGGER = 170;
const FADE = 280;
const REST = 4200;

function curve(start, first, second, end, amount) {
  const remaining = 1 - amount;
  return {
    x: remaining ** 3 * start.x + 3 * remaining ** 2 * amount * first.x + 3 * remaining * amount ** 2 * second.x + amount ** 3 * end.x,
    y: remaining ** 3 * start.y + 3 * remaining ** 2 * amount * first.y + 3 * remaining * amount ** 2 * second.y + amount ** 3 * end.y
  };
}

export function startRenderAnimation(sources) {
  const hero = document.querySelector('.hero');
  const portrait = hero.querySelector('.hero-art');
  const slot = hero.querySelector('.create-slot');
  const text = slot.querySelector('.create-text');
  const canvas = hero.querySelector('.render-canvas');
  const backCanvas = hero.querySelector('.render-back-canvas');
  const toggle = hero.querySelector('.motion-toggle');
  const front = canvas.getContext('2d');
  const back = backCanvas.getContext('2d');
  if (!front || !back || !sources?.length) return;

  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let introCompleted = preference.matches;
  let introStarted = false;
  let images = [];
  let loading;
  let geometry;
  let plan;
  let elapsed = 0;
  let previous = 0;
  let frame = 0;
  let visible = true;
  let userPaused = false;
  let activePhase = '';
  let handoff = 0;

  function phase(name) {
    if (activePhase === name) return;
    activePhase = name;
    canvas.dataset.phase = name;
  }

  function measure() {
    const bounds = hero.getBoundingClientRect();
    const local = element => {
      const rect = element.getBoundingClientRect();
      return { x: rect.left - bounds.left, y: rect.top - bounds.top, width: rect.width, height: rect.height };
    };
    const next = {
      width: bounds.width, height: bounds.height, ratio: Math.min(devicePixelRatio || 1, 2),
      portrait: local(portrait), slot: local(slot)
    };
    const sameRect = (first, second) => ['x', 'y', 'width', 'height'].every(key => Math.abs(first[key] - second[key]) < .5);
    if (geometry && Math.abs(next.width - geometry.width) < .5 && Math.abs(next.height - geometry.height) < .5 &&
        next.ratio === geometry.ratio && sameRect(next.portrait, geometry.portrait) && sameRect(next.slot, geometry.slot)) return false;
    geometry = next;
    for (const [surface, context] of [[canvas, front], [backCanvas, back]]) {
      surface.width = Math.round(bounds.width * next.ratio);
      surface.height = Math.round(bounds.height * next.ratio);
      context.setTransform(next.ratio, 0, 0, next.ratio, 0, 0);
      context.imageSmoothingQuality = 'high';
    }
    return true;
  }

  function makePlan(withIntro) {
    const ordered = [...images];
    for (let index = ordered.length - 1; index > 0; index--) {
      const other = Math.floor(Math.random() * (index + 1));
      [ordered[index], ordered[other]] = [ordered[other], ordered[index]];
    }
    const photo = geometry.portrait;
    const word = geometry.slot;
    const tileHeight = word.height * .74;
    const gap = Math.max(10, word.height * .22);
    let offset = 0;
    const tiles = ordered.map(image => {
      const tile = { image, ratio: image.naturalWidth / image.naturalHeight, height: tileHeight, offset };
      tile.width = tile.height * tile.ratio;
      offset += tile.width + gap;
      return tile;
    });
    const placed = [];
    const density = Math.min(1, Math.sqrt(8 / tiles.length));
    const actors = withIntro ? tiles.map((tile, index) => {
      const width = clamp(photo.width * random(.106, .138), 21, 66) * density;
      const height = width / tile.ratio;
      const radiusX = random(2, 4);
      const radiusY = random(1.5, 3);
      const gap = clamp(photo.width * .014, 3, 7);
      const left = Math.max(width / 2 + radiusX + 3, photo.x - photo.width * .02 + width / 2 + radiusX);
      const right = Math.min(geometry.width - width / 2 - radiusX - 3, photo.x + photo.width * 1.02 - width / 2 - radiusX);
      const top = photo.y + photo.height * .82 + height / 2 + radiusY + 2;
      const bottom = photo.y + photo.height * 1.015 - height / 2 - radiusY - 2;
      // Sample freely within the lowest band: no rows, columns, or fixed anchors.
      let position;
      let bestScore = -1;
      for (let attempt = 0; attempt < 240; attempt++) {
        const candidate = { x: random(left, right), y: random(top, Math.max(top, bottom)) };
        const score = placed.reduce((nearest, other) => {
          const separationX = (width + other.width) / 2 + radiusX + other.radiusX + gap;
          const separationY = (height + other.height) / 2 + radiusY + other.radiusY + gap;
          const distance = ((candidate.x - other.x) / separationX) ** 2 + ((candidate.y - other.y) / separationY) ** 2;
          return Math.min(nearest, distance);
        }, Infinity);
        if (score > bestScore) { position = candidate; bestScore = score; }
        if (score >= 1) break;
      }
      placed.push({ ...position, width, height, radiusX, radiusY });
      const actor = {
        ...tile, rear: false, floatWidth: width,
        homeX: position.x, homeY: position.y,
        phase: random(0, Math.PI * 2), speed: random(.0016, .0022),
        radiusX, radiusY, tilt: random(-.085, .085),
        reveal: index * 70, departure: HOLD + index * STAGGER
      };
      actor.start = floating(actor, actor.departure);
      actor.end = { x: word.x + word.width - tile.width * .1, y: word.y + word.height / 2 };
      const side = position.x < photo.x + photo.width / 2 ? -1 : 1;
      actor.first = {
        x: clamp(actor.start.x + side * photo.width * .13, width / 2 + 4, geometry.width - width / 2 - 4),
        y: actor.start.y - photo.height * .12
      };
      actor.second = {
        x: actor.end.x + Math.min(60, word.width * .25),
        y: actor.end.y + Math.min(90, Math.abs(actor.start.y - actor.end.y) * .25)
      };
      if (matchMedia('(max-width: 760px)').matches) {
        const edge = side < 0 ? width / 2 + 5 : geometry.width - width / 2 - 5;
        actor.first.x = edge;
        actor.second.x = edge;
        actor.second.y = actor.end.y + Math.min(85, photo.height * .2);
      }
      return actor;
    }) : [];
    const reelStart = withIntro ? HOLD + FLIGHT + Math.max(0, actors.length - 1) * STAGGER : FADE;
    const fadeStart = withIntro ? HOLD : 0;
    const fadeDuration = reelStart - fadeStart;
    const reelLeft = word.x + word.width - tiles[0].width * .6;
    const velocity = Math.max(42, word.width * .64) / 1000;
    const reelEnd = reelStart + (reelLeft - word.x + offset - gap) / velocity;
    return { intro: withIntro, actors, tiles, fadeStart, fadeDuration, reelStart, reelLeft, velocity, reelEnd, end: reelEnd + FADE + REST };
  }

  function floating(actor, time) {
    return {
      x: actor.homeX + Math.sin(time * actor.speed + actor.phase) * actor.radiusX,
      y: actor.homeY + Math.cos(time * actor.speed * .8 + actor.phase) * actor.radiusY,
      angle: actor.tilt + Math.sin(time * actor.speed * .65 + actor.phase) * .025
    };
  }

  function paint(context, image, position, width, height, angle, opacity) {
    if (opacity <= 0) return;
    context.save();
    context.globalAlpha = opacity;
    context.translate(position.x, position.y);
    context.rotate(angle);
    context.drawImage(image.texture, -width / 2, -height / 2, width, height);
    context.restore();
  }

  function clipWord(context) {
    const word = geometry.slot;
    context.beginPath();
    context.rect(word.x, word.y, word.width, word.height);
    context.clip();
  }

  function clear() {
    front.clearRect(0, 0, geometry.width, geometry.height);
    back.clearRect(0, 0, geometry.width, geometry.height);
  }

  function draw() {
    clear();
    const word = geometry.slot;
    const fadeOut = smooth(clamp((elapsed - plan.fadeStart) / plan.fadeDuration));
    const fadeIn = smooth(clamp((elapsed - plan.reelEnd) / FADE));
    text.style.opacity = String(elapsed < plan.reelEnd ? 1 - fadeOut : fadeIn);

    if (plan.intro && elapsed < HOLD) {
      introStarted = true;
      phase('gather');
    } else if (plan.intro && elapsed < plan.reelStart) {
      introStarted = true;
      phase('flight');
    } else if (elapsed >= plan.reelStart && elapsed < plan.reelEnd) {
      if (plan.intro) introCompleted = true;
      phase('reel');
    } else phase('word');

    if (elapsed >= plan.reelStart && elapsed < plan.reelEnd) {
      front.save();
      clipWord(front);
      const travelled = (elapsed - plan.reelStart) * plan.velocity;
      const opacity = smooth(clamp((elapsed - plan.reelStart) / 180));
      for (const tile of plan.tiles) {
        const x = plan.reelLeft + tile.offset - travelled + tile.width / 2;
        if (x + tile.width / 2 < word.x || x - tile.width / 2 > word.x + word.width) continue;
        paint(front, tile.image, { x, y: word.y + word.height / 2 }, tile.width, tile.height, 0, opacity);
      }
      front.restore();
    }

    // Actors exist only in the initial plan; every later cycle has just the reel.
    for (const actor of plan.actors) {
      if (elapsed >= actor.departure + FLIGHT) continue;
      if (elapsed < actor.departure) {
        const position = floating(actor, elapsed);
        const opacity = smooth(clamp((elapsed - actor.reveal) / 420)) * (actor.rear ? .78 : .95);
        paint(actor.rear ? back : front, actor.image, position, actor.floatWidth, actor.floatWidth / actor.ratio, position.angle, opacity);
        continue;
      }
      const progress = clamp((elapsed - actor.departure) / FLIGHT);
      const eased = smooth(progress);
      const position = curve(actor.start, actor.first, actor.second, actor.end, eased);
      const width = mix(actor.floatWidth, Math.min(actor.width, actor.floatWidth * 1.3), eased);
      const angle = mix(actor.start.angle, 0, eased);
      const opacity = 1 - smooth(clamp((progress - .84) / .16));
      const frontWeight = actor.rear ? smooth(clamp((progress - .3) / .32)) : 1;
      for (const [context, weight] of [[back, 1 - frontWeight], [front, frontWeight]]) {
        context.save();
        if (progress > .95) clipWord(context);
        paint(context, actor.image, position, width, width / actor.ratio, angle, opacity * weight);
        context.restore();
      }
    }
  }

  function tick(now) {
    frame = 0;
    if (previous) elapsed += Math.min(100, now - previous);
    previous = now;
    if (elapsed >= plan.end) {
      introCompleted = true;
      elapsed = 0;
      plan = makePlan(false);
    }
    draw();
    frame = requestAnimationFrame(tick);
  }

  function sync() {
    const still = preference.matches;
    toggle.hidden = !images.length || still;
    canvas.hidden = backCanvas.hidden = !images.length || still;
    if (!images.length || still || userPaused || !visible || document.hidden || handoff > 0) {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      if (still) {
        if (geometry) clear();
        text.style.opacity = '1';
        phase('still');
      } else if (handoff > 0) {
        if (geometry) clear();
        text.style.opacity = String(1 - smooth(clamp(handoff * 2.5)));
        phase('handoff');
      }
      return;
    }
    if (!frame) frame = requestAnimationFrame(tick);
  }

  async function load() {
    if (loading || preference.matches) return;
    loading = loadRenderTextures(sources);
    images = await loading;
    if (!images.length) return;
    canvas.dataset.renderCount = String(images.length);
    measure();
    plan = makePlan(!introCompleted);
    sync();
  }

  function resize() {
    if (!images.length || !measure()) return;
    // Resize/font changes must never replay the portrait entrance.
    if (introStarted) introCompleted = true;
    plan = makePlan(!introCompleted);
    elapsed = introCompleted ? plan.reelEnd + FADE : 0;
    previous = 0;
    text.style.opacity = '1';
    if (!preference.matches) draw();
    sync();
  }

  toggle.addEventListener('click', () => {
    userPaused = !userPaused;
    toggle.setAttribute('aria-pressed', String(userPaused));
    const label = (userPaused ? 'Resume' : 'Pause') + ' project animation';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
    sync();
  });
  preference.addEventListener('change', () => {
    if (preference.matches) {
      introCompleted = true;
      if (images.length) {
        plan = makePlan(false);
        elapsed = plan.reelEnd + FADE;
      }
    }
    load();
    sync();
  });
  document.addEventListener('visibilitychange', sync);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  }).observe(hero);
  const observer = new ResizeObserver(resize);
  observer.observe(hero);
  observer.observe(slot);
  observer.observe(portrait);
  window.addEventListener('resize', resize);
  load();
  return {
    setHandoff(progress) {
      const next = preference.matches ? 0 : progress;
      if (next === handoff) return;
      if (next > 0 && handoff === 0 && images.length) {
        // Scrolling takes ownership of the renders without replaying the reload intro.
        introCompleted = true;
        plan = makePlan(false);
        elapsed = plan.reelEnd + FADE;
      }
      handoff = next;
      sync();
    }
  };
}
