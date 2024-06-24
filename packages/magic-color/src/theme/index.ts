import type { ColorType } from '@magic-color/core'
import { MagicColor } from '../core'
import collections from './collections.json'
import { deltaE } from './utils'

export interface ThemeMetas {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
}

interface Shade {
  key: number
  color: string
}

interface NormalizedShade extends Shade {
  delta: number
  lightnessDiff: number
}

interface BasicColorType {
  name: string
  id: string
  shades: Shade[]
}

interface ClosestModel extends BasicColorType {
  shades: NormalizedShade[]
  closestShade: NormalizedShade
  closestShadeLightness: NormalizedShade
}

const BasicColors: BasicColorType[] = [
  { name: 'Red', id: 'red', shades: [{ key: 50, color: '#fef2f2' }, { key: 100, color: '#fee2e2' }, { key: 200, color: '#fecaca' }, { key: 300, color: '#fca5a5' }, { key: 400, color: '#f87171' }, { key: 500, color: '#ef4444' }, { key: 600, color: '#dc2626' }, { key: 700, color: '#b91c1c' }, { key: 800, color: '#991b1b' }, { key: 900, color: '#7f1d1d' }, { key: 950, color: '#450a0a' }] },
  { name: 'Orange', id: 'orange', shades: [{ key: 50, color: '#fff7ed' }, { key: 100, color: '#ffedd5' }, { key: 200, color: '#fed7aa' }, { key: 300, color: '#fdba74' }, { key: 400, color: '#fb923c' }, { key: 500, color: '#f97316' }, { key: 600, color: '#ea580c' }, { key: 700, color: '#c2410c' }, { key: 800, color: '#9a3412' }, { key: 900, color: '#7c2d12' }, { key: 950, color: '#431407' }] },
  { name: 'Amber', id: 'amber', shades: [{ key: 50, color: '#fffbeb' }, { key: 100, color: '#fef3c7' }, { key: 200, color: '#fde68a' }, { key: 300, color: '#fcd34d' }, { key: 400, color: '#fbbf24' }, { key: 500, color: '#f59e0b' }, { key: 600, color: '#d97706' }, { key: 700, color: '#b45309' }, { key: 800, color: '#92400e' }, { key: 900, color: '#78350f' }, { key: 950, color: '#451a03' }] },
  { name: 'Yellow', id: 'yellow', shades: [{ key: 50, color: '#fefce8' }, { key: 100, color: '#fef9c3' }, { key: 200, color: '#fef08a' }, { key: 300, color: '#fde047' }, { key: 400, color: '#facc15' }, { key: 500, color: '#eab308' }, { key: 600, color: '#ca8a04' }, { key: 700, color: '#a16207' }, { key: 800, color: '#854d0e' }, { key: 900, color: '#713f12' }, { key: 950, color: '#422006' }] },
  { name: 'Lime', id: 'lime', shades: [{ key: 50, color: '#f7fee7' }, { key: 100, color: '#ecfccb' }, { key: 200, color: '#d9f99d' }, { key: 300, color: '#bef264' }, { key: 400, color: '#a3e635' }, { key: 500, color: '#84cc16' }, { key: 600, color: '#65a30d' }, { key: 700, color: '#4d7c0f' }, { key: 800, color: '#3f6212' }, { key: 900, color: '#365314' }, { key: 950, color: '#1a2e05' }] },
  { name: 'Green', id: 'green', shades: [{ key: 50, color: '#f0fdf4' }, { key: 100, color: '#dcfce7' }, { key: 200, color: '#bbf7d0' }, { key: 300, color: '#86efac' }, { key: 400, color: '#4ade80' }, { key: 500, color: '#22c55e' }, { key: 600, color: '#16a34a' }, { key: 700, color: '#15803d' }, { key: 800, color: '#166534' }, { key: 900, color: '#14532d' }, { key: 950, color: '#052e16' }] },
  { name: 'Emerald', id: 'emerald', shades: [{ key: 50, color: '#ecfdf5' }, { key: 100, color: '#d1fae5' }, { key: 200, color: '#a7f3d0' }, { key: 300, color: '#6ee7b7' }, { key: 400, color: '#34d399' }, { key: 500, color: '#10b981' }, { key: 600, color: '#059669' }, { key: 700, color: '#047857' }, { key: 800, color: '#065f46' }, { key: 900, color: '#064e3b' }, { key: 950, color: '#022c22' }] },
  { name: 'Teal', id: 'teal', shades: [{ key: 50, color: '#f0fdfa' }, { key: 100, color: '#ccfbf1' }, { key: 200, color: '#99f6e4' }, { key: 300, color: '#5eead4' }, { key: 400, color: '#2dd4bf' }, { key: 500, color: '#14b8a6' }, { key: 600, color: '#0d9488' }, { key: 700, color: '#0f766e' }, { key: 800, color: '#115e59' }, { key: 900, color: '#134e4a' }, { key: 950, color: '#042f2e' }] },
  { name: 'Cyan', id: 'cyan', shades: [{ key: 50, color: '#ecfeff' }, { key: 100, color: '#cffafe' }, { key: 200, color: '#a5f3fc' }, { key: 300, color: '#67e8f9' }, { key: 400, color: '#22d3ee' }, { key: 500, color: '#06b6d4' }, { key: 600, color: '#0891b2' }, { key: 700, color: '#0e7490' }, { key: 800, color: '#155e75' }, { key: 900, color: '#164e63' }, { key: 950, color: '#083344' }] },
  { name: 'Sky', id: 'sky', shades: [{ key: 50, color: '#f0f9ff' }, { key: 100, color: '#e0f2fe' }, { key: 200, color: '#bae6fd' }, { key: 300, color: '#7dd3fc' }, { key: 400, color: '#38bdf8' }, { key: 500, color: '#0ea5e9' }, { key: 600, color: '#0284c7' }, { key: 700, color: '#0369a1' }, { key: 800, color: '#075985' }, { key: 900, color: '#0c4a6e' }, { key: 950, color: '#082f49' }] },
  { name: 'Blue', id: 'blue', shades: [{ key: 50, color: '#eff6ff' }, { key: 100, color: '#dbeafe' }, { key: 200, color: '#bfdbfe' }, { key: 300, color: '#93c5fd' }, { key: 400, color: '#60a5fa' }, { key: 500, color: '#3b82f6' }, { key: 600, color: '#2563eb' }, { key: 700, color: '#1d4ed8' }, { key: 800, color: '#1e40af' }, { key: 900, color: '#1e3a8a' }, { key: 950, color: '#172554' }] },
  { name: 'Indigo', id: 'indigo', shades: [{ key: 50, color: '#eef2ff' }, { key: 100, color: '#e0e7ff' }, { key: 200, color: '#c7d2fe' }, { key: 300, color: '#a5b4fc' }, { key: 400, color: '#818cf8' }, { key: 500, color: '#6366f1' }, { key: 600, color: '#4f46e5' }, { key: 700, color: '#4338ca' }, { key: 800, color: '#3730a3' }, { key: 900, color: '#312e81' }, { key: 950, color: '#1e1b4b' }] },
  { name: 'Violet', id: 'violet', shades: [{ key: 50, color: '#f5f3ff' }, { key: 100, color: '#ede9fe' }, { key: 200, color: '#ddd6fe' }, { key: 300, color: '#c4b5fd' }, { key: 400, color: '#a78bfa' }, { key: 500, color: '#8b5cf6' }, { key: 600, color: '#7c3aed' }, { key: 700, color: '#6d28d9' }, { key: 800, color: '#5b21b6' }, { key: 900, color: '#4c1d95' }, { key: 950, color: '#2e1065' }] },
  { name: 'Purple', id: 'purple', shades: [{ key: 50, color: '#faf5ff' }, { key: 100, color: '#f3e8ff' }, { key: 200, color: '#e9d5ff' }, { key: 300, color: '#d8b4fe' }, { key: 400, color: '#c084fc' }, { key: 500, color: '#a855f7' }, { key: 600, color: '#9333ea' }, { key: 700, color: '#7e22ce' }, { key: 800, color: '#6b21a8' }, { key: 900, color: '#581c87' }, { key: 950, color: '#3b0764' }] },
  { name: 'Fuchsia', id: 'fuchsia', shades: [{ key: 50, color: '#fdf4ff' }, { key: 100, color: '#fae8ff' }, { key: 200, color: '#f5d0fe' }, { key: 300, color: '#f0abfc' }, { key: 400, color: '#e879f9' }, { key: 500, color: '#d946ef' }, { key: 600, color: '#c026d3' }, { key: 700, color: '#a21caf' }, { key: 800, color: '#86198f' }, { key: 900, color: '#701a75' }, { key: 950, color: '#4a044e' }] },
  { name: 'Pink', id: 'pink', shades: [{ key: 50, color: '#fdf2f8' }, { key: 100, color: '#fce7f3' }, { key: 200, color: '#fbcfe8' }, { key: 300, color: '#f9a8d4' }, { key: 400, color: '#f472b6' }, { key: 500, color: '#ec4899' }, { key: 600, color: '#db2777' }, { key: 700, color: '#be185d' }, { key: 800, color: '#9d174d' }, { key: 900, color: '#831843' }, { key: 950, color: '#500724' }] },
  { name: 'Rose', id: 'rose', shades: [{ key: 50, color: '#fff1f2' }, { key: 100, color: '#ffe4e6' }, { key: 200, color: '#fecdd3' }, { key: 300, color: '#fda4af' }, { key: 400, color: '#fb7185' }, { key: 500, color: '#f43f5e' }, { key: 600, color: '#e11d48' }, { key: 700, color: '#be123c' }, { key: 800, color: '#9f1239' }, { key: 900, color: '#881337' }, { key: 950, color: '#4c0519' }] },
]

