import { reactive, nextTick } from 'vue';

// Content stays prerendered. Vue owns the reader controls and persistent state.
export function useReader() {
  const data = window.COURSE, key = data.storage?.reading || 'math2-course-v1';
  const byId = new Map(data.lessons.map(l => [l.id, l]));
  const valid = new Set(byId.keys());
  const validCurrent = new Set([...valid, ...data.chapters.map(c => 'training-' + c.id)]);
  const parse = name => { try { return JSON.parse(localStorage.getItem(name)); } catch { return null; } };
  const cleanDone = v => Array.isArray(v) ? [...new Set(v.filter(id => valid.has(id)))] : [];
  const old = parse(key);
  const state = reactive({ current: validCurrent.has(old?.current) ? old.current : null, done: cleanDone(old?.done), all: false, active: '' });
  if (!old?.migrated && key === 'math2-course-v1') {
    const previous = parse('math-lecture-chapters-v1');
    const map = id => data.legacy[id]?.split('#')[1];
    if (valid.has(map(previous?.current)) && !state.current) state.current = map(previous.current);
    state.done = cleanDone([...state.done, ...(Array.isArray(previous?.done) ? previous.done.map(map) : [])]);
  }
  let migrated = old?.migrated === true;
  function persist(changedDone = false) {
    if (!changedDone && migrated) state.done = cleanDone(parse(key)?.done || state.done);
    try { localStorage.setItem(key, JSON.stringify({ version: 1, current: state.current, done: state.done, migrated: true })); migrated = true; } catch { /* Local storage may be disabled. */ }
  }
  const sections = [...document.querySelectorAll('[data-lesson]')];
  const parts = [...document.querySelectorAll('[data-reading-part]')];
  const chapter = document.body.dataset.courseChapter;
  const chapterLessons = data.chapters.find(c => c.id === chapter)?.lessons || [];
  function hostFor(selector) {
    const el = document.querySelector(selector); if (!el) return null;
    const host = document.createElement('span'); el.replaceWith(host); return host;
  }
  const modeHost = hostFor('#reading-mode');
  const progressHost = document.querySelector('#chapter-progress');
  if (progressHost) progressHost.replaceChildren();
  const marks = [...document.querySelectorAll('[data-mark]')].map(el => {
    const host = document.createElement('span'); el.replaceWith(host);
    return { id: el.dataset.mark, host, className: el.className };
  });
  const hash = () => { try { return decodeURIComponent(location.hash.slice(1)); } catch { return ''; } };
  const hrefFor = id => byId.get(id)?.url || (id?.startsWith('training-') ? id.slice(9) + '.html#' + id : null);
  const cleanups = [];
  function listen(target, name, fn, options) { target.addEventListener(name, fn, options); cleanups.push(() => target.removeEventListener(name, fn, options)); }
  function progress() {
    document.querySelectorAll('[data-lesson-link]').forEach(a => {
      a.setAttribute('aria-current', String(a.dataset.lessonLink === state.active));
      a.dataset.read = String(state.done.includes(a.dataset.lessonLink));
    });
  }
  function mathFit() {
    document.querySelectorAll('.math-inline').forEach(el => {
      if (!el.getClientRects().length) return;
      const math = el.querySelector('.katex');
      if (math) el.classList.toggle('math-scroll', math.getBoundingClientRect().width > el.parentElement.clientWidth - 8);
    });
    document.querySelectorAll('.formula,.math-scroll,.table-wrap').forEach(el => {
      if (el.scrollWidth > el.clientWidth + 1) { el.tabIndex = 0; el.setAttribute('role', 'region'); el.setAttribute('aria-label', '可横向滚动的公式或表格'); }
    });
  }
  async function show(scroll = false) {
    if (!sections.length) return;
    state.all = new URL(location.href).searchParams.get('view') === 'all';
    let requested = hash();
    const resolve = id => document.getElementById(id)?.closest('[data-lesson]');
    let section = resolve(requested);
    if (!section && data.legacy[requested]) {
      const url = data.legacy[requested];
      if (!url.startsWith(chapter + '.html')) { location.replace(url); return; }
      requested = url.split('#')[1]; section = resolve(requested);
    }
    section ||= sections.find(s => s.id === state.current) || sections[0];
    state.active = section.id; state.current = section.id;
    sections.forEach(s => { s.hidden = !state.all && s !== section; });
    persist(); progress();
    const target = document.getElementById(requested) || section;
    for (let p = target.parentElement; p && p !== section; p = p.parentElement) if (p.tagName === 'DETAILS') p.open = true;
    document.dispatchEvent(new CustomEvent('lessonchange', { detail: { active: state.active, all: state.all } }));
    await nextTick(); mathFit();
    if (scroll) requestAnimationFrame(() => { target.scrollIntoView({ block: 'start' }); target.querySelector('h2[tabindex]')?.focus({ preventScroll: true }); });
  }
  function toggleMode() {
    const url = new URL(location.href);
    if (state.all) url.searchParams.delete('view'); else url.searchParams.set('view', 'all');
    if (!url.hash) url.hash = state.active;
    history.pushState({}, '', url); show();
  }
  function toggleRead(id) {
    state.done = cleanDone(parse(key)?.done || state.done);
    state.done = state.done.includes(id) ? state.done.filter(x => x !== id) : [...state.done, id];
    persist(true); progress(); document.dispatchEvent(new CustomEvent('readingprogress'));
  }
  function start() {
    if (!chapter && ['/', '/index.html'].includes(location.pathname) && data.legacy[hash()]) { location.replace(data.legacy[hash()]); return; }
    persist();
    const resume = document.querySelector('#resume');
    if (resume && state.current) { resume.href = hrefFor(state.current); resume.hidden = false; resume.textContent = '继续上次：' + (byId.get(state.current)?.title || '章末训练') + ' →'; }
    const search = document.querySelector('#search');
    if (search) {
      const run = () => {
        const words = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean); let n = 0;
        document.querySelectorAll('[data-search]').forEach(item => { item.hidden = !words.every(w => item.dataset.search.toLowerCase().includes(w)); if (!item.hidden) n++; });
        document.querySelector('#search-count').textContent = `找到 ${n} 个小节`;
        document.querySelector('#no-results').hidden = n !== 0;
        const url = new URL(location.href); if (search.value.trim()) url.searchParams.set('q', search.value.trim()); else url.searchParams.delete('q'); history.replaceState(history.state, '', url);
      };
      search.value = new URL(location.href).searchParams.get('q') || ''; listen(search, 'input', run); run();
      listen(window, 'popstate', () => { search.value = new URL(location.href).searchParams.get('q') || ''; run(); });
    }
    const from = new URL(location.href).searchParams.get('from'), back = document.querySelector('#return-link');
    if (back && validCurrent.has(from)) { const a = document.createElement('a'); a.href = hrefFor(from); a.textContent = '← 回到刚才的问题：' + (byId.get(from)?.title || '章末训练'); back.replaceChildren(a); }
    listen(window, 'storage', e => { if (e.key === key || e.key === null) { state.done = cleanDone(parse(key)?.done); progress(); } });
    listen(window, 'hashchange', () => show(true)); listen(window, 'popstate', () => show(true));
    listen(window, 'resize', mathFit); listen(document, 'toggle', mathFit, true);
    listen(document, 'readingpartchange', () => nextTick(mathFit)); document.fonts?.ready.then(mathFit);
    listen(document, 'click', e => {
      const a = e.target.closest('a'); if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      const url = new URL(a.href, location.href);
      if (url.origin === location.origin && url.pathname === location.pathname && url.hash === location.hash) show(true);
    });
    show(Boolean(location.hash));
    const observer = new IntersectionObserver(entries => {
      if (!state.all) return;
      const entry = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (entry) { state.active = entry.target.closest('[data-lesson]').id; state.current = state.active; persist(); progress(); }
    }, { rootMargin: '0px 0px -65% 0px', threshold: 0 });
    sections.forEach(s => { const h = s.querySelector('h2'); if (h) observer.observe(h); }); cleanups.push(() => observer.disconnect());
  }
  return { state, parts, marks, modeHost, progressHost, chapterLessons, toggleMode, toggleRead, start, stop: () => cleanups.forEach(fn => fn()) };
}
