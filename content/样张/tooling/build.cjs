const fs = require('node:fs');
const path = require('node:path');
const { parseHTML } = require('linkedom');
const katex = require('katex');
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'html/函数极限连续.source.html');
const destination = path.join(root, 'html/函数极限连续-样张.html');
const { document } = parseHTML(fs.readFileSync(source, 'utf8'));
require('./chapter-layout.cjs')(document);
const formulas = [...document.querySelectorAll('[data-math]')];
const visuals = document.querySelector('script[data-lesson-visuals]');
if (visuals) {
  visuals.textContent = fs.readFileSync(path.join(__dirname, 'lesson-visuals.js'), 'utf8');
  visuals.removeAttribute('data-lesson-visuals');
}
for (const node of formulas) {
  const tex = node.textContent.trim();
  node.innerHTML = katex.renderToString(tex, {
    displayMode: node.dataset.math === 'display',
    output: 'htmlAndMathml',
    throwOnError: true,
    strict: 'error',
    trust: false,
  });
  node.removeAttribute('data-math');
}
const vendor = path.join(root, 'html/vendor/katex');
fs.mkdirSync(vendor, { recursive: true });
const distribution = path.join(path.dirname(require.resolve('katex')), '..');
fs.copyFileSync(path.join(distribution, 'dist/katex.min.css'), path.join(vendor, 'katex.min.css'));
fs.copyFileSync(path.join(distribution, 'LICENSE'), path.join(vendor, 'LICENSE'));
fs.cpSync(path.join(distribution, 'dist/fonts'), path.join(vendor, 'fonts'), { recursive: true });
fs.writeFileSync(destination, document.toString());
console.log(`Rendered ${formulas.length} formulas using KaTeX ${katex.version}.`);
