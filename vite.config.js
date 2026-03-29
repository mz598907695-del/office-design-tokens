import { defineConfig } from 'vite';

const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

export default defineConfig({
  root: '.',
  base: PUBLIC_PATH,
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 3000,
    open: true
  }
});
