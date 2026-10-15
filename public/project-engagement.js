import { portfolio } from './content.js';

const repositoryPattern = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

function githubLink(url, text) {
  const link = document.createElement('a');
  link.href = url;
  link.textContent = text;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  return link;
}

function viewCounter(project) {
  let canonical;
  try { canonical = new URL('projects/' + project.slug + '/', portfolio.projectEngagement.publicSite); }
  catch { return; }
  if (canonical.protocol !== 'https:') return;
  const counter = new URL('https://hits.sh/' + canonical.host + canonical.pathname.replace(/\/$/, '') + '.svg');
  counter.search = new URLSearchParams({ style: 'flat-square', label: 'Views', color: '343434', labelColor: '080808' });
  const link = githubLink(counter.origin + counter.pathname.replace(/\.svg$/, '/'), 'Views · live site');
  link.className = 'project-views';
  link.title = 'Shared project page views since publication. Open view statistics.';
  const activity = document.createElement('div');
  activity.className = 'project-activity';
  activity.append(link);
  document.querySelector('.project-detail-copy').append(activity);
  // Local development and alternate preview hosts must not inflate public totals.
  if (location.origin !== canonical.origin) return;
  const image = new Image();
  image.alt = 'Project views — open counter statistics for the total';
  image.referrerPolicy = 'no-referrer';
  image.height = 20;
  const timeout = setTimeout(() => { link.textContent = 'Views unavailable'; }, 8000);
  image.addEventListener('load', () => { clearTimeout(timeout); link.replaceChildren(image); }, { once: true });
  image.addEventListener('error', () => { clearTimeout(timeout); link.textContent = 'Views unavailable'; }, { once: true });
  image.src = counter.href;
}

function commentItem(issue, marker, repository) {
  const item = document.createElement('li');
  const meta = document.createElement('div');
  meta.className = 'project-comment-meta';
  const author = document.createElement('span');
  author.textContent = issue.user?.login || 'GitHub visitor';
  meta.append(author);
  const date = new Date(issue.created_at);
  if (Number.isFinite(date.getTime())) {
    const time = document.createElement('time');
    time.dateTime = date.toISOString();
    time.textContent = date.toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric' });
    meta.append(time);
  }
  const title = issue.title.slice(marker.length).trim();
  if (title && title.toLowerCase() !== 'comment') {
    const heading = document.createElement('h3');
    heading.textContent = title;
    item.append(heading);
  }
  const body = document.createElement('p');
  const text = issue.body?.trim() || 'Open this conversation on GitHub.';
  body.textContent = text.length > 700 ? text.slice(0, 700) + '…' : text;
  const thread = githubLink('https://github.com/' + repository + '/issues/' + issue.number, 'Read & reply ↗');
  thread.className = 'project-comment-reply';
  item.prepend(meta);
  item.append(body, thread);
  return item;
}

export async function setupProjectEngagement(project) {
  if (project.placeholder) return;
  viewCounter(project);
  const repository = portfolio.projectEngagement?.commentsRepository;
  if (!repositoryPattern.test(repository || '')) return;
  const section = document.querySelector('[data-project-engagement]');
  const status = section.querySelector('[data-comments-status]');
  const list = section.querySelector('[data-comments-list]');
  const marker = '[' + project.slug + ']';
  const issuesURL = 'https://github.com/' + repository + '/issues';
  const compose = new URL(issuesURL + '/new');
  compose.search = new URLSearchParams({ title: marker + ' Comment', body: 'Your comment about ' + project.title + ':\n\n' });
  section.querySelector('[data-comment-link]').href = compose.href;
  const archive = new URL(issuesURL);
  archive.search = new URLSearchParams({ q: 'is:issue "' + marker + '" in:title' });
  const all = githubLink(archive.href, 'All comments on GitHub ↗');
  all.className = 'project-comment-archive';
  section.querySelector('.project-comment-actions').append(all);
  if (repositoryPattern.test(project.repository || '')) {
    const watch = section.querySelector('[data-project-watch]');
    watch.href = 'https://github.com/' + project.repository;
    watch.title = 'Open the repository and use GitHub’s Watch control to follow updates';
    watch.hidden = false;
  }
  section.hidden = false;
  try {
    const endpoint = new URL('https://api.github.com/search/issues');
    endpoint.search = new URLSearchParams({ q: 'repo:' + repository + ' is:issue "' + marker + '" in:title', sort: 'created', order: 'desc', per_page: '10' });
    const response = await fetch(endpoint, { headers: { Accept: 'application/vnd.github+json' }, credentials: 'omit', referrerPolicy: 'no-referrer', signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw Error('Comments unavailable');
    const result = await response.json();
    if (!Array.isArray(result.items)) throw Error('Invalid comment response');
    const comments = result.items.filter(issue => !issue.pull_request && issue.title?.startsWith(marker) && Number.isSafeInteger(issue.number) && issue.number > 0);
    for (const issue of comments) list.append(commentItem(issue, marker, repository));
    status.textContent = comments.length ? 'Latest conversations. Replies continue on GitHub.' : 'No comments yet. Questions about the build? Leave a note.';
  } catch {
    status.textContent = 'Comments are available on GitHub.';
  }
}
