import type { BasicColorShades, ClosestColorShades, GenerateMeta, ThemeMetas, ThemeOptions } from './types'
import { Magicolor } from '@magic-color/core'
import { getColorName } from '../collections'
import { deltaE } from '../delta-e'
import { random } from '../random'
import { hueShades } from './shades'

const cache = new Map<string, GenerateMeta>()

function findClosetShade(color: string, colors: BasicColorShades[]): ClosestColorShades {
  const normalizedColors = colors.map((meta) => {
    const shades = meta.shades.map(shade => ({
      ...shade,
      delta: deltaE(color, shade.color),
      lightnessDiff: Math.abs((new Magicolor(shade.color).get('hsl.l') / 100) - (new Magicolor(color).get('hsl.l') / 100)),
    }))

    return {
      ...meta,
      shades,
      closestShade: shades.reduce((p, n) => p.delta < n.delta ? p : n),
    }
  })

  const colorModel = normalizedColors.reduce((i, a) => i.closestShade.delta < a.closestShade.delta ? i : a)

  return {
    ...colorModel,
    closestShadeLightness: colorModel.shades.reduce((i, a) => i.lightnessDiff < a.lightnessDiff ? i : a),
  }
}

function generate(color: string, colorShades: BasicColorShades[], apca = false): GenerateMeta {
  const closedShade = findClosetShade(color, colorShades)

  const _h = new Magicolor(color).get('hsl.h')
  const _close_h = new Magicolor(closedShade.closestShadeLightness.color).get('hsl.h')

  let d: string | number = _h - (_close_h || 0)

  const k = (new Magicolor(color).value('hsl', false)[1] / 100) / (new Magicolor(closedShade.closestShadeLightness.color).value('hsl', false)[1] / 100)

  if (d === 0)
    d = _close_h.toString()
  else if (d > 0)
    d = `+${d}`
  else
    d = d.toString()

  const name = getColorName(color)

  return {
    id: name.toLowerCase(),
    name,
    shades: closedShade.shades.map((shade) => {
      let _color = shade.color

      const u = new Magicolor(_color).get('hsl.s') / 100 * k
      _color = new Magicolor(_color).set('hsl.s', u * 100 > 100 ? 100 : u * 100).hex()
      _color = new Magicolor(_color).set('hsl.h', d).hex()

      if (closedShade.closestShadeLightness.key === shade.key)
        _color = new Magicolor(color).hex()

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
        color: _color,
        hsl: [
          Math.round(new Magicolor(_color).get('hsl.h')) || 0,
          Math.round(new Magicolor(_color).get('hsl.s')),
          Math.round(new Magicolor(_color).get('hsl.l')),
        ],
      }
    }),
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
 * @param color string color, if not provided, a random color will be generated
 * @param options ThemeOptions
 * @returns ThemeMetas
 */
export function theme(color: string = random(), options: ThemeOptions = {}): ThemeMetas {
  const _mc = new Magicolor(color)
  const defaultOptions: ThemeOptions = {
    type: _mc.type,
    // @ts-expect-error - render is rightable
    render: c => c,
  }
  const { type, render } = { ...defaultOptions, ...options } as Required<ThemeOptions>

  let metas
  const key = _mc.css('hex')
  if (cache.has(key)) {
    metas = cache.get(key)
  }
  else {
    metas = generate(key, hueShades)
    cache.set(key, metas)
  }

  const shades = metas!.shades.map(shade => render([shade.key, new Magicolor(shade.color).css(type)]))

  return Object.fromEntries(shades) as unknown as ThemeMetas
}

export * from './types'
