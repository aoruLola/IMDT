/* Learning workbench runtime — plan, tasks, scores, errors, point index, backup.
   Storage key workbench-v1 is separate from math2 and 843 reading and study keys. */
(() => {
  'use strict';
  const DATA = window.STUDY_DATA;
  const M = window.WorkbenchModel;
  if (!DATA || !M) return;

  const KEY = 'workbench-v1';
  const ERRANDS = {
    concept: '概念没懂',
    calculation: '计算失误',
    method: '方法没想到',
    careless: '审题/粗心',
    expression: '表达不完整',
  };

  function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  function dateAfter(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  function daysUntil(dateStr) {
    if (!dateStr) return null;
    const target = new Date(dateStr + 'T00:00:00');
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return Math.round((target - now) / 86400000);
  }

  function emptyState() {
    return {
      version: 1,
      planConfigured: false,
      settings: {
        examDate: '',
        dailyNormalMinutes: 180,
        dailyMinimumMinutes: 60,
        studyDaysPerWeek: 6,
      },
      taskDone: {},
      dailyPlans: {},
      scores: [],
      errors: [],
      pointStatus: {}, // pointId -> 'todo'|'learning'|'review'|'mastered' (workbench only; lectures keep their own done flags)
      updatedAt: new Date().toISOString(),
    };
  }

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY));
      if (!raw || raw.version !== 1) return emptyState();
      const s = emptyState();
      s.settings = { ...s.settings, ...(raw.settings && typeof raw.settings === 'object' ? raw.settings : {}) };
      s.planConfigured=raw.planConfigured===true;
      s.taskDone = Object.fromEntries(Object.entries(raw.taskDone || {}).filter(([, v]) => v === true || v === false));
      s.scores = Array.isArray(raw.scores) ? raw.scores.filter((x) => x && typeof x.subject === 'string' && Number.isFinite(Number(x.score))) : [];
      s.errors = Array.isArray(raw.errors) ? raw.errors.filter((x) => x && typeof x.label === 'string') : [];
      s.pointStatus = Object.fromEntries(Object.entries(raw.pointStatus || {}).filter(([, v]) => ['todo', 'learning', 'review', 'mastered'].includes(v)));
      s.dailyPlans = raw.dailyPlans && typeof raw.dailyPlans === 'object' ? raw.dailyPlans : {};
      return s;
    } catch {
      return emptyState();
    }
  }

  function save(state) {
    state.updatedAt = new Date().toISOString();
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      const msg = document.querySelector('#wb-import-msg');
      if (msg) msg.textContent = '当前浏览器无法保存工作台数据，仍可浏览索引。';
    }
  }

  let state = load();

  function readDone(storageKey) {
    try {
      const r = JSON.parse(localStorage.getItem(storageKey));
      return Array.isArray(r?.done) ? r.done : [];
    } catch {
      return [];
    }
  }
  function readStudy(storageKey) {
    try {
      const r = JSON.parse(localStorage.getItem(storageKey));
      return r && typeof r === 'object' ? r : null;
    } catch {
      return null;
    }
  }

  function lessonById(id) {
    for (const c of Object.values(DATA.courses)) {
      const l = c.lessons.find((x) => x.id === id);
      if (l) return l;
    }
    return null;
  }

  // --- plan / countdown ---
  function bindPlan() {
    const exam = document.querySelector('#wb-exam-date');
    const normal = document.querySelector('#wb-normal');
    const minimum = document.querySelector('#wb-minimum');
    const days = document.querySelector('#wb-days');
    exam.value = state.settings.examDate || '';
    normal.value = state.settings.dailyNormalMinutes;
    minimum.value = state.settings.dailyMinimumMinutes;
    days.value = state.settings.studyDaysPerWeek;
    function apply() {
      state.settings.examDate = exam.value;
      state.planConfigured=true;
      state.settings.dailyNormalMinutes = Math.min(720, Math.max(15, Number(normal.value) || 180));
      state.settings.dailyMinimumMinutes = Math.min(state.settings.dailyNormalMinutes, Math.max(5, Number(minimum.value) || 60));
      state.settings.studyDaysPerWeek = Math.min(7, Math.max(1, Math.round(Number(days.value) || 6)));
      normal.value=state.settings.dailyNormalMinutes;minimum.value=state.settings.dailyMinimumMinutes;days.value=state.settings.studyDaysPerWeek;
      delete state.dailyPlans[todayKey()];
      save(state);
      renderCountdown();
      renderToday();
    }
    [exam, normal, minimum, days].forEach((el) => el.addEventListener('change', apply));
    renderCountdown();
  }

  function renderCountdown() {
    const el = document.querySelector('#wb-countdown');
    const n = daysUntil(state.settings.examDate);
    if (n === null) {
      el.textContent = '尚未设置暂定考试日期。设置后这里会显示倒计时；日期可随时调整。';
      return;
    }
    if (n > 0) el.textContent = `距离暂定日期还有 ${n} 天。正常 ${state.settings.dailyNormalMinutes} 分钟 / 最低 ${state.settings.dailyMinimumMinutes} 分钟，每周约 ${state.settings.studyDaysPerWeek} 天。`;
    else if (n === 0) el.textContent = '今天是暂定考试日期。请以准考证与官方通知为准。';
    else el.textContent = `暂定日期已过 ${-n} 天。请更新计划中的日期。`;
  }

  // --- today tasks ---
  function buildTasks() {
    const today = todayKey();
    if(!state.dailyPlans[today]){
      const done=Object.fromEntries(Object.entries(DATA.courses).map(([id,c])=>[id,readDone(c.storage.reading)]));
      state.dailyPlans[today]=M.makePlan(DATA,state,done,today);
      save(state);
    }
    const plan=state.dailyPlans[today];
    const minimum=document.querySelector('#wb-minimum-mode').checked;
    const tasks=M.visibleTasks(plan,state,minimum);
    document.querySelector('#wb-today-summary').textContent=plan.rest?'今天是休息日。每周学习日从周一开始安排。':`${today} · 预计 ${tasks.reduce((n,t)=>n+t.minutes,0)} 分钟`;
    return tasks;
  }

  function renderToday() {
    const list = document.querySelector('#wb-today-list');
    const tasks = buildTasks();
    list.replaceChildren();
    if (!tasks.length) {
      const li = document.createElement('li');
      li.textContent = '今天没有安排新任务。';
      list.append(li);
      return;
    }
    for (const t of tasks) {
      const li = document.createElement('li');
      li.className = 'wb-task';
      li.dataset.done = String(Boolean(state.taskDone[t.id]));
      const check = document.createElement('input');
      check.type = 'checkbox';
      check.checked = Boolean(state.taskDone[t.id]);
      check.addEventListener('change', () => {
        state.taskDone[t.id] = check.checked;
        if(t.errorId){const err=state.errors.find(e=>e.id===t.errorId);if(err)err.resolved=check.checked;}
        save(state);
        li.dataset.done = String(check.checked);
        renderErrors();
      });
      const url=DATA.courses[t.subject]?.lessons.find(l=>l.id===t.lessonId)?.url;
      const a = document.createElement(url ? 'a' : 'span');
      if(url)a.href = url;
      a.textContent = t.label;
      a.target = '_blank';
      a.rel = 'noopener';
      const badge = document.createElement('span');
      badge.className = 'muted';
      badge.textContent = `${DATA.subjects[t.subject]?.label || t.subject} · ${t.minutes} 分钟${t.partial?' · 先学到这里':''}`;
      li.append(check, a, badge);
      list.append(li);
    }
  }

  // --- progress ---
  function renderProgress() {
    const grid = document.querySelector('#wb-progress-grid');
    grid.replaceChildren();
    for (const id of ['math2', '843']) {
      const c = DATA.courses[id];
      const done = readDone(c.storage.reading);
      const doneSet = new Set(done.filter((x) => c.lessons.some((l) => l.id === x)));
      const lessonPct = Math.round((doneSet.size / c.lessons.length) * 100);
      const points = DATA.points.filter((p) => p.subject === id);
      const bound = points.filter((p) => p.bound).length;
      const card = document.createElement('article');
      card.className = 'wb-card';
      card.innerHTML = `
        <h3>${c.label}</h3>
        <p>小节已读 ${doneSet.size} / ${c.lessons.length}（${lessonPct}%）</p>
        <p>可查阅知识点 ${bound} / ${points.length}</p>
        <p><a href="${c.basePath}">打开 ${c.label} 讲义 →</a></p>`;
      grid.append(card);
    }
    // politics / english summary
    for (const id of ['politics', 'english']) {
      const meta = DATA.subjects[id];
      const points = DATA.points.filter((p) => p.subject === id);
      const card = document.createElement('article');
      card.className = 'wb-card';
      card.innerHTML = `
        <h3>${meta.label}</h3>
        <p>知识点索引 ${points.length} 条</p>
        <p class="muted">索引/待补正文 · 不能标记已掌握</p>`;
      grid.append(card);
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // --- points ---
  function renderPoints() {
    const subject = document.querySelector('#wb-subject').value;
    const status = document.querySelector('#wb-status').value;
    const q = document.querySelector('#wb-point-search').value.trim().toLowerCase();
    const list = document.querySelector('#wb-point-list');
    list.replaceChildren();
    let n = 0;
    for (const p of DATA.points) {
      if (subject !== 'all' && p.subject !== subject) continue;
      if (status !== 'all' && p.status !== status) continue;
      const hay = `${p.id} ${p.title} ${p.sectionTitle} ${(p.keywords || []).join(' ')}`.toLowerCase();
      if (q && !hay.includes(q)) continue;
      n++;
      const item = document.createElement('article');
      item.className = 'wb-point';
      const links = (p.lessons || []).map((l) => `<a href="${escapeHtml(l.url)}" target="_blank" rel="noopener">${escapeHtml(l.title)}</a>`).join(' · ');
      item.innerHTML = `
        <p class="eyebrow">${escapeHtml(p.subjectLabel)} · ${escapeHtml(p.id)} · ${escapeHtml(p.priority)}</p>
        <h3>${escapeHtml(p.title)}</h3>
        <p class="muted">${escapeHtml(p.sectionTitle || '')}</p>
        <p><span class="wb-status wb-status-${p.status}">${escapeHtml(p.statusLabel)}</span>${links ? '　' + links : ''}</p>`;
      list.append(item);
    }
    if (!n) {
      const p = document.createElement('p');
      p.className = 'muted';
      p.textContent = '没有匹配的知识点。';
      list.append(p);
    }
  }

  // --- scores ---
  function defaultMax(subject) {
    return subject === 'math2' || subject === '843' ? 150 : 100;
  }

  function renderScores() {
    const list = document.querySelector('#wb-score-list');
    list.replaceChildren();
    const scores = [...state.scores].sort((a, b) => String(b.date).localeCompare(String(a.date)));
    for (const s of scores.slice(0, 20)) {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${escapeHtml(s.date)}</strong> · ${escapeHtml(DATA.subjects[s.subject]?.label || s.subject)} · ${escapeHtml(s.label)} · ${s.score} / ${s.maxScore}${s.note ? ' · ' + escapeHtml(s.note) : ''}`;
      list.append(li);
    }
    if (!scores.length) {
      const li = document.createElement('li');
      li.className = 'muted';
      li.textContent = '还没有成绩记录。';
      list.append(li);
    }
    renderTrend();
  }

  function renderTrend() {
    const el = document.querySelector('#wb-score-trend');
    const by = {};
    for (const s of state.scores) {
      (by[s.subject] ||= []).push(s);
    }
    const width = 640, height = 160, pad = 28;
    const parts = [];
    for (const [subject, rowsRaw] of Object.entries(by)) {
      const rows = [...rowsRaw].sort((a, b) => String(a.date).localeCompare(String(b.date))).slice(-10);
      if (rows.length < 2) continue;
      const max = Math.max(...rows.map((r) => r.maxScore || defaultMax(subject)));
      const pts = rows.map((r, i) => {
        const x = pad + (i * (width - pad * 2)) / Math.max(1, rows.length - 1);
        const y = height - pad - (Number(r.score) / max) * (height - pad * 2);
        return `${x},${y}`;
      }).join(' ');
      const label = DATA.subjects[subject]?.label || subject;
      parts.push(`<polyline fill="none" stroke="#365d49" stroke-width="2" points="${pts}" />`);
      parts.push(`<text x="${pad}" y="${16}" fill="#62685e" font-size="12">${escapeHtml(label)} 近 ${rows.length} 次</text>`);
    }
    if (!parts.length) {
      el.innerHTML = '<p class="muted">至少记录同一科目两次成绩后显示趋势。</p>';
      return;
    }
    el.innerHTML = `<svg viewBox="0 0 ${width} ${height}" width="100%" height="${height}" role="img" aria-label="成绩趋势图">${parts.join('')}</svg>`;
  }

  function bindScoreForm() {
    const form = document.querySelector('#wb-score-form');
    const subject = document.querySelector('#wb-score-subject');
    const maxInput = document.querySelector('#wb-score-max');
    subject.addEventListener('change', () => {
      maxInput.value = String(defaultMax(subject.value));
    });
    maxInput.value = String(defaultMax(subject.value));
    document.querySelector('#wb-score-date').value = todayKey();
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const score = Number(document.querySelector('#wb-score-score').value);
      const maxScore = Number(maxInput.value);
      if (!(score >= 0) || !(maxScore > 0) || score > maxScore) {
        alert('请检查得分与满分：得分应在 0 到满分之间。');
        return;
      }
      state.scores.unshift({
        id: 's' + Date.now(),
        subject: subject.value,
        label: document.querySelector('#wb-score-label').value.trim(),
        score,
        maxScore,
        date: document.querySelector('#wb-score-date').value || todayKey(),
        note: document.querySelector('#wb-score-note').value.trim(),
      });
      save(state);
      form.reset();
      maxInput.value = String(defaultMax(subject.value));
      document.querySelector('#wb-score-date').value = todayKey();
      renderScores();
      renderToday();
    });
  }

  // --- errors ---
  function fillLessonSelect() {
    const sel = document.querySelector('#wb-error-lesson');
    const selected=sel.value;
    sel.replaceChildren();
    const empty=document.createElement('option');empty.value='';empty.textContent='不关联小节';sel.append(empty);
    const course=DATA.courses[document.querySelector('#wb-error-subject').value];
    for (const c of course ? [course] : []) {
      const og = document.createElement('optgroup');
      og.label = c.label;
      for (const l of c.lessons) {
        const o = document.createElement('option');
        o.value = l.id;
        o.textContent = l.title;
        og.append(o);
      }
      sel.append(og);
    }
    sel.value=course?.lessons.some(l=>l.id===selected)?selected:'';
    sel.disabled=!course;
  }

  function renderErrors() {
    const list = document.querySelector('#wb-error-list');
    list.replaceChildren();
    const today = todayKey();
    const rows = [...state.errors].sort((a, b) => Number(a.resolved) - Number(b.resolved) || String(a.nextReview).localeCompare(String(b.nextReview)));
    for (const err of rows) {
      const li = document.createElement('li');
      li.className = 'wb-error';
      li.dataset.resolved = String(Boolean(err.resolved));
      const lesson = DATA.courses[err.subject]?.lessons.find(l=>l.id===err.lessonId);
      const link = lesson ? `<a href="${escapeHtml(lesson.url)}" target="_blank" rel="noopener">${escapeHtml(lesson.title)}</a>` : '<span class="muted">未关联讲义</span>';
      const due = err.nextReview && err.nextReview <= today && !err.resolved ? ' · 已到复习日' : '';
      li.innerHTML = `
        <label><input type="checkbox" ${err.resolved ? 'checked' : ''} data-err-id="${escapeHtml(err.id)}"> 回炉完成</label>
        <strong>${escapeHtml(err.label)}</strong>
        <span class="muted">${escapeHtml(DATA.subjects[err.subject]?.label || err.subject)} · ${escapeHtml(ERRANDS[err.kind] || err.kind)} · 下次 ${escapeHtml(err.nextReview || '—')}${due}</span>
        ${err.action ? `<p>动作：${escapeHtml(err.action)}</p>` : ''}
        ${err.note ? `<p class="muted">${escapeHtml(err.note)}</p>` : ''}
        <p>讲义：${link}</p>`;
      list.append(li);
    }
    list.querySelectorAll('[data-err-id]').forEach((box) => {
      box.addEventListener('change', () => {
        const rec = state.errors.find((x) => x.id === box.dataset.errId);
        if (rec) {
          rec.resolved = box.checked;
          state.taskDone['err:'+rec.id+':'+rec.nextReview]=box.checked;
          save(state);
          renderErrors();
          renderToday();
        }
      });
    });
    if (!rows.length) {
      const li = document.createElement('li');
      li.className = 'muted';
      li.textContent = '错题本是空的。做题后把错因记下来，比只抄答案有用。';
      list.append(li);
    }
  }

  function bindErrorForm() {
    const form = document.querySelector('#wb-error-form');
    document.querySelector('#wb-error-next').value = dateAfter(2);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const rec = {
        id: 'e' + Date.now(),
        subject: document.querySelector('#wb-error-subject').value,
        label: document.querySelector('#wb-error-label').value.trim(),
        kind: document.querySelector('#wb-error-kind').value,
        lessonId: document.querySelector('#wb-error-lesson').value || '',
        action: document.querySelector('#wb-error-action').value.trim(),
        note: document.querySelector('#wb-error-note').value.trim(),
        date: todayKey(),
        nextReview: document.querySelector('#wb-error-next').value || dateAfter(2),
        resolved: false,
      };
      if(rec.lessonId&&!DATA.courses[rec.subject]?.lessons.some(l=>l.id===rec.lessonId)){alert('请选择本科目的小节。');return;}
      state.errors.unshift(rec);
      delete state.dailyPlans[todayKey()];
      save(state);
      form.reset();
      fillLessonSelect();
      document.querySelector('#wb-error-next').value = dateAfter(2);
      renderErrors();
      renderToday();
    });
  }

  // --- backup ---
  function collectBackup() {
    return M.exportBackup(localStorage,DATA,state);
  }

  function bindBackup() {
    const msg=document.querySelector('#wb-import-msg');
    const preview=document.querySelector('#wb-backup-preview');
    function refreshPreview(){
      preview.textContent=JSON.stringify({version:2,scores:state.scores.length,errors:state.errors.length,math2:readDone(DATA.courses.math2.storage.reading).length,'843':readDone(DATA.courses['843'].storage.reading).length},null,2);
    }
    document.querySelector('#wb-backup details').addEventListener('toggle',refreshPreview);
    document.querySelector('#wb-export').addEventListener('click',async()=>{
      try{
        const capture=()=>collectBackup();
        const data=navigator.locks?await navigator.locks.request('course-study-record',capture):capture();
        const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
        const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`study-backup-${todayKey()}.json`;a.click();
        setTimeout(()=>URL.revokeObjectURL(a.href),1000);
        msg.textContent='已导出工作台、两科阅读记录、计时、成就、小标题和课件记录。';
      }catch(err){msg.textContent='导出失败：'+err.message;}
    });
    document.querySelector('#wb-import').addEventListener('change',async e=>{
      const file=e.target.files?.[0];if(!file)return;
      try{
        const backup=JSON.parse(await file.text());
        if(!navigator.locks)throw Error('此浏览器不支持安全恢复，请使用支持 Web Locks 的浏览器。');
        state=await navigator.locks.request('course-study-record',()=>M.restoreBackup(localStorage,DATA,backup));
        state=load();syncPlanInputs();renderAll();refreshPreview();
        msg.textContent='已合并备份。保留当前已有记录，补回缺失记录；同日学习时长取较大值，计时已暂停。';
      }catch(err){msg.textContent='导入失败：'+(err.message||'文件无法识别');}
      finally{e.target.value='';}
    });
    refreshPreview();
  }

  function syncPlanInputs(){
    document.querySelector('#wb-exam-date').value=state.settings.examDate;
    document.querySelector('#wb-normal').value=state.settings.dailyNormalMinutes;
    document.querySelector('#wb-minimum').value=state.settings.dailyMinimumMinutes;
    document.querySelector('#wb-days').value=state.settings.studyDaysPerWeek;
  }
  function renderAll() {
    renderCountdown();
    renderToday();
    renderProgress();
    renderPoints();
    renderScores();
    renderErrors();
  }

  // boot
  bindPlan();
  fillLessonSelect();
  document.querySelector('#wb-error-subject').addEventListener('change',fillLessonSelect);
  document.querySelector('#wb-minimum-mode').addEventListener('change',renderToday);
  bindScoreForm();
  bindErrorForm();
  bindBackup();
  document.querySelector('#wb-subject').addEventListener('change', renderPoints);
  document.querySelector('#wb-status').addEventListener('change', renderPoints);
  document.querySelector('#wb-point-search').addEventListener('input', renderPoints);
  renderAll();
  let displayedDate=todayKey();
  setInterval(()=>{if(todayKey()!==displayedDate){displayedDate=todayKey();renderAll();}},30000);
  window.addEventListener('storage', (e) => {
    if (e.key === KEY || e.key?.endsWith('-course-v1') || e.key?.endsWith('-study-v1')) {
      state = load();
      syncPlanInputs();
      renderAll();
    }
  });
})();
