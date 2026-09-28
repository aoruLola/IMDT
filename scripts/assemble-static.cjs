const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'dist');
// Never derive a removal target from user input.
if (path.dirname(out) !== root || path.basename(out) !== 'dist') throw Error('Unsafe output directory');
fs.rmSync(out, { recursive: true, force: true });
for (const [source, destination] of [['content/课程/site', out], ['content/843/site', path.join(out, '843')]]) {
  fs.cpSync(path.join(root, source), destination, { recursive: true });
}
let pages = 0;
function visit(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { visit(file); continue; }
    if (!entry.name.endsWith('.html')) continue;
    let html = fs.readFileSync(file, 'utf8');
    if (!html.includes('src="reader.js"')) continue; // Independent historical samples retain their own runtime.
    html = html.replace(/<script\b[^>]*src="(?:reader|reading-parts)\.js"[^>]*><\/script>/g, '');
    html = html.replace('</body>', '<script type="module" src="/assets/course-app.js"></script></body>');
    fs.writeFileSync(file, html); pages++;
  }
}
visit(out);
console.log(`Prepared ${pages} Vue course pages in dist/`);
