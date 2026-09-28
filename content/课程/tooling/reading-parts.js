(() => {
 'use strict';
 const prefix=window.COURSE?.storage?.parts||'math2-reading-part-v1:',parts=new Map();
 function read(id){try{const v=JSON.parse(localStorage.getItem(prefix+id));return {completed:v?.completed===true,collapsed:v?.collapsed===true};}catch{return {completed:false,collapsed:false};}}
 function notice(){const el=document.querySelector('#storage-status');if(el)el.textContent='当前浏览器无法保存小标题状态，本次仍可完成和折叠；刷新后可能恢复。';}
 function paint(p){p.body.hidden=p.state.collapsed;p.block.dataset.completed=String(p.state.completed);p.status.hidden=!p.state.completed;const toggleLabel=p.state.collapsed?'展开':'收起',markLabel=p.state.completed?'撤销完成':'完成并折叠';p.toggle.setAttribute('aria-expanded',String(!p.state.collapsed));p.toggle.setAttribute('aria-label',toggleLabel+'：'+p.title);p.toggle.title=toggleLabel;p.mark.setAttribute('aria-pressed',String(p.state.completed));p.mark.setAttribute('aria-label',markLabel+'：'+p.title);p.mark.title=markLabel;}
 function save(p){try{localStorage.setItem(prefix+p.id,JSON.stringify(p.state));}catch{notice();}paint(p);document.dispatchEvent(new CustomEvent('readingpartchange'));}
 for(const block of document.querySelectorAll('[data-reading-part]')){
  const head=block.querySelector(':scope > .part-heading'),id=block.dataset.readingPart;
  const p={id,block,state:read(id),title:head.querySelector('h3,h4').textContent,body:block.querySelector(':scope > .part-body'),toggle:head.querySelector('[data-part-toggle]'),mark:head.querySelector('[data-part-mark]'),status:head.querySelector('.part-completed')};
  parts.set(id,p);paint(p);head.querySelector('.part-actions').hidden=false;
  p.toggle.addEventListener('click',()=>{p.state.collapsed=!p.state.collapsed;save(p);});
  p.mark.addEventListener('click',()=>{p.state.completed=!p.state.completed;p.state.collapsed=p.state.completed;save(p);});
 }
 // Following an example/exercise deep link reveals it and any folded parent.
 // This temporary reveal does not erase the saved completed/collapsed choice.
 function reveal(){let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}let node=document.getElementById(id);if(!node||node.matches('[data-lesson]'))return;
  while(node){if(node.matches?.('[data-reading-part]')){const p=parts.get(node.dataset.readingPart);if(p){p.state.collapsed=false;paint(p);}}if(node.tagName==='DETAILS')node.open=true;node=node.parentElement;}
  document.dispatchEvent(new CustomEvent('readingpartchange'));
 }
 document.addEventListener('lessonchange',reveal);
 window.addEventListener('hashchange',reveal);
 window.addEventListener('storage',e=>{if(e.key?.startsWith(prefix)){const p=parts.get(e.key.slice(prefix.length));if(p){p.state=read(p.id);paint(p);document.dispatchEvent(new CustomEvent('readingpartchange'));}}});
 reveal();document.dispatchEvent(new CustomEvent('readingpartchange'));
})();
