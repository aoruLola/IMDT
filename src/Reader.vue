<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import ReadingPart from './ReadingPart.vue';
import { useReader } from './useReader.js';
const reader = useReader();
const { state, marks, modeHost, progressHost, chapterLessons, parts, toggleMode, toggleRead } = reader;
onMounted(async () => { await nextTick(); reader.start(); });
onUnmounted(reader.stop);
</script>

<template>
  <Teleport v-if="modeHost" :to="modeHost">
    <button id="reading-mode" type="button" :aria-pressed="state.all" @click="toggleMode">{{ state.all ? '返回分节阅读' : '查看本章全文' }}</button>
  </Teleport>
  <Teleport v-if="progressHost" :to="progressHost">本章已读 {{ chapterLessons.filter(id => state.done.includes(id)).length }} / {{ chapterLessons.length }} · 可撤销</Teleport>
  <Teleport v-for="mark in marks" :key="mark.id" :to="mark.host">
    <button type="button" :class="mark.className" :data-mark="mark.id" :aria-pressed="state.done.includes(mark.id)" @click="toggleRead(mark.id)">{{ state.done.includes(mark.id) ? '已读 · 撤销标记' : '标记本节已读' }}</button>
  </Teleport>
  <ReadingPart v-for="block in parts" :key="block.id" :block="block" />
</template>
