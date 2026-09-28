const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const { parseHTML } = require('../content/样张/tooling/node_modules/linkedom');
const root = path.resolve(__dirname, '../dist');
let pages = 0, links = 0, vuePages = 0;
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, e.name);
    if (e.isDirectory()) { walk(file); continue; }
    if (!e.name.endsWith('.html')) continue;
    pages++;
    const html = fs.readFileSync(file, 'utf8'), { document } = parseHTML(html);
    if (document.body.hasAttribute('data-course-chapter')) {
      assert(document.querySelector('script[type="module"][src="/assets/course-app.js"]'), file + ': Vue entry missing');
      assert(!document.querySelector('script[src="reader.js"],script[src="reading-parts.js"]'), file + ': Duplicate reader');
      vuePages++;
    }
    const url = new URL(path.relative(root, file).split(path.sep).join('/'), 'https://static.test/');
    for (const el of document.querySelectorAll('[src],link[href],a[href]')) {
      const attr = el.getAttribute('src') || el.getAttribute('href');
      if (!attr || /^(?:data:|mailto:|javascript:|tel:)/.test(attr)) continue;
      const target = new URL(attr, url);
      if (target.origin !== url.origin) continue;
      let name = decodeURIComponent(target.pathname);
      if (name.endsWith('/')) name += 'index.html';
      assert(fs.existsSync(path.join(root, name)), `${file}: missing ${attr}`); links++;
    }
  }
}
walk(root);
assert(vuePages >= 40, 'Both courses must use Vue');
for (const file of ['index.html', '843/index.html', 'study.html', 'assets/course-app.js']) assert(fs.existsSync(path.join(root, file)));
console.log(`Static build checked: ${pages} HTML pages, ${vuePages} Vue pages, ${links} local links/resources.`);
