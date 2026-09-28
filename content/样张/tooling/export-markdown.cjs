const fs=require('node:fs'),path=require('node:path');
const {parseHTML}=require('linkedom');
const root=path.resolve(__dirname,'..');
const {document}=parseHTML(fs.readFileSync(path.join(root,'html/函数极限连续.source.html'),'utf8'));
function children(node){return [...node.childNodes].map(convert).join('');}
function convert(node){
  if(node.nodeType===3)return node.textContent;
  if(node.nodeType!==1)return '';
  if(node.hasAttribute('data-math'))return node.dataset.math==='display'?`\n\n$$\n${node.textContent.trim()}\n$$\n\n`:`\\(${node.textContent.trim()}\\)`;
  if(['SVG','SCRIPT','STYLE'].includes(node.tagName)||node.classList.contains('visual-controls'))return '';
  const text=children(node);
  if(/^H[1-6]$/.test(node.tagName))return '\n\n'+'#'.repeat(Number(node.tagName[1]))+' '+text.trim()+'\n\n';
  if(node.tagName==='P')return '\n\n'+text.trim()+'\n\n';
  if(['B','STRONG'].includes(node.tagName))return '**'+text+'**';
  if(node.tagName==='A')return text;
  if(node.tagName==='BR')return '  \n';
  if(node.tagName==='LI')return text.trim();
  if(['UL','OL'].includes(node.tagName))return '\n\n'+[...node.children].map((n,i)=>(node.tagName==='OL'?`${i+1}. `:'- ')+convert(n)).join('\n')+'\n\n';
  if(node.tagName==='TABLE'){
    const rows=[...node.querySelectorAll('tr')].map(row=>[...row.children].map(cell=>children(cell).replace(/\|/g,'\\|').trim()));
    return '\n\n'+rows.map((row,i)=>'| '+row.join(' | ')+' |'+(i===0?'\n| '+row.map(()=>'---').join(' | ')+' |':'')).join('\n')+'\n\n';
  }
  if(node.tagName==='FIGURE'){
    const paragraphs=[...node.querySelectorAll(':scope > p')].map(convert).join('');
    return '\n\n### '+node.querySelector('figcaption').textContent+'\n\n'+`![${node.querySelector('figcaption').textContent}](assets/入门-${node.dataset.visual}.svg)\n\n`+paragraphs+'\n\n'+(node.dataset.visual==='domain'?'':'网页版提供滑块或切换按钮；此处为初始状态的静态图。\n\n');
  }
  if(node.tagName==='DETAILS')return '\n\n<details>\n<summary>'+node.querySelector('summary').textContent+'</summary>\n\n'+[...node.children].filter(n=>n.tagName!=='SUMMARY').map(convert).join('')+'\n\n</details>\n\n';
  return text;
}
const out='# 第1章 函数、极限与连续 · 零基础阅读版\n\n'+convert(document.querySelector('article')).replace(/\n[ \t]+\n/g,'\n\n').replace(/\n{3,}/g,'\n\n').trim()+'\n';
fs.writeFileSync(path.join(root,'第01章-函数极限连续-样张.md'),out);
console.log('Exported beginner reading order and static SVG figures to Markdown.');
