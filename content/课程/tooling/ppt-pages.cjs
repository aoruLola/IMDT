/* Build 7-page focus courseware data from official lesson fields.
   Page order: 问题 → 直觉 → 正式 → 跟着做 → 示范 → 自己回答 → 回顾. */

const workedPrompts = require('./worked-prompts.cjs');
function splitExercise(raw) {
  const [prompt, rest = ''] = String(raw || '').split('\n提示：');
  const [hint, solution] = rest.split('\n解析：');
  return {
    prompt: (prompt || '').trim(),
    hint: (hint || '').trim(),
    solution: (solution || '').trim(),
  };
}

function truncateParagraphs(md, maxChars = 220) {
  const text = String(md || '').trim();
  if (text.length <= maxChars) return text;
  const paras = text.split(/\n\s*\n/);
  let out = '';
  for (const p of paras) {
    if (out && out.length + p.length > maxChars) break;
    out = out ? out + '\n\n' + p : p;
  }
  return out || text.slice(0, maxChars);
}

/**
 * @param {object} opts
 * @param {object} opts.lesson - course lesson metadata + fields
 * @param {(md:string)=>string} opts.md - markdown/math renderer
 * @param {(lesson:object)=>string} opts.visual
 * @param {object|null} opts.nextLesson
 * @param {object[]} opts.prereqLessons
 * @param {(id:string,label?:string)=>string} opts.link
 */
function buildPptPages({ lesson, md, visual, nextLesson, prereqLessons, link }) {
  const f = lesson.fields;
  const isDesign = lesson.kind === '设计分析' || lesson.kind === '手绘实践';
  const exTitle = isDesign ? '入门示范' : '入门例题';
  const practiceTitles = isDesign
    ? ['概念判断', '案例分析', '方案与绘图实践']
    : ['概念判断', '计算与执行过程', '条件与错误辨析'];

  // Worked examples do not use the exercise hint/solution delimiters.
  // Read an explicit question, or the source's first complete question sentence.
  const prompt = workedPrompts[lesson.id] || workedPrompts[lesson.id.replace(/^843-/, '')] || f['例题1'].match(/^[\s\S]*?[。？]/)?.[0];
  if (!prompt) throw Error(`${lesson.id}: missing worked-example question`);
  const pr1 = splitExercise(f['练习1']);

  const pages = [];

  pages.push({
    id: 'problem',
    kind: 'problem',
    kicker: '01 / 先看问题',
    title: '为什么现在需要这个知识点？',
    bodyHtml: md(f['问题']),
    goalHtml: md(f['目标']),
  });

  const vis = visual(lesson) || '';
  const explainIntro = truncateParagraphs(f['讲解'], 180);
  pages.push({
    id: 'intuition',
    kind: 'intuition',
    kicker: '02 / 建立直觉',
    title: '先形成一个画面',
    bodyHtml: (vis ? `<div class="ppt-visual">${vis}</div>` : '') + md(explainIntro),
    hasVisual: Boolean(vis),
  });

  pages.push({
    id: 'formal',
    kind: 'formal',
    kicker: '03 / 正式表达',
    title: isDesign ? '怎样做 · 条件与结论' : '定义、公式与使用条件',
    bodyHtml: md(f['讲解']),
  });

  pages.push({
    id: 'method',
    kind: 'method',
    kicker: '04 / 跟着做',
    title: isDesign ? '分步推演' : '方法选择与分步动作',
    bodyHtml: md(f['推导']),
  });

  // Worked example: show question first, then stepwise reveal of solution.
  pages.push({
    id: 'worked',
    kind: 'worked',
    kicker: `05 / ${exTitle}`,
    title: `${exTitle} / 1`,
    promptHtml: md(prompt),
    solutionHtml: md(f['例题1']),
    variantHtml: md(f['例题2']),
  });

  pages.push({
    id: 'practice',
    kind: 'practice',
    kicker: '06 / 自己回答',
    title: practiceTitles[0],
    promptHtml: md(pr1.prompt),
    hintHtml: md(pr1.hint),
    solutionHtml: md(pr1.solution),
    practiceId: `${lesson.id}-practice1`,
  });

  const nextHtml = nextLesson
    ? `<p>下一问：${link(nextLesson.id, nextLesson.title)}</p>`
    : '<p>本章到这里，可回到总目录或知识点索引。</p>';
  const preHtml = prereqLessons.length
    ? `<p>前置知识：${prereqLessons.map((p) => link(p.id, p.title)).join(' · ')}</p>`
    : '<p>本节没有额外前置。</p>';

  pages.push({
    id: 'recap',
    kind: 'recap',
    kicker: '07 / 回顾与下一问',
    title: '带走这一句',
    bodyHtml: md(f['回顾']),
    linksHtml: preHtml + nextHtml,
  });

  // Drop empty pages rather than leave blanks (except problem/recap anchors).
  return pages.filter((p, i) => {
    if (p.kind === 'problem' || p.kind === 'recap') return true;
    const text = (p.bodyHtml || p.promptHtml || '').replace(/<[^>]+>/g, '').trim();
    return text.length > 0;
  });
}

module.exports = { buildPptPages, splitExercise };
