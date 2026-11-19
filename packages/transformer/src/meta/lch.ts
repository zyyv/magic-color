import type { HexColor, HsbColor, HslColor, LabColor, LchColor, RgbColor } from '../types'
import { alphaPattern, huePattern, numberPattern, parseFunctionalColor } from './functional-color'
import { labToOklab, labToOklch, labToRgb } from './lab'
import { rgbToHex, rgbToHsb, rgbToHsl } from './rgb'

const lchRegex = new RegExp(String.raw`^lch\(\s*(${numberPattern}%?)\s+(${numberPattern}%?)\s+(${huePattern})(?:\s*\/\s*(${alphaPattern}))?\s*\)$`, 'i')

function matchLch(color: string) {
  return parseFunctionalColor(color.match(lchRegex), [100, 150, 'angle'])
}

export function isLch(color: string): boolean {
  return matchLch(color) !== undefined
}

export function parseLch(color: string) {
  const parsed = matchLch(color)
  if (!parsed)
    throw new Error('Invalid LCH color format.')
  return parsed
}

export function lchToRgb(color: LchColor): RgbColor {
  return labToRgb(lchToLab(color))
}

export function lchToHex(color: LchColor): HexColor {
  return rgbToHex(lchToRgb(color))
}

export function lchToHsl(color: LchColor): HslColor {
  return rgbToHsl(lchToRgb(color))
}

export function lchToHsb(color: LchColor): HsbColor {
  return rgbToHsb(lchToRgb(color))
}

export function lchToLab(color: LchColor): LabColor {
  let [l, c, h] = color
  if (Number.isNaN(h))
    h = 0
  h = h * Math.PI / 180
  return [l, Math.cos(h) * c, Math.sin(h) * c]
}

export function lchToOklab(color: LchColor): LabColor {
  return labToOklab(lchToLab(color))
}

export function lchToOklch(color: LchColor): LchColor {
  return labToOklch(lchToLab(color))
}
