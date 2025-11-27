import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { alias } from '../alias'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/play/',
  build: {
    outDir: '../dist',
    target: 'esnext',
    emptyOutDir: true,
  },
  resolve: {
    alias,
  },
  plugins: [
    vue(),
    UnoCSS(),
    Components({
      resolvers: [
        PrimeVueResolver(),
      ],
    }),
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
      ],
      dirs: [
        'src/composables',
      ],
      vueTemplate: true,
      dts: 'src/auto-imports.d.ts',
    }),
  ],
})
