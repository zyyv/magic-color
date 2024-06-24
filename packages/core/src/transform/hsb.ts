import type { HsbColor, HslColor, LabColor, RgbColor } from '../types'
import { rgbToHex, rgbToLab } from './rgb'

const hsbRegex = /^hsb\((\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\)$/

export function isHsb(color: string): boolean {
  return hsbRegex.test(color)
}

export function parseHsb(color: string) {
  const match = color.match(hsbRegex)
  if (!match)
    throw new Error('Invalid HSB color format.')
  const value = [
    Number.parseInt(match[1]),
    Number.parseInt(match[2]),
    Number.parseInt(match[3]),
  ] as HsbColor
  const alpha = match[4] ? Number.parseFloat(match[4]) : 1

  return { value, alpha }
}

function parseHsbToRgb(color: HsbColor): RgbColor {
  let [h, s, b] = color
  h = h / 60
  s = s / 100
  b = b / 100

  const c = b * s
  const x = c * (1 - Math.abs(h % 2 - 1))
  const m = b - c

  let rgb
  if (h >= 0 && h < 1)
    rgb = [c, x, 0]
  else if (h >= 1 && h < 2)
    rgb = [x, c, 0]
  else if (h >= 2 && h < 3)
    rgb = [0, c, x]
  else if (h >= 3 && h < 4)
    rgb = [0, x, c]
  else if (h >= 4 && h < 5)
    rgb = [x, 0, c]
  else
    rgb = [c, 0, x]

  return rgb.map(v => (v + m) * 255) as RgbColor
}

export function hsbToHex(color: HsbColor) {
  return rgbToHex(parseHsbToRgb(color))
}

export function hsbToRgb(color: HsbColor): RgbColor {
  return parseHsbToRgb(color)
}

export function hsbToHsl(color: HsbColor): HslColor {
  let [h, s, b] = color
  s /= 100
  b /= 100
  const l = (2 - s) * b / 2
  s = l && l < 1 ? s * b / (l < 0.5 ? l * 2 : 2 - l * 2) : s

  return [h, s * 100, l * 100]
}

export function hsbToLab(color: HsbColor): LabColor {
  return rgbToLab(parseHsbToRgb(color))
}
