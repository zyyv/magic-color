import { MagicColor } from '../core'
import collections from './collections.json'
import { deltaE } from './utils'
import type { BasicColorShades, ClosestColorShades, ThemeMetas, ThemeOptions } from './types'
import { hueShades } from './shades'

function findClosetShade(color: string, colors: BasicColorShades[]): ClosestColorShades {
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

function generate(o: string, e: BasicColorShades[], apca = false) {
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

  const name = getName(o)

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

function getName(color: string): string {
  return collections
    .map(t => [...t, deltaE(color, t[0])])
    .reduce((t, i) => t[2] < i[2] ? t : i)[1] as string
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
  const metas = generate(color, hueShades)
  const shades = metas.shades.map(shade => render([shade.key, new MagicColor(shade.color).to(type).toString()]))

  return Object.fromEntries(shades) as unknown as ThemeMetas
}
