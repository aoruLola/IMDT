/* ZIP knowledge-point → official lesson mapping.
   point-id → course-id → lesson-section-id (many-to-many).
   Unmatched points stay "尚未绑定正文" and never fake completion. */
const fs = require('node:fs');
const path = require('node:path');

const SUBJECT_META = {
  politics: { key: 'politics', label: '政治', code: '101', maxScore: 100, bound: false },
  english: { key: 'english', label: '英语一', code: '201', maxScore: 100, bound: false },
  math2: { key: 'math2', label: '数学二', code: '302', maxScore: 150, bound: true, courseId: 'math2' },
  '843': { key: '843', label: '843 专业课', code: '843', maxScore: 150, bound: true, courseId: '843' },
};

/** Explicit math2 map: ZIP point → official lesson ids (must exist in course.json). */
const MATH2_POINT_LESSONS = {
  'math2-001': ['function', 'properties', 'composition'],
  'math2-002': ['sequence'],
  'math2-003': ['limit', 'important-limits'],
  'math2-004': ['limit-rules', 'important-limits', 'lhopital'],
  'math2-005': ['continuity'],
  'math2-006': ['shape', 'piecewise-derivative'],
  'math2-007': ['derivative'],
  'math2-008': ['derivative-rules', 'implicit-parametric'],
  'math2-009': ['higher-differential'],
  'math2-010': ['rolle-lagrange', 'cauchy-proof'],
  'math2-011': ['lhopital'],
  'math2-012': ['monotone-extrema'],
  'math2-013': ['shape'],
  'math2-014': ['optimization', 'review-proof'],
  'math2-015': ['curvature'],
  'math2-016': ['primitive', 'substitution', 'parts'],
  'math2-017': ['rational-integrals'],
  'math2-018': ['riemann'],
  'math2-019': ['fundamental'],
  'math2-020': ['fundamental'],
  'math2-021': ['improper'],
  'math2-022': ['area-volume', 'length-surface', 'physical-integrals'],
  'math2-023': ['review-proof', 'optimization'],
  'math2-024': ['ode-separable'],
  'math2-025': ['ode-separable'],
  'math2-026': ['ode-first'],
  'math2-027': ['ode-first'],
  'math2-028': ['ode-reduction'],
  'math2-029': ['ode-linear'],
  'math2-030': ['ode-forced'],
  'math2-031': ['ode-linear', 'ode-forced'],
  'math2-032': ['ode-higher-model'],
  'math2-033': ['multivariable-limit'],
  'math2-034': ['partial-total'],
  'math2-035': ['partial-total'],
  'math2-036': ['multivariable-chain'],
  'math2-037': ['multivariable-extrema'],
  'math2-038': ['multivariable-extrema'],
  'math2-039': ['multivariable-chain', 'multivariable-extrema'],
  'math2-040': ['double-cartesian'],
  'math2-041': ['double-cartesian', 'double-order'],
  'math2-042': ['double-polar'],
  'math2-043': ['double-cartesian'],
  'math2-044': ['double-order'],
  'math2-045': ['double-polar', 'review-methods'],
  'math2-046': ['determinant', 'cofactor-inverse', 'cramer'],
  'math2-047': ['matrix-entry', 'matrix-product', 'elimination', 'cofactor-inverse'],
  'math2-048': ['elimination', 'rank-basis'],
  'math2-049': ['homogeneous-system', 'nonhomogeneous-system', 'elimination'],
  'math2-050': ['span', 'rank-basis'],
  'math2-051': ['span', 'orthogonal'],
  'math2-052': ['eigen'],
  'math2-053': ['diagonalization'],
  'math2-054': ['symmetric-eigen'],
  'math2-055': ['quadratic-form', 'positive-definite'],
  'math2-056': ['review-proof', 'positive-definite', 'rank-basis'],
  // 057–060 are outside the math-2 teaching mainline in the current course.
};