function findClosetShade(color: string, colors: BasicColorType[]): ClosestModel {
  const normalizedColors = colors.map((meta) => {
    const shades = meta.shades.map(shade => ({
      ...shade,
      delta: deltaE(color, shade.color), // 计算两个颜色之间的色差 deltaE
      lightnessDiff: Math.abs(hslComponets(shade.color, 'l') - hslComponets(color, 'l')) / 100,
    }))

    return {
      ...meta,
      shades,
      closestShade: shades.reduce((p, n) => p.delta < n.delta ? p : n), // 每个颜色集合中与目标颜色最接近的颜色
    }
  })

  // 找到与目标颜色最接近的颜色集合
  const colorModel = normalizedColors.reduce((i, a) => i.closestShade.delta < a.closestShade.delta ? i : a)

  return {
    ...colorModel,
    // 找到与目标颜色最接近的颜色集合中与目标颜色亮度最接近的颜色
    closestShadeLightness: colorModel.shades.reduce((i, a) => i.lightnessDiff < a.lightnessDiff ? i : a),
  }
}

function generate(o: string, e: BasicColorType[], apca = false) {
  // 获取与输入颜色 o 最接近的阴影色和亮度
  const a = findClosetShade(o, e)

  // 获取输入颜色的 HSL 色调
  const r = hslComponets(o, 'h')
  // 获取最接近阴影亮度的 HSL 色调
  const l = hslComponets(a.closestShadeLightness.color, 'h')

  // 计算色调差异
  let d: any = r - (l || 0)

  // 计算饱和度比例
  const k = hslComponets(o, 's') / hslComponets(a.closestShadeLightness.color, 's')

  // 调整色调差异的表示形式
  if (d === 0)
    d = l.toString()
  else if (d > 0)
    d = `+${d}`
  else
    d = d.toString()

  console.log('theme d: ', d)

  const name = ve(o)

  return {
    id: name.toLowerCase(),
    name,
    shades: a.shades.map((shade) => {
      const _mc = new MagicColor(shade.color).toHsl()
      const _value = _mc.value

      // 调整 色调 饱和度
      _mc.value = [Number(d), _value[1] * k, _value[2]]

      let color = _mc.hex()

      // 如果当前阴影是最接近的阴影亮度，将颜色设置为输入颜色
      if (a.closestShadeLightness.key === shade.key)
        color = new MagicColor(o).hex()

      // 如果 t 为 true，根据 APCA 对比度调整颜色
      if (apca) {
        // if (shade.number < 500) {
        //     let b = i.find(v => v.number == shade.number).apcaOnBlack;
        //     C = M(b, "#000", C);
        // } else {
        //     let b = i.find(v => v.number == shade.number).apcaOnWhite;
        //     C = M(b, "#fff", C);
        // }
      }

      return {
        key: shade.key.toString() as unknown as keyof ThemeMetas,
        color,
        hsl: [
          Math.round(hslComponets(color, 'h')) || 0,
          Math.round(hslComponets(color, 's') * 100),
          Math.round(hslComponets(color, 'l') * 100),
        ],
        // isLocked: a.closestShadeLightness.key === shade.key && !apca,
      }
    }),
  }
}

