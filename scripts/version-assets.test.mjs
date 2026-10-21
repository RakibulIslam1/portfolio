import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { versionAssets } from './version-assets.mjs';

async function fixture(t, { leaf = 'export const value = 1;', crlf = false } = {}) {
  const base = path.resolve(tmpdir());
  const root = await mkdtemp(path.join(base, 'portfolio-cache-'));
  t.after(async () => {
    if (path.dirname(root) !== base || !path.basename(root).startsWith('portfolio-cache-')) throw Error('Unexpected test directory');
    await rm(root, { recursive: true, force: true });
  });
  const files = {
    'index.html': '<head><meta charset="UTF-8"><link href="./main.css" rel="stylesheet"><script type="module" src="./app.js"></script></head>\n<a href="./projects/#list">Projects</a><a href="#about">About</a><a href="./cv.pdf">CV</a>',
    'projects/index.html': '<head><meta charset="UTF-8"></head><a href="../">Home</a>',
    'app.js': "import { value } from './data.js';\nimport './side-effect.js';\nexport const lazy = () => import('./lazy.js');\nexport { value };\n",
    'data.js': leaf + '\n',
    'side-effect.js': 'globalThis.demo = true;\n',
    'lazy.js': 'export const loaded = true;\n',
    'main.css': 'body { background: black; }\n'
  };
  for (const [file, source] of Object.entries(files)) {
    await mkdir(path.dirname(path.join(root, file)), { recursive: true });
    await writeFile(path.join(root, file), crlf ? source.replaceAll('\n', '\r\n') : source);
  }
  const revision = await versionAssets(root, { publicSite: 'https://example.test/portfolio/' });
  return { root, revision, read: file => readFile(path.join(root, file), 'utf8') };
}

test('versions entry assets, the module graph and internal navigation; preserves canonical paths', async t => {
  const f = await fixture(t);
  const html = await f.read('index.html');
  const app = await f.read('app.js');
  for (const asset of ['app.js', 'main.css']) assert.ok(html.includes(asset + '?v=' + f.revision));
  for (const dependency of ['data.js', 'side-effect.js', 'lazy.js']) assert.ok(app.includes(dependency + '?v=' + f.revision));
  assert.ok(html.includes('./projects/?v=' + f.revision + '#list'));
  assert.ok(html.includes('href="#about"') && html.includes('href="./cv.pdf"'));
  assert.ok(html.includes('rel="canonical" href="https://example.test/portfolio/"'));
  assert.ok((await f.read('projects/index.html')).includes('rel="canonical" href="https://example.test/portfolio/projects/"'));
});

test('a dependency update changes cache keys throughout the graph', async t => {
  const first = await fixture(t);
  const second = await fixture(t, { leaf: 'export const value = 2;' });
  assert.notEqual(first.revision, second.revision);
  assert.ok((await second.read('app.js')).includes('data.js?v=' + second.revision));
  assert.ok((await second.read('index.html')).includes('app.js?v=' + second.revision));
});

test('Windows and Linux line endings produce the same release', async t => {
  const lf = await fixture(t);
  const crlf = await fixture(t, { crlf: true });
  assert.equal(lf.revision, crlf.revision);
});