/** Explicit 843 map for points whose title spans several lessons or needs a judgment call. */
const X843_POINT_LESSONS = {
  '843-001': ['843-events'],
  '843-002': ['843-events'],
  '843-003': ['843-conditional', '843-bayes'],
  '843-004': ['843-conditional'],
  '843-005': ['843-distribution'],
  '843-006': ['843-distribution'],
  '843-007': ['843-models', '843-more-models'],
  '843-008': ['843-models'],
  '843-009': ['843-more-models'],
  '843-010': ['843-joint'],
  '843-011': ['843-more-models'],
  '843-012': ['843-moments'],
  '843-013': ['843-moments'],
  '843-014': ['843-moments'],
  '843-015': ['843-sampling'],
  '843-016': ['843-sampling'],
  '843-017': ['843-sample-distributions'],
  '843-018': ['843-sample-distributions'],
  '843-019': ['843-sampling'],
  '843-020': ['843-sampling'],
  '843-021': ['843-sampling'],
  '843-022': ['843-sample-distributions'],
  '843-023': ['843-determinant'],
  '843-024': ['843-matrix-entry', '843-matrix-product', '843-cofactor-inverse'],
  '843-025': ['843-elimination'],
  '843-026': ['843-elimination', '843-homogeneous-system', '843-nonhomogeneous-system'],
  '843-027': ['843-span', '843-rank-basis'],
  '843-028': ['843-cramer'],
  '843-029': ['843-parameter-system'],
  '843-030': ['843-bases'],
  '843-031': ['843-bases'],
  '843-032': ['843-bases'],
  '843-033': ['843-floating'],
  '843-034': ['843-bases'],
  '843-035': ['843-bases'],
  '843-036': ['843-cpu'],
  '843-037': ['843-cpu'],
  '843-038': ['843-cpu'],
  '843-039': ['843-cpu'],
  '843-040': ['843-cpu'],
  '843-041': ['843-cpu'],
  '843-042': ['843-cpu'],
  '843-043': ['843-cpu'],
  '843-044': ['843-cpu'],
  '843-045': ['843-algorithm'],
  '843-046': ['843-algorithm'],
  '843-047': ['843-algorithm'],
  '843-048': ['843-algorithm'],
  '843-049': ['843-algorithm'],
  '843-050': ['843-algorithm', '843-divide-sort'],
  '843-051': ['843-lists'],
  '843-052': ['843-lists'],
  '843-053': ['843-lists'],
  '843-054': ['843-stack-queue'],
  '843-055': ['843-stack-queue'],
  '843-056': ['843-stack-queue', '843-trees'],
  '843-057': ['843-strings-arrays'],
  '843-058': ['843-strings-arrays'],
  '843-059': ['843-trees'],
  '843-060': ['843-trees'],
  '843-061': ['843-trees'],
  '843-062': ['843-trees'],
  '843-063': ['843-trees', '843-search'],
  '843-064': ['843-heap-radix'],
  '843-065': ['843-huffman'],
  '843-066': ['843-graphs'],
  '843-067': ['843-graphs'],
  '843-068': ['843-graphs'],
  '843-069': ['843-graph-paths', '843-graph-matrix'],
  '843-070': ['843-graph-paths', '843-graph-matrix'],
  '843-071': ['843-search'],
  '843-072': ['843-search'],
  '843-073': ['843-search'],
  '843-074': ['843-sorting', '843-heap-radix'],
  '843-075': ['843-sorting', '843-divide-sort'],
  '843-076': ['843-sorting', '843-heap-radix'],
  '843-077': ['843-sorting', '843-divide-sort'],
  '843-078': ['843-sorting'],
  '843-079': ['843-sorting'],
  '843-080': ['843-processes'],
  '843-081': ['843-processes'],
  '843-082': ['843-processes'],
  '843-083': ['843-synchronization'],
  '843-084': ['843-synchronization'],
  '843-085': ['843-memory-files'],
  '843-086': ['843-memory-files'],
  '843-087': ['843-memory-files', '843-cpu'],
  '843-088': ['843-relational'],
  '843-089': ['843-normalization'],
  '843-090': ['843-relational'],
  '843-091': ['843-relational'],
  '843-092': ['843-sql'],
  '843-093': ['843-relational'],
  '843-094': ['843-normalization'],
  '843-095': ['843-normalization'],
  '843-096': ['843-sql'],
  '843-097': ['843-sql'],
  '843-098': ['843-lifecycle-testing'],
  '843-099': ['843-requirements'],
  '843-100': ['843-requirements'],
  '843-101': ['843-architecture'],
  '843-102': ['843-requirements'],
  '843-103': ['843-lifecycle-testing'],
  '843-104': ['843-lifecycle-testing'],
  '843-105': ['843-lifecycle-testing'],
  '843-106': ['843-architecture'],
  '843-107': ['843-data-pipeline'],
  '843-108': ['843-data-pipeline'],
  '843-109': ['843-data-pipeline'],
  '843-110': ['843-data-pipeline', '843-relational'],
  '843-111': ['843-learning'],
  '843-112': ['843-learning'],
  '843-113': ['843-learning'],
  '843-114': ['843-learning'],
  '843-115': ['843-neural-generative'],
  '843-116': ['843-neural-generative'],
  '843-117': ['843-neural-generative', '843-ethics'],
  // 5.7 network extension — current course has no dedicated network chapter body.
  '843-118': [],
  '843-119': [],
  '843-120': [],
  '843-121': [],
  '843-122': [],
  '843-123': [],
  '843-124': [],
  '843-125': ['843-research'],
  '843-126': ['843-research', '843-define-ideate'],
  '843-127': ['843-research', '843-define-ideate'],
  '843-128': ['843-research'],
  '843-129': ['843-ethics', '843-research'],
  '843-130': ['843-answer-method'],
  '843-131': ['843-answer-method', '843-integrate'],
  '843-132': ['843-integrate'],
  '843-133': ['843-research', '843-evaluate'],
  '843-134': ['843-neural-generative', '843-media-types'],
  '843-135': ['843-define-ideate', '843-design-function'],
  '843-136': ['843-define-ideate', '843-select-prototype'],
  '843-137': ['843-integrate'],
  '843-138': ['843-select-prototype', '843-integrate'],
  '843-139': ['843-define-ideate'],
  '843-140': ['843-ethics'],
  '843-141': ['843-ethics'],
  '843-142': ['843-media-types', '843-interaction-narrative'],
  '843-143': ['843-neural-generative', '843-interaction-narrative'],
  '843-144': ['843-evaluate'],
  '843-145': ['843-answer-layout', '843-answer-method'],
  '843-146': ['843-answer-layout', '843-integrate'],
  '843-147': ['843-answer-layout', '843-visual-language'],
  '843-148': ['843-ui-story', '843-interaction-narrative'],
  '843-149': ['843-ui-story', '843-select-prototype'],
  '843-150': ['843-visual-language', '843-lines-forms'],
  '843-151': ['843-lines-forms', '843-answer-layout'],
  '843-152': ['843-answer-layout'],
  '843-153': ['843-design-function'],
  '843-154': ['843-ethics', '843-define-ideate'],
  '843-155': ['843-media-types', '843-visual-language'],
  '843-156': ['843-media-types', '843-interaction-narrative'],
  '843-157': ['843-ethics', '843-integrate'],
  '843-158': ['843-evaluate', '843-design-function'],
  '843-159': ['843-neural-generative'],
  '843-160': ['843-ethics', '843-research'],
};

