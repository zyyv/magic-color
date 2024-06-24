<script lang='ts' setup>
import chroma from 'chroma-js'
import { MagicColor } from 'magic-color'
import Ge from '../../../packages/magic-color/src/theme/collections.json'
import RatioTableSquare from './RatioTableSquare.vue'
import ThemeColors from './ThemeColors.vue'
import Chart from './Chart.vue'

const props = defineProps<{
  color: string
}>()

// const lsc = chroma.bezier([chroma(props.color).luminance(0.7).hex(), props.color, chroma(props.color).darken(3).hex()]).scale().colors(11)
// const lsc = chroma.scale([chroma(props.color).luminance(0.8), props.color, chroma(props.color).darken(3)]).correctLightness()
//   .mode('lch').colors(11)

// console.log('chroma.bezier : ', lsc)

// console.log(chroma.brewer.Blues)

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

// const aths_special = {
//   50: '#f9f9f1',
//   100: '#e4e4c4',
//   200: '#dadaad',
//   300: '#c6c383',
//   400: '#b9b366',
//   500: '#ad9e53',
//   600: '#988247',
//   700: '#7f673e',
//   800: '#695437',
//   900: '#58462f',
//   950: '#312517',
// }

// const keys = Object.keys(aths_special)

// const colors = Array.from({ length: 10 }, () => chroma.lch(50, 80, Math.random() * 360).hex())

// console.log(colors)

// const hslForAths_special = Object.entries(aths_special).map(([k, v]) => {
//   const hsl = new MagicColor(v).toHsl().value
//   return { k, hsl }
// })

// console.log(hslForAths_special)

interface Color {
  name: string
  id: string
  shades: {
    number: number
    hexcode: string
    delta?: number
    lightnessDiff?: number
  }[]
  closestShade: {
    delta: number
    hexcode: string
    number: number
  }
  closestShadeLightness: {
    delta: number
    hexcode: string
    lightnessDiff: number
    number: number
  }
}

