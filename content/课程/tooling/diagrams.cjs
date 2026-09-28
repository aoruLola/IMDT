const configs={
 properties:['函数性质图示','','比较的性质',['单调','偶函数','奇函数','周期','有界']],
 elementary:['一张坐标纸，比较七种基本形状','','选择函数',['平方','立方','倒数','指数','对数','正弦','反正切']],
 tangent:['从割线走向切线','固定点 $(1,1)$，让另一点沿曲线 $y=x^2$ 靠近它。','间距阶段',['h = 1','h = 0.5','h = 0.2','h = 0.05']],
 shape:['上升与弯曲是两件事','曲线为 $y=x^3-3x$，短线表示当前位置的切线。','观察位置',['x = -1.5','x = -1','x = 0','x = 1','x = 1.5']],
 integral:['让小矩形越来越细','用矩形面积之和近似计算 $y=x^2$ 在 $[0,1]$ 上的曲线下面积。','切分份数',['2 份','4 份','8 份','16 份','32 份']],
 region:['同一个三角形，两种切法','三角形的三条边是 $x=0$、$y=x$ 和 $y=1$。','切片方向',['竖直切片','水平切片']],
 matrix:['线性变换怎样改变一个方格','虚线方格是原图，绿色方格是横向拉伸后的图形。','变换阶段',['原图','完成一半','完成变换']],
 elimination:['一步一步消元','','消元步骤',['写出增广矩阵','第二行减2倍第一行','第二行除以-3','第一行减第二行']],
 eigen:['哪些方向变换后仍在原直线上','矩阵 $A=\\begin{pmatrix}2&0\\\\0&1\\end{pmatrix}$ 把横坐标乘 $2$，纵坐标保持不变。','输入方向',['横轴 (1,0)','斜向 (1,1)','纵轴 (0,1)']],
 quadratic:['从交叉项到独立平方','比较 $x^2+2xy+3y^2=1$ 换元前后的图形。','坐标表示',['原坐标 x,y','新坐标 u,v']]
};

const katex=require('../../样张/tooling/node_modules/katex');
const frameCopy=require('./diagram-copy.cjs');
const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const inline=text=>text.split(/(\$[^$]+\$)/g).map(p=>p.startsWith('$')?katex.renderToString(p.slice(1,-1),{throwOnError:true,strict:'error',trust:false,output:'htmlAndMathml'}):escape(p)).join('');
module.exports=kind=>{
 const [title,intro,label,steps]=configs[kind],frames=frameCopy[kind];
 if(frames.length!==steps.length)throw Error('Diagram frame mismatch: '+kind);
 const templates=frames.map((text,i)=>'<template data-frame="'+i+'" data-label="'+escape(steps[i])+'">'+inline(text)+'</template>').join('');
 return '<figure class="visual" data-diagram="'+kind+'"><h3>'+title+'</h3>'+(intro?'<p>'+inline(intro)+'</p>':'')+'<svg class="chart" viewBox="0 0 640 320" role="img" aria-labelledby="'+kind+'-svg-title '+kind+'-svg-desc"><title id="'+kind+'-svg-title">'+title+'</title><desc id="'+kind+'-svg-desc">'+steps[0]+'</desc><g data-drawing></g></svg><div class="controls"><label for="diagram-'+kind+'">'+label+'</label><input id="diagram-'+kind+'" type="range" min="0" max="'+(steps.length-1)+'" step="1" value="0" aria-label="'+label+'"><button type="button" data-step>下一步</button><button type="button" data-play aria-pressed="false">播放</button><button type="button" data-reset>重置</button></div>'+templates+'<p class="diagram-readout" aria-live="polite" data-readout>'+inline(frames[0])+'</p></figure>';
};
