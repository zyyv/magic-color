import type { HexColor, HsbColor, HslColor, LabColor, RgbColor } from '../types'
import { rgbToHex, rgbToHsb, rgbToLab } from './rgb'

const hslRegex = /^hsl\((\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\)$/
const hslaRegex = /^hsla\((\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(0?\.\d+|1)\)$/
const newHslRegex = /^hsl\((\d+)(?:deg)?\s+(\d+)%?\s+(\d+)%?(?:\s*\/\s*(0|0?\.\d+|1(?:\.0)?))?\s*\)$/

export function isHsl(color: string): boolean {
  return hslRegex.test(color) || hslaRegex.test(color) || newHslRegex.test(color)
}

export function parseHsl(color: string) {
  const match = color.match(hslRegex) || color.match(hslaRegex) || color.match(newHslRegex)
  if (!match)
    throw new Error('Invalid HSL color format.')
  const values = [
    Number.parseInt(match[1]),
    Number.parseInt(match[2]),
    Number.parseInt(match[3]),
  ] as HslColor
  const alpha = match[4] ? Number.parseFloat(match[4]) : 1

  return { values, alpha }
}

export function hslToHex(color: HslColor): HexColor {
  return rgbToHex(hslToRgb(color))
}

export function hslToRgb(color: HslColor): RgbColor {
  const [h, s, l] = color

  // Convert s and l from [0-100] range to [0-1] range
  const sNorm = s / 100
  const lNorm = l / 100

  let r, g, b

  if (sNorm === 0) {
    r = g = b = lNorm * 255
  }
  else {
    const t3 = [0, 0, 0]
    const c = [0, 0, 0]
    const t2 = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm
    const t1 = 2 * lNorm - t2
    const h_ = h / 360

    t3[0] = h_ + 1 / 3
    t3[1] = h_
    t3[2] = h_ - 1 / 3

    for (let i = 0; i < 3; i++) {
      if (t3[i] < 0)
        t3[i] += 1
      if (t3[i] > 1)
        t3[i] -= 1

      if (6 * t3[i] < 1) {
        c[i] = t1 + (t2 - t1) * 6 * t3[i]
      }
      else if (2 * t3[i] < 1) {
        c[i] = t2
      }
      else if (3 * t3[i] < 2) {
        c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6
      }
      else {
        c[i] = t1
      }
    }

    [r, g, b] = [c[0] * 255, c[1] * 255, c[2] * 255]
  }

  return [r, g, b]
}

export function hslToHsb(color: HslColor): HsbColor {
  return rgbToHsb(hslToRgb(color))
}

export function hslToLab(color: HslColor): LabColor {
  return rgbToLab(hslToRgb(color))
}