const colors = [
  { name: 'Red', id: 'red', shades: [{ number: 50, hexcode: '#fef2f2' }, { number: 100, hexcode: '#fee2e2' }, { number: 200, hexcode: '#fecaca' }, { number: 300, hexcode: '#fca5a5' }, { number: 400, hexcode: '#f87171' }, { number: 500, hexcode: '#ef4444' }, { number: 600, hexcode: '#dc2626' }, { number: 700, hexcode: '#b91c1c' }, { number: 800, hexcode: '#991b1b' }, { number: 900, hexcode: '#7f1d1d' }, { number: 950, hexcode: '#450a0a' }] },
  { name: 'Orange', id: 'orange', shades: [{ number: 50, hexcode: '#fff7ed' }, { number: 100, hexcode: '#ffedd5' }, { number: 200, hexcode: '#fed7aa' }, { number: 300, hexcode: '#fdba74' }, { number: 400, hexcode: '#fb923c' }, { number: 500, hexcode: '#f97316' }, { number: 600, hexcode: '#ea580c' }, { number: 700, hexcode: '#c2410c' }, { number: 800, hexcode: '#9a3412' }, { number: 900, hexcode: '#7c2d12' }, { number: 950, hexcode: '#431407' }] },
  { name: 'Amber', id: 'amber', shades: [{ number: 50, hexcode: '#fffbeb' }, { number: 100, hexcode: '#fef3c7' }, { number: 200, hexcode: '#fde68a' }, { number: 300, hexcode: '#fcd34d' }, { number: 400, hexcode: '#fbbf24' }, { number: 500, hexcode: '#f59e0b' }, { number: 600, hexcode: '#d97706' }, { number: 700, hexcode: '#b45309' }, { number: 800, hexcode: '#92400e' }, { number: 900, hexcode: '#78350f' }, { number: 950, hexcode: '#451a03' }] },
  { name: 'Yellow', id: 'yellow', shades: [{ number: 50, hexcode: '#fefce8' }, { number: 100, hexcode: '#fef9c3' }, { number: 200, hexcode: '#fef08a' }, { number: 300, hexcode: '#fde047' }, { number: 400, hexcode: '#facc15' }, { number: 500, hexcode: '#eab308' }, { number: 600, hexcode: '#ca8a04' }, { number: 700, hexcode: '#a16207' }, { number: 800, hexcode: '#854d0e' }, { number: 900, hexcode: '#713f12' }, { number: 950, hexcode: '#422006' }] },
  { name: 'Lime', id: 'lime', shades: [{ number: 50, hexcode: '#f7fee7' }, { number: 100, hexcode: '#ecfccb' }, { number: 200, hexcode: '#d9f99d' }, { number: 300, hexcode: '#bef264' }, { number: 400, hexcode: '#a3e635' }, { number: 500, hexcode: '#84cc16' }, { number: 600, hexcode: '#65a30d' }, { number: 700, hexcode: '#4d7c0f' }, { number: 800, hexcode: '#3f6212' }, { number: 900, hexcode: '#365314' }, { number: 950, hexcode: '#1a2e05' }] },
  { name: 'Green', id: 'green', shades: [{ number: 50, hexcode: '#f0fdf4' }, { number: 100, hexcode: '#dcfce7' }, { number: 200, hexcode: '#bbf7d0' }, { number: 300, hexcode: '#86efac' }, { number: 400, hexcode: '#4ade80' }, { number: 500, hexcode: '#22c55e' }, { number: 600, hexcode: '#16a34a' }, { number: 700, hexcode: '#15803d' }, { number: 800, hexcode: '#166534' }, { number: 900, hexcode: '#14532d' }, { number: 950, hexcode: '#052e16' }] },
  { name: 'Emerald', id: 'emerald', shades: [{ number: 50, hexcode: '#ecfdf5' }, { number: 100, hexcode: '#d1fae5' }, { number: 200, hexcode: '#a7f3d0' }, { number: 300, hexcode: '#6ee7b7' }, { number: 400, hexcode: '#34d399' }, { number: 500, hexcode: '#10b981' }, { number: 600, hexcode: '#059669' }, { number: 700, hexcode: '#047857' }, { number: 800, hexcode: '#065f46' }, { number: 900, hexcode: '#064e3b' }, { number: 950, hexcode: '#022c22' }] },
  { name: 'Teal', id: 'teal', shades: [{ number: 50, hexcode: '#f0fdfa' }, { number: 100, hexcode: '#ccfbf1' }, { number: 200, hexcode: '#99f6e4' }, { number: 300, hexcode: '#5eead4' }, { number: 400, hexcode: '#2dd4bf' }, { number: 500, hexcode: '#14b8a6' }, { number: 600, hexcode: '#0d9488' }, { number: 700, hexcode: '#0f766e' }, { number: 800, hexcode: '#115e59' }, { number: 900, hexcode: '#134e4a' }, { number: 950, hexcode: '#042f2e' }] },
  { name: 'Cyan', id: 'cyan', shades: [{ number: 50, hexcode: '#ecfeff' }, { number: 100, hexcode: '#cffafe' }, { number: 200, hexcode: '#a5f3fc' }, { number: 300, hexcode: '#67e8f9' }, { number: 400, hexcode: '#22d3ee' }, { number: 500, hexcode: '#06b6d4' }, { number: 600, hexcode: '#0891b2' }, { number: 700, hexcode: '#0e7490' }, { number: 800, hexcode: '#155e75' }, { number: 900, hexcode: '#164e63' }, { number: 950, hexcode: '#083344' }] },
  { name: 'Sky', id: 'sky', shades: [{ number: 50, hexcode: '#f0f9ff' }, { number: 100, hexcode: '#e0f2fe' }, { number: 200, hexcode: '#bae6fd' }, { number: 300, hexcode: '#7dd3fc' }, { number: 400, hexcode: '#38bdf8' }, { number: 500, hexcode: '#0ea5e9' }, { number: 600, hexcode: '#0284c7' }, { number: 700, hexcode: '#0369a1' }, { number: 800, hexcode: '#075985' }, { number: 900, hexcode: '#0c4a6e' }, { number: 950, hexcode: '#082f49' }] },
  { name: 'Blue', id: 'blue', shades: [{ number: 50, hexcode: '#eff6ff' }, { number: 100, hexcode: '#dbeafe' }, { number: 200, hexcode: '#bfdbfe' }, { number: 300, hexcode: '#93c5fd' }, { number: 400, hexcode: '#60a5fa' }, { number: 500, hexcode: '#3b82f6' }, { number: 600, hexcode: '#2563eb' }, { number: 700, hexcode: '#1d4ed8' }, { number: 800, hexcode: '#1e40af' }, { number: 900, hexcode: '#1e3a8a' }, { number: 950, hexcode: '#172554' }] },
  { name: 'Indigo', id: 'indigo', shades: [{ number: 50, hexcode: '#eef2ff' }, { number: 100, hexcode: '#e0e7ff' }, { number: 200, hexcode: '#c7d2fe' }, { number: 300, hexcode: '#a5b4fc' }, { number: 400, hexcode: '#818cf8' }, { number: 500, hexcode: '#6366f1' }, { number: 600, hexcode: '#4f46e5' }, { number: 700, hexcode: '#4338ca' }, { number: 800, hexcode: '#3730a3' }, { number: 900, hexcode: '#312e81' }, { number: 950, hexcode: '#1e1b4b' }] },
  { name: 'Violet', id: 'violet', shades: [{ number: 50, hexcode: '#f5f3ff' }, { number: 100, hexcode: '#ede9fe' }, { number: 200, hexcode: '#ddd6fe' }, { number: 300, hexcode: '#c4b5fd' }, { number: 400, hexcode: '#a78bfa' }, { number: 500, hexcode: '#8b5cf6' }, { number: 600, hexcode: '#7c3aed' }, { number: 700, hexcode: '#6d28d9' }, { number: 800, hexcode: '#5b21b6' }, { number: 900, hexcode: '#4c1d95' }, { number: 950, hexcode: '#2e1065' }] },
  { name: 'Purple', id: 'purple', shades: [{ number: 50, hexcode: '#faf5ff' }, { number: 100, hexcode: '#f3e8ff' }, { number: 200, hexcode: '#e9d5ff' }, { number: 300, hexcode: '#d8b4fe' }, { number: 400, hexcode: '#c084fc' }, { number: 500, hexcode: '#a855f7' }, { number: 600, hexcode: '#9333ea' }, { number: 700, hexcode: '#7e22ce' }, { number: 800, hexcode: '#6b21a8' }, { number: 900, hexcode: '#581c87' }, { number: 950, hexcode: '#3b0764' }] },
  { name: 'Fuchsia', id: 'fuchsia', shades: [{ number: 50, hexcode: '#fdf4ff' }, { number: 100, hexcode: '#fae8ff' }, { number: 200, hexcode: '#f5d0fe' }, { number: 300, hexcode: '#f0abfc' }, { number: 400, hexcode: '#e879f9' }, { number: 500, hexcode: '#d946ef' }, { number: 600, hexcode: '#c026d3' }, { number: 700, hexcode: '#a21caf' }, { number: 800, hexcode: '#86198f' }, { number: 900, hexcode: '#701a75' }, { number: 950, hexcode: '#4a044e' }] },
  { name: 'Pink', id: 'pink', shades: [{ number: 50, hexcode: '#fdf2f8' }, { number: 100, hexcode: '#fce7f3' }, { number: 200, hexcode: '#fbcfe8' }, { number: 300, hexcode: '#f9a8d4' }, { number: 400, hexcode: '#f472b6' }, { number: 500, hexcode: '#ec4899' }, { number: 600, hexcode: '#db2777' }, { number: 700, hexcode: '#be185d' }, { number: 800, hexcode: '#9d174d' }, { number: 900, hexcode: '#831843' }, { number: 950, hexcode: '#500724' }] },
  { name: 'Rose', id: 'rose', shades: [{ number: 50, hexcode: '#fff1f2' }, { number: 100, hexcode: '#ffe4e6' }, { number: 200, hexcode: '#fecdd3' }, { number: 300, hexcode: '#fda4af' }, { number: 400, hexcode: '#fb7185' }, { number: 500, hexcode: '#f43f5e' }, { number: 600, hexcode: '#e11d48' }, { number: 700, hexcode: '#be123c' }, { number: 800, hexcode: '#9f1239' }, { number: 900, hexcode: '#881337' }, { number: 950, hexcode: '#4c0519' }] },
]

