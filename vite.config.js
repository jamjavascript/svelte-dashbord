import { defineConfig } from 'vitest/config'
import { sveltekit } from '@sveltejs/kit/vite'
import { svelteTesting } from '@testing-library/svelte/vite'
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [sveltekit(), svelteTesting()],
  // optimizeDeps: {
  //   include: ["d3-scale", "date-fns", "layerchart"], // Pre-bundle these libraries
  // },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.js'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

})