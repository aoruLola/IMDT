/* 抽取全部文字知识到 knowledge-base/，生成可独立阅读的 Markdown 知识库。
   每个教学小节一个文件；另收录章末训练、真题解析、843案例与模拟卷、
   知识点索引与大纲对照。只读取源稿与 tooling 数据，不改动原站。 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const outRoot = path.join(root, 'knowledge-base');

const mathCourse = require(path.join(root, 'content/课程/course.json'));
const x843Course = require(path.join(root, 'content/843/course.json'));
const exams = require(path.join(root, 'content/课程/tooling/exams.cjs'));
const training = require(path.join(root, 'content/课程/tooling/training.cjs'));
const requirements = require(path.join(root, 'content/课程/tooling/requirements.cjs'));
const points = require(path.join(root, 'content/课程/tooling/knowledge-points.json'));
const { MATH2_POINT_LESSONS, X843_POINT_LESSONS, SUBJECT_META } = require(path.join(root, 'content/课程/tooling/point-map.cjs'));
const x843Training = require(path.join(root, 'content/843/tooling/training.cjs'));
const cases = require(path.join(root, 'content/843/tooling/cases.cjs'));
const mocks = require(path.join(root, 'content/843/tooling/mocks.cjs'));
const x843Requirements = require(path.join(root, 'content/843/tooling/requirements.cjs'));

const stats = { lessons: 0, training: 0, exams: 0, cases: 0, mockQuestions: 0, points: 0, requirements: 0, warnings: [] };

function write(rel, text) {
  const file = path.join(outRoot, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text.replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, '') + '\n', 'utf8');
}

function yamlList(arr) {
  return '[' + arr.join(', ') + ']';
}

/* ---------- 小节正文 ---------- */

