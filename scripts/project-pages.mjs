import { readFile } from 'node:fs/promises';
import { portfolio } from '../public/content.js';
import { visibleProjects } from '../public/projects-data.js';

export { visibleProjects };

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

export async function renderProjectPage(project) {
  const template = await readFile(new URL('./templates/project.html', import.meta.url), 'utf8');
  const values = {
    TITLE: project.title,
    DESCRIPTION: project.summary || project.title,
    SLUG: project.slug,
    NAME: portfolio.name,
    BRAND_FIRST: portfolio.brand.first,
    BRAND_LAST: portfolio.brand.last
  };
  return template.replace(/\{\{([A-Z_]+)\}\}/g, (_, key) => escapeHTML(values[key] ?? ''));
}
