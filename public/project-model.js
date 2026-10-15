import { assetURL, externalURL } from './projects-data.js';

let modelIndex = 0;

function control(label, text, action) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'model-control';
  button.textContent = text;
  button.setAttribute('aria-label', label);
  button.dataset.modelAction = action;
  button.disabled = true;
  return button;
}

export function createProjectModel(project, headingLevel = 'h3') {
  const model = project.model;
  const src = assetURL(model?.src);
  if (!src) return null;
  const prefix = 'project-model-' + (++modelIndex);
  const section = document.createElement('section');
  section.className = 'project-model';
  section.dataset.modelState = 'poster';
  section.setAttribute('aria-labelledby', prefix + '-title');
  const header = document.createElement('div');
  header.className = 'model-heading';
  const heading = document.createElement(headingLevel);
  heading.id = prefix + '-title';
  heading.textContent = model.title || project.title + ' in 3D';
  const sourceURL = externalURL(model.sourceURL);
  header.append(heading);
  if (sourceURL) {
    const credit = document.createElement('a');
    credit.href = sourceURL;
    credit.target = '_blank';
    credit.rel = 'noopener noreferrer';
    credit.className = 'model-source';
    credit.textContent = 'CAD source ↗';
    header.append(credit);
  }

  const stage = document.createElement('div');
  stage.className = 'model-stage';
  const poster = document.createElement('img');
  poster.className = 'model-poster';
  const posterURL = assetURL(model.poster);
  if (posterURL) poster.src = posterURL;
  poster.alt = model.alt || project.title + ' CAD reference';
  poster.loading = 'lazy';
  poster.decoding = 'async';
  const canvas = document.createElement('canvas');
  canvas.className = 'model-canvas';
  canvas.tabIndex = -1;
  canvas.hidden = true;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', model.alt || project.title + ' interactive CAD reference');
  canvas.setAttribute('aria-describedby', prefix + '-help ' + prefix + '-note');
  stage.append(poster, canvas);

  const toolbar = document.createElement('div');
  toolbar.className = 'model-toolbar';
  toolbar.setAttribute('role', 'group');
  toolbar.setAttribute('aria-label', project.title + ' 3D model controls');
  const load = document.createElement('button');
  load.type = 'button';
  load.className = 'model-load';
  load.textContent = 'Load 3D model';
  const rotate = control('Start model rotation', 'Rotate', 'rotate');
  rotate.setAttribute('aria-pressed', 'false');
  const zoomOut = control('Zoom out', '−', 'zoom-out');
  const zoomIn = control('Zoom in', '+', 'zoom-in');
  const reset = control('Reset model view and assembly', 'Reset', 'reset');
  toolbar.append(load, rotate, zoomOut, zoomIn, reset);
  const assembly = document.createElement('div');
  assembly.className = 'model-assembly';
  const label = document.createElement('label');
  label.htmlFor = prefix + '-explode';
  label.textContent = 'Exploded view';
  const range = document.createElement('input');
  range.id = prefix + '-explode';
  range.type = 'range';
  range.min = '0';
  range.max = '100';
  range.step = '1';
  range.value = '0';
  range.disabled = true;
  const output = document.createElement('output');
  output.htmlFor = range.id;
  output.textContent = '0%';
  range.setAttribute('aria-valuetext', 'Fully assembled');
  assembly.append(label, range, output);
  const help = document.createElement('p');
  help.className = 'model-help';
  help.id = prefix + '-help';
  help.textContent = 'Drag or use arrow keys to rotate. + / − to zoom. Scroll to continue.';
  const status = document.createElement('p');
  status.className = 'model-status';
  status.setAttribute('role', 'status');
  status.textContent = 'Interactive CAD reference';
  const note = document.createElement('p');
  note.className = 'model-note';
  note.id = prefix + '-note';
  note.textContent = model.note || '';
  const measurements = document.createElement('dl');
  measurements.className = 'model-measurements';
  for (const fact of model.measurements || []) {
    const group = document.createElement('div');
    const term = document.createElement('dt');
    term.textContent = fact.label;
    const value = document.createElement('dd');
    value.textContent = fact.value;
    group.append(term, value);
    measurements.append(group);
  }
  section.append(header, stage, toolbar, assembly, help);
  if (measurements.childElementCount) section.append(measurements);
  section.append(note, status);

  let viewer;
  let loading = false;
  function updateRotation(spinning) {
    rotate.setAttribute('aria-pressed', String(spinning));
    rotate.textContent = spinning ? 'Pause' : 'Rotate';
    rotate.setAttribute('aria-label', spinning ? 'Pause model rotation' : 'Start model rotation');
  }
  function unavailable() {
    viewer?.stop();
    viewer = undefined;
    section.dataset.modelState = 'unavailable';
    canvas.hidden = true;
    canvas.tabIndex = -1;
    poster.hidden = false;
    for (const button of [rotate, zoomOut, zoomIn, reset]) button.disabled = true;
    range.disabled = true;
    load.hidden = false;
    load.disabled = false;
    load.textContent = 'Retry 3D model';
    status.textContent = '3D unavailable on this device. The CAD image and source remain available.';
    updateRotation(false);
  }
  async function start() {
    if (loading || viewer) return;
    loading = true;
    load.disabled = true;
    status.textContent = 'Loading 3D model…';
    canvas.hidden = false;
    section.dataset.modelState = 'loading';
    try {
      const { createHullViewer } = await import('./vendor/mongla/hull-viewer.js');
      viewer = await createHullViewer(canvas, src, {
        autoRotate: false, rim: '#b9c5d5', ambient: [0.20, 0.20, 0.23],
        yaw: Number.isFinite(model.view?.yaw) ? model.view.yaw : undefined,
        pitch: Number.isFinite(model.view?.pitch) ? model.view.pitch : undefined,
        distance: Number.isFinite(model.view?.distance) && model.view.distance > 0 ? model.view.distance : undefined,
        loadTimeoutMs: model.loadTimeoutMs,
        onSpinChange: updateRotation
      });
      section.dataset.modelState = 'ready';
      poster.hidden = true;
      canvas.tabIndex = 0;
      load.hidden = true;
      for (const button of [rotate, zoomOut, zoomIn, reset]) button.disabled = false;
      range.disabled = false;
      status.textContent = model.readyLabel || '3D ready · ' + viewer.parts + ' CAD parts';
      viewer.frame();
    } catch {
      unavailable();
    } finally { loading = false; }
  }
  load.addEventListener('click', start);
  canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); unavailable(); });
  rotate.addEventListener('click', () => viewer?.spin(rotate.getAttribute('aria-pressed') !== 'true'));
  zoomOut.addEventListener('click', () => { if (viewer) viewer.zoom(viewer.zoom() * 1.14); });
  zoomIn.addEventListener('click', () => { if (viewer) viewer.zoom(viewer.zoom() * 0.88); });
  reset.addEventListener('click', () => {
    viewer?.reset();
    range.value = '0';
    output.textContent = '0%';
    range.setAttribute('aria-valuetext', 'Fully assembled');
  });
  range.addEventListener('input', () => {
    const value = Number(range.value);
    viewer?.explode(value / 100);
    output.textContent = value + '%';
    range.setAttribute('aria-valuetext', value ? value + ' percent exploded' : 'Fully assembled');
  });
  // Keep the page scroll gesture on phones; drag rotation also has keyboard controls.
  // A low-data connection waits for a deliberate click instead of fetching the mesh.
  if (!navigator.connection?.saveData && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      start();
    }, { rootMargin: '180px' });
    observer.observe(section);
  }
  return section;
}
