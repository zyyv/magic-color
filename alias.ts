import path from 'node:path'

export const r = (p: string) => path.resolve(__dirname, p)

export const alias = {
  'magic-color': r('./packages/magic-color/src/index.ts'),
}
