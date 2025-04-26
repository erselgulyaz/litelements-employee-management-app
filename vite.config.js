import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  server: {
    port: 8000
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@components': '/components',
      '@elements': '/components/elements',
      '@state': '/state',
      '@i18n': '/i18n',
      '@router': '/router'
    }
  }
});
