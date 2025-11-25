import type { HexColor, HsbColor, HslColor, LabColor, LchColor, RgbColor } from '../types'
import { labToLch } from './lab'

const rgbRegex = /^rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(0|0?\.\d+|1(?:\.0)?))?\)$/
const newRgbRegex = /^rgb\((\d+)\s+(\d+)\s+(\d+)(?:\s*\/\s*(0|0?\.\d+|1(?:\.0)?))?\s*\)$/

export function isRgb(color: string): boolean {
  return rgbRegex.test(color) || newRgbRegex.test(color)
}

export function parseRgb(color: string) {
  const match = color.match(rgbRegex) || color.match(newRgbRegex)
  if (!match)
    throw new Error('Invalid RGB or RGBA color format.')

  const rgb = [match[1], match[2], match[3]].map(Number) as RgbColor
  const alpha = match[4] ? Number.parseFloat(match[4]) : 1

  return { values: rgb, alpha }
}

export function rgbToHex(color: RgbColor): HexColor {
  const [r, g, b] = color.map(Math.round)
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export function rgbToHsl(color: RgbColor): HslColor {
  const [r, g, b] = color.map(i => i / 255)

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (Math.abs(max - min) > 1e-6) {
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

export function rgbToHsb(color: RgbColor): HsbColor {
  const [r, g, b] = color.map(i => i / 255)

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  const v = max

  const d = max - min
  const s = max === 0 ? 0 : d / max

  if (max === min) {
    h = 0 // achromatic
  }
  else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g: h = (b - r) / d + 2
        break
      case b: h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return [h * 360, s * 100, v * 100]
}

export function rgbToLab(color: RgbColor): LabColor {
  function rgb_xyz(rgb: number) {
    const r = rgb / 255
    if (r <= 0.04045)
      return r / 12.92
    return ((r + 0.055) / 1.055) ** 2.4
  }

  function xyz_lab(t: number) {
    const delta = 6 / 29
    const delta3 = delta * delta * delta
    const multiplier = 3 * delta * delta
    const offset = 4 / 29

    if (t > delta3)
      return t ** (1 / 3)
    return t / multiplier + offset
  }

  function rgb2xyz(color: RgbColor) {
    const [r, g, b] = color.map(rgb_xyz)
    const x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / 0.950470)
    const y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / 1)
    const z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / 1.088830)
    return [x, y, z]
  }

  const [x, y, z] = rgb2xyz(color)
  const l = 116 * y - 16

  return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)] as LabColor
}

export function rgbToLch(color: RgbColor): LchColor {
  return labToLch(rgbToLab(color))
}

export function rgbToOklab(color: RgbColor): LabColor {
  const [r, g, b] = color.map((c) => {
    c = c / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })

  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b

  const l_ = Math.cbrt(l)
  const m_ = Math.cbrt(m)
  const s_ = Math.cbrt(s)

  return [
    100 * (0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_),
    1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
    0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
  ]
}

export function rgbToOklch(color: RgbColor): LchColor {
  const [l, a, b] = rgbToOklab(color)
  const c = Math.sqrt(a * a + b * b)
  let h = (Math.atan2(b, a) * 180 / Math.PI + 360) % 360
  if (Math.round(c * 10000) === 0)
    h = Number.NaN
  return [l, c, h]
}
