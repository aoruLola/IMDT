// Export only generated public assets; no source, .env, or browser records.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../../..');
const stamp=new Date().toISOString().replace(/[:.]/g,'-');
const out=path.join(root,'exports','IMDT-static-'+stamp);
fs.mkdirSync(out,{recursive:true});
fs.cpSync(path.join(root,'content/课程/site'),out,{recursive:true});
fs.cpSync(path.join(root,'content/843/site'),path.join(out,'843'),{recursive:true});
fs.writeFileSync(path.join(out,'serve.cjs'),String.raw`
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=__dirname,port=Number(process.env.STATIC_PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf','.c':'text/plain; charset=utf-8','.sql':'text/plain; charset=utf-8','.pdf':'application/pdf'};
const server=http.createServer((req,res)=>{
 try{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
  let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(name==='/843'){res.writeHead(302,{Location:'/843/'});res.end();return;}
  if(name.endsWith('/'))name+='index.html';
  const file=path.resolve(root,'.'+name),relative=path.relative(root,file),type=types[path.extname(file)];
  if(relative.startsWith('..')||path.isAbsolute(relative)||!type||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end('Not found');return;}
  res.setHeader('Content-Type',type);res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res);
 }catch{res.writeHead(400);res.end('Bad request');}
});
server.on('error',e=>{console.error(e.code==='EADDRINUSE'?'Port is in use. Stop the other preview, or set STATIC_PORT=4174.':e.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log('Open http://127.0.0.1:'+port+'/study.html  (Ctrl+C to stop)'));
`.trimStart());
fs.writeFileSync(path.join(out,'启动预览.cmd'),'@echo off\r\ncd /d "%~dp0"\r\nwhere node >nul 2>nul\r\nif errorlevel 1 (echo Please install Node.js to use the local preview. & pause & exit /b 1)\r\nnode serve.cjs\r\npause\r\n');
fs.writeFileSync(path.join(out,'打开说明.txt'),`数学二 + 843 静态版\n\n本地打开\n1. 解压整个压缩包。\n2. 双击“启动预览.cmd”（需要已安装 Node.js，无需 npm install 或构建）。\n3. 浏览器打开 http://127.0.0.1:4173/study.html 。\n4. 使用期间保持预览窗口打开。\n\n如果4173端口已被当前项目占用，可继续访问当前项目；要运行本压缩包，请先关闭原预览，或在本目录终端设置 STATIC_PORT=4174 后运行 node serve.cjs。\n\n静态部署\n将本目录中的网站文件上传到静态服务器的网站根目录。数学二入口是 /index.html，843入口是 /843/index.html，工作台是 /study.html。保留843、vendor等子目录。serve.cjs、启动预览.cmd、打开说明.txt不必上传。\n公式、字体、图示均为本地资源，不需要CDN。请通过HTTP本地预览或HTTPS静态托管访问；直接双击HTML不能保证跨科链接、计时及记录正常运行。\n\n学习记录\n压缩包只含网站，不含个人浏览器记录。沿用相同浏览器和 http://127.0.0.1:4173 地址时可继续使用原记录；换电脑、浏览器、端口或域名前，请在旧站工作台导出JSON，再到新站导入。\n\n生成时间：${new Date().toISOString()}\n`);
console.log(out);
