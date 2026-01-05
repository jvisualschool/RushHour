import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/RUSH/',
  plugins: [react()],
  build: {
    // 성능 최적화
    minify: 'esbuild',
    target: 'esnext',
    cssCodeSplit: false,
  },
  // 개발 서버 최적화
  server: {
    hmr: {
      overlay: true,
    },
  },
})
