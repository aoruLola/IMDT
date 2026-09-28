const fs = require('node:fs');
const path = require('node:path');

// The full manuscript remains the content source; this builds its chapter reading view.
module.exports = function chapterLayout(document) {
  const article = document.querySelector('article');
  const originalMath = [...article.querySelectorAll('[data-math]')];
  const source = Object.fromEntries([...article.querySelectorAll(':scope > section')].map(s => [s.id, [...s.children].slice(1)]));
  const chapters = [];
  const find = (id, test) => {
    const node = source[id].find(test);
    if (!node) throw new Error(`Missing chapter boundary in ${id}`);
    return node;
  };
  const heading = (id, text) => find(id, n => n.tagName === 'H3' && n.textContent.startsWith(text));
  const between = (id, start, end) => source[id].slice(start ? source[id].indexOf(start) : 0, end ? source[id].indexOf(end) : undefined);
  function add(id, group, title, goal, takeaway, nodes, advanced=false) {
    const section=document.createElement('section');
    section.id=id;section.dataset.chapter='';section.dataset.group=group;section.dataset.advanced=String(advanced);
    const number=document.createElement('p');number.className='chapter-position';
    const h=document.createElement('h2');h.id=`title-${id}`;h.tabIndex=-1;h.textContent=title;
    const objective=document.createElement('p');objective.className='chapter-goal';objective.innerHTML='<b>这一节的目标</b><br>';objective.append(goal);
    section.append(number,h,objective);
    for(const node of nodes){if(node.id===id)node.removeAttribute('id');section.append(node);}
    if(takeaway){const note=document.createElement('p');note.className='chapter-takeaway';note.innerHTML='<b>读完记住这一句</b><br>';note.append(takeaway);section.append(note);}
    chapters.push({id,group,title,section,advanced});
  }
  add('start','阅读准备','先认识几个常用符号','能读懂接下来会出现的字母、括号和运算符号。','不熟悉的符号，可以随时从目录回到这里查。',source.start);
  const notation=find('function',n=>n.textContent==='把函数写成');
  const domain=heading('function','定义域：');
  const flow=find('function',n=>n.id==='visual-function');
  add('function','函数','输入怎么算成输出','会代入一个数，并解释f(x)表示什么。','一个允许的输入，按函数的规则得到一个确定的输出。',[...between('function',null,notation),flow]);
  add('range','函数','输入范围和输出范围有什么区别','用同一个平方函数，分清定义域和值域。','定义域看允许输入哪些数；值域看能算出哪些结果。',between('function',notation,domain).filter(n=>n!==flow));
  add('domain','函数','哪些数可以代进去','检查分母和平方根，找出所有允许的输入。','有多个限制时，输入必须同时满足它们。',between('function',domain));
  const graphIntro=find('limit',n=>n.textContent.startsWith('第一次看这种图'));
  const proof=heading('limit','为什么没有');
  const sides=heading('limit','左右极限');
  add('limit','极限','目标点没有值，也能讨论极限吗','读懂趋近符号，分清“输入等于1”和“输入靠近1”。','极限描述附近的趋势，目标点本身可以没有定义。',between('limit',null,graphIntro));
  const reminder=document.createElement('p');reminder.textContent='接着上一节的例子：原式在x＝1处没有定义；只要x不等于1，输出就等于x＋1。现在把这件事画出来。';
  add('limit-visual','极限','看图：两边怎样靠近','拖动或播放图示，分别观察输入和输出的变化。','左右输入都靠近1时，两边的输出都靠近2。',[reminder,...between('limit',graphIntro,proof)]);
  add('limit-explained','极限','从几个数字，走到理由','理解为什么极限是2，而不只凭图猜答案。','输入离1有多近，输出就离2有多近；误差可以继续缩小。',between('limit',proof,sides));
  add('limit-sides','极限','左边和右边，会得到同一个结果吗','在分段函数中选对计算规则，再比较两侧。','两侧都趋向同一个数，有限的双侧极限才存在。',between('limit',sides));
  const conditions=heading('continuity','连续三条件');
  add('continuity','连续','附近能不能接上这个点','切换图中的情形，理解连续需要检查什么。','连续要求：左边趋向的值、这个点的值、右边趋向的值一致。',between('continuity',null,conditions));
  add('continuity-value','连续','给这个点取什么值，才能连续','通过表格和例题，判断补点或改点能否解决问题。','两侧趋势相同，才有可能靠补上合适的点值接起来。',between('continuity',conditions));
  const algebra=heading('method','直接代入与代数化简');
  const root=find('method',n=>n.classList.contains('example') && n.querySelector('.example-title').textContent.includes('有理化'));
  add('method','基础计算','遇到0/0，为什么还没算完','分清不能直接代入和极限不存在。','0/0不是答案，它提醒我们继续分析分子和分母。',between('method',null,algebra));
  add('factor','基础计算','分解后约分，为什么有效','说出每一步化简的理由，以及约分需要的条件。','考察目标点附近时，可以约掉在那里不为0的共同因子。',between('method',algebra,root));
  add('rationalize','基础计算','根号相减，怎样继续算','用平方差解释有理化，而不只记一道题的答案。','根号差乘上对应的和，可以把分子改成更容易化简的形式。',between('method',root));
  const practices=source.practice.filter(n=>n.classList.contains('practice'));
  if(practices.length!==4)throw new Error('Expected four foundational exercises');
  const practiceTitles=['检查输入的限制','把约分用到一道新题','换一个根号再试试','自己判断怎样才能连续'];
  const practiceIds=['practice','practice-factor','practice-root','practice-continuity'];
  const exerciseIntro=source.practice.find(n=>n.tagName==='P');
  exerciseIntro.textContent='接下来是4个练习小节，每节一道题。写出你用的规则，再展开提示或解析核对；不需要一次学完所有拓展方法。';
  practices.forEach((node,i)=>add(practiceIds[i],'动手练习',practiceTitles[i],'先自己写出过程，再按需要展开提示和逐步解析。','能解释为什么这样做，比只记住答案更重要。',i===0?[exerciseIntro,node]:[node]));
  const exerciseReview=source.practice.find(n=>n.tagName==='P' && n!==exerciseIntro);
  add('summary','基础回顾','这一遍，学会了什么','用自己的话回顾四件事；拿不准的内容，再回看对应小节。','基础内容到这里就可以先停下。后面的拓展按需阅读，不必一次读完。',[...source.summary,exerciseReview]);
  const intro=source.advanced.filter(n=>n.tagName!=='DETAILS');
  const hub=document.createElement('div');hub.className='extension-index';
  const extraPractice=source.practice.find(n=>n.tagName==='DETAILS');
  add('advanced','进一步学习','按需要选择一个拓展主题','根据已经学过的知识选择内容；涉及导数、积分的部分可以以后再读。','带着具体问题进入拓展，读完后可以回到这个目录。',[...intro,hub],true);
  const extraIds=['extra-function','extra-domain','extra-sequence','extra-definition','extra-properties','extra-continuity','extra-equivalence','extra-taylor','extra-squeeze','extra-integral','extra-methods'];
  source.advanced.filter(n=>n.tagName==='DETAILS').forEach((detail,i)=>{
    if(!extraIds[i])throw new Error('New extension requires a chapter id');
    const title=detail.querySelector('summary').textContent;
    add(extraIds[i],'进一步学习',title,'先读本节的适用范围和前置知识，再看例题。','遇到尚未学过的知识，可以先回到拓展目录，选择当前需要的内容。',[...detail.querySelector('.further-body').children],true);
  });
  add('extra-practice','进一步学习','拓展练习：选一道已经学过的题','只练已学过的对应方法；提示和解析仍可按需展开。','不必一次完成全部题目，可以学一个方法、练一道题。',[...[...extraPractice.children].filter(n=>n.tagName!=='SUMMARY')],true);
  for(const c of chapters.filter(c=>c.advanced && c.id!=='advanced')){const a=document.createElement('a');a.href=`#${c.id}`;a.textContent=c.title;hub.append(a);}
  article.replaceChildren(...chapters.map(c=>c.section));
  const mathAfter=[...article.querySelectorAll('[data-math]')];
  if(mathAfter.length!==originalMath.length || originalMath.some(n=>!article.contains(n)))throw new Error('Chapter layout must preserve every formula');
  const basics=chapters.filter(c=>!c.advanced);
  const extras=chapters.filter(c=>c.advanced);
  chapters.forEach((c,i)=>{
    c.section.querySelector('.chapter-position').textContent=c.advanced?`拓展阅读 · 按需选择`:`基础阅读 ${basics.indexOf(c)+1} / ${basics.length} · ${c.group}`;
    const pager=document.createElement('div');pager.className='chapter-pager';
    if(i>0){const back=document.createElement('a');back.href=`#${chapters[i-1].id}`;back.textContent='← 上一节';pager.append(back);}
    if(i<chapters.length-1){const next=document.createElement('button');next.type='button';next.dataset.complete=c.id;next.dataset.next=chapters[i+1].id;next.textContent=c.id==='summary'?'基础已读完，看看拓展 →':'读完，下一节 →';pager.append(next);}
    else{const done=document.createElement('button');done.type='button';done.dataset.complete=c.id;done.textContent='标记这节已读';pager.append(done);}
    if(c.advanced && c.id!=='advanced'){const a=document.createElement('a');a.href='#advanced';a.textContent='回拓展目录';pager.append(a);}
    c.section.append(pager);
  });
  const nav=document.querySelector('.chapter-nav');nav.innerHTML='<p class="nav-label">本章 · 分节阅读</p><div class="chapter-reader-tools" hidden><button type="button" id="chapter-mode" aria-pressed="true">分节阅读 · 查看全文</button><p id="chapter-progress"></p><p id="chapter-storage">会记住上次读到的小节。</p></div><div class="chapter-groups"></div>';
  const groups=nav.querySelector('.chapter-groups');
  for(const group of [...new Set(chapters.map(c=>c.group))]){
    const details=document.createElement('details');details.className='chapter-group';details.dataset.group=group;
    const summary=document.createElement('summary');summary.textContent=group;details.append(summary);
    chapters.filter(c=>c.group===group).forEach(c=>{const a=document.createElement('a');a.href=`#${c.id}`;a.dataset.chapterLink=c.id;const n=c.advanced?'＋':String(basics.indexOf(c)+1).padStart(2,'0');a.innerHTML=`<span>${n}</span><span></span>`;a.lastElementChild.textContent=c.title;details.append(a);});groups.append(details);
  }
  const subtitle=document.querySelector('.subtitle');subtitle.textContent='一次读一个小问题：先看例子和图，再理解概念，最后自己练习。也可以随时切换全文。';
  const resume=document.createElement('p');resume.id='chapter-resume';resume.hidden=true;document.querySelector('.masthead').after(resume);
  document.querySelectorAll('body > script:not([data-lesson-visuals])').forEach(s=>s.remove());
  const script=document.createElement('script');script.textContent=fs.readFileSync(path.join(__dirname,'chapter-reading.js'),'utf8');document.body.append(script);
  const style=document.createElement('link');style.rel='stylesheet';style.href='chapter-reading.css';document.head.append(style);
  console.log(`Organized ${basics.length} foundation chapters and ${extras.length} optional extension chapters; preserved ${mathAfter.length} formulas.`);
};