/**
 *
 * @param {*} o color 'hexcode'
 * @param {*} e 颜色集合数组 带 name id shades： [{hexcode: '#000000', number: 50}, ...] // 红橙黄绿青蓝紫 Rose shade 数组
 * @returns
 */
function be(o: string, e: Color[]) {
  e.forEach((i) => {
    i.shades = i.shades.map((a) => {
      return {
        ...a,
        // 计算两个颜色之间的色差 chroma.deltaE
        delta: chroma.deltaE(o, a.hexcode),
      }
    })
  })

  // 找到每个颜色集合中与目标颜色最接近的颜色
  e.forEach((i) => {
    i.closestShade = i.shades.reduce((a, r) => a.delta! < r.delta! ? a : r) as any
  })

  // 找到与目标颜色最接近的颜色集合
  const t = e.reduce((i, a) => i.closestShade.delta < a.closestShade.delta ? i : a)

  console.log('t: ', t)

  t.shades = t.shades.map((i) => {
    console.log('i: ', chroma(i.hexcode).get('hsl.l'), '   j: ', chroma(o).get('hsl.l'))

    return {
      ...i,
      // id
      // name
      // shades
      // closestShade
      lightnessDiff: Math.abs(chroma(i.hexcode).get('hsl.l') - chroma(o).get('hsl.l')), // 计算两个颜色之间的亮度差
    }
  })

  // 找到与目标颜色最接近的颜色集合中与目标颜色亮度最接近的颜色
  t.closestShadeLightness = t.shades.reduce((i, a) => i.lightnessDiff! < a.lightnessDiff! ? i : a) as any

  return t
}

