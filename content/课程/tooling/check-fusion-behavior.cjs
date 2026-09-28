const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {parseHTML}=require('../../样张/tooling/node_modules/linkedom');
const M=require('./workbench-model.js');
const site=path.resolve(__dirname,'../site');
function readData(file,name){const c={window:{}};vm.runInNewContext(fs.readFileSync(file,'utf8'),c);return JSON.parse(JSON.stringify(c.window[name]));}
const data=readData(path.join(site,'study-data.js'),'STUDY_DATA');
function memory(){const map=new Map();return {map,get length(){return map.size;},key:i=>[...map.keys()][i],getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k)};}
function empty(){return {version:1,settings:{examDate:'',dailyNormalMinutes:180,dailyMinimumMinutes:60,studyDaysPerWeek:6},taskDone:{},dailyPlans:{},pointStatus:{},scores:[],errors:[]};}
const source=memory(),state=empty();state.settings.examDate='2026-12-20';state.settings.dailyNormalMinutes=120;state.planConfigured=true;
state.scores=[{id:'score-1',subject:'math2',label:'训练',score:100,maxScore:150,date:'2026-09-23'}];
state.errors=[{id:'error-1',subject:'843',label:'进制',kind:'concept',lessonId:'843-bases',date:'2026-09-23',nextReview:'2026-09-23',resolved:false}];
for(const [id,c]of Object.entries(data.courses)){
 const l=c.lessons[0].id;
 source.setItem(c.storage.reading,JSON.stringify({version:1,current:l,done:[l],migrated:true}));
 source.setItem(c.storage.study,JSON.stringify({version:1,running:true,owner:'old-tab',lastAt:123,days:{'2026-09-23':60000},earned:{'first-minute':'2026-09-23T08:00:00Z'}}));
 source.setItem(id+'-focus-v1',JSON.stringify({version:1,lessons:{[l]:{page:5,answers:{test:'我的回答'},reveal:{test:'hint'},selfEval:{test:'retry'},workedReveal:'none'}}}));
 source.setItem(c.storage.parts+l+'-question',JSON.stringify({completed:true,collapsed:true}));
}
source.setItem(M.KEY,JSON.stringify(state));
const backup=M.exportBackup(source,data,state),fresh=memory();
M.restoreBackup(fresh,data,backup);
assert.equal(JSON.parse(fresh.getItem(M.KEY)).settings.examDate,'2026-12-20');
for(const [id,c]of Object.entries(data.courses)){
 const l=c.lessons[0].id;
 assert.deepEqual(JSON.parse(fresh.getItem(c.storage.reading)).done,[l]);
 const s=JSON.parse(fresh.getItem(c.storage.study));assert.equal(s.days['2026-09-23'],60000);assert(!s.running);assert.equal(s.owner,null);assert.equal(s.lastAt,0);assert(s.earned['first-minute']);
 assert.equal(JSON.parse(fresh.getItem(id+'-focus-v1')).lessons[l].answers.test,'我的回答');
 assert.equal(JSON.parse(fresh.getItem(c.storage.parts+l+'-question')).collapsed,true);
}
const snapshot=JSON.stringify([...fresh.map]);M.restoreBackup(fresh,data,backup);assert.equal(JSON.stringify([...fresh.map]),snapshot,'reimport must be idempotent');
// Booting a fresh workbench creates a default daily plan; it must not shadow restored settings.
const booted=memory();booted.setItem(M.KEY,JSON.stringify(empty()));M.restoreBackup(booted,data,backup);assert.equal(JSON.parse(booted.getItem(M.KEY)).settings.dailyNormalMinutes,120);
// Existing undo, other records, and greater day totals survive the merge.
const existing=JSON.parse(fresh.getItem(M.KEY));existing.scores.push({...state.scores[0],id:'score-2'});existing.taskDone['read:p-algebra']=false;fresh.setItem(M.KEY,JSON.stringify(existing));
const math=data.courses.math2;fresh.setItem(math.storage.parts+'p-algebra-question',JSON.stringify({completed:false,collapsed:false}));
const study=JSON.parse(fresh.getItem(math.storage.study));study.days['2026-09-23']=120000;fresh.setItem(math.storage.study,JSON.stringify(study));
M.restoreBackup(fresh,data,backup);assert.equal(JSON.parse(fresh.getItem(M.KEY)).scores.length,2);assert.equal(JSON.parse(fresh.getItem(math.storage.study)).days['2026-09-23'],120000);assert.equal(JSON.parse(fresh.getItem(math.storage.parts+'p-algebra-question')).completed,false);
for(const mutate of [b=>b.version=99,b=>b.type='wrong',b=>b.workbench.scores[0].score=999,b=>b.workbench.errors[0].lessonId='p-algebra',b=>b.courses.math2.study.days['2026-09-23']=-1,b=>b.courses.math2.reading.done=['843-symbols']]){
 const b=structuredClone(backup);mutate(b);const before=JSON.stringify([...fresh.map]);assert.throws(()=>M.restoreBackup(fresh,data,b));assert.equal(JSON.stringify([...fresh.map]),before,'invalid backup must write nothing');
}
const old={type:backup.type,version:1,workbench:state,courseProgress:{math2:['p-algebra'],'843':['843-symbols']},courseStudy:{math2:backup.courses.math2.study}};
const migrated=memory();M.restoreBackup(migrated,data,old);assert.deepEqual(JSON.parse(migrated.getItem(math.storage.reading)).done,['p-algebra']);
// Storage failure rolls back every earlier write.
const quota=memory(),realSet=quota.setItem;let failOnce=true;quota.setItem=(k,v)=>{if(k===math.storage.study&&failOnce){failOnce=false;throw Error('Quota');}realSet(k,v);};assert.throws(()=>M.restoreBackup(quota,data,backup),/Quota/);assert.equal(quota.length,0);
const planState=empty();let plan=M.makePlan(data,planState,{},'2026-09-23');assert.equal(plan.tasks.length,6);assert.equal(plan.minutes,180);assert.deepEqual(new Set(plan.tasks.map(t=>t.subject)),new Set(['math2','843']));
assert.equal(M.visibleTasks(plan,planState,true).reduce((n,t)=>n+t.minutes,0),60);
planState.taskDone[plan.tasks[0].id]=true;const tomorrow=M.makePlan(data,planState,{},'2026-09-24');assert(!tomorrow.tasks.some(t=>t.id===plan.tasks[0].id));
planState.errors=state.errors;plan=M.makePlan(data,planState,{},'2026-09-23');assert.equal(plan.tasks[0].kind,'review');assert.equal(plan.tasks[0].subject,'843');
assert.equal(M.makePlan(data,planState,{},'2026-09-27').tasks.length,0,'Sunday is rest for six-day weeks');
planState.settings.dailyNormalMinutes=15;planState.settings.dailyMinimumMinutes=5;assert.equal(M.makePlan(data,planState,{},'2026-09-23').minutes,15);

