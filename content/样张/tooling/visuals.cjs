const svg = (id, title, description, body, height=300) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 ${height}" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${title}</title><desc id="${id}-desc">${description}</desc><style>text{font-family:"Microsoft YaHei",sans-serif;fill:#242923;font-size:20px}.axis{fill:none;stroke:#8c9389;stroke-width:1.4}.guide{fill:none;stroke:#a8b5aa;stroke-width:1.5;stroke-dasharray:5 5}.curve{fill:none;stroke:#365d49;stroke-width:3}.point{fill:#365d49;stroke:#f8f7f3;stroke-width:2}.hole{fill:#f8f7f3;stroke:#365d49;stroke-width:3}</style>${body}</svg>`;
const axes = `<path class="axis" d="M60 30V280H525"/><path class="axis" d="M55 40L60 30L65 40M515 275L525 280L515 285"/><text x="535" y="287">x</text><text x="35" y="32">y</text><text x="40" y="303">0</text><path class="guide" d="M280 280V45"/><text x="273" y="305">1</text>`;
const art = {
  function: svg('flow','函数是一条输入到输出的规则','示例：输入2，按平方规则计算2乘2，输出4。换一个输入，输出随规则改变。',`
    <path class="guide" d="M50 60H510"/>
    <text x="70" y="40">输入</text><text x="225" y="40">按照规则计算</text><text x="440" y="40">输出</text>
    <text data-role="flow-input" x="92" y="113" text-anchor="middle" style="font-size:36px">2</text>
    <rect x="175" y="74" width="210" height="60" rx="2" fill="none" stroke="#365d49"/>
    <text data-role="flow-rule" x="280" y="113" text-anchor="middle" style="font-size:28px">2 × 2</text>
    <text data-role="flow-output" x="460" y="113" text-anchor="middle" style="font-size:36px">4</text>
    <path class="curve" d="M125 104H160M152 98L160 104L152 110M395 104H429M421 98L429 104L421 110"/>`,165),
  domain: svg('interval','数轴上读懂区间','从1到2的线段。两端是空心圆，表示1和2都不取，中间的数都可以取。',`
    <path class="axis" d="M35 90H525M515 85L525 90L515 95"/>
    <path class="curve" d="M180 90H380" style="stroke-width:5"/>
    <circle class="hole" cx="180" cy="90" r="7"/><circle class="hole" cx="380" cy="90" r="7"/>
    <text x="180" y="127" text-anchor="middle">1</text><text x="380" y="127" text-anchor="middle">2</text>
    <text x="280" y="49" text-anchor="middle">中间的数可以取</text>
    <text x="280" y="168" text-anchor="middle">空心圆：端点不取</text>`,195),
  limit: svg('approach','从两边靠近同一个点','直线y=x+1在(1,2)处有一个空心点。左边的点从(0.2,1.2)出发，右边的点从(1.8,2.8)出发，都可以沿直线靠近(1,2)，但不取x=1。',`${axes}
    <path class="guide" d="M60 130H500"/><text x="34" y="137">2</text>
    <path class="curve" d="M60 205L500 55"/>
    <circle data-role="left-dot" class="point" cx="104" cy="190" r="7"/>
    <circle data-role="right-dot" class="point" cx="456" cy="70" r="7"/>
    <circle class="hole" cx="280" cy="130" r="7"/>
    <text x="302" y="117">(1, 2)</text><text x="360" y="220">y = x + 1</text>`,330),
  continuity: svg('joining','附近的趋势能不能接上这个点','默认情形：直线y=x+1在x=1处的函数值为2，实心点(1,2)与两侧接上，因此连续。切换按钮可以观察缺点、点值不对和左右不齐。',`${axes}
    <path class="guide" d="M60 160H500"/><text x="34" y="167">2</text>
    <path data-role="jump-guide" class="guide" d="M60 100H500" visibility="hidden"/><text data-role="jump-label" x="34" y="107" visibility="hidden">3</text>
    <path class="curve" d="M60 220L280 160"/><path data-role="right-curve" class="curve" d="M280 160L500 100"/>
    <circle data-role="gap-dot" class="hole" cx="280" cy="160" r="7" visibility="hidden"/>
    <circle data-role="value-dot" class="point" cx="280" cy="160" r="7"/>`,330),
};
const figure = (id, title, intro, controls, visual, result, caption) => `<figure class="learning-visual" id="visual-${id}" data-visual="${id}" aria-labelledby="visual-${id}-label"><figcaption id="visual-${id}-label"><b>${title}</b></figcaption><p>${intro}</p>${visual}<div class="visual-controls" hidden>${controls}</div>${result}<p class="visual-caption">${caption}</p></figure>`;
const figures = {
  function: figure('function','动手试一试 · 输入变了，输出怎么算','先拖动滑块选一个数，自己算出它的平方，再看图中的结果。',
    `<label for="function-input">输入的数 <output for="function-input" data-role="input-value">2</output></label><input id="function-input" type="range" min="-3" max="3" step="1" value="2"><button type="button" data-action="opposite">换成相反数</button>`,art.function,
    `<p class="visual-result" data-role="function-result" aria-live="polite">输入2，按“自己乘自己”的规则，得到4。</p>`,
    '再试试−2：它与2的输出相同。不同输入可以得到同一输出；但同一个输入按这条规则只能得到一个结果。'),
  domain: figure('domain','看图读区间 · (1, 2) 表示哪些数','数轴上，越往右数越大。绿色线段表示可以取的范围；看端点是空心还是实心，就知道端点能不能取。','',art.domain,'',
    '1.5在线段中间，可以取；1和2在空心端点上，不能取。如果端点画成实心圆，就表示那个端点也可以取。'),
  limit: figure('limit','动手看极限 · 附近越来越近，目标点可以空着','拖动滑块，观察左右两点。先看输入是否都靠近1，再看两个输出是否都靠近2。',
    `<label for="limit-progress">靠近程度 <output for="limit-progress" data-role="progress-value">0%</output></label><input id="limit-progress" type="range" min="0" max="100" step="1" value="0"><div class="visual-actions"><button type="button" data-action="play" aria-pressed="false">播放逼近</button><button type="button" data-action="reset">回到起点</button></div>`,art.limit,
    `<div class="visual-readouts"><p>从左侧：<output data-role="left-values">x = 0.200，输出 = 1.200</output></p><p>从右侧：<output data-role="right-values">x = 1.800，输出 = 2.800</output></p></div><p class="visual-result" data-role="limit-status" aria-live="polite">空心点表示原函数在x=1处没有定义。</p>`,
    '这条直线满足y=x+1，所以x与1相差多少，y就与2相差多少。x越接近1，y就越接近2；计算这个极限不要求函数在x=1处有定义。'),
  continuity: figure('continuity','切换比较 · 连续要同时检查附近和这个点','实心点表示函数在x=1处真正取到的值；空心点表示该位置不取。逐个切换，看看改动一个点能解决什么。',
    `<div class="visual-actions" role="group" aria-label="选择连续性情形"><button type="button" data-case="continuous" aria-pressed="true">两边接上</button><button type="button" data-case="missing" aria-pressed="false">少一个点</button><button type="button" data-case="wrong" aria-pressed="false">点值不对</button><button type="button" data-case="jump" aria-pressed="false">左右不齐</button></div>`,art.continuity,
    `<p class="visual-result" data-role="continuity-result" aria-live="polite">左侧趋于2，右侧也趋于2，点值为2：三者相等，所以连续。</p>`,
    '“少一个点”和“点值不对”的左右极限都为2，因此把f(1)定为2就能连续。“左右不齐”的左右极限不同，只改f(1)不能使它们相等。'),
};
module.exports={art,figures};
