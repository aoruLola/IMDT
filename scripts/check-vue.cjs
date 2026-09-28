const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm'), assert = require('node:assert/strict');
const { parseHTML } = require('../content/样张/tooling/node_modules/linkedom');
const root = path.resolve(__dirname, '../dist');
const bundle = fs.readFileSync(path.join(root, 'assets/course-app.js'), 'utf8');
const records = new Map();
const storage = { getItem: k => records.get(k) ?? null, setItem: (k, v) => records.set(k, String(v)), removeItem: k => records.delete(k) };
const flush = () => new Promise(resolve => setTimeout(resolve, 0));
function boot(folder, page, hash = '') {
  const { window, document } = parseHTML(fs.readFileSync(path.join(root, folder, page), 'utf8'));
  const location = new URL('https://vue.test/' + (folder ? folder + '/' : '') + page + hash);
  location.replace = url => { location.href = new URL(url, location).href; };
  const context = vm.createContext({ window, document, localStorage: storage, location, URL, console, setTimeout, clearTimeout,
    SVGElement: window.SVGElement, Element: window.Element, Node: window.Node,
    Event: window.Event, CustomEvent: window.CustomEvent,
    requestAnimationFrame: fn => setTimeout(fn, 0),
    history: { state: {}, replaceState(_, __, url) { location.href = new URL(url, location).href; }, pushState(_, __, url) { location.href = new URL(url, location).href; } },
    IntersectionObserver: class { observe() {} disconnect() {} },
  });
  window.HTMLElement.prototype.getClientRects = () => [];
  window.HTMLElement.prototype.scrollIntoView = () => {};
  vm.runInContext(fs.readFileSync(path.join(root, folder, 'course-data.js'), 'utf8'), context);
  vm.runInContext(bundle, context);
  return { window, document, location, click: selector => { const el = document.querySelector(selector); assert(el, selector); el.click(); } };
}
(async () => {
  records.set('math-lecture-chapters-v1', JSON.stringify({ current: 'function', done: ['function'] }));
  let page = boot('', '00-prep.html'); await flush();
  assert(page.document.querySelector('#vue-reader[data-v-app]'));
  assert(JSON.parse(records.get('math2-course-v1')).done.includes('function'), 'legacy migration');
  let collapsedAtEvent = false;
  page.document.addEventListener('readingpartchange', () => { collapsedAtEvent = page.document.querySelector('#p-algebra-question-body').hidden; });
  page.click('#p-algebra-question [data-part-mark]'); await flush();
  assert(collapsedAtEvent, 'diagram notification must occur after the DOM is collapsed');
  assert.equal(JSON.parse(records.get('math2-reading-part-v1:p-algebra-question')).completed, true);
  assert(!JSON.parse(records.get('math2-course-v1')).done.includes('p-algebra'), 'part is not whole lesson');
  page.click('[data-mark="p-algebra"]'); await flush();
  assert(JSON.parse(records.get('math2-course-v1')).done.includes('p-algebra'));
  page = boot('', '00-prep.html'); await flush();
  assert(page.document.querySelector('#p-algebra-question-body').hidden, 'reload restores collapse');
  assert.equal(page.document.querySelector('[data-mark="p-algebra"]').getAttribute('aria-pressed'), 'true');
  page.click('#p-algebra-question [data-part-mark]'); page.click('[data-mark="p-algebra"]'); await flush();
  assert(!page.document.querySelector('#p-algebra-question-body').hidden);
  assert(!JSON.parse(records.get('math2-course-v1')).done.includes('p-algebra'));
  page.click('#reading-mode'); await flush();
  assert.equal(page.document.querySelectorAll('[data-lesson]:not([hidden])').length, 7);
  page.click('#reading-mode'); await flush();
  assert.equal(page.document.querySelectorAll('[data-lesson]:not([hidden])').length, 1);
  records.set('math2-reading-part-v1:p-algebra-example1', JSON.stringify({ completed: true, collapsed: true }));
  page = boot('', '00-prep.html', '#p-algebra-example1'); await flush();
  assert(!page.document.querySelector('#p-algebra-example1-body').hidden, 'deep link reveals completed part');
  assert(JSON.parse(records.get('math2-reading-part-v1:p-algebra-example1')).collapsed, 'temporary reveal preserves record');
  const mathBefore = records.get('math2-course-v1');
  page = boot('843', '843-00-prep.html'); await flush();
  const mark = page.document.querySelector('[data-mark]'); page.click('[data-mark="' + mark.dataset.mark + '"]'); await flush();
  assert.equal(records.get('math2-course-v1'), mathBefore, '843 leaves math state unchanged');
  assert.equal(JSON.parse(records.get('843-course-v1')).done.length, 1);
  console.log('PASS compiled Vue: legacy migration, mark/undo, reload, full mode, deep links, event timing, course isolation.');
})().catch(e => { console.error(e); process.exitCode = 1; });
