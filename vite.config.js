import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    open: false,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3005',
    //     changeOrigin: true,
    //     // rewrite: (path) => path.replace(/^\/api/, ''),
    //   }
    // }
  },
  resolve: {
    alias: {
      "notion-like-editor/notion.css": path.resolve(process.cwd(), "src/lib/css/notion.build.css"),
      "notion-like-editor": path.resolve(process.cwd(), "src/lib/index.js"),
    }

  }
});
