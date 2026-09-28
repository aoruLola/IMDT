(() => {
 const controllers=new Map();
 function init(root=document){
 const NS='http://www.w3.org/2000/svg';
 function node(tag,attrs,text){const n=document.createElementNS(NS,tag);for(const [k,v]of Object.entries(attrs))n.setAttribute(k,v);if(text!==undefined)n.textContent=text;return n;}
 for(const figure of root.querySelectorAll('[data-diagram]')){
  if(controllers.has(figure))continue;
  const kind=figure.dataset.diagram,svg=figure.querySelector('svg.chart'),group=figure.querySelector('[data-drawing]'),slider=figure.querySelector('input'),readout=figure.querySelector('[data-readout]'),play=figure.querySelector('[data-play]');let timer=null;
  const stop=()=>{clearInterval(timer);timer=null;play.textContent='播放';play.setAttribute('aria-pressed','false');};
  function render(){const n=Number(slider.value);group.replaceChildren();
   const add=(t,a,s)=>{const e=node(t,a,s);group.append(e);return e;};
   const positive=['integral','region'].includes(kind);
   const xy=(x,y)=>kind==='tangent'?[130+x*180,285-y*60]:positive?[110+x*360,270-y*210]:[320+x*85,160-y*65];
   const line=(x1,y1,x2,y2,cls='axis')=>{const [a,b]=xy(x1,y1),[c,d]=xy(x2,y2);add('line',{x1:a,y1:b,x2:c,y2:d,class:cls});};
   const dot=(x,y)=>{const [cx,cy]=xy(x,y);add('circle',{cx,cy,r:5,class:'point'});};
   const label=(x,y,s)=>{const [a,b]=xy(x,y);add('text',{x:a,y:b},s);};
   const path=(f,a,b,cls='curve')=>{let d='';for(let i=0;i<=160;i++){const x=a+(b-a)*i/160,y=f(x);const [px,py]=xy(x,y);d+=(i?'L':'M')+px.toFixed(2)+' '+py.toFixed(2)+' ';}add('path',{d,class:cls});};
   if(kind!=='elimination'){const maxX=kind==='tangent'?2.5:positive?1.3:3.2,maxY=kind==='tangent'?4.5:positive?1.15:2.2;line(positive||kind==='tangent'?-.1:-3.2,0,maxX,0);line(0,positive||kind==='tangent'?-.1:-2.2,0,maxY);label(maxX,-.12,kind==='quadratic'&&n?'u':'x');label(.04,maxY,kind==='quadratic'&&n?'v':'y');}
   if(kind==='properties'){
    if(n===0){path(x=>x/2,-3,3);dot(-1,-.5);dot(1,.5);line(-1,-.5,1,-.5,'guide');line(1,-.5,1,.5,'guide');}
    if(n===1){path(x=>x*x/2,-1.95,1.95);dot(-1,.5);dot(1,.5);line(-1,.5,1,.5,'guide');label(-1.3,.82,'−1');label(.9,.82,'1');}
    if(n===2){path(x=>x*x*x/4,-1.95,1.95);dot(-1,-.25);dot(1,.25);line(-1,-.25,1,.25,'guide');}
    if(n===3){path(x=>Math.sin(2*x),-3,3);dot(-Math.PI/2,0);dot(Math.PI/2,0);line(-Math.PI/2,-1.4,Math.PI/2,-1.4,'other');label(-.5,-1.85,'T = π');}
    if(n===4){path(x=>Math.sin(2*x),-3,3);line(-3,1,3,1,'guide');line(-3,-1,3,-1,'guide');label(2.1,1.3,'M = 1');label(2.3,-1.4,'−1');}
   }
   if(kind==='tangent'){const h=[1,.5,.2,.05][n],m=2+h;path(x=>x*x,-.4,2.1);path(x=>1+2*(x-1),.55,2.1,'guide');path(x=>1+m*(x-1),.7,2.1,'other');dot(1,1);dot(1+h,(1+h)**2);label(-.13,-.3,'0');label(.97,-.3,'1');label(1.97,-.3,'2');label(.85,1.4,'(1,1)');}
   if(kind==='shape'){const x=[-1.5,-1,0,1,1.5][n],y=x**3-3*x,m=3*x*x-3;path(t=>t**3-3*t,-2,2);path(t=>y+m*(t-x),x-.45,x+.45,'other');dot(x,y);}
   if(kind==='integral'){const count=[2,4,8,16,32][n];for(let k=1;k<=count;k++){const [x,y]=xy((k-1)/count,(k/count)**2);add('rect',{x,y,width:360/count,height:210*(k/count)**2,class:'shade'});}path(x=>x*x,0,1.05);const sum=(count+1)*(2*count+1)/(6*count**2);label(1,-.15,'1');}
   if(kind==='region'){const P=[[0,0],[0,1],[1,1]].map(p=>xy(...p).join(',')).join(' ');add('polygon',{points:P,class:'shade'});if(n===0){line(.5,.5,.5,1,'curve');}else{line(0,.5,.5,.5,'curve');}label(1,-.15,'1');label(-.1,1,'1');}
   if(kind==='matrix'){const a=1+n/2;add('polygon',{points:[[0,0],[1,0],[1,1],[0,1]].map(p=>xy(...p).join(',')).join(' '),class:'guide'});add('polygon',{points:[[0,0],[a,0],[a,1],[0,1]].map(p=>xy(...p).join(',')).join(' '),class:'shade'});line(0,0,a,1,'curve');dot(a,1);}
   if(kind==='eigen'){const v=[[1,0],[1,1],[0,1]][n];line(0,0,...v,'other');line(0,0,2*v[0],v[1],'curve');dot(...v);dot(2*v[0],v[1]);}
   if(kind==='quadratic'){let d='';for(let i=0;i<=200;i++){const t=2*Math.PI*i/200,u=Math.cos(t),v=Math.sin(t)/Math.sqrt(2),x=n?u:u-v,y=v;const [a,b]=xy(x,y);d+=(i?'L':'M')+a+' '+b+' ';}add('path',{d:d+'Z',class:'shade'});}
   if(kind==='elementary'){
    const f=[x=>x*x,x=>x*x*x,x=>1/x,Math.exp,Math.log,Math.sin,Math.atan][n];
    const spans=[[-1.45,1.45],[-1.3,1.3],[-3,-.46],[-3,.75],[.15,3],[-3,3],[-3,3]][n];path(f,...spans);if(n===2)path(f,.46,3);

   }
   if(kind==='elimination'){const rows=[['1   1 │  3','2  −1 │  0'],['1   1 │  3','0  −3 │ −6'],['1   1 │  3','0   1 │  2'],['1   0 │  1','0   1 │  2']][n];add('text',{x:190,y:120},rows[0]);add('text',{x:190,y:170},rows[1]);add('path',{d:'M170 85H155V190H170M380 85H395V190H380',class:'curve'});}
   const frame=figure.querySelector('template[data-frame="'+n+'"]');
   readout.replaceChildren(frame.content.cloneNode(true));
   svg.querySelector('desc').textContent=frame.dataset.label;
   slider.setAttribute('aria-valuetext',frame.dataset.label);
  }
  slider.addEventListener('input',()=>{stop();render();});figure.querySelector('[data-step]').addEventListener('click',()=>{stop();slider.value=(Number(slider.value)+1)%(Number(slider.max)+1);render();});figure.querySelector('[data-reset]').addEventListener('click',()=>{stop();slider.value=0;render();});
  play.addEventListener('click',()=>{if(timer){stop();return;}if(Number(slider.value)===Number(slider.max))slider.value=0;render();play.textContent='暂停';play.setAttribute('aria-pressed','true');timer=setInterval(()=>{if(Number(slider.value)>=Number(slider.max)){stop();return;}slider.value=Number(slider.value)+1;render();},1400);});
  const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)stop();});observer.observe(figure);
  controllers.set(figure,{stop,observer});render();
 }
 }
 function stop(root=document){for(const [el,c]of controllers)if(root.contains(el))c.stop();}
 function destroy(root){for(const [el,c]of controllers)if(root.contains(el)){c.stop();c.observer.disconnect();controllers.delete(el);}}
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 for(const event of ['readingpartchange','lessonchange'])document.addEventListener(event,()=>{for(const [el,c]of controllers)if(el.closest('[hidden]')||!el.querySelector('svg').getClientRects().length)c.stop();});
 globalThis.CourseDiagrams={init,stop,destroy};
 init();
})();
