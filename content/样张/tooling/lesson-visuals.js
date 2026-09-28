(() => {
  const initialized=new WeakSet(), animations=new Map();
  function init(root=document){
  const flow = root.querySelector('[data-visual="function"]');
  const find = (root, name) => root.querySelector(`[data-role="${name}"]`);
  if (flow && !initialized.has(flow)) {
    initialized.add(flow);
    flow.querySelector('.visual-controls').hidden = false;
    const input = flow.querySelector('input');
    function updateFlow() {
      const x = Number(input.value), y = x * x;
      find(flow,'input-value').textContent = x;
      find(flow,'flow-input').textContent = x;
      find(flow,'flow-rule').textContent = x < 0 ? `(${x}) × (${x})` : `${x} × ${x}`;
      find(flow,'flow-output').textContent = y;
      find(flow,'function-result').textContent = `输入${x}，按“自己乘自己”的规则，得到${y}。`;
      flow.querySelector('desc').textContent = `输入${x}，计算${x}乘以${x}，输出${y}。`;
    }
    input.addEventListener('input', updateFlow);
    flow.querySelector('[data-action="opposite"]').addEventListener('click', () => { input.value = -Number(input.value); updateFlow(); });
    updateFlow();
  }
  const limit = root.querySelector('[data-visual="limit"]');
  if (limit && !initialized.has(limit)) {
    initialized.add(limit);
    limit.querySelector('.visual-controls').hidden = false;
    const slider = limit.querySelector('input');
    const play = limit.querySelector('[data-action="play"]');
    let frame = 0, playing = false;
    function updateLimit(announce=false) {
      const progress = Number(slider.value), distance = .8 * 10 ** (-progress / 50);
      const left = 1 - distance, right = 1 + distance;
      for (const [name,x] of [['left',left],['right',right]]) {
        const dot = find(limit,`${name}-dot`);
        dot.setAttribute('cx',60 + 220*x);
        dot.setAttribute('cy',280 - 75*(x+1));
        find(limit,`${name}-values`).textContent = `x = ${x.toFixed(3)}，输出 = ${(x+1).toFixed(3)}`;
      }
      find(limit,'progress-value').textContent = `${progress}%`;
      limit.querySelector('desc').textContent = `左侧输入${left.toFixed(3)}，输出${(left+1).toFixed(3)}；右侧输入${right.toFixed(3)}，输出${(right+1).toFixed(3)}。两点向(1,2)靠近，但不取x=1。`;
      if (announce) find(limit,'limit-status').textContent = `两个点的横坐标与1都相差${distance.toFixed(3)}，纵坐标与2也都相差${distance.toFixed(3)}。`;
    }
    function pause() {
      cancelAnimationFrame(frame); playing=false;
      play.textContent='播放逼近'; play.setAttribute('aria-pressed','false');
    }
    slider.addEventListener('input', () => { pause(); updateLimit(true); });
    play.addEventListener('click', () => {
      if (playing) { pause(); updateLimit(true); return; }
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {slider.value=100;updateLimit(true);return;}
      if (Number(slider.value)===100) slider.value=0;
      playing=true;play.textContent='暂停';play.setAttribute('aria-pressed','true');
      const start=performance.now(), from=Number(slider.value);
      function tick(now) {
        slider.value=Math.min(100, Math.round(from+(now-start)/60));
        updateLimit();
        if(Number(slider.value)>=100){pause();updateLimit(true);}else frame=requestAnimationFrame(tick);
      }
      frame=requestAnimationFrame(tick);
    });
    limit.querySelector('[data-action="reset"]').addEventListener('click', () => {pause();slider.value=0;updateLimit(true);});
    const observer='IntersectionObserver' in window?new IntersectionObserver(entries => {if(!entries[0].isIntersecting)pause();}):null;
    observer?.observe(limit);animations.set(limit,{stop:pause,observer});
    updateLimit();
  }
  const continuity = root.querySelector('[data-visual="continuity"]');
  if (continuity && !initialized.has(continuity)) {
    initialized.add(continuity);
    continuity.querySelector('.visual-controls').hidden=false;
    const states={
      continuous:'左侧趋于2，右侧也趋于2，点值为2：三者相等，所以连续。',
      missing:'左右都趋于2，但x=1处没有函数值，所以不连续。补上f(1)=2后，函数在1处连续。',
      wrong:'左右都趋于2，但点值被放在3，所以不连续。把f(1)从3改成2后，函数在1处连续。',
      jump:'左侧趋于2，右侧趋于3，双侧极限不存在。图中点值为3；修改f(1)不能改变两侧极限不同的事实，所以无法通过改动这一个值使函数连续。',
    };
    continuity.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => {
      const mode=button.dataset.case;
      continuity.querySelectorAll('[data-case]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      find(continuity,'right-curve').setAttribute('d',mode==='jump'?'M280 100L500 40':'M280 160L500 100');
      find(continuity,'gap-dot').setAttribute('visibility',mode==='continuous'?'hidden':'visible');
      find(continuity,'value-dot').setAttribute('visibility',mode==='missing'?'hidden':'visible');
      find(continuity,'value-dot').setAttribute('cy',['wrong','jump'].includes(mode)?100:160);
      for (const role of ['jump-guide','jump-label'])find(continuity,role).setAttribute('visibility',['wrong','jump'].includes(mode)?'visible':'hidden');
      find(continuity,'continuity-result').textContent=states[mode];
      continuity.querySelector('desc').textContent=states[mode];
    }));
  }
  }
  function stop(root=document){for(const [el,c]of animations)if(root.contains(el))c.stop();}
  function destroy(root){for(const [el,c]of animations)if(root.contains(el)){c.stop();c.observer?.disconnect();animations.delete(el);initialized.delete(el);}}
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  for(const event of ['readingpartchange','lessonchange'])document.addEventListener(event,()=>{for(const [el,c]of animations)if(el.closest('[hidden]'))c.stop();});
  window.addEventListener('pagehide',()=>stop());
  window.LessonVisuals={init,stop,destroy};init();
})();
