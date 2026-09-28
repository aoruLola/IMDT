const fs=require('node:fs'),path=require('node:path');
const root=process.argv[2]?path.resolve(process.argv[2]):path.resolve(__dirname,'..'),out=path.join(root,'site'),old=path.resolve(__dirname,'../../样张');
const katex=require(path.join(old,'tooling/node_modules/katex'));
const {parseHTML}=require(path.join(old,'tooling/node_modules/linkedom'));
const course=JSON.parse(fs.readFileSync(path.join(root,'course.json'),'utf8'));
const requirements=require(path.join(root,'tooling/requirements.cjs')),exams=require(path.join(root,'tooling/exams.cjs')),training=require(path.join(root,'tooling/training.cjs'));
const is843=course.courseId==='843';
const label=course.displayName||'数学二',symbolLesson=course.symbolLesson||'p-logic';
const {figures}=require(path.join(old,'tooling/visuals.cjs'));
const normalizeMath=require('./math-normalize.cjs');
const {buildPointMap}=require('./point-map.cjs');
const {buildPptPages}=require('./ppt-pages.cjs');
const {writeWorkbench}=require('./workbench.cjs');
fs.mkdirSync(out,{recursive:true});
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let formulas=0;
function inline(s,breakLines=false){s=s.replace(/\[\[[^\]\n]+(?:\],\[[^\]\n]+)+\]\]/g,m=>'$\\begin{pmatrix}'+m.slice(2,-2).split('],[').map(r=>r.split(',').join('&')).join('\\\\').replace(/²/g,'^2').replace(/³/g,'^3')+'\\end{pmatrix}$');const pieces=s.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]+\$)/g);return pieces.map(p=>{if(!p.startsWith('$'))return breakLines?escape(p).replace(/\n/g,'<br>'):escape(p);const display=p.startsWith('$$'),tex=p.slice(display?2:1,display?-2:-1);formulas++;return `<${display?'div':'span'} class="${display?'formula':'math-inline'}">${katex.renderToString(tex,{displayMode:display,throwOnError:true,strict:'error',trust:false,output:'htmlAndMathml'})}</${display?'div':'span'}>`;}).join('');}
function md(s){return s.trim().split(/(```[\s\S]*?```)/g).filter(Boolean).map(chunk=>{if(chunk.startsWith('```')){const first=chunk.indexOf('\n'),lang=chunk.slice(3,first).trim();return `<pre tabindex="0" aria-label="${escape(lang)} 示例"><code>${escape(chunk.slice(first+1,-3).trim())}</code></pre>`;}return chunk.split(/\n\s*\n/).filter(p=>p.trim()).map(p=>p.trim().startsWith('$$')?inline(p.trim()):`<p>${inline(normalizeMath(p.trim()),true)}</p>`).join('');}).join('');}
const lessons=[],byId={};
for(const c of course.chapters){
 const text=fs.readFileSync(path.join(root,c.file),'utf8');
 const blocks=text.split(/^## /m).slice(1);
 const parsed=new Map(blocks.map(block=>{const head=block.slice(0,block.indexOf('\n')).split(' | ');const fields={};for(const part of block.slice(block.indexOf('\n')+1).split(/^### /m).slice(1)){const at=part.indexOf('\n');fields[part.slice(0,at).trim()]=part.slice(at+1).trim();}return[head[0],fields];}));
 if(parsed.size!==c.lessons.length)throw Error('Manifest/source count mismatch '+c.file);
 c.lessons=c.lessons.map(l=>{if(byId[l.id])throw Error('Duplicate lesson '+l.id);const fields=parsed.get(l.id);if(!fields)throw Error('Missing lesson '+l.id);for(const f of ['目标','问题','讲解','推导','例题1','例题2','练习1','练习2','练习3','回顾'])if(!fields[f])throw Error(l.id+' missing '+f);for(const f of ['练习1','练习2','练习3'])if(!/\n提示：.+\n解析：/s.test(fields[f]))throw Error(l.id+' missing separate hint/solution');const lesson={...l,fields,chapter:c.id,chapterTitle:c.title,number:c.number,url:`${c.id}.html#${l.id}`,source:c.file};lessons.push(lesson);byId[l.id]=lesson;return lesson;});
}
const done=new Set(),visiting=new Set();function visit(id){if(done.has(id))return;if(visiting.has(id))throw Error('Cyclic prerequisite '+id);if(!byId[id])throw Error('Unknown prerequisite '+id);visiting.add(id);byId[id].prerequisites.forEach(visit);visiting.delete(id);done.add(id);}lessons.forEach(l=>visit(l.id));
requirements.forEach(r=>r.lessons.forEach(id=>{if(!byId[id])throw Error('Requirement missing lesson '+id);}));
const migrated={};
// The main lessons now explain these ideas in full. Keep only optional worked
// practice and longer arguments, while retaining every legacy address mapping.
const supplementarySections=new Set(['practice','practice-factor','practice-root','practice-continuity','extra-domain','extra-definition','extra-squeeze','extra-taylor','extra-integral','extra-practice']);
const legacyFile=path.join(old,'html/函数极限连续-样张.html');
if(!is843&&fs.existsSync(legacyFile)){
 const {document}=parseHTML(fs.readFileSync(legacyFile,'utf8'));
 for(const section of document.querySelectorAll('section[data-chapter]')){
  const target=course.legacy[section.id];if(!target||section.id==='advanced'||!byId[target])continue;
  const title=section.querySelector('h2')?.textContent||'原版补充讲解';
  section.querySelectorAll('script,.chapter-position,.chapter-goal,.chapter-takeaway,.chapter-pager,.learning-visual').forEach(n=>n.remove());
  section.querySelector('h2')?.remove();
  for(const n of section.querySelectorAll('[id]')){course.legacy[n.id]??=target;n.id='archive-'+section.id+'-'+n.id;}
  for(const a of section.querySelectorAll('a[href^="#"]')){const id=a.getAttribute('href').slice(1);a.setAttribute('href',byId[course.legacy[id]]?.url||byId[target].url);}
  if(supplementarySections.has(section.id))(migrated[target]??=[]).push(`<details class="legacy-reading"><summary>补充阅读 · ${escape(title)}</summary><div>${section.innerHTML}</div></details>`);
 }
}
const link=(id,label,from)=>`<a href="${byId[id].chapter}.html${from?'?from='+encodeURIComponent(from):''}#${id}">${escape(label||byId[id].title)}</a>`;
const publicData={courseId:course.courseId||'math2',basePath:course.basePath||'/',storage:course.storage||{reading:'math2-course-v1',study:'math2-study-v1',parts:'math2-reading-part-v1:'},title:course.title,legacy:Object.fromEntries(Object.entries(course.legacy||{}).map(([k,v])=>[k,byId[v]?.url]).filter(([,v])=>v)),lessons:lessons.map(({fields,...l})=>({...l,keywords:l.topics.join(' ')})),chapters:course.chapters.map(c=>({id:c.id,title:c.title,lessons:c.lessons.map(l=>l.id)}))};
fs.writeFileSync(path.join(out,'course-data.js'),'window.COURSE='+JSON.stringify(publicData).replace(/</g,'\\u003c')+';');
function shell(title,body,chapter=''){return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#f8f7f3"><title>${escape(title)}｜${escape(label)}学习讲义</title><link rel="stylesheet" href="vendor/katex/katex.min.css"><link rel="stylesheet" href="course.css">${is843?'<link rel="stylesheet" href="843.css">':''}<link rel="stylesheet" href="ppt.css"><script defer src="course-data.js"></script><script defer src="ppt-data.js"></script><script defer src="reader.js"></script><script defer src="reading-parts.js"></script><script defer src="study-model.js"></script><script defer src="study.js"></script><script defer src="diagrams.js"></script><script defer src="lesson-visuals.js"></script><script defer src="ppt.js"></script></head><body data-course-chapter="${chapter}"><a class="skip" href="#main">跳到正文</a><div class="shell"><header class="mast"><a href="index.html">${escape(label)} / 学习讲义</a><nav aria-label="课程导航"><a href="index.html">课程总览</a><a href="contents.html">总目录</a><a href="knowledge.html">知识点检索</a><a href="coverage.html">范围与来源</a><a href="/study.html">学习工作台</a><a href="${is843?'/':'/843/'}">切换到${is843?'数学二':'843'}</a></nav></header><noscript><p>当前未启用 JavaScript，正文、公式、练习解析和全文链接仍可阅读；分节切换与本地进度需要启用脚本。</p></noscript>${body}</div>${require('./study-ui.cjs')}</body></html>`;}
const diagramKinds={properties:'properties','elementary-atlas':'elementary',derivative:'tangent',shape:'shape',riemann:'integral','double-order':'region','matrix-product':'matrix',elimination:'elimination',eigen:'eigen','quadratic-form':'quadratic'};
function visual(l){if(is843)return l.visual?require(path.join(root,'tooling/visuals.cjs'))(l.visual,l.id):'';const original={function:'function',limit:'limit',continuity:'continuity'}[l.id];if(original){let figure=figures[original];if(original==='limit')figure=figure.replace(/r="7"/g,'r="4"');return `<div class="visual">${figure}</div>`;}const kind=diagramKinds[l.id];if(!kind)return'';return require('./diagrams.cjs')(kind);}
// Focus courseware pages are generated from the same official lesson fields as the long-form reading.
const pptLessons={};
for(const l of lessons){
 const at=lessons.indexOf(l);
 pptLessons[l.id]={
  id:l.id,title:l.title,chapterTitle:l.chapterTitle,
  pages:buildPptPages({
   lesson:l,md,visual,
   nextLesson:lessons[at+1]||null,
   prereqLessons:(l.prerequisites||[]).map(id=>byId[id]).filter(Boolean),
   link:(id,label)=>link(id,label,l.id)
  })
 };
}
fs.writeFileSync(path.join(out,'ppt-data.js'),'window.PPT_DATA='+JSON.stringify({version:'ppt-data-v1',courseId:is843?'843':'math2',lessons:pptLessons}).replace(/</g,'\\u003c')+';');
for(const file of ['ppt.js','ppt.css'])fs.copyFileSync(path.join(__dirname,file),path.join(out,file));

function exercise(id,title,prompt,hint,solution){return `<section class="exercise" id="${id}"><h4>${escape(title)}</h4>${md(prompt)}<details><summary>需要一点提示</summary><div>${md(hint)}</div></details><details><summary>查看过程、答案与错因</summary><div>${md(solution)}</div></details></section>`;}
function lessonHTML(l,index){const f=l.fields;let html=`<section class="lesson" data-lesson="${l.id}" id="${l.id}" aria-labelledby="heading-${l.id}"><header><p class="eyebrow">${String(l.number).padStart(2,'0')} / ${escape(l.chapterTitle)} · 小节 ${index+1}</p><h2 id="heading-${l.id}" tabindex="-1">${escape(l.title)}</h2><div class="goal"><strong>读完这一节，你会</strong>${md(f['目标'])}</div>${is843?`<p class="muted">${escape(l.scope||'大纲要求的教学展开')} · ${escape(l.kind||'技术讲解')} · <a href="coverage.html#coverage-${l.id}">本节来源与考点</a></p>`:''}<p class="prereqs">前置知识：${l.prerequisites.length?l.prerequisites.map(id=>link(id,null,l.id)).join(' '):'从这里开始即可'} · ${link(symbolLesson,'符号回看',l.id)}</p></header><div class="block"><h3>从一个问题开始</h3>${md(f['问题'])}</div>${visual(l)}<div class="block" id="${l.id}-explain"><h3>把这件事讲清楚</h3>${md(f['讲解'])}</div><div class="block"><h3>为什么成立 · 关键推导</h3>${md(f['推导'])}</div>`;
 for(let i=1;i<=2;i++)html+=`<section class="example" id="${l.id}-example${i}"><h3>${i===1?'入门例题':'典型应用与变式'} / ${i}</h3>${md(f['例题'+i])}</section>`;
 if(is843&&(l.kind==='设计分析'||l.kind==='手绘实践'))html=html.replace('为什么成立 · 关键推导','怎样做 · 分步推演').replace('入门例题 / 1','入门示范 / 1').replace('典型应用与变式 / 2','应用示范 / 2');
 html+='<div class="block"><h3>停一下，自己试一试</h3><p class="muted">先独立作答；卡住时看提示，完成后再对照解析。</p></div>';
 for(let i=1;i<=3;i++){const [prompt,rest]=f['练习'+i].split('\n提示：'),[hint,solution]=rest.split('\n解析：');html+=exercise(`${l.id}-practice${i}`,(l.kind==='设计分析'||l.kind==='手绘实践'?['概念判断','案例分析','方案与绘图实践']:['概念判断','计算与执行过程','条件与错误辨析'])[i-1],prompt,hint,solution);}
 if(migrated[l.id]?.length)html+=`<div class="block"><h3>补充解释与练习</h3><p class="muted">主线已包含本节所需知识；这里提供额外题目或更长的论证，按需要展开。</p>${migrated[l.id].join('')}</div>`;
 if(f['补充'])html+=`<div class="block" id="${l.id}-supplement"><h3>继续实践 · 工具与示范</h3>${md(f['补充'])}</div>`;
 if(l.code)html+='<p class="muted"><a href="code.html">对照完整 C / SQL 示例与语法说明 →</a></p>';
 if(is843&&l.kind==='手绘实践')html+='<p><a href="templates.html">打开可打印练习模板 →</a> · <a href="cases.html">对照完整方案案例</a></p>';
 html+=`<div class="review"><strong>带走这一句</strong>${md(f['回顾'])}</div>`;
 const at=lessons.indexOf(l),prev=lessons[at-1],next=lessons[at+1];
 html+=`<div class="pager">${prev?link(prev.id,'← 上一节'):''}<button data-mark="${l.id}" aria-pressed="false">标记本节已读</button><button type="button" class="ppt-launch" data-ppt-lesson="${l.id}">专注课件</button>${next?link(next.id,'下一问：'+next.title+' →'):''}</div></section>`;return html;}
for(const c of course.chapters){
 const sidebar=`<aside class="sidebar" aria-label="本章目录"><p><a href="contents.html">← 全课程目录</a></p><button id="reading-mode" hidden aria-pressed="false">查看本章全文</button><p id="chapter-progress"></p><nav>${c.lessons.map((l,i)=>`<a data-lesson-link="${l.id}" href="#${l.id}">${String(i+1).padStart(2,'0')}　${escape(l.title)}</a>`).join('')}<a data-lesson-link="training-${c.id}" href="#training-${c.id}">章末综合训练${is843?'':'与真题'}</a></nav></aside>`;
 let body=`<div class="hero"><p class="eyebrow">${c.kind} / ${String(c.number).padStart(2,'0')}</p><h1>${escape(c.title)}</h1><p class="deck">${is843&&c.number>=12?'一次解决一个小问题。从观察与示范开始，推演方案，再亲手画出来。':'一次解决一个小问题。从具体例子开始，理解条件，再亲手算一遍。'}</p><p id="return-link"></p></div><div class="layout">${sidebar}<main id="main">${c.lessons.map(lessonHTML).join('')}`;
 const [p,h,s]=training[c.number];body+=`<section class="lesson chapter-training" data-lesson="training-${c.id}" id="training-${c.id}"><header><p class="eyebrow">章末 / 把知识接起来</p><h2 tabindex="-1">综合训练${is843?'':'与真题'}</h2></header>${exercise(`${c.id}-original-training`,'原创综合训练',p,h,s)}`;
 const examIds=[exams.chapterMap[c.number],...(exams.additional[c.number]||[])].filter(Boolean);
 for(const qid of examIds){const q=exams.questions[qid];const later=q.requires||((c.number===12||c.number===15)?'quadratic-form':c.number===13?'nonhomogeneous-system':null);body+=`<div class="block"><h3>${q.year||2025} 年 · 数学二 · 第 ${q.number} 题</h3><p>${escape(q.title)}</p><p class="muted">题目与题号已对照大学公开转载试卷核验，解析为本课独立编写。<a href="${q.source||exams.source}#page=${q.page}" target="_blank" rel="noopener">原卷第 ${q.page} 页</a>${q.second?` · <a href="${q.second}#page=21" target="_blank" rel="noopener">题号交叉核对</a>`:''}。</p>${later?`<p class="status">这道跨章题还需要 ${link(later,null,'training-'+c.id)}。先完成所链接的小节，再回来做完整题；当前章节的综合练习只用已经学过的知识。</p>`:''}${exercise(`${c.id}-exam-${q.year||2025}-${q.number}`,'真题研读 · 题干要点与独立解析',q.prompt,q.hint,q.solution)}</div>`;}
 body+=`<div class="pager">${link(c.lessons.at(-1).id,'← 回到本章最后一节')}${course.chapters[c.number+1]?`<a href="${course.chapters[c.number+1].id}.html">下一章：${escape(course.chapters[c.number+1].title)} →</a>`:'<a href="knowledge.html">回到知识点索引</a>'}</div></section></main></div>`;
 fs.writeFileSync(path.join(out,c.id+'.html'),shell(c.title,require('./reading-parts.cjs')(body),c.id));
}
const cards=course.chapters.map(c=>`<section class="course-card"><h2><span class="chapter-number">${String(c.number).padStart(2,'0')}</span><a href="${c.id}.html">${escape(c.title)}</a></h2><p class="muted">${c.lessons.length} 个小问题 · ${c.kind}</p><p>${c.lessons.map(l=>escape(l.title.split('：')[0])).join(' / ')}</p><a href="${c.id}.html#${c.lessons[0].id}">开始这一章 →</a></section>`).join('');
fs.writeFileSync(path.join(out,'index.html'),shell(course.title,`<main id="main"><section class="home-intro"><div><p class="eyebrow">${escape(course.target||'2027 备考 / 数学二（302）')}</p><h1>${is843?'从理解技术，<br>走到创造方案。':'把数学，<br>一点一点读懂。'}</h1><p class="deck">${is843?'把概率、计算机与设计连起来。先理解一个具体问题，再推演、计算、画出自己的方案。':'从“这个符号是什么意思”开始，走到“这道题为什么这样做”。高等数学与线性代数，沿着理解的顺序学。'}</p><div class="pager">${link(lessons[0].id,'从零开始 →')}<a id="resume" hidden href="contents.html">继续上次阅读 →</a></div></div><div class="note"><h2>${is843?'一边理解，一边动手。':'每一节，都落到一道题上。'}</h2><p>问题 → 直观解释 → 条件与推导 → 两道例题 → 三类练习 → 回顾。</p><p>${lessons.length} 个教学小节，${course.chapters.length} 个章节单元。例题与练习可展开对照，图示由你控制。</p><p class="muted">${escape(course.syllabus.status)} <a href="coverage.html">核验记录 →</a></p></div></section><section class="block"><h2>课程目录</h2><p class="muted">大目录按知识点组织，章节内部按理解依赖推进。预备篇可随时回看。</p><div class="courses">${cards}</div></section></main>`));
fs.writeFileSync(path.join(out,'contents.html'),shell('课程总目录',`<main id="main"><div class="hero"><p class="eyebrow">学习路线 / 全课程</p><h1>从基础走到综合题</h1><p class="deck">基础与进阶表示先后顺序。正式课程中的要求都需要学习。</p></div>${course.chapters.map(c=>`<section class="course-card"><h2>${String(c.number).padStart(2,'0')} · ${escape(c.title)}</h2><ol>${c.lessons.map(l=>`<li>${link(l.id)} <span class="muted">— ${escape(l.topics.join('、'))}</span></li>`).join('')}</ol><a href="${c.id}.html#training-${c.id}">综合训练${is843?'':'与真题'} →</a></section>`).join('')}</main>`));
fs.writeFileSync(path.join(out,'knowledge.html'),shell('知识点索引',`<main id="main"><div class="hero"><p class="eyebrow">查找 / 按标题和知识点</p><h1>找到眼前的这个问题</h1></div><div class="search-tools"><label for="search">输入标题或关键词，例如${is843?'“概率”“数据库”“手绘”':'“反函数”“换元”“矩阵”'}</label><input class="search" id="search" type="search" placeholder="搜索知识点" autocomplete="off"><p id="search-count" role="status">${lessons.length} 个小节</p></div><div class="index-list">${lessons.map(l=>`<section class="index-item" data-search="${escape(l.title+' '+l.topics.join(' ')+' '+l.chapterTitle)}"><p class="eyebrow">${escape(l.chapterTitle)}</p><h2>${link(l.id)}</h2><p>${escape(l.topics.join(' · '))}</p><p class="muted">${escape(l.fields['目标'])}</p></section>`).join('')}</div><p id="no-results" hidden>没有找到匹配小节。试试更短的关键词，或查看总目录。</p></main>`));
const coverage={generatedAt:new Date().toISOString(),syllabus:course.syllabus,counts:{chapters:course.chapters.length,lessons:lessons.length,examples:lessons.length*2,exercises:lessons.length*3,requirements:requirements.length,uniqueExamQuestions:Object.keys(exams.questions).length},requirements:requirements.map(r=>({...r,status:is843?'2027 官方条目已核对；细目为教学展开':'历史条目已关联；2027 适用性待核验',evidence:r.lessons.map(id=>({id,source:byId[id].source,teaching:byId[id].url,examples:[1,2].map(i=>`${byId[id].chapter}.html#${id}-example${i}`),exercises:[1,2,3].map(i=>`${byId[id].chapter}.html#${id}-practice${i}`),prerequisites:byId[id].prerequisites}))})),lessons:lessons.map(l=>({id:l.id,title:l.title,topics:l.topics,source:l.source,scope:l.scope||'大纲要求的教学展开',kind:l.kind||'技术讲解',references:l.references||[],prerequisites:l.prerequisites,teaching:l.url,examples:[1,2].map(i=>l.url+`-example${i}`),exercises:[1,2,3].map(i=>l.url+`-practice${i}`)}))};
fs.writeFileSync(path.join(out,'coverage.json'),JSON.stringify(coverage,null,2));
if(is843)fs.writeFileSync(path.join(out,'coverage.html'),shell('范围、覆盖与来源',require(path.join(root,'tooling/coverage-page.cjs'))({course,coverage,link,escape})));
else fs.writeFileSync(path.join(out,'coverage.html'),shell('范围、覆盖与来源',`<main id="main"><div class="hero"><p class="eyebrow">公开记录 / 版本与证据</p><h1>学什么，依据是什么</h1><p class="status">${escape(course.syllabus.status)}</p></div><h2>当前取得的资料</h2><p><a href="${course.syllabus.url}">大学公开的数学二大纲 PDF</a>：正文首页标注2018，文件元信息年份不一致，因此按正文记录。它是大学转载，不是已核验的2027官方发布。<a href="${course.syllabus.official}">中国教育考试网大纲栏目</a>尚不能提供本次所需2027全文依据。核查日期：${course.syllabus.checked}。</p><p>教学内容按用户确认的数学二课程主线编写，以下历史要求只用于查漏。预备知识单独标注，不把概率、级数、空间解析几何或曲线曲面积分加入必修课。曲率、物理积分等保留在历史数学二要求中，最终适用范围仍需新大纲核验。</p><h2>覆盖记录如何读</h2><p>${requirements.length} 条历史要求关联到 ${lessons.length} 个实际教学小节。每节有两道例题和概念、计算、条件三个方向的练习；下表链接直达讲解与证据。结构检查证明条目能找到内容，不单独等同于教学质量或最新大纲认证。</p><p><a href="coverage.json">下载机器可读覆盖表</a> · <a href="knowledge.html">逐知识点索引</a></p><div class="table-wrap"><table><thead><tr><th>历史条目 / PDF页</th><th>对应小节与教学证据</th><th>核验状态</th></tr></thead><tbody>${coverage.requirements.map(r=>`<tr><td>${escape(r.id)} · 第${r.page}页<br>${escape(r.title)}</td><td>${r.evidence.map(e=>`${link(e.id)}<br><a href="${e.examples[0]}">入门例题</a> · <a href="${e.examples[1]}">应用例题</a> · ${e.exercises.map((url,i)=>`<a href="${url}">${['概念','计算','条件'][i]}练习</a>`).join(' · ')}`).join('<hr>')}</td><td>${escape(r.status)}</td></tr>`).join('')}</tbody></table></div><section class="block"><h2>真题核验</h2><p>共17道独立真题，覆盖2024、2025两年。<a href="https://edu.xaiu.edu.cn/__local/1/1E/08/13EB16BFFEF1E908C61738B9F4F_2DC40CDA_4544F.pdf#page=3">2024 数学二试卷，西安外事学院转载</a>第3页的第11、14、15题已目视核对，分别用于曲率圆、高阶导数与平均速度。</p><p><a href="${exams.source}">2025 数学二试卷，西安外事学院转载</a>，已逐页核对所用题目；<a href="${exams.second}">郑州工商学院转载</a>用于题号交叉核对。题干卡为要点摘记，完整选项请看原卷；课程解析独立编写。第6题转载答案字母与表达式不一致、第20题有转载解析误取交集上界，第22题有转载稿分号错误，本站分别核算并注明。</p><p>不把转载解析当权威答案，也不把原创练习标成真题。跨章节题附所需知识的往返链接。</p></section></main>`));
const report=['# 考点覆盖报告','',`- 章节：${coverage.counts.chapters}；教学小节：${lessons.length}。`,`- 入门/应用例题：${coverage.counts.examples}；三类分离提示解析练习：${coverage.counts.exercises}。`,`- ${is843?'官方要求':'历史要求'}：${requirements.length}；独立真题：${coverage.counts.uniqueExamQuestions}。`,`- ${course.syllabus.status}`,'','每行的例题与练习证据见 site/coverage.json，浏览版本见 site/coverage.html。','',...requirements.map(r=>`- ${r.id} ${r.title}：${r.lessons.join(', ')}（${is843?'2027官方条目已关联':'历史条目已关联，2027待核验'}）`)];
fs.writeFileSync(path.join(root,'COVERAGE.md'),report.join('\n')+'\n');
fs.copyFileSync(path.join(__dirname,'course.css'),path.join(out,'course.css'));
for(const file of ['reader.js','reading-parts.js','diagrams.js','study-model.js','study.js'])fs.copyFileSync(path.join(__dirname,file),path.join(out,file));
// Workbench lives on the math2 root only; both courses link here.
if(!is843){
 const projectRoot=path.resolve(__dirname,'../../..');
 const pointMap=buildPointMap(projectRoot);
 fs.writeFileSync(path.join(out,'point-map.js'),'window.POINT_MAP='+JSON.stringify(pointMap).replace(/</g,'\\u003c')+';');
 writeWorkbench({out,pointMap,math2:course,x843:JSON.parse(fs.readFileSync(path.resolve(__dirname,'../../843/course.json'),'utf8')),toolingDir:__dirname});
 fs.writeFileSync(path.join(projectRoot,'FUSION-COVERAGE.md'),[
  '# 融合覆盖报告','',
  `- 生成时间：${new Date().toISOString()}`,
  '- 功能来源：学习工作台（今日任务、阶段计划、成绩、错题、导入导出）与 PPT 式专注课件的交互逻辑参考 ZIP 中 React 工作台；实现为本项目原生 JS/CSS，未引入 React/Vue。',
  '- 正文来源：数学二与 843 全部教学正文、公式、例题、练习、图示仍由当前项目 `course.json` + `chapters/*.md` + 现有构建器生成。',
  `- 知识点索引：来自参考 ZIP 的 348 条知识点（政治 76、英语一 52、数学二 60、843 160）。绑定统计：已绑定 ${pointMap.counts.bound}，尚未绑定正文 ${pointMap.counts.unboundBody}，索引/待补正文 ${pointMap.counts.indexOnly}。`,
  '- 映射层：`point-id → course-id → lesson-section-id`，一个知识点可对多个讲义小节，一个综合小节可关联多个知识点；缺失映射显示「尚未绑定正文」。',
  '- 未纳入正文的 ZIP 内容：课程单元 58/59 仍为 `draft`（仅 1 个 `math-reviewed`）；来源索引含机器绝对路径与自动字幕索引，不作人工核验依据。政治、英语一仅有知识点索引，标记「索引/待补正文」。数学二 057–060（级数、曲线曲面积分等）及 843 网络扩展 5.7 在当前正式讲义中无对应正文，保持未绑定。',
  '- 大纲状态：数学二仍记录「2027 官方全文尚未取得，未完成新版逐条对齐」；843 使用已核验 2027 官方大纲，教学细目不伪装成官方逐条原文。',
  '- 存储：工作台使用 `workbench-v1`，PPT 使用独立课程键。备份 v2 可恢复已读、计时、成就、小标题和 PPT 状态，兼容 v1；导入在计时锁内合并记录，同日时长取较大值，恢复后暂停计时。',
  '','## ZIP 优点如何落地','',
  '| 能力 | 落地位置 |',
  '| --- | --- |',
  '| 今日任务 / 阶段计划 / 倒计时 | `/study.html` |',
  '| 成绩记录与趋势 | `/study.html` |',
  '| 错题回炉与跳回讲义 | `/study.html` |',
  '| JSON 备份导入导出 | `/study.html` |',
  '| 知识点索引与绑定 | `/study.html` + `point-map.js` |',
  '| PPT 式专注课件 | 每小节「专注课件」+ `ppt.js` |',
  '','## 仍待补 / 未核验','',
  '- 政治、英语一正文：待补。',
  '- ZIP draft 课程页：未并入正文。',
  '- 数学二 2027 官方大纲全文：未取得。',
  '- 自动字幕索引：仅作参考，不作为核验来源。',
  ''
 ].join('\n'));
}
if(is843){
 if(!/^#[a-f0-9]{6}$/i.test(course.theme.accent)||!/^#[a-f0-9]{6}$/i.test(course.theme.wash))throw Error('Invalid course theme');
 fs.writeFileSync(path.join(out,'843.css'),fs.readFileSync(path.join(root,'tooling/843.css'),'utf8').replaceAll('#365674',course.theme.accent).replaceAll('#EDF1F5',course.theme.wash));
 fs.copyFileSync(path.join(root,'tooling/visuals.js'),path.join(out,'diagrams.js'));
 fs.writeFileSync(path.join(out,'lesson-visuals.js'),'/* 843 uses its local diagram controller. */');
 fs.cpSync(path.join(old,'html/vendor'),path.join(out,'vendor'),{recursive:true});
 require(path.join(root,'tooling/extra-pages.cjs'))({out,shell,md,exercise,course});
}else{
// Original diagrams and the independent focus sample remain local and runnable.
let oldVisualJS=fs.readFileSync(path.join(old,'tooling/lesson-visuals.js'),'utf8').replace('.8 * 10 ** (-progress / 50)','.8 * 20 ** (-progress / 100)');
fs.writeFileSync(path.join(out,'lesson-visuals.js'),oldVisualJS);
fs.cpSync(path.join(old,'html/vendor'),path.join(out,'vendor'),{recursive:true});
for(const file of ['专注阅读-样张.html','focus-reading.css','newspaper.css'])if(fs.existsSync(path.join(old,'html',file)))fs.copyFileSync(path.join(old,'html',file),path.join(out,file));
fs.mkdirSync(path.join(out,'legacy'),{recursive:true});
for(const file of ['函数极限连续-样张.html','newspaper.css','chapter-reading.css'])fs.copyFileSync(path.join(old,'html',file),path.join(out,'legacy',file));
fs.cpSync(path.join(old,'html/vendor'),path.join(out,'legacy/vendor'),{recursive:true});
fs.writeFileSync(path.join(out,'函数极限连续-样张.html'),`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>原版讲义已迁入课程</title><script src="course-data.js"></script></head><body><p>原版讲义已迁入统一课程，正在打开对应小节。<a href="01-limits.html#function">打开函数篇</a> · <a href="legacy/函数极限连续-样张.html">查看迁移前版本</a></p><nav>${Object.entries(course.legacy).map(([oldId,newId])=>`<p id="${escape(oldId)}">${link(newId,oldId)}</p>`).join('')}</nav><script>const key=decodeURIComponent(location.hash.slice(1));location.replace(window.COURSE.legacy[key]||'01-limits.html#function');</script></body></html>`);
}
console.log(JSON.stringify({chapters:course.chapters.length,lessons:lessons.length,formulas,requirements:requirements.length,output:out},null,2));
