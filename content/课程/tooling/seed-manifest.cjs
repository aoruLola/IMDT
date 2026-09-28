// Run only when adding/reordering curriculum files, not during an ordinary build.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const entries=['p-algebra','p-logic','continuity','higher-differential','lhopital','derivative-rules','rational-integrals','improper','fundamental','multivariable-extrema','improper','p-algebra','elimination','cofactor-inverse','rank-basis','nonhomogeneous-system','symmetric-eigen','positive-definite'];
const chapters=fs.readdirSync(path.join(root,'chapters')).filter(f=>f.endsWith('.md')).sort().map((file,i)=>{
 const text=fs.readFileSync(path.join(root,'chapters',file),'utf8');
 const lessons=[...text.matchAll(/^## ([\w-]+) \| (.+?) \| (.+)$/gm)].map((m,j,all)=>({id:m[1],title:m[2].trim(),topics:m[3].trim().split('；'),prerequisites:j?[all[j-1][1]]:i?[entries[i]]:[]}));
 return {id:file.replace('.md',''),number:i,title:text.match(/^# (.+)/)[1].trim(),file:'chapters/'+file,kind:i===0?'预备知识':i===17?'综合复习':'正式课程',lessons};
});
const legacy={top:'function',start:'p-logic',function:'function',range:'function',domain:'function',limit:'limit','limit-visual':'limit','limit-explained':'limit','limit-sides':'limit',continuity:'continuity','continuity-value':'continuity',method:'limit-rules',factor:'limit-rules',rationalize:'limit-rules',practice:'limit-rules','practice-factor':'limit-rules','practice-root':'limit-rules','practice-continuity':'continuity',summary:'continuity',advanced:'properties','extra-function':'properties','extra-domain':'function','extra-sequence':'sequence','extra-definition':'limit','extra-properties':'limit-rules','extra-continuity':'continuity','extra-equivalence':'important-limits','extra-taylor':'taylor','extra-squeeze':'sequence','extra-integral':'review-methods','extra-methods':'lhopital','extra-practice':'review-methods'};
legacy['extra-methods']='review-methods';
fs.writeFileSync(path.join(root,'course.json'),JSON.stringify({title:'数学二 · 从理解到会做',target:'2027 全国统考数学二（302）',syllabus:{version:'2018（大学公开转载，PDF正文标注）',url:'https://jtb.ncbcjxau.edu.cn/uploadfile/3/Attachment/0efe984dad.pdf',official:'https://www.neea.edu.cn/html1/category/1509/6235-1.htm',checked:'2026-09-16',status:'2027 官方全文尚未取得，未完成新版逐条对齐；2018 仅作为历史范围核对，不沿用旧试卷结构。'},chapters,legacy},null,2)+'\n');
console.log('Wrote curriculum manifest:',chapters.length,'chapters');
