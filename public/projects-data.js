import { portfolio } from './content.js';

// Resolve from this module, not the current page, to support nested Pages URLs.
export const siteRoot = new URL('./', import.meta.url);

export function validateProjects(projects = portfolio.projects) {
  const slugs = new Set();
  for (const project of projects) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug || '')) throw Error('Each project needs a lowercase, hyphenated slug.');
    if (slugs.has(project.slug)) throw Error('Duplicate project slug: ' + project.slug);
    if (typeof project.title !== 'string' || !project.title.trim()) throw Error('A project title is required: ' + project.slug);
    slugs.add(project.slug);
  }
  return projects;
}

export function visibleProjects() {
  const projects = validateProjects();
  const real = projects.filter(project => !project.placeholder);
  // Preview slots disappear automatically when the first real project is added.
  return real.length ? real : projects;
}

export function projectURL(project) {
  return new URL('projects/' + project.slug + '/', siteRoot).href;
}

export function assetURL(source) {
  if (!source) return null;
  try {
    const url = new URL(source, siteRoot);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

export function externalURL(source) {
  if (!source) return null;
  try {
    const url = new URL(source);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}
