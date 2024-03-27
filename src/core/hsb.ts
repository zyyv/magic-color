import type { HsbColor, HslColor, RgbColor } from './types'
import { rgbToHex } from './rgb'

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
    Number.parseInt(match[2]) / 100,
    Number.parseInt(match[3]) / 100,
  ] as HsbColor
  const opacity = match[4] ? Number.parseFloat(match[4]) : 1

  return { value, opacity }
}

function parseHsbToRgb(color: HsbColor): RgbColor {
  const [h, s, b] = color
  const c = b * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = b - c

  let r = 0
  let g = 0
  let bl = 0
  if (h >= 0 && h < 60) {
    r = c
    g = x
  }
  else if (h >= 60 && h < 120) {
    r = x
    g = c
  }
  else if (h >= 120 && h < 180) {
    g = c
    bl = x
  }
  else if (h >= 180 && h < 240) {
    g = x
    bl = c
  }
  else if (h >= 240 && h < 300) {
    r = x
    bl = c
  }
  else if (h >= 300 && h < 360) {
    r = c
    bl = x
  }

  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  bl = Math.round((bl + m) * 255)

  return [r, g, bl]
}

export function hsbToHex(color: HsbColor) {
  return rgbToHex(parseHsbToRgb(color))
}

export function hsbToRgb(color: HsbColor): RgbColor {
  return parseHsbToRgb(color)
}

export function hsbToHsl(color: HsbColor): HslColor {
  const [h, s, b] = color
  const l = (2 - s) * b / 2
  const sl = l && l < 0.5 ? s * b / (l * 2) : s * b / (2 - l * 2)

  return [Math.round(h), Math.round(sl * 100), Math.round(l * 100)] as HslColor
}
