function element(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  if (text) node.textContent = text;
  return node;
}

export function setupAchievementsSection(content, cv) {
  const heading = document.querySelector('#achievements-title');
  heading.textContent = content.heading;
  heading.append(element('span', 'red', '.'));
  const highlights = document.querySelector('[data-achievement-highlights]');
  highlights.replaceChildren();
  for (const item of content.highlights) {
    const article = element('article', 'international-result');
    const ranking = element('div', 'result-ranking');
    const rank = element('p', 'result-rank');
    rank.append(element('span', 'result-number', item.rank), element('sup', 'result-ordinal', item.ordinal));
    ranking.append(rank, element('span', 'result-unit', 'worldwide'));
    const copy = element('div', 'result-copy');
    copy.append(element('h3', 'result-event', item.event));
    const meta = element('p', 'result-meta');
    const year = element('time', '', item.year);
    year.dateTime = item.year;
    meta.append(year);
    if (item.distinction) meta.append(' · ' + item.distinction);
    copy.append(meta, element('p', 'result-team', item.team));
    article.append(ranking, copy);
    highlights.append(article);
  }

  const wro = document.querySelector('[data-wro-results]');
  wro.replaceChildren();
  for (const award of content.wro) {
    const item = element('li', 'wro-result');
    const meta = element('p', 'wro-meta');
    const year = element('time', '', award.year);
    year.dateTime = award.year;
    meta.append(year);
    if (award.level) meta.append(' · ' + award.level);
    item.append(meta, element('h4', 'wro-round', award.round), element('p', 'wro-outcome', award.result));
    if (award.detail) item.append(element('p', 'wro-detail', award.detail));
    wro.append(item);
  }

  const list = document.querySelector('[data-achievement-results]');
  list.replaceChildren();
  for (const award of content.otherResults) {
    const row = element('li', 'award-row');
    const copy = element('div', 'award-description');
    copy.append(element('h4', 'award-event', award.event), element('p', 'award-category', [award.category, award.year].filter(Boolean).join(' · ')));
    row.append(copy, element('span', 'award-result', award.result));
    list.append(row);
  }
  const link = document.querySelector('[data-achievements-cv]');
  link.removeAttribute('href');
  try {
    const url = new URL(cv.url, document.baseURI);
    if (cv.url && ['https:', 'http:'].includes(url.protocol)) {
      link.href = url.href;
      link.download = cv.filename;
    }
  } catch { /* Leave the full-record link unavailable for an invalid CV URL. */ }
  link.hidden = !link.hasAttribute('href');
}
