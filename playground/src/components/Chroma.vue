<script lang='ts' setup>
import chroma from 'chroma-js'
import { colorbrewer, w3cx11 } from '@magic-color/core'
import { MagicColor } from 'magic-color'
import RatioTableSquare from './RatioTableSquare.vue'
import ThemeColors from './ThemeColors.vue'
import Chart from './Chart.vue'

defineProps<{
  color: string
}>()

// 50: withTint(0.95),
// 100: withTint(0.9),
// 200: withTint(0.75),
// 300: withTint(0.6),
// 400: withTint(0.3),
// 500: (c: RgbColor) => c,
// 600: withShade(0.9),
// 700: withShade(0.6),
// 800: withShade(0.45),
// 900: withShade(0.3),
// 950: withShade(0.2),

// const colors = {
//   50: chromaObj.brighten(0.95).hex(),
//   100: chromaObj.brighten(0.9).hex(),
//   200: chromaObj.brighten(0.75).hex(),
//   300: chromaObj.brighten(0.6).hex(),
//   400: chromaObj.brighten(0.3).hex(),
//   500: chromaObj.hex(),
//   600: chromaObj.darken(0.2).hex(),
//   700: chromaObj.darken(0.3).hex(),
//   800: chromaObj.darken(0.45).hex(),
//   900: chromaObj.darken(0.6).hex(),
//   950: chromaObj.darken(0.9).hex(),
// }

const aths_special = {
  50: '#f9f9f1',
  100: '#e4e4c4',
  200: '#dadaad',
  300: '#c6c383',
  400: '#b9b366',
  500: '#ad9e53',
  600: '#988247',
  700: '#7f673e',
  800: '#695437',
  900: '#58462f',
  950: '#312517',
}

const gossamer = {
  50: '#f0f9f5',
  100: '#dbf0e5',
  200: '#bae0ce',
  300: '#8dc8b1',
  400: '#529e82',
  500: '#3b8e73',
  600: '#2a715b',
  700: '#215b4a',
  800: '#1d483c',
  900: '#183c32',
  950: '#0d211c',
}

const colors = Array.from({ length: 10 }, () => chroma.lch(50, 80, Math.random() * 360).hex())

// console.log(colors)

// const hslForAths_special = Object.entries(aths_special).map(([k, v]) => {
//   const hsl = new MagicColor(v).toHsl().value
//   return { k, hsl }
// })

// console.log(hslForAths_special)
</script>

<template>
  <div fcc gap-1>
    <RatioTableSquare v-for="(c, k) in colors" :key="k" :background-color="c" :color="c" />
  </div>
  <div fcc gap-1>
    <span v-for="(c, k) in colors" :key="k" :style="{ color: c }" :background-color="c" :color="c">{{ c }}</span>
  </div>
  <div fcc gap-1>
    <RatioTableSquare v-for="(c, k) in aths_special" :key="k" :text="k.toString()" :background-color="c" color="white" />
  </div>
  <div fcc gap-1>
    <RatioTableSquare v-for="(c, k) in gossamer" :key="k" :text="k.toString()" :background-color="c" color="white" />
  </div>
  <div fccc gap-2>
    <ThemeColors :colors="gossamer" />
    <Chart :colors="gossamer" />
  </div>
</template>
