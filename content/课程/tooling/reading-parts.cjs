// Stable section identities are semantic, never based on the heading's position.
const {parseHTML}=require('../../样张/tooling/node_modules/linkedom');
const names={'从一个问题开始':'question','把这件事讲清楚':'explain','为什么成立 · 关键推导':'derivation','怎样做 · 分步推演':'derivation','停一下，自己试一试':'practice-intro','继续读 · 原版讲义中的解释与练习':'further','补充解释与练习':'further','带走这一句':'recap'};
module.exports=function readingParts(html){
 const {document}=parseHTML(`<html><body>${html}</body></html>`);
 const candidates=[...document.querySelectorAll('[data-lesson] > .block,[data-lesson] > .example,[data-lesson] > .exercise,[data-lesson] > .review,[data-lesson] > .visual,.chapter-training > .block > .exercise')];
 for(const block of candidates){
  const lesson=block.closest('[data-lesson]'),visual=block.classList.contains('visual');
  let heading=block.querySelector(':scope > h3,:scope > h4,:scope > strong');
  if(!heading&&visual){heading=document.createElement('h3');heading.textContent='图示 · 动手观察';block.prepend(heading);}
  if(!heading)continue;
  const name=heading.textContent,exam=block.querySelector(':scope > .exercise');
  const id=block.id||(visual?lesson.id+'-visual':exam?exam.id+'-context':names[name]?lesson.id+'-'+names[name]:null);
  if(!id)throw Error('Missing stable reading-part identity: '+name);
  block.id=id;block.setAttribute('data-reading-part',id);
  if(heading.tagName==='STRONG'){const h=document.createElement('h3');h.textContent=heading.textContent;heading.replaceWith(h);heading=h;}
  const head=document.createElement('div'),body=document.createElement('div'),actions=document.createElement('div');
  head.className='part-heading';body.className='part-body';body.id=id+'-body';actions.className='part-actions';actions.hidden=true;
  const status=document.createElement('span');status.className='part-completed';status.textContent='✓ 已完成';status.hidden=true;
  const toggle=document.createElement('button');toggle.type='button';toggle.setAttribute('data-part-toggle','');toggle.setAttribute('aria-controls',body.id);toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','收起：'+name);toggle.setAttribute('title','收起');toggle.innerHTML='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const mark=document.createElement('button');mark.type='button';mark.setAttribute('data-part-mark','');mark.setAttribute('aria-pressed','false');mark.setAttribute('aria-label','完成并折叠：'+name);mark.setAttribute('title','完成并折叠');mark.innerHTML='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path class="completion-check" d="m8 12 3 3 5-6"/></svg>';
  heading.remove();while(block.firstChild)body.append(block.firstChild);
  actions.append(status,toggle,mark);head.append(heading,actions);block.append(head,body);
 }
 return document.body.innerHTML;
};
