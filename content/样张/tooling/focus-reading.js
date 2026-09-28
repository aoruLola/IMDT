(() => {
  const key = 'math-focus-sample-v1';
  const sections = [...document.querySelectorAll('[data-unit]')];
  const titles = ['先算几个数','为什么少一个点','看两边怎样靠近','用一道题分清楚'];
  const recaps = ['我们从“输入加1”开始。','附近按x＋1计算，但原式不能输入1。','两边的输出都靠近2，空心点仍然空着。','函数值看这个点，极限看附近。'];
  let state = { current: 0, focused: true, done: [], answers: {}, graph: 0 };
  let returning = false;
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved && Number.isInteger(saved.current) && saved.current >= 0 && saved.current < 4) {
      state.current = saved.current;
      state.focused = saved.focused !== false;
      state.done = Array.isArray(saved.done) ? [...new Set(saved.done.filter(n => Number.isInteger(n) && n>=0 && n<4))] : [];
      state.answers = saved.answers && typeof saved.answers === 'object' ? saved.answers : {};
      state.graph = Number.isInteger(saved.graph) && saved.graph>=0 && saved.graph<4 ? saved.graph : 0;
      returning = true;
    }
  } catch { /* Reading remains available when browser storage is disabled. */ }
  function save() {
    try {localStorage.setItem(key,JSON.stringify(state));}
    catch {document.querySelector('#save-note').textContent='当前浏览器无法保存进度，本次仍可正常阅读。';}
  }
  function render() {
    document.body.classList.toggle('focused',state.focused);
    sections.forEach((s,i)=>s.hidden=state.focused && i!==state.current);
    document.querySelectorAll('[data-step]').forEach((a,i)=>{
      if(i===state.current)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');
      a.querySelector('.done').textContent=state.done.includes(i)?'✓':'';
      a.setAttribute('aria-label',`${i+1} ${titles[i]}${state.done.includes(i)?'，已确认理解':''}`);
    });
    document.querySelector('#progress-text').textContent=`已确认理解 ${state.done.length} / 4 节`;
    document.querySelector('#progress').value=state.done.length;
    document.querySelector('#mode').textContent=`专注阅读：${state.focused?'已开启':'已关闭'}`;
    document.querySelector('#mode').setAttribute('aria-pressed',String(state.focused));
    document.querySelector('#finish').hidden=!state.done.includes(3);
  }
  function go(i, focus=true) {
    state.current=i;render();save();
    history.replaceState(null,'',`#part-${i}`);
    if(focus){document.querySelector(`#title-${i}`).focus({preventScroll:true});sections[i].scrollIntoView({block:'start',behavior:'instant'});}
    document.querySelector('#reader-status').textContent='';
  }
  document.querySelector('#reading-tools').hidden=false;
  if(returning){const note=document.querySelector('#resume');note.hidden=false;note.textContent=`接着上次读的位置：第${state.current+1}节。${recaps[state.current]}`;}
  document.querySelectorAll('[data-step]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();go(Number(a.dataset.step));}));
  document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>go(Number(b.dataset.back))));
  document.querySelectorAll('[data-complete]').forEach(b=>b.addEventListener('click',()=>{
    const i=Number(b.dataset.complete);
    if(!state.done.includes(i))state.done.push(i);
    if(i<3)go(i+1);else{render();save();document.querySelector('#finish').focus();}
  }));
  document.querySelector('#mode').addEventListener('click',()=>{state.focused=!state.focused;go(state.current);});
  const explanations = {
    warmup:{correct:'对。0.999＋1＝1.999。它很接近2，但还不等于2。',wrong:'这里选中的是输入。还要按规则加1：0.999＋1＝1.999。',near:'很接近，但还没到2。0.999＋1＝1.999；“靠近”和“等于”要分开。'},
    value:{correct:'对。题目单独规定了g(1)＝7，要使用这条规则。',wrong:'2是附近正在靠近的值。恰好输入1时，要用单独规定的7。',none:'原来的函数在1处没有定义；这个新函数已补上g(1)＝7。'},
    limit:{correct:'对。附近仍按x＋1计算，所以从两边都靠近2。单独改变一个点，不会改变附近的趋势。',wrong:'7是这个点的值。求极限要看附近，附近仍按x＋1计算，趋向的是2。',none:'左右两边都趋向2，所以极限存在。它可以和这个点的值7不同。'}
  };
  function answer(q,value){
    const field=document.querySelector(`[data-question="${q}"]`);
    if(!Object.hasOwn(explanations[q],value))return;
    field.querySelectorAll('[data-answer]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.answer===value)));
    const feedback=field.querySelector('.feedback');feedback.textContent=explanations[q][value];feedback.classList.toggle('correct',value==='correct');
    document.querySelector('#quiz-summary').hidden=!(state.answers.value==='correct' && state.answers.limit==='correct');
  }
  document.querySelectorAll('[data-question]').forEach(field=>{
    const q=field.dataset.question;
    field.querySelectorAll('[data-answer]').forEach(b=>{
      b.setAttribute('aria-pressed','false');
      b.addEventListener('click',()=>{state.answers[q]=b.dataset.answer;answer(q,b.dataset.answer);save();});
    });
    if(state.answers[q])answer(q,state.answers[q]);
  });
  function graph(){
    const distance=[.8,.2,.08,.04][state.graph];
    const values=[1-distance,1+distance];
    ['left','right'].forEach((side,i)=>{const dot=document.querySelector(`[data-role="${side}-dot"]`);dot.setAttribute('r','5');dot.setAttribute('cx',60+values[i]*220);dot.setAttribute('cy',280-(values[i]+1)*75);});
    const lines=document.querySelectorAll('#graph-readout p');
    values.forEach((x,i)=>{const nums=lines[i].querySelectorAll('b');nums[0].textContent=x.toFixed(3);nums[1].textContent=(x+1).toFixed(3);});
    document.querySelector('#graph-step').textContent=`观察 ${state.graph+1} / 4`;
    document.querySelector('#closer').disabled=state.graph===3;
    document.querySelector('#graph-note').textContent=state.graph===3?'这次观察停在这里。输出更接近2了，但输入没有取到1；数学上的靠近还能继续。':'按一次，靠近一步。没有自动播放，可以停下来比较数字。';
    document.querySelector('[data-graph] desc').textContent=`左侧输入${values[0].toFixed(3)}，输出${(values[0]+1).toFixed(3)}；右侧输入${values[1].toFixed(3)}，输出${(values[1]+1).toFixed(3)}。两点靠近空心点(1,2)，但不取x=1。`;
  }
  document.querySelector('#closer').addEventListener('click',()=>{state.graph=Math.min(3,state.graph+1);graph();save();});
  document.querySelector('#restart-graph').addEventListener('click',()=>{state.graph=0;graph();save();});
  document.querySelector('#reset-sample').addEventListener('click',()=>{
    state={current:0,focused:true,done:[],answers:{},graph:0};
    document.querySelectorAll('[data-answer]').forEach(b=>b.setAttribute('aria-pressed','false'));
    document.querySelectorAll('.feedback').forEach(p=>{p.classList.remove('correct');p.textContent='先选一个答案，再看解释。';});
    document.querySelector('#quiz-summary').hidden=true;
    document.querySelector('#resume').hidden=true;
    document.querySelectorAll('details').forEach(d=>d.open=false);
    graph();go(0);document.querySelector('#reader-status').textContent='样张进度已重置，可以从头体验。';
  });
  window.addEventListener('hashchange',()=>{const match=location.hash.match(/^#part-([0-3])$/);if(match)go(Number(match[1]));});
  const initial=location.hash.match(/^#part-([0-3])$/);if(initial)state.current=Number(initial[1]);
  render();graph();save();
})();
