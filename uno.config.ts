import type { Preset, RuleContext } from 'unocss'
import { defineConfig, transformerDirectives } from 'unocss'
import type { UsefulTheme } from 'unocss-preset-useful'
import { presetUseful } from 'unocss-preset-useful'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { parseColor } from '@unocss/preset-mini'
import { r } from './alias'

export default defineConfig({
  rules: [
    [/^o-(.*)$/, ([, body]: string[], { theme }: RuleContext) => {
      const color = parseColor(body, theme)
      if (color?.cssColor?.type === 'rgb' && color.cssColor.components) {
        return {
          '--c-context': `${color.cssColor.components.join(',')}`,
        }
      }
      else {
        return {
          '--c-context': color?.color,
        }
      }
    }],
    [/^([^:]+)::([^:]+)$/, ([, n, v], { theme }) => {
      const color = parseColor(v, theme)
      if (color?.cssColor?.type === 'rgb' && color.cssColor.components) {
        return {
          [`--${n}`]: `${color.cssColor.components.join(',')}`,
        }
      }
      return {
        [`--${n}`]: v,
      }
    }],
  ],
  theme: {
    colors: {
      context: 'rgba(var(--c-context),%alpha)',
      unocss: {
        DEFAULT: '#818181',
        from: '#ccc',
        via: '#858585',
        to: '#4d4d4d',
      },
      elk: '#c18139',
      onuui: {
        from: '#acc1ee',
        to: '#c084fc',
      },
      unpreset: {
        from: '#ff5c5c',
        to: '#dbe74f',
      },
      vite: {
        from: '#41d1ff',
        to: '#bd34fe',
      },
      vue: '#64b687',
      nuxt: '#64d98a',
      bilibili: '#ed7099',
    },
  },
  shortcuts: {
    'grad-color': 'text-$vp-c-brand',
    'linear-text': 'text-transparent bg-clip-text bg-gradient-to-r',
    'grad-p-r': 'linear-text from-purple to-red',
    'linkWithIcon': 'trans c-context',
    'icon': 'w-5.5 h-5.5 cursor-pointer select-none transition-opacity-300 ease-in-out',
    'icon-btn': 'icon color-inherit op64 hover-op100 hover-color-teal-500 dark-hover-color-inherit',
    'icon-link': 'icon color-inherit op64 hover:op100 hover-text-red-300 dark-hover-color-inherit',
    'icon-text': 'color-inherit op64 hover:op100 hover-text-purple dark-hover-color-inherit',
  },
  presets: [
    presetUseful({
      theme: {
        extend: {
          animation: {
            shape: 'shape 5s linear infinite',
          },
          keyframes: {
            shape: {
              '0%,100%': {
                'border-radius': '42% 58% 70% 30% / 45% 45% 55% 55%',
                'transform': 'translate3d(0,0,0) rotateZ(0.01deg)',
              },
              '34%': {
                'border-radius': '70% 30% 46% 54% / 30% 29% 71% 70%',
                'transform': 'translate3d(0,5px,0) rotateZ(0.01deg)',
              },
              '50%': {
                transform: 'translate3d(0,0,0) rotateZ(0.01deg)',
              },
              '67%': {
                'border-radius': '100% 60% 60% 100% / 100% 100% 60% 60%',
                'transform': 'translate3d(0,-3px,0) rotateZ(0.01deg)',
              },
            },
          },
        },
      },
      webFonts: {
        provider: 'google',
        fonts: {
          mono: ['Fira Code', 'Fira Mono:400,700'],
          sans: ['DM Sans'],
        },
        inlineImports: false,
      },
      icons: {
        extraProperties: {
          'display': 'inline-block',
          'height': '1.2em',
          'width': '1.2em',
          'vertical-align': 'text-bottom',
        },
        mode: 'mask',
        collections: {
          'my-logos': FileSystemIconLoader(r('./public/logos')),
        },
      },
      typography: {
        cssExtend: {
          'a': {
            'display': 'inline-block',
            'line-height': '1.5',
            'border-bottom': '1px dashed rgba(var(--c-context), 0.5)',
            'text-decoration': 'none',
            'transition': 'all 0.3s ease-in-out',
          },
          'a:hover': {
            'border-bottom': '1px solid rgba(var(--c-context), 1)',
          },
        },
      },
    }) as Preset<UsefulTheme>,
  ],
  separators: ['_', '-', ':'],
  transformers: [transformerDirectives()],
})
