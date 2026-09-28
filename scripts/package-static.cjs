const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto');
const { zipSync, unzipSync, strToU8 } = require('fflate');
const root = path.resolve(__dirname, '..'), dist = path.join(root, 'dist');
if (!fs.existsSync(path.join(dist, 'assets/course-app.js'))) throw Error('Run npm run build first');
const files = {};
function collect(dir, prefix) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const name = prefix + e.name, file = path.join(dir, e.name);
    if (e.isDirectory()) collect(file, name + '/');
    else files[name] = new Uint8Array(fs.readFileSync(file));
  }
}
collect(dist, 'html/');
collect(path.join(root, 'deploy'), '');
const digest = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
files['SHA256SUMS.txt'] = strToU8(Object.entries(files).map(([name, bytes]) => digest(bytes) + '  ' + name).join('\n') + '\n');
const zip = zipSync(files, { level: 6 });
const date = new Date().toISOString().slice(0, 10), out = path.join(root, 'exports', `IMDT-Vue-Nginx-${date}.zip`);
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, zip);
// Verify actual extraction and every byte, not just a list of archive names.
const extracted = unzipSync(fs.readFileSync(out));
const verify = fs.mkdtempSync(path.join(root, 'exports', 'verify-vue-'));
for (const [name, bytes] of Object.entries(extracted)) {
  if (name.includes('\\') || name.startsWith('/') || name.split('/').includes('..')) throw Error('Invalid ZIP path: ' + name);
  const target = path.join(verify, ...name.split('/'));
  fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, bytes);
  if (!files[name] || digest(fs.readFileSync(target)) !== digest(files[name])) throw Error('Archive mismatch: ' + name);
}
if (Object.keys(extracted).length !== Object.keys(files).length) throw Error('Archive count mismatch');
for (const name of ['html/index.html', 'html/843/index.html', 'html/assets/course-app.js', 'html/vendor/katex/katex.min.css']) if (!extracted[name]) throw Error('Missing entry: ' + name);
console.log(`Verified ${Object.keys(files).length} files; forward-slash paths; extracted hashes match.\n${out}`);
