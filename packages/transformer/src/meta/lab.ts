import type { HexColor, HsbColor, HslColor, LabColor, LchColor, RgbColor } from '../types'
import { alphaPattern, numberPattern, parseFunctionalColor } from './functional-color'
import { labToXyzD50, xyzD50ToLinearRgb } from './lab-xyz'
import { oklabToOklch } from './oklab'
import { linearRgbToOklab } from './oklab-linear'
import { rgbToHex, rgbToHsb, rgbToHsl } from './rgb'

const channel = `(${numberPattern}%?)`
const labRegex = new RegExp(String.raw`^lab\(\s*${channel}\s+${channel}\s+${channel}(?:\s*\/\s*(${alphaPattern}))?\s*\)$`, 'i')

function matchLab(color: string) {
  const parsed = parseFunctionalColor(color.match(labRegex), [100, 125, 125])
  if (parsed && parsed.values[0] >= 0 && parsed.values[0] <= 100)
    return parsed
}

export function isLab(color: string): boolean {
  return matchLab(color) !== undefined
}

export function parseLab(color: string): { values: LabColor, alpha: number } {
  const parsed = matchLab(color)
  if (!parsed)
    throw new Error('Invalid Lab color format.')
  return parsed
}

function linearToSrgb(r: number): number {
  r = 255 * (r <= 0.0031308 ? 12.92 * r : 1.055 * r ** (1 / 2.4) - 0.055)
  return Math.min(Math.max(0, r), 255)
}

export function labToRgb(color: LabColor): RgbColor {
  const [r, g, blue] = xyzD50ToLinearRgb(...labToXyzD50(color))
  return [linearToSrgb(r), linearToSrgb(g), linearToSrgb(blue)]
}

export function labToHex(color: LabColor): HexColor {
  return rgbToHex(labToRgb(color))
}

export function labToHsl(color: LabColor): HslColor {
  return rgbToHsl(labToRgb(color))
}

export function labToHsb(color: LabColor): HsbColor {
  return rgbToHsb(labToRgb(color))
}

export function labToLch(color: LabColor): LchColor {
  const [l, a, b] = color
  const c = Math.sqrt(a * a + b * b)
  const h = c < 0.00005 ? 0 : (Math.atan2(b, a) * 180 / Math.PI + 360) % 360
  return [l, c, h]
}

export function labToOklab(color: LabColor): LabColor {
  return linearRgbToOklab(...xyzD50ToLinearRgb(...labToXyzD50(color)))
}

export function labToOklch(color: LabColor): LchColor {
  return oklabToOklch(labToOklab(color))
}
