import type { HexColor, HsbColor, HslColor, LabColor, LchColor, RgbColor } from '../types'
import { oklabToRgb } from './oklab'
import { rgbToHex, rgbToHsb, rgbToHsl, rgbToLab, rgbToLch } from './rgb'

const oklchRegex = /^oklch\(\s*(100|[1-9]?\d(?:\.\d+)?)%?\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)(?:deg)?(?:\s*\/\s*(0|0?\.\d+|1(?:\.0)?))?\s*\)$/

export function isOklch(color: string): boolean {
  return oklchRegex.test(color)
}

export function parseOklch(color: string) {
  const match = color.match(oklchRegex)
  if (!match)
    throw new Error('Invalid OKLCH color format.')

  const oklch = [Number.parseFloat(match[1]), Number.parseFloat(match[2]), Number.parseFloat(match[3])] as LchColor
  const alpha = match[4] ? Number.parseFloat(match[4]) : 1

  return { values: oklch, alpha }
}

export function oklchToOklab(color: LchColor): LabColor {
  let [l, c, h] = color
  if (Number.isNaN(h))
    h = 0
  const hr = h * Math.PI / 180
  const a = Math.cos(hr) * c
  const b = Math.sin(hr) * c
  return [l, a, b]
}

export function oklchToRgb(color: LchColor): RgbColor {
  return oklabToRgb(oklchToOklab(color) as any)
}

export function oklchToHex(color: LchColor): HexColor {
  return rgbToHex(oklchToRgb(color))
}

export function oklchToHsl(color: LchColor): HslColor {
  return rgbToHsl(oklchToRgb(color))
}

export function oklchToHsb(color: LchColor): HsbColor {
  return rgbToHsb(oklchToRgb(color))
}

export function oklchToLab(color: LchColor): LabColor {
  return rgbToLab(oklchToRgb(color))
}

export function oklchToLch(color: LchColor): LchColor {
  return rgbToLch(oklchToRgb(color))
}