function splitChapter(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const chapterTitle = (lines[0].match(/^# (.+)$/) || [])[1] || '';
  const sections = [];
  let intro = [];
  let cur = null;
  for (const line of lines.slice(1)) {
    const m = line.match(/^## (.+)$/);
    if (m) {
      if (cur) sections.push(cur);
      cur = { heading: m[1], lines: [] };
    } else if (cur) {
      cur.lines.push(line);
    } else {
      intro.push(line);
    }
  }
  if (cur) sections.push(cur);
  return { chapterTitle, intro: intro.join('\n').trim(), sections };
}

function lessonByHeading(sections) {
  const map = new Map();
  for (const s of sections) {
    const id = s.heading.split('|')[0].trim();
    map.set(id, s);
  }
  return map;
}

function buildSubject(subjectLabel, course, courseDir, outDir) {
  const courseIndex = [];
  for (const ch of course.chapters) {
    const mdPath = path.join(root, courseDir, ch.file);
    const { chapterTitle, intro, sections } = splitChapter(fs.readFileSync(mdPath, 'utf8'));
    const byId = lessonByHeading(sections);
    const chapterFolder = `${ch.id}`;
    const lessonRows = [];

    ch.lessons.forEach((l, i) => {
      const sec = byId.get(l.id);
      if (!sec) {
        stats.warnings.push(`缺少小节正文: ${courseDir} ${ch.id} / ${l.id}`);
        return;
      }
      const seq = String(i + 1).padStart(2, '0');
      const rel = `${outDir}/${chapterFolder}/${seq}-${l.id}.md`;
      const body = [`---`,
        `subject: ${subjectLabel}`,
        `chapter: ${ch.id} ${chapterTitle}`,
        `lesson: ${l.id}`,
        `title: ${l.title}`,
        `topics: ${yamlList(l.topics)}`,
        `prerequisites: ${l.prerequisites && l.prerequisites.length ? yamlList(l.prerequisites) : '[]'}`,
        `---`, ``,
        `# ${chapterTitle}`, ``,
        `## ${sec.heading}`, ``,
        sec.lines.join('\n').trim(), ``].join('\n');
      write(rel, body);
      stats.lessons++;
      lessonRows.push({ id: l.id, seq, title: l.title, topics: l.topics, prereq: l.prerequisites || [], rel, file: `${seq}-${l.id}.md` });
    });

    // 章末训练（按章序号取）
    const tr = (subjectLabel === '数学二' ? training : x843Training)[ch.number];
    if (tr) {
      const [prompt, hint, solution] = tr;
      const rel = `${outDir}/${chapterFolder}/章末训练.md`;
      write(rel, [
        `---`, `subject: ${subjectLabel}`, `chapter: ${ch.id} ${chapterTitle}`, `type: 章末综合训练`, `---`, ``,
        `# ${chapterTitle} · 章末综合训练`, ``,
        `## 原创综合训练`, ``, `**题目**`, ``, prompt.trim(), ``,
        `**提示**`, ``, hint.trim(), ``,
        `**解析**`, ``, solution.trim(), ``].join('\n'));
      stats.training++;
    }

    courseIndex.push({ ch, chapterTitle, intro, lessons: lessonRows });
  }
  return courseIndex;
}

/* ---------- 真题（数学二） ---------- */

function buildExams() {
  const rows = Object.entries(exams.questions).map(([qid, q]) => ({ qid, ...q }));
  rows.sort((a, b) => (a.year || 2025) - (b.year || 2025) || a.number - b.number);
  const parts = [`---`, `subject: 数学二`, `type: 真题解析`, `---`, ``,
    `# 数学二真题解析（2024、2025 共 ${rows.length} 题）`, ``,
    `题目与题号已对照大学公开转载试卷核验，解析为课程独立编写；转载解析的错误未沿用。完整选项以原卷为准。`, ``];
  let year = null;
  for (const q of rows) {
    const y = q.year || 2025;
    if (y !== year) { year = y; parts.push(`## ${y} 年`, ``); }
    parts.push(`### 第 ${q.number} 题 · ${q.title}`, ``,
      `**关联小节**：\`${q.lesson}\`　**原卷**：第 ${q.page} 页`, ``,
      `**题目**`, ``, q.prompt.trim(), ``,
      `**提示**`, ``, String(q.hint).trim(), ``,
      `**解析**`, ``, q.solution.trim(), ``);
    stats.exams++;
  }
  write('数学二/真题解析.md', parts.join('\n'));
}

/* ---------- 843 案例与模拟卷 ---------- */

function buildX843Extras() {
  for (const c of cases) {
    const rel = `843/案例/${c.id}.md`;
    write(rel, [
      `---`, `subject: 843`, `type: 案例`, `case: ${c.id}`, `title: ${c.title}`, `---`, ``,
      `# ${c.title}`, ``,
      `## 问题情境`, ``, c.problem.trim(), ``,
      `## 方案取舍`, ``, c.options.trim(), ``,
      `## 技术路线`, ``, c.technology.trim(), ``,
      `## 完整走查`, ``, c.walkthrough.trim(), ``,
      `## 评估`, ``, c.evaluation.trim(), ``,
      `## 实践`, ``, String(c.practice).trim(), ``,
      `## 证据与限制`, ``, c.evidence.trim(), ``,
      `**关联小节**：${(c.links || []).map((x) => '`' + x + '`').join('、')}`, ``].join('\n'));
    stats.cases++;
  }
  for (const m of mocks) {
    const parts = [`---`, `subject: 843`, `type: 模拟卷`, `mock: ${m.id}`, `title: ${m.title}`, `---`, ``,
      `# ${m.title}`, ``,
      `满分 150 分，原创题目。`, ``];
    let n = 0;
    for (const [part, score, prompt, hint, solution] of m.questions) {
      n++;
      parts.push(`## 第 ${n} 题（${part} · ${score} 分）`, ``,
        `**题目**`, ``, prompt.trim(), ``,
        `**提示**`, ``, hint.trim(), ``,
        `**解析**`, ``, solution.trim(), ``);
      stats.mockQuestions++;
    }
    write(`843/模拟卷/${m.title.replace(/[\\/:*?"<>| ·]/g, '-').replace(/-+/g, '-')}.md`, parts.join('\n'));
  }
}

/* ---------- 章节目录 ---------- */

function buildIndex(subjectLabel, course, index, outDir) {
  const parts = [`---`, `subject: ${subjectLabel}`, `type: 章节目录`, `---`, ``,
    `# ${course.title} · 章节目录`, ``];
  for (const { ch, chapterTitle, intro, lessons } of index) {
    parts.push(`## ${String(ch.number).padStart(2, '0')} · ${chapterTitle}`, ``);
    if (intro) parts.push(intro, ``);
    for (const l of lessons) {
      const topics = l.topics.join('、');
      const pre = l.prereq.length ? `　前置：${l.prereq.join('、')}` : '';
      parts.push(`- [${l.title}](${ch.id}/${l.file}) — ${topics}${pre}`);
    }
    const trPath = `${ch.id}/章末训练.md`;
    parts.push(`- [章末综合训练](${trPath})`, ``);
  }
  write(`${outDir}/README.md`, parts.join('\n'));
}

/* ---------- 知识点索引 ---------- */

function lessonTitleIndex(course) {
  const map = new Map();
  for (const ch of course.chapters) for (const l of ch.lessons) map.set(l.id, l.title);
  return map;
}

function buildPointIndex() {
  const titles = new Map([...lessonTitleIndex(mathCourse), ...lessonTitleIndex(x843Course)]);
  const maps = { math2: MATH2_POINT_LESSONS, '843': X843_POINT_LESSONS };
  const groups = new Map();
  for (const p of points) {
    if (!groups.has(p.subject)) groups.set(p.subject, []);
    groups.get(p.subject).push(p);
  }
  for (const [subject, list] of groups) {
    const meta = SUBJECT_META[subject];
    const label = meta ? meta.label : subject;
    const bound = meta && meta.bound;
    const parts = [`---`, `subject: ${label}`, `type: 知识点索引`, `count: ${list.length}`, `---`, ``,
      `# ${label} · 知识点索引（${list.length} 条）`, ``];
    if (!bound) parts.push(`> 本科目只有知识点索引，尚无对应讲义正文，不能据此标记已掌握。`, ``);
    let section = null;
    for (const p of list) {
      if (p.sectionTitle !== section) { section = p.sectionTitle; parts.push(`## ${section}`, ``); }
      let bind = '';
      if (bound) {
        const ids = (maps[subject] || {})[p.id] || [];
        bind = ids.length
          ? `　绑定正文：${ids.map((id) => `\`${id}\`${titles.get(id) ? `（${titles.get(id)}）` : ''}`).join('、')}`
          : `　**尚未绑定正文**`;
      } else {
        bind = `　索引/待补正文`;
      }
      parts.push(`- **${p.id}** · ${p.priority} · [${p.chapterId}] ${p.title}${bind}`);
      stats.points++;
    }
    parts.push(``);
    write(`知识点索引/${label}.md`, parts.join('\n'));
  }
}

/* ---------- 大纲对照 ---------- */

function buildRequirements() {
  const mathTitles = lessonTitleIndex(mathCourse);
  const parts = [`---`, `subject: 数学二`, `type: 大纲对照`, `---`, ``,
    `# 数学二 · 历史大纲要求对照（${requirements.length} 条）`, ``,
    `> 这是历史大纲条目的教学关联，**不是 2027 逐条对齐认证**：2027 官方全文尚未取得。`, ``];
  for (const r of requirements) {
    const ls = r.lessons.map((id) => `\`${id}\`${mathTitles.get(id) ? `（${mathTitles.get(id)}）` : ''}`).join('、');
    parts.push(`- **${r.id}** · 第 ${r.page} 页 · ${r.title} → ${ls}`);
    stats.requirements++;
  }
  write('知识点索引/数学二-历史大纲对照.md', parts.join('\n'));

  const x843Titles = lessonTitleIndex(x843Course);
  const parts8 = [`---`, `subject: 843`, `type: 大纲对照`, `---`, ``,
    `# 843 · 2027 官方大纲要求对照（${x843Requirements.length} 条）`, ``,
    `> 依据已核验的 2027 官方大纲 PDF；教学细目为课程展开，不冒充官方逐条原文。`, ``];
  for (const r of x843Requirements) {
    const ls = r.lessons.map((id) => `\`${id}\`${x843Titles.get(id) ? `（${x843Titles.get(id)}）` : ''}`).join('、');
    parts.push(`- **${r.id}** · 第 ${r.page} 页 · ${r.title} → ${ls}`);
    stats.requirements++;
  }
  write('知识点索引/843-官方大纲对照.md', parts8.join('\n'));
}

/* ---------- 总 README ---------- */

function buildRootReadme() {
  const mathLessons = mathCourse.chapters.reduce((n, c) => n + c.lessons.length, 0);
  const x843Lessons = x843Course.chapters.reduce((n, c) => n + c.lessons.length, 0);
  write('README.md', [
    `# 考研文字知识库`, ``,
    `从项目正文与结构化数据中抽取的纯 Markdown 知识库，可独立阅读、检索或导入其他工具。`,
    `由 \`scripts/build-knowledge-base.cjs\` 生成；重新运行 \`npm run knowledge-base\` 可再生（内容以源稿为准，本目录不手工修改）。`, ``,
    `## 目录结构`, ``,
    `| 路径 | 内容 |`, `| --- | --- |`,
    `| [数学二/](数学二/README.md) | ${mathCourse.chapters.length} 章 ${mathLessons} 节正文，每节含目标/问题/讲解/推导/例题/练习/回顾；各章附章末训练 |`,
    `| [数学二/真题解析.md](数学二/真题解析.md) | 2024、2025 共 17 道真题的要点与独立解析 |`,
    `| [843/](843/README.md) | ${x843Course.chapters.length} 章 ${x843Lessons} 节正文，各章附章末训练 |`,
    `| [843/案例/](843/案例/) | 6 个贯穿案例 |`,
    `| [843/模拟卷/](843/模拟卷/) | 2 套原创模拟卷（各 150 分） |`,
    `| [知识点索引/](知识点索引/) | 348 条知识点（政治 76、英语一 52、数学二 60、843 160）与两科大纲对照 |`, ``,
    `## 状态说明`, ``,
    `- 政治、英语一只有知识点索引，标记「索引/待补正文」；不能据此标记已掌握。`,
    `- 数学二仍有知识点未绑定正文（级数、曲线曲面积分等不在当前课程主线）。`,
    `- 数学二大纲对照为历史条目：2027 官方全文尚未取得，未完成新版逐条对齐。`,
    `- 正文中的 \`$...$\` 为 KaTeX 行内公式、\`$$...$$\` 为独立公式，按 LaTeX 语法阅读。`,
    `- 行内矩阵 \`[[a,b],[c,d]]\` 是原站的简写，渲染时会转成正规矩阵排版。`, ``,
    `## 来源`, ``,
    `- 正文：\`content/课程/chapters/*.md\`、\`content/843/chapters/*.md\`（与 \`course.json\` 清单一致）`,
    `- 真题/训练：\`content/课程/tooling/exams.cjs\`、\`training.cjs\``,
    `- 843 案例与模拟卷：\`content/843/tooling/cases.cjs\`、\`mocks.cjs\``,
    `- 知识点与大纲：\`content/课程/tooling/knowledge-points.json\`、\`point-map.cjs\`、两科 \`requirements.cjs\``, ``].join('\n'));
}

/* ---------- main ---------- */

try {
  fs.rmSync(outRoot, { recursive: true, force: true });
} catch {
  // 目录被占用（如资源管理器打开）时退化为清空内容
  for (const name of fs.readdirSync(outRoot)) {
    fs.rmSync(path.join(outRoot, name), { recursive: true, force: true });
  }
}
const mathIndex = buildSubject('数学二', mathCourse, 'content/课程', '数学二');
const x843Index = buildSubject('843', x843Course, 'content/843', '843');
buildExams();
buildX843Extras();
buildIndex('数学二', mathCourse, mathIndex, '数学二');
buildIndex('843', x843Course, x843Index, '843');
buildPointIndex();
buildRequirements();
buildRootReadme();

console.log(`knowledge-base 生成完成:`, JSON.stringify(stats, null, 2));
if (stats.warnings.length) {
  console.error('警告:'); for (const w of stats.warnings) console.error(' -', w);
  process.exitCode = 1;
}
