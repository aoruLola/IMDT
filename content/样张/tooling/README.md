# 讲义公式排版

页面使用 KaTeX 在构建时生成 HTML 与 MathML。字体和样式保存在页面旁的 `vendor/katex` 中，直接打开生成的 HTML 也可以阅读，无需访问 CDN。

## 编辑与生成

编辑 `../html/函数极限连续.source.html`，不要直接修改生成的 `函数极限连续-样张.html`。

`build.cjs` 会通过 `chapter-layout.cjs` 将完整稿组织为18个基础小节和13个可选拓展页面（含拓展目录）。每节添加目标、回顾和前后导航，构建时检查所有原始公式仍然存在。分节行为由 `chapter-reading.js` 实现，样式为 `../html/chapter-reading.css`。支持原有锚点、全文切换、浏览器前后退与本地阅读进度记忆。修改正文结构后应检查分节边界。Markdown仍作为连续阅读的内容稿导出。

- 行内公式：`<span class="math-inline" data-math="inline">\frac{1}{x}</span>`
- 独立公式：`<span class="formula" data-math="display">\lim_{x\to0}\frac{\sin x}{x}=1</span>`
- 多行公式可用 `aligned` 或 `gathered`，分段函数用 `cases`。
- 公式正文是 LaTeX；HTML 中的小于号需写作 `&lt;`。

## 独立专注阅读样张

`../html/专注阅读.source.html`、`../html/focus-reading.css` 和 `focus-reading.js` 为单独的四节极限入门样张，不改变原版讲义。运行 `node build-focus.cjs` 生成 `../html/专注阅读-样张.html`，复用现有本地 KaTeX 资源。页面提供可切换的专注/全文阅读、手动图示步骤、即时练习反馈，以及当前浏览器内的阅读位置与自评进度保存。页脚可以重置样张进度。只需验证桌面排版。

## 原版图示与交互

源页面包含四幅内联 SVG，分别讲输入输出、开区间、极限逼近和连续性。交互代码在 `lesson-visuals.js`，构建时内嵌到页面，因此直接打开本地 HTML 也能使用。动画仅在点击播放后运行，支持暂停、重置和减少动态效果设置；离开图示或隐藏页面时暂停。

`assets/入门-*.svg` 是与初始状态对应的独立静态插图。编辑主稿后，运行 `node export-markdown.cjs` 可同步 Markdown 阅读版。上一版较密集的 Markdown 内容保存在 `第01章-函数极限连续-扩展参考稿.md`，供后续编写拓展内容时参考。

在此目录执行：

```sh
npm ci --ignore-scripts
node build.cjs
node preview.cjs
```

预览地址为 `http://127.0.0.1:4173/`。构建遇到无效 LaTeX 会报错，不会默默留下未渲染公式。

参考：[KaTeX API](https://katex.org/docs/api)、[KaTeX 本地字体与样式](https://katex.org/docs/node)。KaTeX 的授权文本随资源保存在 `vendor/katex/LICENSE`。
