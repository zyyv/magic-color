import type { HexColor, HsbColor, HslColor, LabColor, LchColor, RgbColor } from '../types'
import { alphaPattern, huePattern, numberPattern, parseOkColor } from './functional-color'
import { oklabToLab, oklabToLch, oklabToRgb } from './oklab'
import { rgbToHex, rgbToHsb, rgbToHsl } from './rgb'

const oklchRegex = new RegExp(String.raw`^oklch\(\s*(${numberPattern}%?)\s+(${numberPattern}%?)\s+(${huePattern})(?:\s*\/\s*(${alphaPattern}))?\s*\)$`, 'i')

function matchOklch(color: string) {
  return parseOkColor(color.match(oklchRegex), [100, 0.4, 'angle'])
}

export function isOklch(color: string): boolean {
  return matchOklch(color) !== undefined
}

export function parseOklch(color: string) {
  const parsed = matchOklch(color)
  if (!parsed)
    throw new Error('Invalid OKLCH color format.')
  return parsed
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
  return oklabToRgb(oklchToOklab(color))
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
  return oklabToLab(oklchToOklab(color))
}

export function oklchToLch(color: LchColor): LchColor {
  return oklabToLch(oklchToOklab(color))
}
