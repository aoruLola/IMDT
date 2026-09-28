// 原创讲义的结构化内容源。正文模块与构建器分离；生成 Markdown 便于审校。
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),chapters=[];let current;
function chapter(id,title,kind,refs){current={id:'843-'+id,number:chapters.length,title,kind,refs,file:'chapters/'+id+'.md',lessons:[]};chapters.push(current);}
function lesson(id,title,topics,goal,question,explain,steps,examples,exercises,recap,visual,extra={}){
 if(examples.length!==2||exercises.length!==3)throw Error(id+' teaching incomplete');
 const previous=current.lessons.at(-1);const l={id:'843-'+id,title,topics:topics.split('；'),prerequisites:previous?[previous.id]:[],scope:current.number===0?'预备基础':'大纲要求的教学展开',kind:current.number>=12?'设计分析':'技术讲解',references:current.refs,...extra,visual};
 l.fields={'目标':goal,'问题':question,'讲解':explain,'推导':steps,'例题1':examples[0],'例题2':examples[1],...Object.fromEntries(exercises.map((e,i)=>['练习'+(i+1),e[0]+'\n提示：'+e[1]+'\n解析：'+e[2]])),'回顾':recap};current.lessons.push(l);
}
for(const name of ['foundations','computing','design'])require('./text/'+name+'.cjs')({chapter,lesson});
require('./text/deeper.cjs')({at:n=>{current=chapters[n];},lesson});
require('./supplements.cjs')(chapters);
const entryPrereqs=[[],['counting'],['conditional'],['moments'],['symbols'],['symbols'],['c-memory','c-control'],['algorithm','stack-queue'],['cpu','stack-queue'],['symbols'],['c-control','relational'],['sample-distributions','relational'],[],['design-history','visual-language'],['design-function'],['visual-language'],['evaluate','answer-layout','neural-generative']];
chapters.forEach((c,i)=>c.lessons[0].prerequisites=entryPrereqs[i].map(id=>'843-'+id));
const sources=require('./sources.cjs');const syllabusSource=sources.find(s=>s.id==='syllabus');
fs.mkdirSync(path.join(root,'chapters'),{recursive:true});
for(const c of chapters){fs.writeFileSync(path.join(root,c.file),'# '+c.title+'\n\n'+c.lessons.map(l=>'## '+l.id+' | '+l.title+' | '+l.topics.join('；')+'\n\n'+Object.entries(l.fields).map(([k,v])=>'### '+k+'\n'+v+'\n').join('\n')).join('\n'));c.lessons=c.lessons.map(({fields,...l})=>l);}
const course={courseId:'843',basePath:'/843/',displayName:'843',title:'互联网＋创新设计专业基础综合',target:'2027 清华大学深圳国际研究生院 / 843',symbolLesson:'843-symbols',theme:{accent:'#365674',wash:'#EDF1F5'},storage:{reading:'843-course-v1',study:'843-study-v1',parts:'843-reading-part-v1:'},syllabus:{version:'2027',url:syllabusSource.url,checked:'2026-09-16',status:'依据已核验的2027官方大纲；教学细分与原创训练不等同于官方逐项要求。'},sources,legacy:{},chapters};
fs.writeFileSync(path.join(root,'course.json'),JSON.stringify(course,null,2)+'\n');
console.log('843 source: '+chapters.length+' chapters, '+chapters.reduce((n,c)=>n+c.lessons.length,0)+' lessons');
