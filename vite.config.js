import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',
  root: './',
  build: {
    outDir: '../out',
    emptyOutDir: true
  },
  plugins: [vue()]
})
