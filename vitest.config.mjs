import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html'],
      all: true,
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/coverage/**',
        '**/*.config.{js}',
      ],
    },
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@state': path.resolve(__dirname, 'src/state'),
      '@i18n': path.resolve(__dirname, 'src/i18n')
    }
  }
});
