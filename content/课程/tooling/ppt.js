(() => {
  'use strict';
  const course = window.COURSE;
  const pptData = window.PPT_DATA;
  if (!course || !pptData) return;

  const courseId = course.courseId === '843' ? '843' : 'math2';
  const storageKey = (course.storage?.focus) || `${courseId}-focus-v1`;
  const accentCourse = courseId === '843' ? '843' : 'math2';

  function loadFocus() {
    try {
      const raw = JSON.parse(localStorage.getItem(storageKey));
      if (!raw || raw.version !== 1) return emptyFocus();
      return normalizeFocus(raw);
    } catch { return emptyFocus(); }
  }
  function emptyFocus() {
    return { version: 1, lessons: {} };
  }
  function normalizeFocus(raw) {
    const out = emptyFocus();
    for (const [id, v] of Object.entries(raw.lessons || {})) {
      if (!v || typeof v !== 'object') continue;
      out.lessons[id] = {
        page: Number.isInteger(v.page) && v.page >= 0 ? v.page : 0,
        answers: Object.fromEntries(Object.entries(v.answers || {}).filter(([, x]) => typeof x === 'string')),
        reveal: Object.fromEntries(Object.entries(v.reveal || {}).filter(([, x]) => x === 'none' || x === 'hint' || x === 'solution')),
        selfEval: Object.fromEntries(Object.entries(v.selfEval || {}).filter(([, x]) => x === 'ok' || x === 'retry' || x === 'unknown')),
        workedReveal: v.workedReveal === 'solution' || v.workedReveal === 'hint' ? v.workedReveal : 'none',
      };
    }
    return out;
  }
  function persistFocus(focus) {
    try { localStorage.setItem(storageKey, JSON.stringify(focus)); } catch { /* storage unavailable */ }
  }
  function lessonFocus(focus, lessonId) {
    return focus.lessons[lessonId] || { page: 0, answers: {}, reveal: {}, selfEval: {}, workedReveal: 'none' };
  }

  // Overlay shell
  const overlay = document.createElement('div');
  overlay.className = 'ppt-overlay';
  overlay.hidden = true;
  overlay.dataset.course = accentCourse;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', '专注课件');
  overlay.innerHTML = `
    <div class="ppt-bar">
      <h2 id="ppt-title">专注课件</h2>
      <div class="ppt-bar-actions">
        <span class="ppt-page-label" id="ppt-page-label"></span>
        <button type="button" id="ppt-reset">重置本节</button>
        <button type="button" id="ppt-exit">退出课件</button>
      </div>
    </div>
    <div class="ppt-progress" aria-hidden="true"><span id="ppt-progress"></span></div>
    <main class="ppt-stage" id="ppt-stage" tabindex="-1"></main>
    <div class="ppt-nav">
      <div class="ppt-step">
        <button type="button" id="ppt-prev">← 上一页</button>
        <button type="button" id="ppt-next">下一页 →</button>
      </div>
      <div class="ppt-track" id="ppt-track" role="tablist" aria-label="页码"></div>
      <div class="ppt-step"><span class="ppt-page-label" id="ppt-count"></span></div>
    </div>`;
  document.body.append(overlay);

  const stage = overlay.querySelector('#ppt-stage');
  const track = overlay.querySelector('#ppt-track');
  const titleEl = overlay.querySelector('#ppt-title');
  const pageLabel = overlay.querySelector('#ppt-page-label');
  const countEl = overlay.querySelector('#ppt-count');
  const progressEl = overlay.querySelector('#ppt-progress');

  let currentLessonId = null;
  let pages = [];
  let pageIndex = 0;
  let focus = loadFocus();
  let lastActive = null;

  function lessonMeta(id) {
    return pptData.lessons[id];
  }

  function save() {
    if (!currentLessonId) return;
    const entry = lessonFocus(focus, currentLessonId);
    focus.lessons[currentLessonId] = { ...entry, page: pageIndex, workedReveal: entry.workedReveal || 'none' };
    persistFocus(focus);
  }

  function openLesson(lessonId, page) {
    const meta = lessonMeta(lessonId);
    if (!meta) return;
    if (!overlay.hidden) save();
    window.CourseDiagrams?.stop();
    window.LessonVisuals?.stop();
    currentLessonId = lessonId;
    pages = meta.pages;
    const saved = lessonFocus(focus, lessonId);
    pageIndex = Number.isInteger(page) ? page : Math.min(saved.page || 0, Math.max(0, pages.length - 1));
    if (pageIndex < 0 || pageIndex >= pages.length) pageIndex = 0;
    lastActive = document.activeElement;
    overlay.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    render();
    stage.focus();
  }

  function closeOverlay() {
    save();
    overlay.hidden = true;
    document.documentElement.style.overflow = '';
    stopAnim();
    if (lastActive && typeof lastActive.focus === 'function') lastActive.focus({ preventScroll: true });
  }

  function go(delta) {
    const next = pageIndex + delta;
    if (next < 0 || next >= pages.length) return;
    pageIndex = next;
    save();
    stopAnim();
    render();
    stage.scrollTop = 0;
    stage.focus();
  }

  function stopAnim() {
    window.CourseDiagrams?.stop(stage);
    window.LessonVisuals?.stop(stage);
  }

  function fitMath() {
    stage.querySelectorAll('.math-inline').forEach((el) => {
      const math = el.querySelector('.katex');
      if (!math) return;
      el.classList.toggle('math-scroll', math.getBoundingClientRect().width > el.parentElement.clientWidth - 8);
      if (el.classList.contains('math-scroll')) {
        el.tabIndex = 0;
        el.setAttribute('role', 'region');
        el.setAttribute('aria-label', '可横向滚动的公式');
      }
    });
    stage.querySelectorAll('.formula, pre, .table-wrap').forEach((el) => {
      if (el.scrollWidth > el.clientWidth + 1) {
        el.tabIndex = 0;
        el.setAttribute('role', 'region');
        el.setAttribute('aria-label', '可横向滚动的内容');
      }
    });
  }

  function animTools(hasVisual) {
    if (!hasVisual) return '';
    return `<div class="ppt-anim-tools">
      <button type="button" data-anim="play">播放图示</button>
      <button type="button" data-anim="pause">暂停</button>
      <button type="button" data-anim="step">逐步观察</button>
      <button type="button" data-anim="reset">重置图示</button>
      <span class="ppt-note">离开或退出时动画会停止</span>
    </div>`;
  }

  function bindAnimTools(root) {
    root.querySelectorAll('[data-anim]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.anim;
        const playBtn = root.querySelector('[data-play], [data-step-action="play"], [data-action="play"]');
        if (action === 'play') {
          if (playBtn?.getAttribute('aria-pressed') !== 'true') playBtn?.click();
        } else if (action === 'pause') {
          stopAnim();
        } else if (action === 'step') {
          stopAnim();
          const step = root.querySelector('[data-step], [data-step-action="next"]');
          if (step) step.click();
          else {
            const slider=root.querySelector('[data-visual="limit"] input');
            if(slider){slider.value=Math.min(100,Number(slider.value)+10);slider.dispatchEvent(new Event('input',{bubbles:true}));}
          }
        } else if (action === 'reset') {
          stopAnim();
          root.querySelector('[data-reset], [data-step-action="reset"], [data-action="reset"]')?.click();
        }
      });
    });
  }

  function bindPractice(root, page) {
    const key = page.practiceId;
    const entry = lessonFocus(focus, currentLessonId);
    const box = root.querySelector('#ppt-answer');
    if (box) {
      box.value = entry.answers[key] || '';
      box.addEventListener('input', () => {
        const e = lessonFocus(focus, currentLessonId);
        e.answers = { ...e.answers, [key]: box.value };
        focus.lessons[currentLessonId] = e;
        persistFocus(focus);
      });
    }
    const reveal = entry.reveal[key] || 'none';
    const hint = root.querySelector('#ppt-hint');
    const sol = root.querySelector('#ppt-solution');
    const hintBtn = root.querySelector('[data-reveal=hint]');
    const solBtn = root.querySelector('[data-reveal=solution]');
    function applyReveal(level) {
      const e = lessonFocus(focus, currentLessonId);
      e.reveal = { ...e.reveal, [key]: level };
      focus.lessons[currentLessonId] = e;
      persistFocus(focus);
      if (hint) hint.hidden = level === 'none';
      if (sol) sol.hidden = level !== 'solution';
      if (hintBtn) hintBtn.disabled = level !== 'none' && level !== undefined ? level !== 'none' : false;
      // Keep progressive: hint unlocks first, solution second.
      if (hintBtn) hintBtn.hidden = level !== 'none';
      if (solBtn) {
        solBtn.hidden = level === 'none';
        solBtn.disabled = level === 'solution';
      }
      if (level === 'hint') {
        if (hintBtn) hintBtn.hidden = true;
        if (solBtn) solBtn.hidden = false;
      }
    }
    applyReveal(reveal);
    if (hintBtn) hintBtn.addEventListener('click', () => applyReveal('hint'));
    if (solBtn) solBtn.addEventListener('click', () => applyReveal('solution'));

    root.querySelectorAll('[data-selfeval]').forEach((btn) => {
      const val = btn.dataset.selfeval;
      const cur = entry.selfEval[key] || '';
      btn.setAttribute('aria-pressed', String(cur === val));
      btn.addEventListener('click', () => {
        const e = lessonFocus(focus, currentLessonId);
        e.selfEval = { ...e.selfEval, [key]: val };
        focus.lessons[currentLessonId] = e;
        persistFocus(focus);
        root.querySelectorAll('[data-selfeval]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.selfeval === val)));
      });
    });
  }

  function bindWorked(root, page) {
    const entry = lessonFocus(focus, currentLessonId);
    const level = entry.workedReveal || 'none';
    const hint = root.querySelector('#ppt-worked-hint');
    const sol = root.querySelector('#ppt-worked-solution');
    const hintBtn = root.querySelector('[data-worked=hint]');
    const solBtn = root.querySelector('[data-worked=solution]');
    function apply(level2) {
      const e = lessonFocus(focus, currentLessonId);
      e.workedReveal = level2;
      focus.lessons[currentLessonId] = e;
      persistFocus(focus);
      if (hint) hint.hidden = level2 === 'none';
      if (sol) sol.hidden = level2 !== 'solution';
      if (hintBtn) hintBtn.hidden = level2 !== 'none';
      if (solBtn) {
        solBtn.hidden = Boolean(page.hintHtml) && level2 === 'none';
        solBtn.disabled = level2 === 'solution';
      }
      if (level2 === 'hint' && solBtn) solBtn.hidden = false;
    }
    apply(level);
    if (hintBtn) hintBtn.addEventListener('click', () => apply('hint'));
    if (solBtn) solBtn.addEventListener('click', () => apply('solution'));
  }

  function renderPage() {
    const page = pages[pageIndex];
    const meta = lessonMeta(currentLessonId);
    titleEl.textContent = meta.title;
    pageLabel.textContent = `${pageIndex + 1} / ${pages.length}`;
    countEl.textContent = `${pageIndex + 1} / ${pages.length}`;
    progressEl.style.width = `${((pageIndex + 1) / pages.length) * 100}%`;
    overlay.querySelector('#ppt-prev').disabled = pageIndex === 0;
    overlay.querySelector('#ppt-next').disabled = pageIndex >= pages.length - 1;

    track.replaceChildren();
    pages.forEach((p, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = String(i + 1);
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-current', String(i === pageIndex));
      b.title = p.kicker;
      b.addEventListener('click', () => { pageIndex = i; save(); stopAnim(); render(); stage.focus(); });
      track.append(b);
    });

    let html = `<p class="ppt-kicker">${page.kicker}</p><h1>${page.title}</h1>`;
    if (page.kind === 'problem') {
      html += `<div class="ppt-goal"><strong>读完这一节，你会</strong>${page.goalHtml || ''}</div>`;
      html += `<div class="ppt-body">${page.bodyHtml || ''}</div>`;
    } else if (page.kind === 'intuition') {
      html += animTools(/data-diagram=|data-steps|data-visual="limit"/.test(page.bodyHtml));
      html += `<div class="ppt-body">${page.bodyHtml || ''}</div>`;
    } else if (page.kind === 'worked') {
      html += `<div class="ppt-body">${page.promptHtml || ''}</div>`;
      html += `<div class="ppt-selfeval">
        ${page.hintHtml ? '<button type="button" data-worked="hint">先看提示</button>' : ''}
        <button type="button" data-worked="solution">查看完整解析</button>
      </div>`;
      if(page.hintHtml) html += `<div class="ppt-reveal" id="ppt-worked-hint" hidden><strong>提示 / 分步思路</strong><div style="margin-top:8px">${page.hintHtml}</div></div>`;
      html += `<div class="ppt-reveal" id="ppt-worked-solution" hidden><strong>完整过程与答案</strong><div style="margin-top:8px">${page.solutionHtml || ''}</div></div>`;
      html += `<details class="ppt-reveal"><summary>查看变式与解析</summary><div class="ppt-body">${page.variantHtml || ''}</div></details>`;
    } else if (page.kind === 'practice') {
      html += `<div class="ppt-body">${page.promptHtml || ''}</div>`;
      html += `<label class="ppt-note" for="ppt-answer">先写下你的回答</label>`;
      html += `<textarea id="ppt-answer" class="ppt-answer-box" placeholder="写出你的判断或计算过程…"></textarea>`;
      html += `<div class="ppt-selfeval">
        <button type="button" data-reveal="hint">查看提示</button>
        <button type="button" data-reveal="solution">查看解析</button>
      </div>`;
      html += `<div class="ppt-reveal" id="ppt-hint" hidden><strong>提示</strong><div style="margin-top:8px">${page.hintHtml || ''}</div></div>`;
      html += `<div class="ppt-reveal" id="ppt-solution" hidden><strong>解析</strong><div style="margin-top:8px">${page.solutionHtml || ''}</div></div>`;
      html += `<div class="ppt-selfeval" aria-label="自评">
        <span class="ppt-note">自评：</span>
        <button type="button" data-selfeval="ok">我答对了</button>
        <button type="button" data-selfeval="retry">要再练</button>
        <button type="button" data-selfeval="unknown">还不懂</button>
      </div>`;
    } else if (page.kind === 'recap') {
      html += `<div class="ppt-body">${page.bodyHtml || ''}</div>`;
      html += `<div class="ppt-links ppt-body">${page.linksHtml || ''}</div>`;
    } else {
      html += `<div class="ppt-body">${page.bodyHtml || ''}</div>`;
    }

    window.CourseDiagrams?.destroy(stage);
    window.LessonVisuals?.destroy(stage);
    stage.innerHTML = html;
    // A figure also exists in the long-form page: give the overlay distinct IDs.
    const ids=new Map();
    stage.querySelectorAll('.ppt-visual [id]').forEach(el=>{ids.set(el.id,'ppt-'+el.id);el.id='ppt-'+el.id;});
    stage.querySelectorAll('.ppt-visual *').forEach(el=>{
      for(const attr of ['for','aria-labelledby','aria-describedby'])if(el.hasAttribute(attr))el.setAttribute(attr,el.getAttribute(attr).split(' ').map(id=>ids.get(id)||id).join(' '));
    });
    window.CourseDiagrams?.init(stage);
    window.LessonVisuals?.init(stage);
    if (page.kind === 'worked') bindWorked(stage, page);
    if (page.kind === 'practice') bindPractice(stage, page);
    if (page.kind === 'intuition') bindAnimTools(stage);
    fitMath();
  }

  function render() {
    renderPage();
  }

  // Launch buttons are rendered by the builder; also support late-mounted ones.
  function mountLaunchers() {
    document.querySelectorAll('[data-ppt-lesson]').forEach((btn) => {
      if (btn.dataset.pptBound === '1') return;
      btn.dataset.pptBound = '1';
      const id = btn.dataset.pptLesson;
      if (!pptData.lessons[id]) {
        btn.disabled = true;
        btn.title = '本节暂无课件数据';
        return;
      }
      btn.addEventListener('click', () => openLesson(id));
    });
  }

  // Deep link: ?ppt=1 or #lesson-ppt
  function tryDeepLink() {
    const params = new URLSearchParams(location.search);
    const hash = decodeURIComponent(location.hash.slice(1) || '');
    const wantPpt = params.get('ppt') === '1' || hash.endsWith('-ppt');
    if (!wantPpt) return;
    let lessonId = params.get('lesson');
    if (!lessonId && hash.endsWith('-ppt')) lessonId = hash.slice(0, -4);
    if (!lessonId) {
      // open active lesson if reader already resolved one
      const active = document.querySelector('[data-lesson]:not([hidden])');
      lessonId = active?.dataset.lesson;
    }
    if (lessonId && pptData.lessons[lessonId]) openLesson(lessonId);
  }

  overlay.querySelector('#ppt-exit').addEventListener('click', closeOverlay);
  overlay.querySelector('#ppt-prev').addEventListener('click', () => go(-1));
  overlay.querySelector('#ppt-next').addEventListener('click', () => go(1));
  overlay.querySelector('#ppt-reset').addEventListener('click', () => {
    if (!currentLessonId) return;
    focus.lessons[currentLessonId] = { page: 0, answers: {}, reveal: {}, selfEval: {}, workedReveal: 'none' };
    persistFocus(focus);
    pageIndex = 0;
    stopAnim();
    render();
  });

  // Keyboard: left/right when not typing in form controls; Escape always exits.
  window.addEventListener('keydown', (e) => {
    if (overlay.hidden) return;
    const t = e.target;
    const inControl = Boolean(t && t.closest?.('input,textarea,select,button,summary,a,[contenteditable=true]'));
    if (e.key === 'Escape') {
      e.preventDefault();
      closeOverlay();
      return;
    }
    if (inControl) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    }
  });

  // Stop animations when overlay hides or page unloads
  overlay.addEventListener('toggle', () => { if (overlay.hidden) stopAnim(); }, true);
  window.addEventListener('pagehide', stopAnim);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopAnim(); });

  stage.addEventListener('click',e=>{
    if(e.target.closest('.ppt-links a')&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey)closeOverlay();
  });
  document.addEventListener('lessonchange', (e) => {
    if (!overlay.hidden && e.detail?.active && e.detail.active !== currentLessonId) closeOverlay();
  });
  window.addEventListener('storage',e=>{if(e.key===storageKey){focus=loadFocus();if(!overlay.hidden){pageIndex=Math.min(lessonFocus(focus,currentLessonId).page,pages.length-1);render();}}});

  mountLaunchers();
  tryDeepLink();
  // Remount launchers after reading-parts wraps headings
  queueMicrotask(mountLaunchers);
})();
