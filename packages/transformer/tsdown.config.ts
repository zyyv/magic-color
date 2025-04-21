import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/colors/index.ts',
  ],
  dts: true,
  clean: true,
})
