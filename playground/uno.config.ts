import { defineConfig } from 'unocss'
import { presetUseful } from 'unocss-preset-useful'

export default defineConfig({
  theme: {
    colors: {
      primary: {
        DEFAULT: 'rgba(var(--c-text),%alpha)',
        text: 'rgba(var(--c-text),%alpha)',
        bg: 'rgba(var(--c-bg),%alpha)',
      },
    },
  },
  shortcuts: {
    'text': 'text-primary-text',
    'bg': 'bg-primary-bg',
    'icon-btn': 'inline-block text-1.2em',
  },
  presets: [
    presetUseful({
      webFonts: {
        fonts: {
          mono: 'Fira Mono:400,700',
          sans: 'DM Sans',
        },
      },
      icons: {
        extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'text-bottom',
        },
      },
    }),
  ],
})
