import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { visibleProjects, renderProjectPage } from './scripts/project-pages.mjs';

const root = path.resolve(fileURLToPath(new URL('./public/', import.meta.url)));
const port = Number(process.env.PORT || 3000);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.mgla': 'application/octet-stream', '.txt': 'text/plain; charset=utf-8', '.pdf': 'application/pdf' };
export const server = http.createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return;
  }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const filename = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
    if (!filename.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
    if (pathname.includes('\\')) { res.writeHead(400); res.end(); return; }
    const route = pathname.match(/^\/projects\/([a-z0-9]+(?:-[a-z0-9]+)*)(\/|\/index\.html)?$/);
    if (pathname === '/projects' || route && !route[2]) {
      res.writeHead(308, { Location: pathname + '/' }); res.end(); return;
    }
    let body;
    if (route) {
      const project = visibleProjects().find(item => item.slug === route[1]);
      if (!project) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end(req.method === 'HEAD' ? undefined : 'Not found'); return; }
      body = await renderProjectPage(project);
    } else body = await readFile(filename);
    res.writeHead(200, { 'Content-Type': mime[path.extname(filename)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end(req.method === 'HEAD' ? undefined : 'Not found');
  }
});
server.listen(port, '127.0.0.1', () => console.log('Portfolio ready at http://localhost:' + server.address().port));
