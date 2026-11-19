import type { HexColor, HsbColor, HslColor, LabColor, LchColor, RgbColor } from '../types'
import { alphaPattern, huePattern, numberPattern, parseFunctionalColor } from './functional-color'
import { rgbToHex, rgbToHsb, rgbToLab, rgbToLch, rgbToOklab, rgbToOklch } from './rgb'

const hue = `(${huePattern})`
const hslRegex = new RegExp(String.raw`^hsla?\(\s*${hue}\s*,\s*(${numberPattern})%\s*,\s*(${numberPattern})%(?:\s*,\s*(${alphaPattern}))?\s*\)$`, 'i')
const newHslRegex = new RegExp(String.raw`^hsla?\(\s*${hue}\s+(${numberPattern})%?\s+(${numberPattern})%?(?:\s*\/\s*(${alphaPattern}))?\s*\)$`, 'i')

export function isHsl(color: string): boolean {
  return matchHsl(color) !== undefined
}

function matchHsl(color: string) {
  return parseFunctionalColor(color.match(hslRegex) || color.match(newHslRegex), ['angle', 100, 100])
}

export function parseHsl(color: string) {
  const parsed = matchHsl(color)
  if (!parsed)
    throw new Error('Invalid HSL color format.')
  return parsed
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
    const hue = h % 360
    const h_ = (hue < 0 ? hue + 360 : hue) / 360

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

export function hslToLch(color: HslColor): LchColor {
  return rgbToLch(hslToRgb(color))
}

export function hslToOklab(color: HslColor): LabColor {
  return rgbToOklab(hslToRgb(color))
}

export function hslToOklch(color: HslColor): LchColor {
  return rgbToOklch(hslToRgb(color))
}
