import { cp, mkdir, lstat, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { visibleProjects, renderProjectPage } from './project-pages.mjs';
import { versionAssets } from './version-assets.mjs';
import { portfolio } from '../public/content.js';

const projects = visibleProjects();
const projectRoot = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const output = path.resolve(projectRoot, 'dist');
// Only remove the explicit generated directory; refuse linked output folders.
if (path.dirname(output) !== projectRoot || path.basename(output) !== 'dist') throw Error('Unexpected build destination.');
const previous = await lstat(output).catch(error => { if (error.code !== 'ENOENT') throw error; return null; });
if (previous?.isSymbolicLink()) throw Error('Build destination must not be a symbolic link.');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(new URL('../public/', import.meta.url), output, { recursive: true });
for (const project of projects) {
  const directory = path.join(output, 'projects', project.slug);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), await renderProjectPage(project));
}
const revision = await versionAssets(output, { publicSite: portfolio.projectEngagement.publicSite });
console.log('Static portfolio and ' + projects.length + ' project pages built in dist/ · assets ' + revision);