function ve(o: string) {
  const e = collections
  e.forEach((t) => {
    t.push(deltaE(o, t[0]) as any)
  },
  )
  return e.reduce((t, i) => t[2] < i[2] ? t : i)[1]
}

function hslComponets(c: string, type: 'h' | 's' | 'l') {
  const hsl = new MagicColor(c).toHsl().value
  switch (type) {
    case 'h':
      return hsl[0]
    case 's':
      return hsl[1]
    case 'l':
      return hsl[2]
  }
}

export interface ThemeOptions {
  /**
   * Output color type
   *
   * @default same type as input
   */
  type?: ColorType

  /**
   * Custom render output color
   *
   * @param meta [name, color]
   * @returns [CustomedName, CustomedColor]
   */
  render?: (meta: [keyof ThemeMetas, string]) => [string, string]
}

/**
 * Generate a theme from a color
 *
 * @example
 * ```ts
 * theme('#9955FF')
 * =>
 {
   "50": "#faf7ff",
  "100": "#f5eeff",
  "200": "#e6d5ff",
  "300": "#d6bbff",
  "400": "#b888ff",
  "500": "#9955ff",
  "600": "#8a4de6",
  "700": "#5c3399",
  "800": "#452673",
  "900": "#2e1a4d",
  "950": "#1f1133",
  }
 * ```
 *
 * @param color theme color
 * @param options ThemeOptions
 * @returns ThemeMetas
 */
export function theme(color: string, options: ThemeOptions = {}): ThemeMetas {
  const mc = new MagicColor(color)
  const defaultOptions: ThemeOptions = {
    type: mc.type,
    // @ts-expect-error - render is rightable
    render: c => c,
  }
  const { type, render } = { ...defaultOptions, ...options } as Required<ThemeOptions>
  // debugger
  const metas = generate(color, BasicColors)
  const shades = metas.shades.map(shade => render([shade.key, new MagicColor(shade.color).to(type).toString()]))

  return Object.fromEntries(shades) as unknown as ThemeMetas
}
