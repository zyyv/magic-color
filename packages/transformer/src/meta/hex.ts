import type { HexColor, HsbColor, HslColor, LabColor, LchColor, RgbColor } from '../types'
import { rgbToHsb, rgbToLab, rgbToLch } from './rgb'

const hexRegex = /^#?([a-f\d]{3}|[a-f\d]{6}|[a-f\d]{8})$/i

export function isHex(color: string): boolean {
  return hexRegex.test(color)
}

export function parseHex(color: HexColor) {
  let value: HexColor
  let alpha = 1

  const match = color.match(hexRegex)
  if (!match)
    throw new Error('Invalid HEX color format.')

  if (match[1].length === 3) {
    value = match[1].split('').map(c => c + c).join('')
  }
  else if (match[1].length === 6) {
    value = match[1]
  }
  else {
    value = match[1].substring(0, 6)
    alpha = Number.parseInt(match[1].substring(6, 8), 16) / 255
  }

  return { values: `#${value}`, alpha }
}

export function hexToRgb(color: HexColor): RgbColor {
  color = color.substring(1)
  const r = Number.parseInt(color.substring(0, 2), 16)
  const g = Number.parseInt(color.substring(2, 4), 16)
  const b = Number.parseInt(color.substring(4, 6), 16)

  return [r, g, b]
}

export function hexToHsl(color: HexColor): HslColor {
  const [r, g, b] = hexToRgb(color).map(i => i / 255)

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const delta = max - min
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)
    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / delta + 2
        break
      case b:
        h = (r - g) / delta + 4
        break
    }
    h *= 60
  }

  return [h, s * 100, l * 100]
}

export function hexToHsb(color: HexColor): HsbColor {
  return rgbToHsb(hexToRgb(color))
}

export function hexToLab(color: HexColor): LabColor {
  return rgbToLab(hexToRgb(color))
}

export function hexToLch(color: HexColor): LchColor {
  return rgbToLch(hexToRgb(color))
}

export function toHex(c: number) {
  const hex = Math.round(c).toString(16)
  return hex.length === 1 ? `0${hex}` : hex
}
