import type { HexColor, HsbColor, HslColor, LabColor, LchColor, RgbColor } from '../types'
import { alphaPattern, numberPattern, parseOkColor } from './functional-color'
import { labToLch } from './lab'
import { linearRgbToXyzD50, xyzD50ToLab } from './lab-xyz'
import { oklabToLinearRgb } from './oklab-linear'
import { rgbToHex, rgbToHsb, rgbToHsl } from './rgb'

const channel = `(${numberPattern}%?)`
const oklabRegex = new RegExp(String.raw`^oklab\(\s*${channel}\s+${channel}\s+${channel}(?:\s*\/\s*(${alphaPattern}))?\s*\)$`, 'i')

function matchOklab(color: string) {
  return parseOkColor(color.match(oklabRegex), [100, 0.4, 0.4])
}

export function isOklab(color: string): boolean {
  return matchOklab(color) !== undefined
}

export function parseOklab(color: string) {
  const parsed = matchOklab(color)
  if (!parsed)
    throw new Error('Invalid Oklab color format.')
  return parsed
}

function linearToSrgbChannel(v: number) {
  if (v <= 0)
    return 0
  if (v >= 1)
    return 1
  return v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055
}

export function oklabToRgb(color: LabColor): RgbColor {
  const [r_l, g_l, b_l] = oklabToLinearRgb(color)

  const r = linearToSrgbChannel(r_l) * 255
  const g = linearToSrgbChannel(g_l) * 255
  const b = linearToSrgbChannel(b_l) * 255

  const clamp = (v: number) => Math.min(Math.max(0, v), 255)
  return [clamp(r), clamp(g), clamp(b)]
}

export function oklabToHex(color: LabColor): HexColor {
  return rgbToHex(oklabToRgb(color))
}

export function oklabToHsl(color: LabColor): HslColor {
  return rgbToHsl(oklabToRgb(color))
}

export function oklabToHsb(color: LabColor): HsbColor {
  return rgbToHsb(oklabToRgb(color))
}

export function oklabToLab(color: LabColor): LabColor {
  return xyzD50ToLab(linearRgbToXyzD50(...oklabToLinearRgb(color)))
}

export function oklabToLch(color: LabColor): LchColor {
  return labToLch(oklabToLab(color))
}

export function oklabToOklch(color: LabColor): LchColor {
  const [l, a, b] = color
  const c = Math.sqrt(a * a + b * b)
  const h = c < 0.00005 ? 0 : (Math.atan2(b, a) * 180 / Math.PI + 360) % 360
  return [l, c, h]
}
