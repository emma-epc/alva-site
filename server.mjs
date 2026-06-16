// Petit serveur statique local (preview uniquement — pas nécessaire en production).
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.txt': 'text/plain; charset=utf-8',
};

function send(res, file) {
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}

http.createServer((req, res) => {
  let p = decodeURIComponent((req.url || '/').split('?')[0]);
  if (p === '/' || p === '') p = '/index.html';
  const fp = path.normalize(path.join(root, p));
  if (!fp.startsWith(root)) { res.writeHead(403); res.end('forbidden'); return; }

  // URLs propres (comme Netlify) : /contact -> contact.html, /dossier -> dossier/index.html
  if (path.extname(fp)) { send(res, fp); return; }
  fs.stat(fp + '.html', (e, s) => {
    if (!e && s.isFile()) return send(res, fp + '.html');
    const idx = path.join(fp, 'index.html');
    fs.stat(idx, (e2, s2) => {
      if (!e2 && s2.isFile()) return send(res, idx);
      send(res, fp); // laissera le 404 se produire
    });
  });
}).listen(8099, () => console.log('ALVA preview sur http://localhost:8099'));
