/* Pure planning and backup operations, shared by browser and behavior checks. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.WorkbenchModel=factory();})(typeof window==='object'?window:globalThis,()=>{
 'use strict';
 const KEY='workbench-v1',TYPE='imdt-study-workbench-backup';
 const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
 const validDate=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&!Number.isNaN(Date.parse(x))&&new Date(x).toISOString().slice(0,10)===x;
 const assert=(ok,msg)=>{if(!ok)throw Error(msg);};
 const read=(storage,key)=>{const s=storage.getItem(key);return s===null?null:JSON.parse(s);};
 const safeMap=(value,check,name)=>{assert(object(value),name+' 必须是对象');for(const [k,v]of Object.entries(value)){assert(!['__proto__','constructor','prototype'].includes(k)&&check(v,k),name+' 中有无效记录');}return value;};
 function validateWorkbench(wb,data){
  assert(object(wb)&&wb.version===1,'工作台版本不支持');
  const s=wb.settings;assert(object(s),'缺少计划设置');
  assert(s.examDate===''||validDate(s.examDate),'考试日期无效');
  assert(Number.isFinite(s.dailyNormalMinutes)&&s.dailyNormalMinutes>=15&&s.dailyNormalMinutes<=720,'正常时长应为15至720分钟');
  assert(Number.isFinite(s.dailyMinimumMinutes)&&s.dailyMinimumMinutes>=5&&s.dailyMinimumMinutes<=s.dailyNormalMinutes,'最低时长不能超过正常时长');
  assert(Number.isInteger(s.studyDaysPerWeek)&&s.studyDaysPerWeek>=1&&s.studyDaysPerWeek<=7,'每周学习天数应为1至7');
  safeMap(wb.taskDone||{},v=>typeof v==='boolean','任务状态');
  assert(Array.isArray(wb.scores)&&Array.isArray(wb.errors),'成绩与错题必须是数组');
  for(const s of wb.scores)assert(object(s)&&typeof s.id==='string'&&s.id&&data.subjects[s.subject]&&typeof s.label==='string'&&Number.isFinite(s.score)&&Number.isFinite(s.maxScore)&&s.maxScore>0&&s.score>=0&&s.score<=s.maxScore&&validDate(s.date),'成绩记录无效');
  for(const e of wb.errors){
   assert(object(e)&&typeof e.id==='string'&&e.id&&data.subjects[e.subject]&&typeof e.label==='string'&&typeof e.resolved==='boolean'&&validDate(e.date)&&validDate(e.nextReview)&&['concept','calculation','method','careless','expression'].includes(e.kind),'错题记录无效');
   assert(!e.lessonId||data.courses[e.subject]?.lessons.some(l=>l.id===e.lessonId),'错题关联的小节与科目不符');
  }
  safeMap(wb.pointStatus||{},(v,k)=>['todo','learning','review','mastered'].includes(v)&&data.points.some(p=>p.id===k&&p.bound),'知识点状态');
  safeMap(wb.dailyPlans||{},(p,k)=>validDate(k)&&object(p)&&Array.isArray(p.tasks)&&p.tasks.every(t=>object(t)&&typeof t.id==='string'&&['unread','review'].includes(t.kind)&&Number.isFinite(t.minutes)&&t.minutes>0&&t.minutes<=720&&typeof t.label==='string'&&(!t.lessonId||data.courses[t.subject]?.lessons.some(l=>l.id===t.lessonId))),'每日计划');
  return wb;
 }
 function validateCourse(value,course){
  assert(object(value),'课程备份无效');
  const ids=new Set(course.lessons.map(l=>l.id));
  if(value.reading){const r=value.reading;assert(object(r)&&r.version===1&&Array.isArray(r.done)&&r.done.every(id=>ids.has(id)),'已读记录无效');assert(!r.current||ids.has(r.current)||course.chapters.some(c=>'training-'+c.id===r.current),'阅读位置无效');}
  if(value.study){const s=value.study;assert(object(s)&&s.version===1,'计时版本无效');safeMap(s.days,(v,k)=>validDate(k)&&Number.isFinite(v)&&v>=0&&v<=90000000,'计时日期');safeMap(s.earned,v=>typeof v==='string'&&!Number.isNaN(Date.parse(v)),'成就');}
  if(value.focus){const f=value.focus;assert(object(f)&&f.version===1,'课件记录版本无效');safeMap(f.lessons,(v,k)=>{
   if(!ids.has(k)||!object(v)||!Number.isInteger(v.page)||v.page<0||v.page>6)return false;
   safeMap(v.answers||{},x=>typeof x==='string','课件回答');safeMap(v.reveal||{},x=>['none','hint','solution'].includes(x),'解析展开');safeMap(v.selfEval||{},x=>['ok','retry','unknown'].includes(x),'课件自评');return true;
  },'课件小节');}
  safeMap(value.parts||{},(v,k)=>object(v)&&typeof v.completed==='boolean'&&typeof v.collapsed==='boolean'&&/^[a-zA-Z0-9_-]+$/.test(k),'小标题状态');
  return value;
 }
 function exportBackup(storage,data,state,now=new Date().toISOString()){
  const courses={};
  for(const [id,c]of Object.entries(data.courses)){
   const parts={};for(let i=0;i<storage.length;i++){const key=storage.key(i);if(key.startsWith(c.storage.parts))parts[key.slice(c.storage.parts.length)]=read(storage,key);}
   courses[id]={reading:read(storage,c.storage.reading),study:read(storage,c.storage.study),focus:read(storage,c.storage.focus||id+'-focus-v1'),parts};
  }
  return {type:TYPE,version:2,exportedAt:now,workbench:state,courses};
 }
 const mergeRows=(old,extra)=>[...new Map([...(extra||[]),...(old||[])].map(x=>[x.id,x])).values()];
 function mergeWorkbench(old,incoming){
  if(!old)return incoming;
  const configured=old.planConfigured||old.settings.examDate||old.settings.dailyNormalMinutes!==180||old.settings.dailyMinimumMinutes!==60||old.settings.studyDaysPerWeek!==6;
  const active=configured||Object.values(old.taskDone||{}).some(Boolean);
  return {...incoming,...old,settings:configured?old.settings:incoming.settings,planConfigured:Boolean(configured||incoming.planConfigured),taskDone:{...incoming.taskDone,...old.taskDone},pointStatus:{...incoming.pointStatus,...old.pointStatus},dailyPlans:active?{...incoming.dailyPlans,...old.dailyPlans}:incoming.dailyPlans||{},scores:mergeRows(old.scores,incoming.scores),errors:mergeRows(old.errors,incoming.errors)};
 }
 function prepareRestore(storage,data,backup){
  assert(object(backup)&&backup.type===TYPE,'备份类型不匹配');assert([1,2].includes(backup.version),'备份版本不支持');
  validateWorkbench(backup.workbench,data);
  const courses=backup.version===2?backup.courses:Object.fromEntries(Object.entries(data.courses).map(([id])=>[id,{reading:backup.courseProgress?.[id]?{version:1,done:backup.courseProgress[id],current:null,migrated:true}:null,study:backup.courseStudy?.[id]||null,parts:{}}]));
  assert(object(courses),'缺少课程记录');
  const writes=new Map(),state=mergeWorkbench(read(storage,KEY),backup.workbench);
  writes.set(KEY,JSON.stringify(state));
  for(const [id,c]of Object.entries(data.courses)){
   const incoming=validateCourse(courses[id]||{},c);
   if(incoming.reading){const old=read(storage,c.storage.reading)||{};writes.set(c.storage.reading,JSON.stringify({...incoming.reading,...old,version:1,migrated:true,done:[...new Set([...(old.done||[]),...incoming.reading.done])]}));}
   if(incoming.study){const old=read(storage,c.storage.study)||{},s=incoming.study,days={...s.days};for(const [d,ms]of Object.entries(old.days||{}))days[d]=Math.max(days[d]||0,ms);writes.set(c.storage.study,JSON.stringify({version:1,running:false,owner:null,lastAt:0,days,earned:{...s.earned,...old.earned}}));}
   if(incoming.focus){const key=c.storage.focus||id+'-focus-v1',old=read(storage,key)||{};writes.set(key,JSON.stringify({version:1,lessons:{...incoming.focus.lessons,...old.lessons}}));}
   for(const [part,s]of Object.entries(incoming.parts||{})){const key=c.storage.parts+part;if(storage.getItem(key)===null)writes.set(key,JSON.stringify(s));}
  }
  return {writes,state};
 }
 // Validate first; roll back writes if storage is full. Caller holds the timer lock.
 function restoreBackup(storage,data,backup){
  const {writes,state}=prepareRestore(storage,data,backup),before=new Map([...writes.keys()].map(k=>[k,storage.getItem(k)]));
  try{for(const [k,v]of writes)storage.setItem(k,v);}catch(error){for(const [k,v]of before){if(v===null)storage.removeItem(k);else storage.setItem(k,v);}throw error;}
  return state;
 }
 function makePlan(data,state,doneByCourse,date){
  const weekday=(new Date(date+'T12:00:00').getDay()+6)%7;
  const rest=weekday>=state.settings.studyDaysPerWeek;
  if(rest)return {rest:true,tasks:[],minutes:0};
  const tasks=[],budget=state.settings.dailyNormalMinutes;let remaining=budget;
  const add=(t,estimate)=>{if(remaining<=0)return;const minutes=Math.min(estimate,remaining);tasks.push({...t,minutes});remaining-=minutes;};
  const due=state.errors.filter(e=>!e.resolved&&e.nextReview<=date&&!state.taskDone['err:'+e.id+':'+e.nextReview]).sort((a,b)=>a.nextReview.localeCompare(b.nextReview));
  for(const e of due){const l=data.courses[e.subject]?.lessons.find(l=>l.id===e.lessonId);add({id:'err:'+e.id+':'+e.nextReview,kind:'review',subject:e.subject,label:'回炉 · '+e.label,lessonId:l?.id||'',url:l?.url||'',errorId:e.id},15);}
  const order=Number(date.replaceAll('-',''))%2?['math2','843']:['843','math2'];
  const queues=Object.fromEntries(order.map(id=>[id,data.courses[id].lessons.filter(l=>!(doneByCourse[id]||[]).includes(l.id)&&!state.taskDone['read:'+l.id])]));
  while(remaining>0&&order.some(id=>queues[id].length))for(const id of order){if(remaining<=0)break;const l=queues[id].shift();if(l)add({id:'read:'+l.id,kind:'unread',subject:id,label:'学习 · '+l.title,lessonId:l.id,url:l.url},30);}
  return {rest:false,tasks,minutes:budget-remaining};
 }
 function visibleTasks(plan,state,minimum=false){
  if(!minimum)return plan.tasks;
  let remaining=state.settings.dailyMinimumMinutes;
  return plan.tasks.flatMap(t=>{if(remaining<=0)return [];const minutes=Math.min(t.minutes,remaining);remaining-=minutes;return [{...t,minutes,partial:minutes<t.minutes}];});
 }
 return {KEY,exportBackup,prepareRestore,restoreBackup,makePlan,visibleTasks,validateWorkbench};
});
