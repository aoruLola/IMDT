(()=>{'use strict';const controllers=new Map();function init(root=document){for(const el of root.querySelectorAll('[data-steps]')){if(controllers.has(el))continue;const frames=[...el.querySelectorAll('[data-frame]')],captions=[...el.querySelectorAll('[data-caption]')],play=el.querySelector('[data-step-action="play"]');let index=0,timer=null;
function stop(){clearInterval(timer);timer=null;play.textContent='播放';play.setAttribute('aria-pressed','false');}
function hidden(){return document.hidden||el.closest('[hidden]')||el.querySelector(':scope > .part-body')?.hidden;}
function paint(){frames.forEach((f,i)=>f.toggleAttribute('hidden',i!==index));captions.forEach((f,i)=>f.hidden=i!==index);el.querySelector('[data-step-count]').textContent=`${index+1} / ${frames.length}`;}
function next(){if(index<frames.length-1){index++;paint();}if(index===frames.length-1)stop();}
el.addEventListener('click',e=>{const action=e.target.closest('[data-step-action]')?.dataset.stepAction;if(!action)return;if(action==='reset'){stop();index=0;paint();}if(action==='next'){stop();next();}if(action==='play'){if(timer){stop();return;}if(index===frames.length-1){index=0;paint();}play.textContent='暂停';play.setAttribute('aria-pressed','true');timer=setInterval(()=>{if(hidden())stop();else next();},1800);}});
controllers.set(el,{stop,hidden});paint();
}}
function stop(root=document){for(const [el,c]of controllers)if(root.contains(el))c.stop();}
function destroy(root){for(const [el,c]of controllers)if(root.contains(el)){c.stop();controllers.delete(el);}}
new MutationObserver(()=>{for(const c of controllers.values())if(c.hidden())c.stop();}).observe(document.body,{subtree:true,attributes:true,attributeFilter:['hidden']});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});window.addEventListener('pagehide',()=>stop());
globalThis.CourseDiagrams={init,stop,destroy};init();
})();
