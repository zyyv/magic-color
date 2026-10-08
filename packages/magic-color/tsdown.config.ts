import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    './src/index.ts',
  ],
  dts: true,
  clean: true,
  attw: { profile: 'strict', level: 'error', ignoreRules: ['cjs-resolves-to-esm'] },
})
