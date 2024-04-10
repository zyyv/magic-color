import path from 'node:path'
import { defaultExclude, defineConfig } from 'vitest/config'

const r = (p: string) => path.resolve(__dirname, p)

export default defineConfig({
  resolve: {
    alias: {
      'magic-color': r('./packages/magic-color/src/index.ts'),
    },
  },
  test: {
    exclude: [...defaultExclude],
  },
})
