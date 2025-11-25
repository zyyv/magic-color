import type { HexColor, HsbColor, HslColor, LabColor, LchColor, RgbColor } from '../types'
import { rgbToHex, rgbToHsb, rgbToHsl } from './rgb'

const oklabRegex = /^oklab\(\s*(100|[1-9]?\d(?:\.\d+)?%?)\s+(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)(?:\s*\/\s*(0|0?\.\d+|1(?:\.0)?))?\s*\)$/

export function isOklab(color: string): boolean {
  return oklabRegex.test(color)
}

export function parseOklab(color: string) {
  const match = color.match(oklabRegex)
  if (!match)
    throw new Error('Invalid Oklab color format.')

  let l = Number.parseFloat(match[1])
  if (match[1].endsWith('%'))
    l = Number.parseFloat(match[1])

  const oklab = [l, Number.parseFloat(match[2]), Number.parseFloat(match[3])] as LabColor
  const alpha = match[4] ? Number.parseFloat(match[4]) : 1

  return { values: oklab, alpha }
}

function oklabToLinearRgb(oklab: [number, number, number]) {
  // oklab expects L in range 0..1
  const L = oklab[0] / 100
  const a = oklab[1]
  const b = oklab[2]

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b

  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_

  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  const b_ = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s

  return [r, g, b_]
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

export function oklabToOklch(color: LabColor): LchColor {
  const [l, a, b] = color
  const c = Math.sqrt(a * a + b * b)
  let h = (Math.atan2(b, a) * 180 / Math.PI + 360) % 360
  if (Math.round(c * 10000) === 0)
    h = Number.NaN
  return [l, c, h]
}
