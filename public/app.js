import { portfolio } from './content.js';
import { startRenderAnimation } from './hero-motion.js';
import { animateCounters } from './counter-motion.js';
import { setupAboutSection } from './about.js';
import { startAboutGlobe } from './about-motion.js';
import { visibleProjects } from './projects-data.js';
import { renderProjectCards } from './project-cards.js';
import { setupAchievementsSection } from './achievements.js';

document.title = portfolio.title;
document.querySelector('meta[name="description"]').content = portfolio.description;
for (const element of document.querySelectorAll('[data-name]')) element.textContent = portfolio.name;
document.querySelector('[data-brand-first]').textContent = portfolio.brand.first;
document.querySelector('[data-brand-last]').textContent = portfolio.brand.last;
setupAboutSection(portfolio.about);
setupAchievementsSection(portfolio.achievements, portfolio.cv);
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

renderProjectCards(document.querySelector('#projects'), visibleProjects().filter(project => project.featured));
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
