import { assetURL, projectURL } from './projects-data.js';

export function projectPicture(project, index, className = '') {
  const visual = document.createElement('div');
  visual.className = 'project-picture ' + className;
  const placeholder = document.createElement('div');
  placeholder.className = 'project-picture-placeholder';
  placeholder.setAttribute('aria-hidden', 'true');
  const number = document.createElement('span');
  number.textContent = String(index + 1).padStart(2, '0');
  const label = document.createElement('span');
  label.textContent = 'IMAGE TO FOLLOW';
  placeholder.append(number, label);
  visual.append(placeholder);
  const src = assetURL(project.image?.src);
  if (src) {
    const image = document.createElement('img');
    image.src = src;
    image.alt = project.image.alt || project.title;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.addEventListener('load', () => { placeholder.hidden = true; });
    image.addEventListener('error', () => { image.hidden = true; placeholder.hidden = false; });
    visual.append(image);
  }
  return visual;
}

export function projectArrow() {
  const arrow = document.createElement('span');
  arrow.className = 'project-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 15L15 5M5 5H15V15" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  return arrow;
}

export function renderProjectCards(container, projects, type = 'capsule') {
  container.replaceChildren();
  for (const [index, project] of projects.entries()) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.className = type === 'capsule' ? 'project-capsule' : 'collection-card';
    link.href = projectURL(project);
    const visual = projectPicture(project, index);
    const copy = document.createElement('div');
    copy.className = 'project-card-copy';
    const kicker = document.createElement('p');
    kicker.className = 'project-kicker';
    kicker.textContent = project.placeholder ? 'LAYOUT PREVIEW' : project.category || 'PROJECT';
    const heading = document.createElement(type === 'capsule' ? 'h3' : 'h2');
    heading.className = 'project-card-title';
    heading.textContent = project.title;
    const description = document.createElement('p');
    description.className = 'project-summary';
    description.textContent = project.summary || '';
    const action = document.createElement('span');
    action.className = 'project-card-action';
    action.textContent = 'View project';
    action.append(projectArrow());
    copy.append(kicker, heading, description, action);
    link.append(visual, copy);
    item.append(link);
    container.append(item);
  }
  if (!projects.length) {
    const empty = document.createElement('li');
    empty.className = 'project-empty';
    empty.textContent = type === 'capsule' ? 'Selected projects will appear here.' : 'Projects will appear here as they are added.';
    container.append(empty);
  }
}
