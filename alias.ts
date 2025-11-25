import path from 'node:path'

export const r = (p: string) => path.resolve(__dirname, p)

export const alias = {
  'magic-color': r('./packages/magic-color/src/index.ts'),
  '@magic-color/core': r('./packages/core/src/index.ts'),
  '@magic-color/shared': r('./packages/shared/src/index.ts'),
  '@magic-color/theme': r('./packages/theme/src/index.ts'),
  '@magic-color/transformer': r('./packages/transformer/src/index.ts'),
  '@magic-color/vue': r('./packages/vue/src/index.ts'),
}
