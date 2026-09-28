(() => {
  const chapters=[...document.querySelectorAll('[data-chapter]')];
  const key='math-lecture-chapters-v1';
  const ids=chapters.map(s=>s.id);
  let state={current:ids[0],focused:true,done:[]};
  let saved=false;
  try {const old=JSON.parse(localStorage.getItem(key));if(old && ids.includes(old.current)){state={current:old.current,focused:old.focused!==false,done:Array.isArray(old.done)?[...new Set(old.done.filter(id=>ids.includes(id)))]:[]};saved=true;}}catch{}
  function persist(){try{localStorage.setItem(key,JSON.stringify(state));}catch{document.querySelector('#chapter-storage').textContent='当前浏览器无法保存进度，仍可正常阅读。';}}
  function mathAccess(){
    document.querySelectorAll('.math-inline').forEach(formula=>{
      if(!formula.getClientRects().length)return;
      const parent=formula.closest('p, td, th, li, h3, summary')||formula.parentElement;
      const style=getComputedStyle(parent),available=parent.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight);
      const math=formula.querySelector('.katex');
      formula.classList.toggle('math-scroll',!!math && math.getBoundingClientRect().width>available-4);
    });
    document.querySelectorAll('.formula, .math-inline').forEach(formula=>{
      if(!formula.getClientRects().length)return;
      if(formula.classList.contains('math-scroll')||formula.scrollWidth>formula.clientWidth+2){formula.setAttribute('tabindex','0');formula.setAttribute('role','region');formula.setAttribute('aria-label','数学公式，可左右滚动查看');}
      else{formula.removeAttribute('tabindex');formula.removeAttribute('role');formula.removeAttribute('aria-label');}
    });
  }
  function navigation(){
    const current=document.getElementById(state.current);
    document.querySelectorAll('[data-chapter-link]').forEach(a=>{
      const id=a.dataset.chapterLink;
      if(id===state.current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
      a.classList.toggle('is-read',state.done.includes(id));
      a.setAttribute('aria-label',`${document.querySelector(`#title-${id}`).textContent}${state.done.includes(id)?'，已读':''}`);
    });
    document.querySelectorAll('.chapter-group').forEach(g=>{g.open=g.dataset.group===current.dataset.group;});
    const basics=chapters.filter(s=>s.dataset.advanced==='false');
    document.querySelector('#chapter-progress').textContent=`基础已读 ${basics.filter(s=>state.done.includes(s.id)).length} / ${basics.length} 节`;
  }
  function render(){
    document.body.classList.toggle('chapter-focus',state.focused);
    chapters.forEach(s=>s.hidden=state.focused && s.id!==state.current);
    const mode=document.querySelector('#chapter-mode');mode.textContent=state.focused?'分节阅读 · 查看全文':'全文阅读 · 切回分节';mode.setAttribute('aria-pressed',String(state.focused));
    navigation();requestAnimationFrame(mathAccess);
  }
  function targetFor(hash){let id;try{id=decodeURIComponent(hash.replace(/^#/,''));}catch{return null;}const target=document.getElementById(id);return target?.closest('[data-chapter]')?target:null;}
  function go(target,{scroll=true,historyChange=true}={}){
    const section=target.closest('[data-chapter]');state.current=section.id;render();
    let parent=target.parentElement;while(parent && parent!==section){if(parent.tagName==='DETAILS')parent.open=true;parent=parent.parentElement;}
    if(historyChange && location.hash!==`#${target.id}`)history.pushState(null,'',`#${target.id}`);
    persist();
    if(scroll){const focus=target===section?section.querySelector('h2'):target;if(!focus.hasAttribute('tabindex'))focus.tabIndex=-1;focus.focus({preventScroll:true});target.scrollIntoView({block:'start',behavior:'instant'});}
    requestAnimationFrame(mathAccess);
  }
  document.querySelector('.chapter-reader-tools').hidden=false;
  document.addEventListener('click',event=>{
    const a=event.target.closest('a[href^="#"]');if(!a||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button!==0)return;
    const target=targetFor(a.hash);if(target){event.preventDefault();go(target);}
  });
  document.querySelector('#chapter-mode').addEventListener('click',()=>{state.focused=!state.focused;go(document.getElementById(state.current),{historyChange:false});});
  document.querySelectorAll('[data-complete]').forEach(button=>button.addEventListener('click',()=>{
    if(!state.done.includes(button.dataset.complete))state.done.push(button.dataset.complete);
    if(button.dataset.next)go(document.getElementById(button.dataset.next));else{navigation();persist();button.textContent='这节已标记为已读';}
  }));
  window.addEventListener('hashchange',()=>{const t=targetFor(location.hash);if(t)go(t,{historyChange:false});});
  document.querySelectorAll('article details').forEach(d=>d.addEventListener('toggle',mathAccess));
  window.addEventListener('resize',mathAccess);
  let scheduled=false;
  window.addEventListener('scroll',()=>{
    if(state.focused||scheduled)return;scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;if(state.focused)return;const current=[...chapters].reverse().find(s=>s.getBoundingClientRect().top<=180)||chapters[0];if(current.id!==state.current){state.current=current.id;navigation();persist();}});
  },{passive:true});
  const initial=targetFor(location.hash);
  if(initial)state.current=initial.closest('[data-chapter]').id;
  render();persist();
  if(saved && !initial){const note=document.querySelector('#chapter-resume');note.hidden=false;note.textContent=`接着上次的小节：${document.querySelector(`#title-${state.current}`).textContent}。${document.getElementById(state.current).querySelector('.chapter-goal').textContent.replace('这一节的目标','')}`;}
  if(initial)go(initial,{scroll:false,historyChange:false});
  if(document.fonts)document.fonts.ready.then(mathAccess);
})();
