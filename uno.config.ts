import type { Preset } from 'unocss'
import { defineConfig } from 'unocss'
import type { UsefulTheme } from 'unocss-preset-useful'
import { presetUseful } from 'unocss-preset-useful'

export default defineConfig({
  shortcuts: {
    'grad-color': 'text-$vp-c-brand',
    'linear-text': 'text-transparent bg-clip-text bg-gradient-to-r',
    'grad-p-r': 'linear-text from-purple to-red',
  },
  presets: [
    presetUseful({
      webFonts: {
        provider: 'google',
        fonts: {
          sans: 'Roboto',
          mono: ['Fira Code', 'Fira Mono:400,700'],
        },
      },
    }) as Preset<UsefulTheme>,
  ],
  separators: ['_', '-', ':'],
})
