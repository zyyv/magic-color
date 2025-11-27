import { defineConfig } from 'unocss'
import { presetUseful } from 'unocss-preset-useful'

export default defineConfig({
  theme: {
    fontFamily: {
      commit: 'Commit Mono',
    },
  },
  shortcuts: [
    {
      'icon-btn': 'inline-block text-1.2em cursor-pointer',
      // components
      'btn': 'inline-flex items-center justify-center w-full h-12 rd-md',
      'btn-outline': 'btn b bg-transparent',
      'btn-ghost': 'btn bg-transparent transition',
    },
    ['text-basecolor', 'text-dark-800 dark:text-stone-300'],
    ['bg-basecolor', 'bg-light-300 dark:bg-dark-800'],
  ],
  presets: [
    presetUseful({
      icons: {
        extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'text-bottom',
        },
      },
      webFonts: {
        fonts: {
          dm: 'DM Sans',
        },
      },
    }) as any,
  ],
})
