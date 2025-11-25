import type { HexColor, HsbColor, HslColor, LabColor, LchColor, RgbColor } from '../types'
import { labToRgb } from './lab'
import { rgbToHex, rgbToHsb, rgbToHsl, rgbToOklab, rgbToOklch } from './rgb'

const lchRegex = /^lch\((\d+(?:\.\d+)?%?)%?\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)(?:deg)?(?:\s*\/\s*(0|0?\.\d+|1(?:\.0)?))?\s*\)$/

export function isLch(color: string): boolean {
  return lchRegex.test(color) || lchRegex.test(color)
}

export function parseLch(color: string) {
  const match = color.match(lchRegex)
  if (!match)
    throw new Error('Invalid LCH color format.')

  const lch = [match[1], match[2], match[3]].map(Number) as LchColor
  const alpha = match[4] ? Number.parseFloat(match[4]) : 1

  return { values: lch, alpha }
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
  return rgbToOklab(lchToRgb(color))
}

export function lchToOklch(color: LchColor): LchColor {
  return rgbToOklch(lchToRgb(color))
}