function Pe(o: string, e: Color[], t = false, i = false) {
  // 获取与输入颜色 o 最接近的阴影色和亮度
  const a = be(o, e)
  console.log(a)

  debugger
  // 获取输入颜色的 HSL 色调
  const r = chroma(o).get('hsl.h')
  // 获取最接近阴影亮度的 HSL 色调
  const l = chroma(a.closestShadeLightness.hexcode).get('hsl.h')

  // 计算色调差异
  let d: any = r - (l || 0)

  // 计算饱和度比例
  const k = chroma(o).get('hsl.s') / chroma(a.closestShadeLightness.hexcode).get('hsl.s')

  // 调整色调差异的表示形式
  if (d === 0)
    d = l.toString()
  else if (d > 0)
    d = `+${d}`
  else
    d = d.toString()

  console.log('d', d)

  const y: any = {}

  // 设置 id 和 name 属性
  // 生成随机 id
  y.id = Math.random().toString(16).slice(2)
  y.name = ve(o)

  // 生成颜色阴影数组
  y.shades = a.shades.map((shade) => {
    let C = shade.hexcode

    // 调整饱和度
    const u = chroma(C).get('hsl.s') * k
    C = chroma(C).set('hsl.s', u).hex()

    // 调整色调
    C = chroma(C).set('hsl.h', d).hex()

    // 如果当前阴影是最接近的阴影亮度，将颜色设置为输入颜色
    if (a.closestShadeLightness.number === shade.number)
      C = chroma(o).hex()

    // 如果 t 为 true，根据 APCA 对比度调整颜色
    // if (t) {
    //     if (shade.number < 500) {
    //         let b = i.find(v => v.number == shade.number).apcaOnBlack;
    //         C = M(b, "#000", C);
    //     } else {
    //         let b = i.find(v => v.number == shade.number).apcaOnWhite;
    //         C = M(b, "#fff", C);
    //     }
    // }

    return {
      number: shade.number.toString(),
      hexcode: C,
      hsl: {
        hue: Math.round(chroma(C).get('hsl.h')) || 0,
        saturation: Math.round(chroma(C).get('hsl.s') * 100),
        lightness: Math.round(chroma(C).get('hsl.l') * 100),
      },
      isLocked: a.closestShadeLightness.number === shade.number && !t,
    }
  })

  return y
}

function ve(o: string) {
  const e = Ge
  e.forEach((t) => {
    t.push(chroma.deltaE(o, t[0]) as any)
  },
  )
  return e.reduce((t, i) => t[2] < i[2] ? t : i)[1]
}

// const colors2 = Pe(props.color, colors as any)

const newColors = computed(() => {
  return Object.fromEntries(Pe(props.color, colors as any).shades.map((c: any) => [c.number, c.hexcode]))
})
console.log(newColors.value)
</script>

<template>
  <div fcc gap-1>
    <!-- <RatioTableSquare v-for="(c, k) in colors" :key="k" :background-color="c" :color="c" /> -->
  </div>
  <div fcc gap-1>
    <!-- <span v-for="(c, k) in colors" :key="k" :style="{ color: c }" :background-color="c" :color="c">{{ c }}</span> -->
  </div>
  <!-- <div fccc gap-1>
    <div fcc gap-1>
      <RatioTableSquare v-for="(c, k) in lsc" :key="k" :text="k.toString()" :background-color="c" color="white" />
    </div>
    <div fcc gap-1>
      <RatioTableSquare v-for="(c, k) in gossamer" :key="k" :text="k.toString()" :background-color="c" color="white" />
    </div>
    <div fcc gap-1>
      <RatioTableSquare v-for="(c, k) in chroma.brewer.Blues" :key="k" :text="k.toString()" :background-color="c" color="white" />
    </div>
    <div fcc gap-1>
      <RatioTableSquare v-for="(c, k) in chroma.brewer.Greens" :key="k" :text="k.toString()" :background-color="c" color="white" />
    </div>
    <div fcc gap-1>
      <RatioTableSquare v-for="(c, k) in chroma.brewer.Oranges" :key="k" :text="k.toString()" :background-color="c" color="white" />
    </div>
  </div> -->
  <!-- <div fcc gap-1>
    <RatioTableSquare v-for="(c, k) in aths_special" :key="k" :text="k.toString()" :background-color="c" color="white" />
  </div> -->

  <div fccc gap-2>
    <!-- <ThemeColors :colors="gossamer" /> -->
    <ThemeColors :colors="newColors as any" />
    <div fccc gap-10>
      <Chart :colors="newColors as any" />
      <!-- <Chart :colors="aths_special" /> -->
    </div>
  </div>
</template>
