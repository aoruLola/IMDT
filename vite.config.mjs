import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    outDir: 'dist/assets',
    emptyOutDir: true,
    lib: { entry: 'src/main.js', formats: ['es'], fileName: () => 'course-app.js' },
  },
});
