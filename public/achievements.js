function element(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  if (text) node.textContent = text;
  return node;
}

export function setupAchievementsSection(content) {
  document.querySelector('#achievements-title').textContent = content.heading;
  document.querySelector('#achievements-title').append(element('span', 'red', '.'));
  document.querySelector('[data-achievements-intro]').textContent = content.introduction;
  document.querySelector('#achievement-record-title').textContent = content.recordHeading;

  const highlights = document.querySelector('[data-achievement-highlights]');
  highlights.replaceChildren();
  for (const item of content.highlights) {
    const article = element('article', 'international-result');
    const top = element('div', 'result-topline');
    const year = element('time', 'result-year', item.year);
    year.dateTime = item.year;
    top.append(element('span', 'result-level', 'INTERNATIONAL'), year);
    const ranking = element('div', 'result-ranking');
    const rank = element('p', 'result-rank');
    rank.append(element('span', 'result-number', item.rank), element('sup', 'result-ordinal', item.ordinal));
    const unit = element('span', 'result-unit', 'worldwide');
    ranking.append(rank, unit);
    if (item.distinction) ranking.append(element('span', 'result-distinction', item.distinction));
    const heading = element('h3', 'result-event', item.event);
    const round = element('p', 'result-round', item.round);
    const description = element('p', 'result-description', item.description);
    const credit = element('div', 'result-credit');
    credit.append(element('span', 'result-team', item.team), element('span', 'result-role', item.role));
    article.append(top, ranking, heading, round, description, credit);
    highlights.append(article);
  }

  const record = document.querySelector('[data-achievement-record]');
  record.replaceChildren();
  for (const group of content.groups) {
    const details = element('details', 'award-year-group');
    details.open = Boolean(group.open);
    const summary = element('summary', 'award-year-summary');
    const year = element(group.year ? 'time' : 'span', 'award-year', group.year || '—');
    if (group.year) year.dateTime = group.year;
    else year.setAttribute('aria-hidden', 'true');
    const label = element('span', 'award-group-label', group.label || 'Competition results');
    const count = element('span', 'award-group-count', group.entries.length + (group.entries.length === 1 ? ' result' : ' results'));
    const toggle = element('span', 'award-group-toggle');
    toggle.setAttribute('aria-hidden', 'true');
    toggle.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';
    summary.append(year, label, count, toggle);
    details.append(summary);
    if (group.note) details.append(element('p', 'award-date-note', group.note));
    const list = element('ul', 'award-list');
    for (const award of group.entries) {
      const row = element('li', 'award-row');
      const description = element('div', 'award-description');
      description.append(element('h4', 'award-event', award.event));
      if (award.category) description.append(element('p', 'award-category', award.category));
      row.append(description, element('p', 'award-result', award.result));
      list.append(row);
    }
    details.append(list);
    record.append(details);
  }
}
