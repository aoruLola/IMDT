/* Fusion checks: workbench page, PPT data, point map, storage isolation, old anchors. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const site = path.join(root, 'site');
const site843 = path.join(root, '../843/site');
const { parseHTML } = require('../../样张/tooling/node_modules/linkedom');

// Study workbench exists and is self-contained
assert(fs.existsSync(path.join(site, 'study.html')), 'missing study.html');
assert(fs.existsSync(path.join(site, 'study-data.js')), 'missing study-data.js');
assert(fs.existsSync(path.join(site, 'workbench.js')), 'missing workbench.js');
assert(fs.existsSync(path.join(site, 'workbench.css')), 'missing workbench.css');
assert(fs.existsSync(path.join(site, 'point-map.js')), 'missing point-map.js');

const studyDoc = parseHTML(fs.readFileSync(path.join(site, 'study.html'), 'utf8')).document;
assert(studyDoc.querySelector('#wb-today-list'), 'study.html missing today tasks');
assert(studyDoc.querySelector('#wb-score-form'), 'study.html missing score form');
assert(studyDoc.querySelector('#wb-error-form'), 'study.html missing error form');
assert(studyDoc.querySelector('#wb-export') && studyDoc.querySelector('#wb-import'), 'study.html missing backup controls');
assert(studyDoc.querySelector('#wb-point-list'), 'study.html missing point index');

// study-data and point-map parse and stay honest about unbound items
const studyCtx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(site, 'study-data.js'), 'utf8'), studyCtx);
const STUDY = studyCtx.window.STUDY_DATA;
assert(STUDY && STUDY.points.length === 348, 'expected 348 knowledge points');
assert(STUDY.courses.math2.lessonCount === 72, 'math2 lesson count');
assert(STUDY.courses['843'].lessonCount === 72, '843 lesson count');
const indexOnly = STUDY.points.filter((p) => p.status === 'index-only');
assert(indexOnly.length === 76 + 52, 'politics+english must be index-only');
assert(indexOnly.every((p) => p.subject === 'politics' || p.subject === 'english'), 'index-only subjects');
assert(STUDY.points.filter((p) => p.status === 'unbound-body').every((p) => !p.bound), 'unbound must not claim bound');
assert(STUDY.points.filter((p) => p.status === 'bound').every((p) => p.lessonIds.length > 0), 'bound points need lessons');
for (const p of STUDY.points.filter((x) => x.bound)) {
  for (const l of p.lessons) assert(l.url && l.title, 'mapped lesson needs url/title');
}

// every bound lesson id exists in that course's lesson list
const mathIds = new Set(STUDY.courses.math2.lessons.map((l) => l.id));
const xIds = new Set(STUDY.courses['843'].lessons.map((l) => l.id));
for (const p of STUDY.points.filter((x) => x.bound)) {
  for (const l of p.lessons) {
    assert(l.courseId === 'math2' ? mathIds.has(l.id) : xIds.has(l.id), 'mapped lesson missing from course ' + l.id);
  }
}

// PPT data on both courses
for (const [dir, courseId] of [[site, 'math2'], [site843, '843']]) {
  assert(fs.existsSync(path.join(dir, 'ppt-data.js')), `missing ppt-data.js in ${courseId}`);
  assert(fs.existsSync(path.join(dir, 'ppt.js')), `missing ppt.js in ${courseId}`);
  assert(fs.existsSync(path.join(dir, 'ppt.css')), `missing ppt.css in ${courseId}`);
  const ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(dir, 'ppt-data.js'), 'utf8'), ctx);
  const PPT = ctx.window.PPT_DATA;
  assert.equal(PPT.courseId, courseId);
  assert(Object.keys(PPT.lessons).length === 72, `${courseId} ppt lesson count`);
  for (const [id, meta] of Object.entries(PPT.lessons)) {
    assert(meta.pages.length >= 4 && meta.pages.length <= 7, `${id} page count ${meta.pages.length}`);
    const kinds = meta.pages.map((p) => p.kind);
    assert(kinds[0] === 'problem', `${id} first page must be problem`);
    assert(kinds[kinds.length - 1] === 'recap', `${id} last page must be recap`);
    assert(kinds.includes('practice') || kinds.includes('worked'), `${id} needs practice or worked`);
    // no blank pages
    for (const p of meta.pages) {
      const text = ((p.bodyHtml || '') + (p.promptHtml || '') + (p.goalHtml || '')).replace(/<[^>]+>/g, '').trim();
      assert(text.length > 0 || p.kind === 'intuition', `${id}/${p.id} empty page`);
    }
    // practice must start closed
    const pr = meta.pages.find((p) => p.kind === 'practice');
    if (pr) assert(pr.hintHtml?.trim() && pr.solutionHtml?.trim(), `${id} practice needs nonempty hint/solution`);
    const worked=meta.pages.find(p=>p.kind==='worked');
    assert(worked?.promptHtml?.trim()&&worked.solutionHtml?.trim()&&worked.promptHtml!==worked.solutionHtml,`${id} needs a question separate from its worked solution`);
  }
  // lesson pages contain launch button
  const course = JSON.parse(fs.readFileSync(path.join(root, courseId === '843' ? '../843/course.json' : 'course.json'), 'utf8'));
  const chapterFile = course.chapters[1].id + '.html';
  const doc = parseHTML(fs.readFileSync(path.join(dir, chapterFile), 'utf8')).document;
  assert(doc.querySelector('[data-ppt-lesson]') || doc.querySelector('.ppt-launch'), `${courseId} missing PPT launcher`);
  assert(doc.querySelector('a[href="/study.html"]') || doc.querySelector('a[href="/study.html"]'), 'nav missing study link');
}

// Old anchors still present on math2 limits chapter
const limits = parseHTML(fs.readFileSync(path.join(site, '01-limits.html'), 'utf8')).document;
for (const id of ['function', 'limit']) {
  assert(limits.getElementById(id), `lost anchor #${id}`);
}
// Legacy redirect page still maps old ids
assert(fs.existsSync(path.join(site, '函数极限连续-样张.html')), 'legacy page missing');

// Workbench JS parses
new vm.Script(fs.readFileSync(path.join(site, 'workbench.js'), 'utf8'), { filename: 'workbench.js' });
new vm.Script(fs.readFileSync(path.join(site, 'ppt.js'), 'utf8'), { filename: 'ppt.js' });

// Exercise real backup and browser operations rather than matching source strings.
require('./check-fusion-behavior.cjs');

const fusionReport = path.join(root, '../../FUSION-COVERAGE.md');
assert(fs.existsSync(fusionReport), 'missing FUSION-COVERAGE.md');
const report = fs.readFileSync(fusionReport, 'utf8');
assert(report.includes('尚未绑定正文') || report.includes('索引/待补正文'), 'report must mention pending body text');

// Nav has workbench link on math2 home
const home = parseHTML(fs.readFileSync(path.join(site, 'index.html'), 'utf8')).document;
assert([...home.querySelectorAll('a')].some((a) => (a.getAttribute('href') || '').includes('study.html')), 'home nav missing study.html');

const result = {
  passed: true,
  points: STUDY.points.length,
  bound: STUDY.counts.bound,
  unboundBody: STUDY.counts.unboundBody,
  indexOnly: STUDY.counts.indexOnly,
  math2PptLessons: 72,
  x843PptLessons: 72,
  checkedAt: new Date().toISOString(),
};
fs.writeFileSync(path.join(root, '../../FUSION-QA.json'), JSON.stringify(result, null, 2) + '\n');
console.log(result);
