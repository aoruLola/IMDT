const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {parseHTML}=require('../../样张/tooling/node_modules/linkedom');
const figure=require('./diagrams.cjs'),copy=require('./diagram-copy.cjs');
const script=fs.readFileSync(path.join(__dirname,'diagrams.js'),'utf8');
let frames=0;
for(const [kind,texts]of Object.entries(copy)){
 const {document,window}=parseHTML('<html><body>'+figure(kind)+'</body></html>');
 const slider=document.querySelector('input'),svg=document.querySelector('svg.chart');
 slider.value='0';slider.max=slider.getAttribute('max');
 let tick=null;
 vm.runInNewContext(script,{document,setInterval:callback=>{tick=callback;return 1;},clearInterval:()=>{tick=null;},IntersectionObserver:class{observe(){}}});
 const click=selector=>document.querySelector(selector).dispatchEvent(new window.Event('click'));
 for(let n=0;n<texts.length;n++){
  const readout=document.querySelector('[data-readout]');
  const expected=document.querySelector(`template[data-frame="${n}"]`).innerHTML;
  assert.equal(readout.innerHTML,expected,`${kind} frame ${n} did not load its prepared content`);
  if(texts[n].includes('\\frac'))assert(readout.querySelector('.mfrac'),`${kind} frame ${n} lost its fraction`);
  const plain=readout.cloneNode(true);plain.querySelectorAll('.katex').forEach(node=>node.remove());
  assert(!/[√/$]/.test(plain.textContent),`${kind} frame ${n} contains unrendered math`);
  require('./check-math-svg.cjs')(readout,`${kind} frame ${n}`);
  frames++;click('[data-step]');
 }
 click('[data-reset]');assert.equal(Number(slider.value),0);
 click('[data-play]');assert.equal(document.querySelector('[data-play]').getAttribute('aria-pressed'),'true');
 assert(tick);tick();assert.equal(Number(slider.value),1);
 click('[data-play]');assert.equal(tick,null,'Pause must stop the timer');
 click('[data-play]');svg.getClientRects=()=>[];
 document.dispatchEvent(new window.Event('readingpartchange'));assert.equal(tick,null,'Collapsing must stop the timer');
}
// Inspect displayed prose too: templates alone do not cover exercises and legacy supplements.
const site=path.resolve(__dirname,'../site');
for(const file of fs.readdirSync(site).filter(f=>/^\d.*\.html$/.test(f))){
 const {document}=parseHTML(fs.readFileSync(path.join(site,file),'utf8'));
 for(const p of document.querySelectorAll('.lesson p,.exercise p')){
  const plain=p.cloneNode(true);plain.querySelectorAll('.katex,svg,template,a').forEach(node=>node.remove());
  assert(!/√|[A-Za-z0-9π)]\s*\/\s*[A-Za-z0-9π√(]/.test(plain.textContent),`${file}: unrendered math in ${plain.textContent}`);
 }
}
console.log(`PASS ${frames} diagram frames: typesetting, stepping, reset, play/pause and collapse; whole-course prose fraction scan`);
