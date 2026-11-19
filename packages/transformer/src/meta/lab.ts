import type { HexColor, HsbColor, HslColor, LabColor, LchColor, RgbColor } from '../types'
import { D50_WHITE, xyzD50ToLinearRgb } from './lab-xyz'
import { rgbToHex, rgbToHsb, rgbToHsl, rgbToOklab, rgbToOklch } from './rgb'

const labRegex = /^lab\(\s*(100|[1-9]?\d(?:\.\d+)?)\s+(-?(?:1[01]\d|12[0-8]|\d?\d)(?:\.\d+)?)\s+(-?(?:1[01]\d|12[0-8]|\d?\d)(?:\.\d+)?)(?:\s*\/\s*(0|0?\.\d+|1(?:\.0)?))?\s*\)$/

export function isLab(color: string): boolean {
  return labRegex.test(color)
}

export function parseLab(color: string): { values: LabColor, alpha: number } {
  const match = color.match(labRegex)
  if (!match)
    throw new Error('Invalid Lab color format.')

  const lab = [Number.parseFloat(match[1]), Number.parseFloat(match[2]), Number.parseFloat(match[3])] as LabColor
  const alpha = match[4] ? Number.parseFloat(match[4]) : 1

  return { values: lab, alpha }
}

function linearToSrgb(r: number): number {
  r = 255 * (r <= 0.0031308 ? 12.92 * r : 1.055 * r ** (1 / 2.4) - 0.055)
  return Math.min(Math.max(0, r), 255)
}

const delta = 6 / 29
const delta2 = delta * delta
const multiplier = 3 * delta2
const offset = 4 / 29

function labToXyzComponent(t: number): number {
  return t > delta ? t * t * t : multiplier * (t - offset)
}

export function labToRgb(color: LabColor): RgbColor {
  const [l, a, b] = color
  const lightness = (l + 16) / 116
  const x = D50_WHITE[0] * labToXyzComponent(lightness + a / 500)
  const y = D50_WHITE[1] * labToXyzComponent(lightness)
  const z = D50_WHITE[2] * labToXyzComponent(lightness - b / 200)
  const [r, g, blue] = xyzD50ToLinearRgb(x, y, z)

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
  return rgbToOklab(labToRgb(color))
}

export function labToOklch(color: LabColor): LchColor {
  return rgbToOklch(labToRgb(color))
}
