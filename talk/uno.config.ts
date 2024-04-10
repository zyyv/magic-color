import { defineConfig } from 'unocss'
import { presetUseful } from 'unocss-preset-useful'

export default defineConfig({
  presets: [
    presetUseful({
      webFonts: {
        provider: 'google',
        fonts: {
          sans: 'Roboto',
          mono: ['Fira Code', 'Fira Mono:400,700'],
        },
      },
    }),
  ],
  separators: ['_', '-', ':'],
})
