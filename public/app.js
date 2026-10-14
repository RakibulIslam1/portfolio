import { portfolio } from './content.js';
import { startRenderAnimation } from './hero-motion.js';
import { animateCounters } from './counter-motion.js';
import { setupAboutSection } from './about.js';
import { startAboutGlobe } from './about-motion.js';

document.title = portfolio.title;
document.querySelector('meta[name="description"]').content = portfolio.description;
for (const element of document.querySelectorAll('[data-name]')) element.textContent = portfolio.name;
document.querySelector('[data-brand-first]').textContent = portfolio.brand.first;
document.querySelector('[data-brand-last]').textContent = portfolio.brand.last;
setupAboutSection(portfolio.about);
document.querySelector('#year').textContent = new Date().getFullYear();

const projectCount = portfolio.projects.filter(project => !project.placeholder).length;
const stats = document.querySelector('.hero-stats');
stats.replaceChildren();
for (const stat of portfolio.stats) {
  const item = document.createElement('div');
  item.className = 'hero-stat';
  const label = document.createElement('dt');
  label.textContent = stat.label;
  const value = document.createElement('dd');
  value.textContent = stat.useProjectCount && projectCount > 0 ? String(projectCount) : stat.value;
  value.dataset.animate = String(stat.animate !== false);
  item.append(label, value);
  stats.append(item);
}
animateCounters(stats.querySelectorAll('dd'));

const skills = document.querySelector('.hero-skills');
skills.replaceChildren();
for (const skill of portfolio.skills) {
  const chip = document.createElement('li');
  chip.className = 'skill-chip';
  chip.textContent = skill.label;
  skills.append(chip);
}

const cvDownload = document.querySelector('#cv-download');
cvDownload.removeAttribute('href');
cvDownload.removeAttribute('download');
cvDownload.setAttribute('aria-disabled', 'true');
cvDownload.setAttribute('tabindex', '-1');
cvDownload.title = 'CV coming soon';
if (portfolio.cv.url) {
  try {
    const cvURL = new URL(portfolio.cv.url, document.baseURI);
    if (['https:', 'http:'].includes(cvURL.protocol)) {
      cvDownload.href = cvURL.href;
      cvDownload.download = portfolio.cv.filename;
      cvDownload.removeAttribute('aria-disabled');
      cvDownload.removeAttribute('tabindex');
      cvDownload.title = 'Download CV';
    }
  } catch { /* Keep the link unavailable until a valid CV path is supplied. */ }
}

function safeURL(value) {
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; }
  catch { return null; }
}
for (const project of portfolio.projects) {
  const article = document.createElement('article');
  const visual = document.createElement('div');
  visual.className = 'project-visual ' + (project.theme === 'grid' ? 'grid' : 'orbit');
  visual.setAttribute('aria-hidden', 'true');
  const status = document.createElement('span');
  status.className = 'project-status';
  const url = safeURL(project.url);
  status.textContent = url ? 'VIEW PROJECT' : 'COMING SOON';
  visual.append(status);
  const meta = document.createElement('div');
  meta.className = 'project-meta';
  const details = document.createElement('div');
  const title = document.createElement('h3');
  title.className = 'project-title'; title.textContent = project.title;
  const category = document.createElement('p');
  category.className = 'project-category'; category.textContent = project.category;
  details.append(title, category);
  const number = document.createElement('span');
  number.className = 'project-number'; number.textContent = project.number;
  meta.append(details, number);
  if (url) {
    const link = document.createElement('a');
    link.className = 'project-link'; link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.append(visual, meta); article.append(link);
  } else article.append(visual, meta);
  document.querySelector('#projects').append(article);
}
if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(portfolio.email)) {
  const contact = document.querySelector('#contact-link');
  contact.href = 'mailto:' + portfolio.email;
  contact.hidden = false;
  document.querySelector('#contact-pending').hidden = true;
}
const links = [...document.querySelectorAll('.nav-link')];
function setActive(id) {
  for (const link of links) {
    const active = link.hash === '#' + id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
let scheduled = false;
function updateNavigation() {
  const sections = [...document.querySelectorAll('main > section')];
  const marker = window.scrollY + document.querySelector('.site-header').getBoundingClientRect().height + 40;
  let current = sections[0].id;
  for (const section of sections) if (section.offsetTop <= marker) current = section.id;
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) current = sections.at(-1).id;
  setActive(current);
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
}, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();

const heroMotion = startRenderAnimation(portfolio.projectRenders);
startAboutGlobe(portfolio.projectRenders, progress => heroMotion?.setHandoff(progress));
