import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // In production the app is served from gre-training.github.io/best/
  // In dev keep the base at / so localhost:5173 works normally.
  base: command === 'build' ? '/best/' : '/',
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'zustand'],
          charts: ['recharts'],
          math: ['katex'],
        },
      },
    },
  },
}));
