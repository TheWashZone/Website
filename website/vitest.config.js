import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { describe, it, expect} from 'vitest';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.js'],
  },
});