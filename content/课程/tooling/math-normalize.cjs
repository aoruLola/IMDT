// Normalize the limited plain-text math shorthand used in teaching prose.
// Explicit $TeX$ is never rewritten. Unknown syntax still fails strict KaTeX.
const supers={'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','ⁿ':'n','ˣ':'x','ʸ':'y','ᵀ':'T','⁻':'-'};
const subs={'₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9','ₙ':'n','ₑ':'e','ᵢ':'i','ⱼ':'j','ₖ':'k','ₘ':'m','ₓ':'x','ᵧ':'y'};
function tex(s){
 s=s.replace(/√\(([^()]*)\)/g,'\\sqrt{$1}');
 s=s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹ⁿˣʸᵀ⁻]+/g,m=>`^{${[...m].map(c=>supers[c]).join('')}}`).replace(/[₀₁₂₃₄₅₆₇₈₉ₙₑᵢⱼₖₘₓᵧ]+/g,m=>`_{${[...m].map(c=>subs[c]).join('')}}`);
 s=s.replace(/∫(_\{[^}]+\})∞/g,'∫$1^{∞}');
 s=s.replace(/\^\(([^()]*)\)/g,'^{$1}');
 s=s.replace(/∫/g,'\\int ').replace(/∞/g,'\\infty ').replace(/≤/g,'\\le ').replace(/≥/g,'\\ge ').replace(/≠/g,'\\ne ').replace(/±/g,'\\pm ');
 s=s.replace(/(arcsin|arccos|arctan|ln|log|sin|cos|tan)(?=[\s(0-9αβγθx]|$)/g,'\\$1 ');
 return s;
}
module.exports=function normalize(text){return text.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]+\$|\[\[[^\]\n]+(?:\],\[[^\]\n]+)+\]\])/g).map(part=>part.startsWith('$')||part.startsWith('[[')?part:part.replace(/[A-Za-z0-9αβγδλμπθξρσφψκΣ∫∞√⁰¹²³⁴⁵⁶⁷⁸⁹ⁿˣʸᵀ₀₁₂₃₄₅₆₇₈₉ₙₑᵢⱼₖₘₓᵧ⁻^{}()[\]+\-*/=<>≤≥≠±|.,' \t]+/g,run=>{
 if(!run.includes('^'))return run;
 const lead=run.match(/^\s*/)[0],trail=run.match(/\s*$/)[0],value=run.trim();
 return lead+'$'+tex(value)+'$'+trail;
})).join('');};