function browserFixture(courseId,lessonId,storage=memory()){
 const dir=courseId==='843'?path.resolve(__dirname,'../../843/site'):site;
 const manifest=JSON.parse(fs.readFileSync(path.join(dir,'../course.json'),'utf8'));
 const chapter=manifest.chapters.find(c=>c.lessons.some(l=>l.id===lessonId));
 const {document,window}=parseHTML(fs.readFileSync(path.join(dir,chapter.id+'.html'),'utf8'));
 window.HTMLElement.prototype.getBoundingClientRect=()=>({width:600,height:100,top:0,left:0,right:600,bottom:100});
 window.HTMLElement.prototype.getClientRects=()=>[{}];
 Object.defineProperty(window.HTMLInputElement.prototype,'max',{configurable:true,get(){return this.getAttribute('max');}});
 let timerId=0;const timers=new Map();
 const observer=class{observe(){}disconnect(){}};
 const ctx=vm.createContext({window,document,localStorage:storage,location:new URL('http://localhost/'+(courseId==='843'?'843/':'')+chapter.id+'.html#'+lessonId),URL,URLSearchParams,Event:window.Event,CustomEvent:window.CustomEvent,IntersectionObserver:observer,MutationObserver:observer,queueMicrotask:f=>f(),setInterval:f=>{timers.set(++timerId,f);return timerId;},clearInterval:id=>timers.delete(id),requestAnimationFrame:f=>{timers.set(++timerId,f);return timerId;},cancelAnimationFrame:id=>timers.delete(id),performance:{now:()=>0},matchMedia:()=>({matches:false})});
 for(const file of ['course-data.js','ppt-data.js','diagrams.js','lesson-visuals.js'])vm.runInContext(fs.readFileSync(path.join(dir,file),'utf8'),ctx);
 window.CourseDiagrams=ctx.CourseDiagrams||window.CourseDiagrams;
 vm.runInContext(fs.readFileSync(path.join(dir,'ppt.js'),'utf8'),ctx);
 const click=selector=>{const el=document.querySelector(selector);assert(el,'missing '+selector);el.click();};
 click(`[data-ppt-lesson="${lessonId}"]`);
 return {document,window,storage,timers,click,ctx,stage:document.querySelector('#ppt-stage')};
}
for(const [subject,lesson]of [['math2','p-algebra'],['843','843-symbols']]){
 const b=browserFixture(subject,lesson);b.click('#ppt-track button:nth-child(5)');
 assert(b.document.querySelector('#ppt-worked-solution').hidden,'solution starts hidden');
 assert(!b.stage.querySelector('[data-worked="hint"]'),'no empty hint button');
 assert(!b.stage.querySelector('[data-worked="solution"]').hidden);
 b.click('[data-worked="solution"]');assert(!b.document.querySelector('#ppt-worked-solution').hidden);
 b.click('#ppt-track button:nth-child(6)');const box=b.document.querySelector('#ppt-answer');box.value='测试回答';box.dispatchEvent(new b.window.Event('input'));
 b.click('[data-reveal="hint"]');assert(!b.document.querySelector('#ppt-hint').hidden);assert(b.document.querySelector('#ppt-solution').hidden);
 b.click('[data-reveal="solution"]');b.click('[data-selfeval="retry"]');
 const reopened=browserFixture(subject,lesson,b.storage);assert.equal(reopened.document.querySelector('#ppt-answer').value,'测试回答');assert(!reopened.document.querySelector('#ppt-solution').hidden);
 reopened.click('#ppt-track button:nth-child(7)');reopened.click('.ppt-links a');assert(reopened.document.querySelector('.ppt-overlay').hidden,'recap navigation closes old overlay');
 assert(!b.storage.getItem((subject==='843'?'math2':'843')+'-focus-v1'),'focus state stays in its course');
}
for(const [subject,lesson]of [['math2','properties'],['843','843-c-control'],['math2','limit']]){
 const b=browserFixture(subject,lesson);b.click('#ppt-track button:nth-child(2)');
 if(lesson==='properties')assert(b.stage.querySelector('[data-drawing]').children.length>0,'dynamic SVG must be populated');
 const before=b.stage.innerHTML;b.click('[data-anim="step"]');assert.notEqual(b.stage.innerHTML,before,'step changes diagram');
 b.click('[data-anim="play"]');assert(b.timers.size>0,'play starts a timer');b.click('[data-anim="pause"]');assert.equal(b.timers.size,0,'pause clears timer');
 b.click('[data-anim="reset"]');
 b.click('[data-anim="play"]');b.click('#ppt-next');assert.equal(b.timers.size,0,'changing slide clears timer');
 b.click('#ppt-prev');b.click('[data-anim="play"]');b.click('#ppt-exit');assert.equal(b.timers.size,0,'exit clears timer');
}
// Run the workbench runtime too: checkbox persistence and subject filtering must
// work through its DOM event handlers, not just through the pure planning model.
function workbenchFixture(storage=memory()){
 const {document,window}=parseHTML(fs.readFileSync(path.join(site,'study.html'),'utf8'));
 Object.defineProperty(window.HTMLSelectElement.prototype,'value',{configurable:true,get(){return this.querySelector('option[selected]')?.value||this.querySelector('option')?.value||'';},set(v){this.querySelectorAll('option').forEach(o=>o.toggleAttribute('selected',o.value===v));}});
 const ctx=vm.createContext({window,document,localStorage:storage,Date:class extends Date{constructor(...args){super(...(args.length?args:['2026-09-23T04:00:00Z']));}},setInterval:()=>0,navigator:{},alert:message=>{throw Error(message);}});
 window.STUDY_DATA=data;window.WorkbenchModel=M;vm.runInContext(fs.readFileSync(path.join(site,'workbench.js'),'utf8'),ctx);
 return {document,window,storage};
}
const wb=workbenchFixture();
const tasks=()=>[...wb.document.querySelectorAll('#wb-today-list .wb-task')];assert.equal(tasks().length,6);
let box=tasks()[0].querySelector('input');box.checked=true;box.dispatchEvent(new wb.window.Event('change'));
const refreshed=workbenchFixture(wb.storage);assert.equal(refreshed.document.querySelector('#wb-today-list input').checked,true,'task check survives reload');
box.checked=false;box.dispatchEvent(new wb.window.Event('change'));assert.equal(JSON.parse(wb.storage.getItem(M.KEY)).taskDone['read:p-algebra'],false,'task undo persists');
const selector=wb.document.querySelector('#wb-error-subject');selector.value='843';selector.dispatchEvent(new wb.window.Event('change'));
assert([...wb.document.querySelectorAll('#wb-error-lesson option')].every(o=>!o.value||o.value.startsWith('843-')));
selector.value='politics';selector.dispatchEvent(new wb.window.Event('change'));assert(wb.document.querySelector('#wb-error-lesson').disabled);
const minimal=wb.document.querySelector('#wb-minimum-mode');minimal.checked=true;minimal.dispatchEvent(new wb.window.Event('change'));assert.equal(tasks().length,2);
assert.deepEqual(new Set(tasks().map(t=>t.querySelector('.muted').textContent.split(' · ')[0])),new Set(['数学二','843 专业课']));
console.log('PASS fusion behavior: two-course backup/merge/v1/rollback; dated budgeted tasks and DOM undo/filtering; PPT reveal, persistence, navigation, diagrams, cleanup');
