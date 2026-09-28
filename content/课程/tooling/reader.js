(() => {
 'use strict';
 const data=window.COURSE, key=data.storage?.reading||'math2-course-v1', byId=new Map(data.lessons.map(l=>[l.id,l]));
 const valid=new Set(data.lessons.map(l=>l.id));
 const trainingIds=data.chapters.map(c=>'training-'+c.id), validCurrent=new Set([...valid,...trainingIds]);
 let saved={version:1,current:null,done:[],migrated:false};
 function readJSON(name){try{return JSON.parse(localStorage.getItem(name));}catch{return null;}}
 const old=readJSON(key);if(old&&typeof old==='object'){saved.current=validCurrent.has(old.current)?old.current:null;saved.done=Array.isArray(old.done)?[...new Set(old.done.filter(x=>valid.has(x)))]:[];saved.migrated=old.migrated===true;}
 function latestDone(){const latest=readJSON(key);return latest?.migrated&&Array.isArray(latest.done)?[...new Set(latest.done.filter(id=>valid.has(id)))]:saved.done;}
 function persist(changedDone=false){try{if(!changedDone)saved.done=latestDone();localStorage.setItem(key,JSON.stringify(saved));}catch{const el=document.querySelector('#storage-status');if(el)el.textContent='当前浏览器无法保存进度，仍可正常阅读与练习。';}}
 if(!saved.migrated){const previous=key==='math2-course-v1'?readJSON('math-lecture-chapters-v1'):null;if(previous&&typeof previous==='object'){
  const map=id=>data.legacy[id]?.split('#')[1];const current=map(previous.current);if(valid.has(current)&&!saved.current)saved.current=current;
  if(Array.isArray(previous.done))saved.done=[...new Set([...saved.done,...previous.done.map(map).filter(id=>valid.has(id))])];
 }saved.migrated=true;persist();}
 const hash=()=>{try{return decodeURIComponent(location.hash.slice(1));}catch{return'';}};
 const chapter=document.body.dataset.courseChapter;
 if(!chapter&&['/','/index.html'].includes(location.pathname)&&data.legacy[hash()]){location.replace(data.legacy[hash()]);return;}
 function hrefFor(id){if(byId.has(id))return byId.get(id).url;if(id?.startsWith('training-'))return id.slice(9)+'.html#'+id;return null;}
 const resume=document.querySelector('#resume');if(resume&&saved.current){resume.href=hrefFor(saved.current);resume.hidden=false;resume.textContent='继续上次：'+(byId.get(saved.current)?.title||'章末训练')+' →';}
 const search=document.querySelector('#search');if(search){const items=[...document.querySelectorAll('[data-search]')],count=document.querySelector('#search-count');const run=()=>{const words=search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);let n=0;for(const item of items){const match=words.every(w=>item.dataset.search.toLowerCase().includes(w));item.hidden=!match;n+=Number(match);}count.textContent=`找到 ${n} 个小节`;document.querySelector('#no-results').hidden=n!==0;const url=new URL(location.href);if(search.value.trim())url.searchParams.set('q',search.value.trim());else url.searchParams.delete('q');history.replaceState(history.state,'',url);};search.value=new URL(location.href).searchParams.get('q')||'';search.addEventListener('input',run);run();}
 const sections=[...document.querySelectorAll('[data-lesson]')];if(!sections.length)return;
 const ids=sections.map(s=>s.id),mode=document.querySelector('#reading-mode');let active=ids[0],all=false;
 const from=new URL(location.href).searchParams.get('from'),back=document.querySelector('#return-link');if(from&&validCurrent.has(from)&&back){const a=document.createElement('a');a.href=hrefFor(from);a.textContent='← 回到刚才的问题：'+(byId.get(from)?.title||'章末真题');back.replaceChildren(a);}
 function mathFit(){document.querySelectorAll('.math-inline').forEach(el=>{if(!el.getClientRects().length)return;const parent=el.parentElement,math=el.querySelector('.katex');if(!math)return;el.classList.toggle('math-scroll',math.getBoundingClientRect().width>parent.clientWidth-8);});document.querySelectorAll('.formula,.math-scroll,.table-wrap').forEach(el=>{if(el.scrollWidth>el.clientWidth+1){el.tabIndex=0;el.setAttribute('role','region');el.setAttribute('aria-label','可横向滚动的公式或表格');}});}
 function progress(){const chapterLessons=data.chapters.find(c=>c.id===chapter)?.lessons||[];document.querySelector('#chapter-progress').textContent=`本章已读 ${chapterLessons.filter(id=>saved.done.includes(id)).length} / ${chapterLessons.length} · 可撤销`;
 document.querySelectorAll('[data-mark]').forEach(b=>{const done=saved.done.includes(b.dataset.mark);b.textContent=done?'已读 · 撤销标记':'标记本节已读';b.setAttribute('aria-pressed',String(done));});
 document.querySelectorAll('[data-lesson-link]').forEach(a=>{a.setAttribute('aria-current',String(a.dataset.lessonLink===active));a.dataset.read=String(saved.done.includes(a.dataset.lessonLink));});}
 function resolve(id){const target=document.getElementById(id);return target?.closest('[data-lesson]')||sections.find(s=>s.id===id);}
 function show(scroll){all=new URL(location.href).searchParams.get('view')==='all';let requested=hash(),section=resolve(requested);if(!section&&data.legacy[requested]){const url=data.legacy[requested];if(!url.startsWith(chapter+'.html')){location.replace(url);return;}requested=url.split('#')[1];section=resolve(requested);}
 if(!section){const remembered=ids.includes(saved.current)?saved.current:ids[0];section=resolve(remembered);requested=section.id;}
 active=section.id;sections.forEach(s=>s.hidden=!all&&s!==section);mode.hidden=false;mode.setAttribute('aria-pressed',String(all));mode.textContent=all?'返回分节阅读':'查看本章全文';saved.current=active;persist();progress();
 const target=document.getElementById(requested)||section;let p=target.parentElement;while(p&&p!==section){if(p.tagName==='DETAILS')p.open=true;p=p.parentElement;}
 mathFit();if(scroll)requestAnimationFrame(()=>{target.scrollIntoView({block:'start'});const heading=target.querySelector('h2[tabindex]');if(heading)heading.focus({preventScroll:true});});
 document.dispatchEvent(new CustomEvent('lessonchange',{detail:{active,all}}));}
 mode.addEventListener('click',()=>{const url=new URL(location.href);if(all)url.searchParams.delete('view');else url.searchParams.set('view','all');if(!url.hash)url.hash=active;history.pushState({},'',url);show(false);});
 document.querySelectorAll('[data-mark]').forEach(b=>b.addEventListener('click',()=>{saved.done=latestDone();const id=b.dataset.mark;if(saved.done.includes(id))saved.done=saved.done.filter(x=>x!==id);else saved.done.push(id);persist(true);progress();document.dispatchEvent(new CustomEvent('readingprogress'));}));
 window.addEventListener('storage',e=>{if(e.key===key){saved.done=latestDone();progress();}});
 window.addEventListener('hashchange',()=>show(true));window.addEventListener('popstate',()=>show(true));window.addEventListener('resize',mathFit);
 document.addEventListener('toggle',mathFit,true);document.fonts?.ready.then(mathFit);
 document.addEventListener('readingpartchange',mathFit);
 document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;const url=new URL(a.href,location.href);if(url.origin===location.origin&&url.pathname===location.pathname&&url.hash===location.hash){show(true);}});
 show(Boolean(location.hash));
 // In full-chapter mode the visible heading, rather than the last clicked link,
 // becomes the resume location. Reading is never marked automatically.
 const observer=new IntersectionObserver(entries=>{if(!all)return;const entry=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(entry){active=entry.target.closest('[data-lesson]').id;saved.current=active;persist();progress();}},{rootMargin:'0px 0px -65% 0px',threshold:0});sections.forEach(s=>{const h=s.querySelector('h2');if(h)observer.observe(h);});
})();
