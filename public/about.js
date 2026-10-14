const icons = {
  facebook: '<path d="M15 4h-3a4 4 0 0 0-4 4v3H5v4h3v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1h2z"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 10v7M11 17v-7m0 3a3 3 0 0 1 6 0v4"/><circle cx="7" cy="7" r=".7" fill="currentColor"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor"/>',
  github: '<path d="M9 21v-3.5c-3 .6-4-1.2-5-2m11 5.5v-3.5c0-1-.3-1.5-.8-2 3-.4 5.8-1.6 5.8-6a4.6 4.6 0 0 0-1.3-3.2c.2-.7.5-2-.1-3.3 0 0-1.1-.3-3.6 1.3a12.5 12.5 0 0 0-6 0C6.5 2.7 5.4 3 5.4 3c-.6 1.3-.3 2.6-.1 3.3A4.6 4.6 0 0 0 4 9.5c0 4.4 2.8 5.6 5.8 6-.5.5-.8 1.2-.8 2"/>'
};

export function setupAboutSection(about) {
  const set = (selector, text) => { document.querySelector(selector).textContent = text; };
  set('[data-about-heading]', about.heading);
  set('[data-about-heading-accent]', about.headingAccent);
  set('[data-about]', about.description);
  const portrait = document.querySelector('[data-about-portrait]');
  portrait.src = about.portrait.src;
  portrait.alt = about.portrait.alt;
  const current = about.currentEducation;
  set('[data-education-period]', current.period);
  set('[data-education-subject]', current.subject);
  set('[data-education-institution]', current.qualification + ' · ' + current.institution);
  set('[data-education-note]', current.note);

  const history = document.querySelector('.education-history');
  for (const entry of about.educationHistory) {
    const item = document.createElement('li');
    for (const [tag, className, text] of [
      ['span', 'education-year', entry.year],
      ['h3', '', entry.qualification],
      ['p', '', entry.institution],
      ['span', 'education-result', entry.board + ' · ' + entry.result]
    ]) {
      const element = document.createElement(tag);
      element.className = className;
      element.textContent = text;
      item.append(element);
    }
    history.append(item);
  }

  const socials = document.querySelector('.social-links');
  for (const social of about.socials) {
    if (!icons[social.platform]) continue;
    const link = document.createElement('a');
    link.className = 'social-link';
    link.innerHTML = '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + icons[social.platform] + '</svg>';
    let url;
    try { const parsed = new URL(social.url); if (['https:', 'http:'].includes(parsed.protocol)) url = parsed.href; } catch { /* Await the owner's profile URL. */ }
    if (url) {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', social.label + ' profile (opens in a new tab)');
      link.title = social.label;
    } else {
      link.setAttribute('role', 'link');
      link.setAttribute('aria-disabled', 'true');
      link.setAttribute('aria-label', social.label + ' profile — link coming soon');
      link.title = social.label + ' profile link coming soon';
    }
    socials.append(link);
  }

  const button = document.querySelector('#education-toggle');
  const overview = document.querySelector('#about-overview');
  const education = document.querySelector('#about-education');
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(expanded));
    overview.hidden = expanded;
    education.hidden = !expanded;
    set('[data-education-toggle-label]', expanded ? 'Back to about me' : 'Educational background');
  });
}
