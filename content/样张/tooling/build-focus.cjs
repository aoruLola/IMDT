const fs = require('node:fs');
const path = require('node:path');
const { parseHTML } = require('linkedom');
const katex = require('katex');
const { art } = require('./visuals.cjs');
const root = path.resolve(__dirname, '../html');
const { document } = parseHTML(fs.readFileSync(path.join(root, '专注阅读.source.html'), 'utf8'));
document.querySelector('[data-graph]').innerHTML = art.limit;
for (const el of document.querySelectorAll('[data-math]')) {
  el.innerHTML = katex.renderToString(el.textContent, { displayMode: el.dataset.math === 'display', output: 'htmlAndMathml', throwOnError: true, strict: 'error', trust: false });
  el.removeAttribute('data-math');
}
document.querySelector('script[data-interactions]').textContent = fs.readFileSync(path.join(__dirname, 'focus-reading.js'), 'utf8');
fs.writeFileSync(path.join(root, '专注阅读-样张.html'), document.toString());
console.log('Built standalone focused-reading sample.');
