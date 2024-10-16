import { defineConfig } from 'unocss'
import { presetUseful } from 'unocss-preset-useful'

export default defineConfig({
  theme: {
    fontFamily: {
      commit: 'Commit Mono',
    },
    colors: {
      primary: {
        DEFAULT: 'rgba(var(--c-text),%alpha)',
        text: 'rgba(var(--c-text),%alpha)',
        bg: 'rgba(var(--c-bg),%alpha)',
      },
      sort: 'rgba(var(--bg-sort),%alpha)',
    },
  },
  shortcuts: [{
    'text': 'text-primary-text',
    'bg': 'bg-primary-bg',
    'icon-btn': 'inline-block text-1.2em',
    'nav-bg': 'backdrop-blur-12 rd-4 shadow-xl bg-primary-bg/45',
    // components
    'btn': 'inline-flex items-center justify-center w-full h-12 rd-md',
    'btn-outline': 'btn b bg-transparent',
    'btn-ghost': 'btn bg-transparent transition',
  }],
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
    }),
  ],
})
