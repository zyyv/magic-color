import type { HexColor, HsbColor, HslColor, LabColor, LchColor, RgbColor } from '../types'

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

}

export function lchToHex(color: LchColor): HexColor {

}

export function lchToHsl(color: LchColor): HslColor {

}

export function lchToHsb(color: LchColor): HsbColor {

}

export function lchToLab(color: LchColor): LabColor {
  const [l, c, h] = color
    if (isNaN(h)) h = 0;
    h = h * DEG2RAD;
    return [l, cos(h) * c, sin(h) * c];
}
