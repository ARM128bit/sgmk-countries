import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@sgmk-types': fileURLToPath(new URL('./src/sgmk-types', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData(source: any, fp: any) {
          if (fp.endsWith('_vars.scss') || fp.endsWith('main.scss')) return source;
          return `@import "@/assets/styles/_vars.scss";${source}`
        } 
      }
    }
  },
})
