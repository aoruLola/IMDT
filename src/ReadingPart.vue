<script setup>
import { reactive, watchEffect, onMounted, onUnmounted, nextTick } from 'vue';
const props = defineProps({ block: Object });
const block = props.block;
const id = block.dataset.readingPart;
const key = (window.COURSE.storage?.parts || 'math2-reading-part-v1:') + id;
const head = block.querySelector(':scope > .part-heading');
const title = head.querySelector('h3,h4').textContent;
const body = block.querySelector(':scope > .part-body');
const actions = head.querySelector('.part-actions');
actions.replaceChildren();
actions.hidden = false;
function read() {
  try { const v = JSON.parse(localStorage.getItem(key)); return { completed: v?.completed === true, collapsed: v?.collapsed === true }; }
  catch { return { completed: false, collapsed: false }; }
}
const state = reactive(read());
watchEffect(() => { body.hidden = state.collapsed; block.dataset.completed = String(state.completed); });
function save() {
  try { localStorage.setItem(key, JSON.stringify(state)); } catch { /* Reading still works when storage is unavailable. */ }
  nextTick(() => document.dispatchEvent(new CustomEvent('readingpartchange')));
}
function toggle() { state.collapsed = !state.collapsed; save(); }
function mark() { state.completed = !state.completed; state.collapsed = state.completed; save(); }
function reveal() {
  let target;
  try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch { return; }
  if (!target || !block.contains(target)) return;
  state.collapsed = false;
  for (let node = target; node && node !== block; node = node.parentElement) if (node.tagName === 'DETAILS') node.open = true;
}
function storage(e) { if (e.key === key || e.key === null) Object.assign(state, read()); }
onMounted(() => { reveal(); window.addEventListener('hashchange', reveal); document.addEventListener('lessonchange', reveal); window.addEventListener('storage', storage); });
onUnmounted(() => { window.removeEventListener('hashchange', reveal); document.removeEventListener('lessonchange', reveal); window.removeEventListener('storage', storage); });
</script>

<template>
  <Teleport :to="actions">
    <span class="part-completed" :hidden="!state.completed">✓ 已完成</span>
    <button type="button" data-part-toggle :aria-controls="body.id" :aria-expanded="!state.collapsed" :aria-label="(state.collapsed ? '展开：' : '收起：') + title" :title="state.collapsed ? '展开' : '收起'" @click="toggle">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
    </button>
    <button type="button" data-part-mark :aria-pressed="state.completed" :aria-label="(state.completed ? '撤销完成：' : '完成并折叠：') + title" :title="state.completed ? '撤销完成' : '完成并折叠'" @click="mark">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path class="completion-check" d="m8 12 3 3 5-6" /></svg>
    </button>
  </Teleport>
</template>
