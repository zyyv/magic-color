import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    colors: 'src/colors/index.ts',
  },
  dts: true,
  clean: true,
})
