# Vue 静态版

## 本地开发与编译

需要 Node.js 22.12+（本次使用 Node.js 24）。首次执行 `npm run setup`。

```sh
npm run build
npm run preview
```

预览地址为 `http://127.0.0.1:4174/`。原先的 4173 预览使用
`npm run preview:legacy`；两个端口的浏览器记录互不共享，可通过工作台备份迁移。

修改 Vue 组件后可只运行 `npm run build:vue`，刷新预览。
修改讲义正文后运行完整 `npm run build`。

## 代码组织

- `src/Reader.vue`：Vue 阅读控制、已读状态和章进度。
- `src/ReadingPart.vue`：小标题图标、完成、折叠与深链接展开。
- `src/useReader.js`：导航、检索、旧地址和旧学习记录兼容。
- `vite.config.mjs`：Vue 单文件组件编译与本地运行时打包。
- `content/`：原有课程清单、讲义、公式和图形源码。
- `scripts/assemble-static.cjs`：将两科预生成正文合并成静态站。
- `dist/`：唯一部署目录，包含首页、843、字体和编译后的 Vue。

采用 Vue 渐进式多页面结构：正文与 KaTeX 预渲染到 HTML，Vue 管理阅读交互，
计时器、图示、PPT 和工作台继续复用现有经过校验的模块，不重复实现业务规则。
两个旧阅读脚本不会在 Vue 版页面执行。独立历史样张保持原实现。
已有页面路径、锚点和 localStorage 键不变，不采用 SPA 路由。

## 服务器部署

运行 `npm run package` 生成 `exports/IMDT-Vue-Nginx-日期.zip`。
包内 `html/` 是完整网站，`nginx.conf.example` 和部署说明放在外面。
上传 `html/` 里的内容到 Nginx 的 `root`，服务器不需要 Node。
请部署到域名根目录，并启用 HTTPS 以使用跨窗口计时协调。

打包器使用 ZIP 标准的 `/` 路径，自动解压并逐文件校验 SHA-256。
`npm run build` 执行原课程检查和静态链接检查；界面变更还需桌面浏览器回归。
