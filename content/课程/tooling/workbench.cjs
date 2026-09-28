/* Generate /study.html learning workbench + study-data.js from point map and courses. */
const fs = require('node:fs');
const path = require('node:path');

function escape(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function buildStudyData({ pointMap, math2, x843 }) {
  const packLessons = (course, courseId) => course.chapters.flatMap((c) =>
    c.lessons.map((l) => ({
      id: l.id,
      courseId,
      chapterId: c.id,
      chapterNumber: c.number,
      chapterTitle: c.title,
      title: l.title,
      topics: l.topics || [],
      prerequisites: l.prerequisites || [],
      url: (courseId === '843' ? '/843/' : '/') + `${c.id}.html#${l.id}`,
    }))
  );
  return {
    version: 'study-data-v1',
    generatedAt: new Date().toISOString(),
    courses: {
      math2: {
        courseId: 'math2',
        label: '数学二',
        basePath: '/',
        maxScore: 150,
        syllabusStatus: math2.syllabus?.status || '',
        chapterCount: math2.chapters.length,
        lessonCount: math2.chapters.reduce((n, c) => n + c.lessons.length, 0),
        storage: math2.storage || { reading: 'math2-course-v1', study: 'math2-study-v1', parts: 'math2-reading-part-v1:' },
        chapters: math2.chapters.map((c) => ({ id: c.id, number: c.number, title: c.title, lessons: c.lessons.map((l) => l.id) })),
        lessons: packLessons(math2, 'math2'),
      },
      '843': {
        courseId: '843',
        label: '843',
        basePath: '/843/',
        maxScore: 150,
        syllabusStatus: x843.syllabus?.status || '',
        chapterCount: x843.chapters.length,
        lessonCount: x843.chapters.reduce((n, c) => n + c.lessons.length, 0),
        storage: x843.storage || { reading: '843-course-v1', study: '843-study-v1', parts: '843-reading-part-v1:' },
        chapters: x843.chapters.map((c) => ({ id: c.id, number: c.number, title: c.title, lessons: c.lessons.map((l) => l.id) })),
        lessons: packLessons(x843, '843'),
      },
    },
    subjects: pointMap.subjects,
    points: pointMap.points.map((p) => ({
      id: p.id,
      subject: p.subject,
      subjectLabel: p.subjectLabel,
      chapterId: p.chapterId,
      title: p.title,
      sectionTitle: p.sectionTitle,
      priority: p.priority,
      keywords: p.keywords,
      lessonIds: p.lessonIds,
      lessons: p.lessons,
      bound: p.bound,
      status: p.status,
      statusLabel: p.statusLabel,
    })),
    reverse: pointMap.reverse,
    counts: pointMap.counts,
    bySubject: pointMap.bySubject,
  };
}

function studyHtml({ studyData }) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#f8f7f3">
<title>学习工作台｜数学二 / 843</title>
<link rel="stylesheet" href="course.css">
<link rel="stylesheet" href="workbench.css">
<script defer src="course-data.js"></script>
<script defer src="study-data.js"></script>
<script defer src="study-model.js"></script>
<script defer src="workbench-model.js"></script>
<script defer src="workbench.js"></script>
</head>
<body data-workbench="1">
<a class="skip" href="#main">跳到正文</a>
<div class="shell">
<header class="mast">
  <a href="index.html">学习工作台</a>
  <nav aria-label="站点导航">
    <a href="index.html">数学二讲义</a>
    <a href="/843/">843 讲义</a>
    <a href="contents.html">总目录</a>
    <a href="knowledge.html">知识点检索</a>
  </nav>
</header>
<main id="main">
  <div class="hero">
    <p class="eyebrow">计划 · 记录 · 索引 · 入口</p>
    <h1>学习工作台</h1>
    <p class="deck">安排今天的学习，记录练习成绩，回看需要再练的题。</p>
  </div>

  <section class="wb-block" id="wb-plan">
    <h2>学习计划与倒计时</h2>
    <div class="wb-grid">
      <label>暂定考试日期（可调整）
        <input type="date" id="wb-exam-date">
      </label>
      <label>每日正常学习时长（分钟）
        <input type="number" id="wb-normal" min="15" max="720" step="5">
      </label>
      <label>每日最低学习时长（分钟）
        <input type="number" id="wb-minimum" min="5" max="480" step="5">
      </label>
      <label>每周学习天数
        <input type="number" id="wb-days" min="1" max="7">
      </label>
    </div>
    <p class="muted" id="wb-countdown"></p>
  </section>

  <section class="wb-block" id="wb-today">
    <h2>今日任务</h2>
    <label><input type="checkbox" id="wb-minimum-mode"> 今天先完成最低量</label>
    <p class="muted" id="wb-today-summary"></p>
    <p class="muted">小节暂按30分钟、错题按15分钟安排；未学完的内容下次继续。勾选任务后仍可撤销。</p>
    <ul id="wb-today-list" class="wb-tasks"></ul>
  </section>

  <section class="wb-block" id="wb-progress">
    <h2>完成进度</h2>
    <div class="wb-grid wb-progress-grid" id="wb-progress-grid"></div>
  </section>

  <section class="wb-block" id="wb-points">
    <h2>知识点索引与绑定</h2>
    <p class="muted">索引条目来自参考工作台知识点清单；点击进入本站正式讲义。政治、英语一仅作索引，标记为「索引/待补正文」，不标记已掌握。映射缺失显示「尚未绑定正文」。</p>
    <div class="wb-filters">
      <label>科目
        <select id="wb-subject">
          <option value="all">全部</option>
          <option value="math2">数学二</option>
          <option value="843">843</option>
          <option value="politics">政治</option>
          <option value="english">英语一</option>
        </select>
      </label>
      <label>状态
        <select id="wb-status">
          <option value="all">全部</option>
          <option value="bound">已绑定正文</option>
          <option value="unbound-body">尚未绑定正文</option>
          <option value="index-only">索引/待补正文</option>
        </select>
      </label>
      <label>搜索
        <input type="search" id="wb-point-search" placeholder="标题或关键词">
      </label>
    </div>
    <div id="wb-point-list" class="wb-points"></div>
  </section>

  <section class="wb-block" id="wb-scores">
    <h2>测试成绩记录</h2>
    <p class="muted">成绩是导航数据，不自动改变知识点掌握状态。数学二、843 按 150 分；政治、英语一按 100 分。</p>
    <form id="wb-score-form" class="wb-form">
      <label>科目
        <select id="wb-score-subject" required>
          <option value="math2">数学二</option>
          <option value="843">843</option>
          <option value="politics">政治</option>
          <option value="english">英语一</option>
        </select>
      </label>
      <label>测试名称
        <input id="wb-score-label" required placeholder="例如：章末小测 / 套卷">
      </label>
      <label>得分
        <input id="wb-score-score" type="number" min="0" step="0.5" required>
      </label>
      <label>满分
        <input id="wb-score-max" type="number" min="1" step="1" required>
      </label>
      <label>日期
        <input id="wb-score-date" type="date" required>
      </label>
      <label class="wb-span">一句复盘
        <input id="wb-score-note" placeholder="哪里丢分、下次改什么">
      </label>
      <button type="submit">记录成绩</button>
    </form>
    <div class="wb-score-trend" id="wb-score-trend" aria-label="成绩趋势"></div>
    <ol id="wb-score-list" class="wb-list"></ol>
  </section>

  <section class="wb-block" id="wb-errors">
    <h2>错题回炉</h2>
    <p class="muted">完成回炉只改变错题状态，不自动把知识点标记为掌握。可跳回正式讲义小节。</p>
    <form id="wb-error-form" class="wb-form">
      <label>科目
        <select id="wb-error-subject" required>
          <option value="math2">数学二</option>
          <option value="843">843</option>
          <option value="politics">政治</option>
          <option value="english">英语一</option>
        </select>
      </label>
      <label>错题标题
        <input id="wb-error-label" required placeholder="一句话记住这道错题">
      </label>
      <label>错因类型
        <select id="wb-error-kind" required>
          <option value="concept">概念没懂</option>
          <option value="calculation">计算失误</option>
          <option value="method">方法没想到</option>
          <option value="careless">审题/粗心</option>
          <option value="expression">表达不完整</option>
        </select>
      </label>
      <label>关联小节
        <select id="wb-error-lesson">
          <option value="">（可不选）</option>
        </select>
      </label>
      <label>下次复习日期
        <input id="wb-error-next" type="date" required>
      </label>
      <label>回炉动作
        <input id="wb-error-action" placeholder="例如：重做课后练习 2">
      </label>
      <label class="wb-span">备注
        <input id="wb-error-note" placeholder="补充说明">
      </label>
      <button type="submit">加入回炉</button>
    </form>
    <ul id="wb-error-list" class="wb-list"></ul>
  </section>

  <section class="wb-block" id="wb-backup">
    <h2>导入 / 导出</h2>
    <p class="muted">备份包含两科的学习记录。导入会补回缺失记录；已有计划、同名记录和小标题状态保留，同日时长取较大值。恢复后计时暂停。</p>
    <div class="wb-actions">
      <button type="button" id="wb-export">导出 JSON 备份</button>
      <label class="wb-file">导入 JSON 备份
        <input type="file" id="wb-import" accept="application/json,.json">
      </label>
    </div>
    <p id="wb-import-msg" role="status" class="muted"></p>
    <details>
      <summary>备份内容摘要</summary>
      <pre id="wb-backup-preview" class="wb-pre"></pre>
    </details>
  </section>
</main>
</div>
</body>
</html>`;
}

function writeWorkbench({ out, pointMap, math2, x843, toolingDir }) {
  const studyData = buildStudyData({ pointMap, math2, x843 });
  fs.writeFileSync(path.join(out, 'study-data.js'), 'window.STUDY_DATA=' + JSON.stringify(studyData).replace(/</g, '\\u003c') + ';');
  fs.writeFileSync(path.join(out, 'study.html'), studyHtml({ studyData }));
  fs.copyFileSync(path.join(toolingDir, 'workbench.js'), path.join(out, 'workbench.js'));
  fs.copyFileSync(path.join(toolingDir, 'workbench-model.js'), path.join(out, 'workbench-model.js'));
  fs.copyFileSync(path.join(toolingDir, 'workbench.css'), path.join(out, 'workbench.css'));
  return studyData;
}

module.exports = { buildStudyData, writeWorkbench, studyHtml };
