const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../html');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf'};
http.createServer((req,res) => {
  try {
    let url = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (url === '/') url = '/函数极限连续-样张.html';
    const target = path.resolve(root, '.' + url);
    const relative = path.relative(root, target);
    if (relative.startsWith('..') || path.isAbsolute(relative) || !types[path.extname(target)] || !fs.existsSync(target) || !fs.statSync(target).isFile()) {
      res.writeHead(404); return res.end();
    }
    res.setHeader('Content-Type',types[path.extname(target)]);
    res.setHeader('Cache-Control','no-store');
    fs.createReadStream(target).pipe(res);
  } catch { res.writeHead(400); res.end(); }
}).listen(4173, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:4173'));
