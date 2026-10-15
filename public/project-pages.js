import { portfolio } from './content.js';
import { visibleProjects, assetURL, externalURL } from './projects-data.js';
import { renderProjectCards, projectPicture } from './project-cards.js';
import { setupProjectEngagement } from './project-engagement.js';
import { createProjectModel } from './project-model.js';

for (const element of document.querySelectorAll('[data-name]')) element.textContent = portfolio.name;
document.querySelector('[data-brand-first]').textContent = portfolio.brand.first;
document.querySelector('[data-brand-last]').textContent = portfolio.brand.last;
document.querySelector('#year').textContent = new Date().getFullYear();

function figure(item) {
  const src = assetURL(item?.src);
  if (!src) return null;
  const element = document.createElement('figure');
  element.className = 'project-figure';
  const image = document.createElement('img');
  image.src = src;
  image.alt = item.alt || '';
  image.loading = 'lazy';
  image.decoding = 'async';
  image.addEventListener('error', () => {
    image.hidden = true;
    const message = document.createElement('p');
    message.textContent = 'Image unavailable';
    element.prepend(message);
  });
  element.append(image);
  if (item.caption) {
    const caption = document.createElement('figcaption');
    caption.textContent = item.caption;
    element.append(caption);
  }
  return element;
}

function storySection(title) {
  const section = document.createElement('section');
  section.className = 'project-story';
  const heading = document.createElement('h2');
  heading.textContent = title;
  section.append(heading);
  return section;
}

function paragraph(text) {
  const element = document.createElement('p');
  element.textContent = text;
  return element;
}

const projects = visibleProjects();
if (document.body.dataset.projectPage === 'collection') {
  document.title = 'Projects — ' + portfolio.name;
  renderProjectCards(document.querySelector('#project-collection'), projects, 'collection');
  const note = document.querySelector('[data-collection-note]');
  if (projects.some(project => project.placeholder)) {
    note.textContent = 'Layout preview · project images and details to follow';
    note.hidden = false;
  }
} else {
  const index = projects.findIndex(project => project.slug === document.body.dataset.projectSlug);
  const project = projects[index];
  if (project) {
    document.title = project.title + ' — ' + portfolio.name;
    document.querySelector('meta[name="description"]').content = project.summary || project.title;
    document.querySelector('#project-title').textContent = project.title;
    document.querySelector('[data-project-breadcrumb]').textContent = project.title;
    document.querySelector('[data-project-category]').textContent = project.placeholder ? 'LAYOUT PREVIEW' : project.category || 'PROJECT';
    document.querySelector('[data-project-summary]').textContent = project.summary || '';
    document.querySelector('[data-project-preview]').hidden = !project.placeholder;
    document.querySelector('[data-project-visual]').append(projectPicture(project, index));
    setupProjectEngagement(project);

    const facts = document.querySelector('[data-project-facts]');
    for (const fact of project.facts || []) {
      if (!fact.label || !fact.value) continue;
      const group = document.createElement('div');
      const label = document.createElement('dt');
      label.textContent = fact.label;
      const value = document.createElement('dd');
      value.textContent = fact.value;
      group.append(label, value);
      facts.append(group);
    }
    facts.hidden = !facts.children.length;

    const body = document.querySelector('[data-project-story]');
    if (project.description || project.placeholder) {
      const overview = storySection('Overview');
      overview.append(paragraph(project.description || 'The project write-up will be added here, together with its images and details.'));
      body.append(overview);
    }
    if (project.specifications?.length) {
      const specifications = storySection('Technical specifications');
      const groups = document.createElement('div');
      groups.className = 'project-specifications';
      for (const spec of project.specifications) {
        const group = document.createElement('div');
        const title = document.createElement('h3');
        title.textContent = spec.heading;
        const list = document.createElement('dl');
        for (const fact of spec.facts || []) {
          const row = document.createElement('div');
          const label = document.createElement('dt');
          label.textContent = fact.label;
          const value = document.createElement('dd');
          value.textContent = fact.value;
          row.append(label, value);
          list.append(row);
        }
        group.append(title, list);
        groups.append(group);
      }
      specifications.append(groups);
      if (project.specificationsNote) specifications.append(paragraph(project.specificationsNote));
      body.append(specifications);
    }
    const model = createProjectModel(project, 'h2');
    if (model) body.append(model);
    for (const content of project.sections || []) {
      const section = storySection(content.heading || 'Project details');
      if (content.flow?.length) {
        const flow = document.createElement('ol');
        flow.className = 'project-system-flow';
        for (const step of content.flow) {
          const item = document.createElement('li');
          const label = document.createElement('h3');
          label.textContent = step.label;
          item.append(label, paragraph(step.detail));
          flow.append(item);
        }
        section.append(flow);
      }
      for (const text of content.paragraphs || []) section.append(paragraph(text));
      const image = figure(content.image);
      if (image) section.append(image);
      body.append(section);
    }
    const gallery = document.createElement('div');
    gallery.className = 'project-gallery';
    for (const item of project.gallery || []) {
      const image = figure(item);
      if (image) gallery.append(image);
    }
    if (gallery.children.length) {
      const section = storySection('A closer look');
      section.append(gallery);
      body.append(section);
    }
    const resources = document.createElement('div');
    resources.className = 'project-resources';
    for (const resource of project.links || []) {
      const url = externalURL(resource.url);
      if (!url || !resource.label) continue;
      const link = document.createElement('a');
      link.className = 'project-resource';
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = resource.label + ' ↗';
      resources.append(link);
    }
    if (resources.children.length) {
      const section = storySection('Project links');
      section.append(resources);
      body.append(section);
    }
  } else {
    document.querySelector('#project-title').textContent = 'Project not found';
    document.querySelector('[data-project-summary]').textContent = 'Return to the collection to see available projects.';
    document.querySelector('[data-project-visual]').hidden = true;
  }
}
