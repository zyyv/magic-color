import type { HexColor, HsbColor, HslColor, LabColor, LchColor, RgbColor } from '../types'
import { rgbToHex, rgbToHsb, rgbToHsl } from './rgb'

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

function xyz_rgb(r: number) {
  r = 255 * (r <= 0.0031308 ? 12.92 * r : 1.055 * r ** (1 / 2.4) - 0.055)
  return Math.min(Math.max(0, r), 255)
}

const delta = 6 / 29
const delta2 = delta * delta
const multiplier = 3 * delta2
const offset = 4 / 29

function lab_xyz(t: number) {
  return t > delta ? t * t * t : multiplier * (t - offset)
}

export function labToRgb(color: LabColor): RgbColor {
  const [l, a, b] = color
  let x, y, z

  y = (l + 16) / 116
  x = y + a / 500
  z = y - b / 200

  y = 1 * lab_xyz(y)
  x = 0.950470 * lab_xyz(x)
  z = 1.088830 * lab_xyz(z)

  const r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z) // D65 -> sRGB
  const g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z)
  const b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z)

  return [r, g, b_]
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
  let h = (Math.atan2(b, a) * 180 / Math.PI + 360) % 360
  if (Math.round(c * 10000) === 0)
    h = Number.NaN
  return [l, c, h]
}
