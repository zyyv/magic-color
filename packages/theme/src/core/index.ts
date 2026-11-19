import type { HslColor, LabColor } from '@magic-color/core'
import type { BasicColorShades, ThemeMetas, ThemeOptions } from './types'
import { hexToHsl, hexToLab, hslToHex, Magicolor } from '@magic-color/core'
import { deltaEOfLab } from '../delta-e'
import { random } from '../random'
import { hueShades } from './shades'

const MAX_CACHED_THEMES = 256
const cache = new Map<string, BasicColorShades['shades']>()
const referencePalettes = hueShades.map(palette => palette.shades.map(shade => ({
  ...shade,
  ...colorChannels(shade.color),
})))

function roundChannel(value: number): number {
  return Math.round(value * 1000) / 1000
}

function colorChannels(color: string) {
  return {
    hsl: hexToHsl(color).map(roundChannel) as HslColor,
    lab: hexToLab(color).map(roundChannel) as LabColor,
  }
}

function findClosestPalette(lab: LabColor) {
  let closestPalette = referencePalettes[0]
  let closestDistance = Infinity
  for (const palette of referencePalettes) {
    for (const shade of palette) {
      const distance = deltaEOfLab(lab, shade.lab)
      if (distance <= closestDistance) {
        closestDistance = distance
        closestPalette = palette
      }
    }
  }
  return closestPalette
}

function generate(color: string): BasicColorShades['shades'] {
  const { hsl: [hue, saturation, lightness], lab } = colorChannels(color)
  const palette = findClosestPalette(lab)
  const lightnessDistance = (hsl: HslColor) => Math.abs(hsl[2] / 100 - lightness / 100)
  const anchor = palette.reduce((best, shade) => lightnessDistance(best.hsl) < lightnessDistance(shade.hsl) ? best : shade)
  const hueShift = hue - anchor.hsl[0]
  const saturationScale = (saturation / 100) / (anchor.hsl[1] / 100)

  return palette.map(({ key, hsl }) => {
    if (key === anchor.key)
      return { key, color }

    const shiftedHue = hueShift === 0 ? hue : hsl[0] + hueShift
    const shiftedSaturation = roundChannel(Math.min(100, hsl[1] / 100 * saturationScale * 100))
    return { key, color: hslToHex([shiftedHue, shiftedSaturation, hsl[2]]) }
  })
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
  const input = new Magicolor(color)
  const { type = input.type, render } = options
  const key = input.hex()

  let shades = cache.get(key)
  if (shades) {
    cache.delete(key)
  }
  else {
    shades = generate(key)
    if (cache.size >= MAX_CACHED_THEMES) {
      const oldest = cache.keys().next()
      if (!oldest.done)
        cache.delete(oldest.value)
    }
  }
  cache.set(key, shades)

  const entries = shades.map((shade) => {
    const output = type === 'hex' || type === 'keyword' ? shade.color : new Magicolor(shade.color).css(type)
    const entry: [keyof ThemeMetas, string] = [shade.key, output]
    return render ? render(entry) : entry
  })

  return Object.fromEntries(entries) as unknown as ThemeMetas
}

export * from './types'
