const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const root = path.resolve(__dirname, '../dist');
const port = Number(process.env.PORT || 4174);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.pdf': 'application/pdf', '.c': 'text/plain', '.sql': 'text/plain' };
http.createServer((req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
    let name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (name === '/843') { res.writeHead(301, { Location: '/843/' }).end(); return; }
    if (name.endsWith('/')) name += 'index.html';
    const file = path.resolve(root, '.' + name), rel = path.relative(root, file);
    if (rel.startsWith('..') || path.isAbsolute(rel) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404).end('Not found'); return; }
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-store');
    if (req.method === 'HEAD') res.end(); else fs.createReadStream(file).pipe(res);
  } catch { res.writeHead(400).end('Bad request'); }
}).listen(port, '127.0.0.1', () => console.log(`Vue static preview: http://127.0.0.1:${port}/`));
