/* Shared by the browser and the independent state-transition checks. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.StudyModel=factory();})(typeof window==='object'?window:globalThis,()=>{
 'use strict';
 const KEY='math2-study-v1',LEASE=5000;
 const empty=()=>({version:1,running:false,owner:null,lastAt:0,days:{},earned:{}});
 function normalize(raw){
  const s=empty();if(!raw||raw.version!==1)return s;
  s.running=raw.running===true;s.owner=typeof raw.owner==='string'?raw.owner:null;s.lastAt=Number.isFinite(raw.lastAt)?raw.lastAt:0;
  for(const [day,ms]of Object.entries(raw.days||{}))if(/^\d{4}-\d{2}-\d{2}$/.test(day)&&Number.isFinite(ms)&&ms>=0)s.days[day]=Math.min(ms,90000000);
  for(const [id,stamp]of Object.entries(raw.earned||{}))if(typeof stamp==='string')s.earned[id]=stamp;
  return s;
 }
 function dayKey(t){const d=new Date(t);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
 function addTime(s,from,to){
  while(from<to){const d=new Date(from),midnight=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1).getTime(),end=Math.min(to,midnight),key=dayKey(from);s.days[key]=(s.days[key]||0)+end-from;from=end;}
 }
 // Only the visible lease owner accrues time. A new document never backfills
 // the gap left by a closed tab, a sleeping computer, or a suspended timer.
 function advance(s,{now,owner,visible,action='tick'}){
  if(s.running&&s.owner===owner&&now>=s.lastAt&&now-s.lastAt<=LEASE)addTime(s,s.lastAt,now);
  if(action==='pause'){s.running=false;s.owner=null;s.lastAt=0;return s;}
  if(action==='start')s.running=true;
  if(!s.running)return s;
  const available=!s.owner||s.owner===owner||now-s.lastAt>LEASE||now<s.lastAt;
  if(visible&&available){s.owner=owner;s.lastAt=now;}
  else if(!visible&&s.owner===owner){s.owner=null;s.lastAt=0;}
  return s;
 }
 function stats(s,now){const values=Object.values(s.days);return {today:s.days[dayKey(now)]||0,total:values.reduce((a,b)=>a+b,0),days:values.filter(x=>x>=60000).length};}
 function achievements(s,done,course,now){
  const valid=new Set(course.lessons.map(l=>l.id)),read=new Set(done.filter(id=>valid.has(id))),t=stats(s,now);
  const chapters=course.chapters.filter(c=>c.lessons.length&&c.lessons.every(id=>read.has(typeof id==='string'?id:id.id))).length;
  const rows=[
   ['first-minute','开始积累','累计学习 1 分钟',t.total,60000,'time'],
   ['time-25','二十五分钟','累计学习 25 分钟',t.total,25*60000,'time'],
   ['time-120','两小时的积累','累计学习 2 小时',t.total,120*60000,'time'],
   ['time-600','十小时的坚持','累计学习 10 小时',t.total,600*60000,'time'],
   ['days-3','再次回到书桌','在 3 个不同日期各学习满 1 分钟',t.days,3,'days'],
   ['days-7','七天的足迹','在 7 个不同日期各学习满 1 分钟',t.days,7,'days'],
   ['read-1','读完第一节','将 1 个小节标记为已读',read.size,1,'read'],
   ['read-10','十个小问题','将 10 个小节标记为已读',read.size,10,'read'],
   ['chapter-1','走完一章','一章中的全部小节都标记为已读',chapters,1,'chapter'],
   ['read-all','走过全课程','全课程小节都标记为已读',read.size,valid.size,'read']
  ];
  return rows.map(([id,title,description,value,target,unit])=>({id,title,description,value,target,unit,unlocked:value>=target}));
 }
 function reconcile(s,rows,now){for(const r of rows){if(r.unlocked)s.earned[r.id]??=new Date(now).toISOString();else delete s.earned[r.id];}return s;}
 function clock(ms){const n=Math.floor(Math.max(0,ms)/1000);return [Math.floor(n/3600),Math.floor(n/60)%60,n%60].map(x=>String(x).padStart(2,'0')).join(':');}
 return {KEY,LEASE,empty,normalize,dayKey,advance,stats,achievements,reconcile,clock};
});
