(() => {
 'use strict';
 const M=window.StudyModel,course=window.COURSE,dock=document.querySelector('#study-dock');if(!dock||!M||!course)return;
 const key=course.storage?.study||M.KEY,readingKey=course.storage?.reading||'math2-course-v1',coordinator='course-study-owner-v1';
 const owner=crypto.randomUUID(),button=document.querySelector('#study-toggle'),dialog=document.querySelector('#study-dialog'),status=document.querySelector('#study-status');
 document.querySelector('#study-title').textContent=(course.courseId==='843'?'843':'数学二')+' / 学习积累';
 let state=M.empty(),busy=false,failed=false;
 function fail(){failed=true;button.disabled=true;status.textContent='计时无法保存';document.querySelector('#study-storage-note').textContent='当前浏览器无法读取或保存学习记录。请允许本站使用本地存储后刷新；课程仍可正常阅读。';}
 function load(){const raw=localStorage.getItem(key);if(!raw)return M.empty();const parsed=JSON.parse(raw);if(parsed?.version!==1)throw Error('Unsupported study record');return M.normalize(parsed);}
 function readDone(){try{const r=JSON.parse(localStorage.getItem(readingKey));return Array.isArray(r?.done)?r.done:[];}catch{return[];}}
 const tiles=new Map();
 for(const row of M.achievements(state,[],course,Date.now())){
  const li=document.createElement('li');li.className='achievement';
  const heading=document.createElement('h3'),label=document.createElement('span'),desc=document.createElement('p'),progress=document.createElement('progress'),detail=document.createElement('p');
  heading.textContent=row.title;label.className='achievement-state';desc.textContent=row.description;detail.className='muted';progress.max=row.target;progress.setAttribute('aria-label',row.description);
  li.append(label,heading,desc,progress,detail);document.querySelector('#achievement-list').append(li);tiles.set(row.id,{li,label,progress,detail});
 }
 function render(){
  const now=Date.now(),t=M.stats(state,now),rows=M.achievements(state,readDone(),course,now),unlocked=rows.filter(r=>r.unlocked).length;
  document.querySelector('#study-time').textContent=M.clock(t.today);
  document.querySelector('#study-today').textContent=M.clock(t.today);document.querySelector('#study-total').textContent=M.clock(t.total);document.querySelector('#study-days').textContent=t.days+' 天';
  document.querySelector('#study-achievement-count').textContent=`已达成 ${unlocked} / ${rows.length}`;
  button.textContent=state.running?'暂停计时':'开始计时';button.setAttribute('aria-pressed',String(state.running));
  if(!failed)status.textContent=!state.running?'已暂停':document.visibilityState!=='visible'?'离开页面 · 暂停累计':state.owner===owner?'计时中':'已开启 · 等待当前页面接续';
  for(const r of rows){const tile=tiles.get(r.id);tile.li.dataset.unlocked=String(r.unlocked);tile.label.textContent=r.unlocked?'已达成':'积累中';tile.progress.value=Math.min(r.value,r.target);const value=r.unit==='time'?Math.floor(r.value/60000):r.value,target=r.unit==='time'?r.target/60000:r.target,unit={time:'分钟',days:'天',read:'节',chapter:'章'}[r.unit];tile.detail.textContent=r.unlocked?`达成于 ${M.dayKey(state.earned[r.id]?Date.parse(state.earned[r.id]):now)}`:`${Math.min(value,target)} / ${target} ${unit}`;}
 }
 async function update(action='tick'){
  if(failed||busy)return;busy=true;button.disabled=true;
  try{
   await navigator.locks.request('course-study-record',()=>{
    const fresh=load(),before=JSON.stringify(fresh),now=Date.now();
    const focused=document.visibilityState==='visible'&&document.hasFocus();
    let lease=JSON.parse(localStorage.getItem(coordinator)||'null');
    if(focused&&(action==='start'||fresh.running)){
     if(lease&&lease.owner!==owner&&['math2-study-v1','843-study-v1'].includes(lease.key)){
      const previous=M.normalize(JSON.parse(localStorage.getItem(lease.key)||'null'));
      // A replaced/closed document cannot prove when it lost focus. Never
      // backfill its last heartbeat gap; its own blur event may flush it first.
      previous.owner=null;previous.lastAt=0;
      localStorage.setItem(lease.key,JSON.stringify(previous));
      if(lease.key===key)Object.assign(fresh,previous);
     }
     lease={key,owner};localStorage.setItem(coordinator,JSON.stringify(lease));
    }
    M.advance(fresh,{now,owner,visible:focused&&lease?.owner===owner,action});
    M.reconcile(fresh,M.achievements(fresh,readDone(),course,now),now);
    if(JSON.stringify(fresh)!==before)localStorage.setItem(key,JSON.stringify(fresh));
    state=fresh;
   });
  }catch{fail();}finally{busy=false;button.disabled=failed;render();}
 }
 button.addEventListener('click',()=>update(state.running?'pause':'start'));
 document.querySelector('#study-open').addEventListener('click',()=>{render();dialog.showModal();});
 document.querySelector('#study-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 window.addEventListener('storage',e=>{if(e.key===key||e.key===readingKey){try{state=load();render();}catch{fail();}}});
 document.addEventListener('readingprogress',()=>update());
 document.addEventListener('visibilitychange',()=>update());
 window.addEventListener('pageshow',()=>update());
 window.addEventListener('focus',()=>update());
 window.addEventListener('blur',()=>update());
 if(!navigator.locks){fail();document.querySelector('#study-storage-note').textContent='当前浏览器不支持安全的多标签页计时。请使用新版浏览器打开本地预览。';}
 else{try{state=load();}catch{fail();}update();setInterval(()=>{if(document.visibilityState==='visible')update();},1000);}
 dock.hidden=false;render();
})();