function loadZipPoints(projectRoot) {
  const file = path.join(projectRoot, 'content/课程/tooling/knowledge-points.json');
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function loadCourses(projectRoot) {
  const math2 = JSON.parse(fs.readFileSync(path.join(projectRoot, 'content/课程/course.json'), 'utf8'));
  const x843 = JSON.parse(fs.readFileSync(path.join(projectRoot, 'content/843/course.json'), 'utf8'));
  return { math2, x843 };
}

function lessonIndex(course, courseId) {
  const byId = new Map();
  for (const c of course.chapters) {
    for (const l of c.lessons) {
      byId.set(l.id, {
        id: l.id,
        courseId,
        chapterId: c.id,
        chapterTitle: c.title,
        chapterNumber: c.number,
        title: l.title,
        topics: l.topics || [],
        url: `${c.id}.html#${l.id}`,
        basePath: courseId === '843' ? '/843/' : '/',
      });
    }
  }
  return byId;
}

function buildPointMap(projectRoot) {
  const points = loadZipPoints(projectRoot);
  const { math2, x843 } = loadCourses(projectRoot);
  const lessons = new Map([
    ...lessonIndex(math2, 'math2'),
    ...lessonIndex(x843, '843'),
  ]);

  const mapped = [];
  const reverse = {}; // lessonId -> pointIds
  for (const p of points) {
    const meta = SUBJECT_META[p.subject] || { key: p.subject, label: p.subject, maxScore: 100, bound: false };
    let lessonIds = [];
    let courseId = null;
    if (p.subject === 'math2') {
      courseId = 'math2';
      lessonIds = (MATH2_POINT_LESSONS[p.id] || []).filter((id) => lessons.has(id));
    } else if (p.subject === '843') {
      courseId = '843';
      lessonIds = (X843_POINT_LESSONS[p.id] || []).filter((id) => lessons.has(id));
    }
    const bound = Boolean(courseId && lessonIds.length);
    if (bound) {
      for (const id of lessonIds) (reverse[id] ||= []).push(p.id);
    }
    mapped.push({
      id: p.id,
      subject: p.subject,
      subjectLabel: meta.label,
      courseId: bound ? courseId : (meta.bound ? meta.courseId : null),
      chapterId: p.chapterId,
      title: p.title,
      sectionTitle: p.sectionTitle || '',
      priority: p.priority || 'P1',
      keywords: p.keywords || [],
      lessonIds,
      lessons: lessonIds.map((id) => lessons.get(id)),
      bound,
      status: bound ? 'bound' : (meta.bound ? 'unbound-body' : 'index-only'),
      statusLabel: bound ? '已绑定正式讲义' : (meta.bound ? '尚未绑定正文' : '索引/待补正文'),
    });
  }

  // reverse index with lesson metadata
  const reverseLessons = Object.fromEntries(
    Object.entries(reverse).map(([id, pids]) => {
      const l = lessons.get(id);
      return [id, {
        id,
        courseId: l.courseId,
        title: l.title,
        chapterTitle: l.chapterTitle,
        url: l.url,
        basePath: l.basePath,
        pointIds: pids,
      }];
    })
  );

  const counts = { total: mapped.length, bound: 0, unboundBody: 0, indexOnly: 0 };
  for (const m of mapped) {
    if (m.status === 'bound') counts.bound++;
    else if (m.status === 'unbound-body') counts.unboundBody++;
    else counts.indexOnly++;
  }
  const bySubject = {};
  for (const m of mapped) {
    const s = (bySubject[m.subject] ||= { total: 0, bound: 0, unboundBody: 0, indexOnly: 0 });
    s.total++;
    if (m.status === 'bound') s.bound++;
    else if (m.status === 'unbound-body') s.unboundBody++;
    else s.indexOnly++;
  }

  return {
    version: 'point-map-v1',
    generatedAt: new Date().toISOString(),
    note: '知识点来自参考工作台索引；正文绑定指向本站正式讲义小节。映射缺失显示“尚未绑定正文”，不伪造完成。',
    subjects: SUBJECT_META,
    counts,
    bySubject,
    points: mapped,
    reverse: reverseLessons,
    lessons: [...lessons.values()],
  };
}

module.exports = { buildPointMap, SUBJECT_META, MATH2_POINT_LESSONS, X843_POINT_LESSONS, loadZipPoints, loadCourses, lessonIndex };
