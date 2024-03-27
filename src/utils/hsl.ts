import { rgbToHex, rgbToHsb } from './rgb'
import type { HexColor, HsbColor, HslColor, RgbColor } from './types'

const hslRegex = /^hsl\((\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\)$/
const hslaRegex = /^hsla\((\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(0?\.\d+|1)\)$/

export function isHsl(color: string): boolean {
  return hslRegex.test(color) || hslaRegex.test(color)
}

export function parseHsl(color: string) {
  const match = color.match(hslRegex) || color.match(hslaRegex)
  if (!match)
    throw new Error('Invalid HSL color format.')
  const value = [
    Number.parseInt(match[1]),
    Number.parseInt(match[2]) / 100,
    Number.parseInt(match[3]) / 100,
  ] as HslColor
  const opacity = match[4] ? Number.parseFloat(match[4]) : 1

  return { value, opacity }
}

export function hslToHex(color: HslColor): HexColor {
  return rgbToHex(hslToRgb(color))
}

export function hslToRgb(color: HslColor): RgbColor {
  const [h, s, l] = color

  let r, g, b
  if (s === 0) {
    r = g = b = l
  }
  else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0)
        t += 1
      if (t > 1)
        t -= 1
      if (t < 1 / 6)
        return p + (q - p) * 6 * t
      if (t < 1 / 2)
        return q
      if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h / 360 + 1 / 3)
    g = hue2rgb(p, q, h / 360)
    b = hue2rgb(p, q, h / 360 - 1 / 3)
  }

  return [r * 255, g * 255, b * 255]
}

export function hslToHsb(color: HslColor): HsbColor {
  return rgbToHsb(hslToRgb(color))
}
