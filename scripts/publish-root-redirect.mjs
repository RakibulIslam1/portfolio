import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';

// Manual maintenance of the account-root alias; the portfolio keeps its own CI.
const repository = 'RakibulIslam1/RakibulIslam1.github.io';
const endpoint = 'repos/' + repository + '/contents/index.html';
const content = (await readFile(new URL('../hosting/github-root/index.html', import.meta.url))).toString('base64');
const options = { encoding: 'utf8', windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] };
let current;
try {
  current = JSON.parse(execFileSync('gh', ['api', endpoint], options));
} catch (error) {
  let status;
  try { status = JSON.parse(String(error.stdout)).status; } catch { /* Surface non-API errors below. */ }
  if (String(status) !== '404') throw error;
}
if (current?.content?.replace(/\s/g, '') === content) {
  console.log('Account-root redirect already matches the local source.');
} else {
  const input = JSON.stringify({
    message: 'Point the account website to the portfolio',
    branch: 'main',
    content,
    ...(current?.sha ? { sha: current.sha } : {})
  });
  const result = JSON.parse(execFileSync('gh', ['api', '--method', 'PUT', endpoint, '--input', '-'], { ...options, input }));
  console.log(JSON.stringify({ repository, commit: result.commit.sha, url: result.content.html_url }));
}
