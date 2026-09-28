const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),site=path.join(root,'site'),{parseHTML}=require('../../样张/tooling/node_modules/linkedom');
const course=JSON.parse(fs.readFileSync(path.join(root,'course.json'),'utf8'));
// Shorthand must preserve integral bounds and matrix boundaries when typeset.
const normalize=require('./math-normalize.cjs');
assert.equal(normalize('∫₀∞e^{-t}dt'),'$\\int _{0}^{\\infty }e^{-t}dt$');
assert.equal(normalize('∫ₓ¹e^{y²}dy'),'$\\int _{x}^{1}e^{y^{2}}dy$');
assert.equal(normalize('e^{2sin x}'),'$e^{2\\sin  x}$');
assert.equal(normalize('A^{-1}=[[1,0],[0,1]]'),'$A^{-1}=$[[1,0],[0,1]]');
assert.equal(normalize('$e^{x^2}$'),'$e^{x^2}$');
const files=fs.readdirSync(site).filter(f=>f.endsWith('.html')&&f!=='函数极限连续-样张.html'),docs=new Map();
let links=0,formulaCount=0,exerciseCount=0;
for(const file of files){const {document}=parseHTML(fs.readFileSync(path.join(site,file),'utf8'));docs.set(file,document);const seen=new Set();for(const e of document.querySelectorAll('[id]')){assert(!seen.has(e.id),`Duplicate id ${file}#${e.id}`);seen.add(e.id);}assert.equal(document.querySelectorAll('.katex-error,[data-math]').length,0,`Unrendered math ${file}`);formulaCount+=document.querySelectorAll('.katex').length;exerciseCount+=document.querySelectorAll('.exercise').length;}
for(const [file,doc]of docs)require('./check-math-svg.cjs')(doc,file);
for(const [file,doc]of docs){for(const e of doc.querySelectorAll('[href],[src]')){const raw=e.getAttribute('href')||e.getAttribute('src');if(!raw||/^(https?:|mailto:|data:)/.test(raw))continue;const url=new URL(raw,'http://local/'+file),dest=decodeURIComponent(url.pathname.slice(1)),target=dest.startsWith('843/')?path.resolve(root,'../843/site',dest.slice(4)||'index.html'):path.join(site,dest||'index.html');assert(fs.existsSync(target),`Missing local target ${file}: ${raw}`);if(url.hash&&path.extname(target)==='.html'){const d=docs.get(dest)||parseHTML(fs.readFileSync(target,'utf8')).document;assert(d.getElementById(decodeURIComponent(url.hash.slice(1))),`Missing anchor ${file}: ${raw}`);}links++;}}
for(const file of ['course-data.js','reader.js','reading-parts.js','diagrams.js','lesson-visuals.js','study-model.js','study.js'])new vm.Script(fs.readFileSync(path.join(site,file),'utf8'),{filename:file});
// Exercise the shipped reader's migration against isolated storage fixtures.
// No real browser reading records are written or cleared by these checks.
const dataContext={window:{}};vm.runInNewContext(fs.readFileSync(path.join(site,'course-data.js'),'utf8'),dataContext);
function migrate(records){const storage=new Map(Object.entries(records));const context={window:dataContext.window,document:{body:{dataset:{}},querySelector:()=>null,querySelectorAll:()=>[]},location:{pathname:'/index.html',hash:''},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)}};vm.runInNewContext(fs.readFileSync(path.join(site,'reader.js'),'utf8'),context);return JSON.parse(storage.get('math2-course-v1'));}
const imported=migrate({'math-lecture-chapters-v1':JSON.stringify({current:'domain',done:['domain','function','limit','invalid']})});
assert.equal(imported.current,'function');assert.deepEqual(imported.done,['function','limit']);assert.equal(imported.migrated,true);
const retained=migrate({'math2-course-v1':JSON.stringify({current:'eigen',done:[],migrated:true}),'math-lecture-chapters-v1':JSON.stringify({current:'domain',done:['limit']})});
assert.equal(retained.current,'eigen');assert.deepEqual(retained.done,[],'Undo must not be reversed by repeating migration');
assert.deepEqual(migrate({'math-lecture-chapters-v1':'corrupt JSON'}).done,[]);
const css=fs.readFileSync(path.join(site,'vendor/katex/katex.min.css'),'utf8');for(const m of css.matchAll(/url\(([^)]+)\)/g))assert(fs.existsSync(path.resolve(site,'vendor/katex',m[1].replace(/["']/g,''))),'Missing font '+m[1]);
for(const c of course.chapters){const doc=docs.get(c.id+'.html');assert.equal(doc.querySelectorAll('[data-lesson]').length,c.lessons.length+1);for(const l of c.lessons){const section=doc.getElementById(l.id);assert.equal(section.querySelectorAll(':scope > .example').length,2);assert.equal(section.querySelectorAll(':scope > .exercise').length,3);for(const exercise of section.querySelectorAll(':scope > .exercise'))assert.equal(exercise.querySelectorAll(':scope > .part-body > details').length,2);}}
const coverage=JSON.parse(fs.readFileSync(path.join(site,'coverage.json'),'utf8'));assert.equal(coverage.requirements.length,60);assert(coverage.requirements.every(r=>r.evidence.length&&r.evidence.every(e=>e.examples.length===2&&e.exercises.length===3)));assert.equal(coverage.lessons.length,course.chapters.reduce((n,c)=>n+c.lessons.length,0));
for(const c of course.chapters){const doc=docs.get(c.id+'.html');for(const part of doc.querySelectorAll('[data-reading-part]')){assert.equal(part.dataset.readingPart,part.id);const body=part.querySelector(':scope > .part-body'),head=part.querySelector(':scope > .part-heading');assert(body&&body.innerHTML.trim(),'Empty collapsible section '+part.id);assert(head?.querySelector('[data-part-mark]'));assert.equal(head.querySelector('[data-part-toggle]').getAttribute('aria-controls'),body.id);assert(!body.hasAttribute('hidden'),'Body must be readable without JavaScript');}}
const result={passed:true,pages:files.length,localLinksAndAssets:links,renderedFormulas:formulaCount,exerciseCards:exerciseCount,requirements:coverage.requirements.length,lessons:coverage.lessons.length,checkedAt:new Date().toISOString()};
fs.writeFileSync(path.join(root,'STRUCTURAL-QA.json'),JSON.stringify(result,null,2)+'\n');console.log(result);
