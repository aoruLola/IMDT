import { createApp } from 'vue';
import Reader from './Reader.vue';

if (window.COURSE) {
  const host = document.createElement('div');
  host.id = 'vue-reader';
  document.body.append(host);
  createApp(Reader).mount(host);
}
