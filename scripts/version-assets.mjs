import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Keep local source URLs readable. Only generated Pages files receive versions.
export async function versionAssets(directory, { publicSite } = {}) {
  async function collect(folder, prefix = '') {
    const files = [];
    for (const entry of await readdir(folder, { withFileTypes: true })) {
      const relative = prefix + entry.name;
      if (entry.isDirectory()) files.push(...await collect(path.join(folder, entry.name), relative + '/'));
      else if (entry.isFile() && /\.(?:html|js|css)$/.test(entry.name)) files.push(relative);
    }
    return files.sort();
  }
  const files = await collect(directory);
  const source = new Map(await Promise.all(files.map(async file => [file, (await readFile(path.join(directory, file), 'utf8')).replaceAll('\r\n', '\n')])));
  const hash = createHash('sha256').update('portfolio-assets-v1\0');
  for (const [file, text] of source) {
    if (/\.(?:js|css)$/.test(file)) hash.update(file + '\0' + text + '\0');
  }
  const revision = hash.digest('hex').slice(0, 12);
  const withVersion = reference => {
    const url = new URL(reference, 'https://local.invalid/');
    url.searchParams.set('v', revision);
    return reference.split(/[?#]/)[0] + url.search + url.hash;
  };
  for (const [file, original] of source) {
    let text = original;
    if (file.endsWith('.js')) {
      // Static imports/re-exports, side-effect imports and literal lazy imports.
      text = text.replace(/(\b(?:from\s*|import\s*\(\s*|import\s*)['"])(\.{1,2}\/[^'"\s]+\.js(?:\?[^'"\s]*)?)(['"])/g,
        (_, prefix, reference, quote) => prefix + withVersion(reference) + quote);
    } else if (file.endsWith('.html')) {
      text = text.replace(/(\b(?:href|src)=["'])(\.{1,2}\/[^"'\s]+\.(?:css|js)(?:\?[^"'\s]*)?)(["'])/g,
        (_, prefix, reference, quote) => prefix + withVersion(reference) + quote);
      text = text.replace(/(\bhref=["'])(\.{1,2}\/[^"'\s]*)(["'])/g, (match, prefix, reference, quote) => {
        const pathname = reference.split(/[?#]/)[0];
        return pathname.endsWith('/') || pathname.endsWith('.html') ? prefix + withVersion(reference) + quote : match;
      });
      text = text.replace(/<meta name="portfolio-release" content="[^"]*">\s*/g, '');
      text = text.replace(/(<meta charset="UTF-8">)/i, '$1\n  <meta name="portfolio-release" content="' + revision + '">');
      if (publicSite) {
        const canonical = new URL(file.replace(/index\.html$/, ''), publicSite);
        canonical.search = '';
        canonical.hash = '';
        text = text.replace(/<link rel="canonical" href="[^"]*">\s*/g, '');
        text = text.replace('</head>', '  <link rel="canonical" href="' + canonical.href + '">\n</head>');
      }
    }
    if (text !== original) await writeFile(path.join(directory, file), text);
  }
  return revision;
}
