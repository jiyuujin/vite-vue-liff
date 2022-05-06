import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  }

  return defineConfig({
    base: './',
    root: './',
    build: {
      outDir: '../out',
      emptyOutDir: true
    },
    plugins: [vue()]
  })
}
