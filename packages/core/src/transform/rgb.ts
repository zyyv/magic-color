import type { HexColor, HsbColor, HslColor, LabColor, RgbColor } from '../types'

const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/
const rgbaRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(0?\.\d+|1)\)$/

export function isRgb(color: string): boolean {
  return rgbRegex.test(color) || rgbaRegex.test(color)
}

export function parseRgb(color: string) {
  const match = color.match(rgbRegex) || color.match(rgbaRegex)
  if (!match)
    throw new Error('Invalid RGB or RGBA color format.')

  const rgb = [match[1], match[2], match[3]].map(Number) as RgbColor
  const alpha = match[4] ? Number.parseFloat(match[4]) : 1

  return { value: rgb, alpha }
}

export function rgbToHex(color: RgbColor): HexColor {
  const [r, g, b] = color
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export function rgbToHsl(color: RgbColor): HslColor {
  const [r, g, b] = color.map(i => i / 255)

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

  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)]
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

  return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)]
}

export function rgbToLab(color: RgbColor): LabColor {
  function rgb_xyz(rgb: number) {
    const r = rgb / 255
    if (r <= 0.04045)
      return r / 12.92
    return ((r + 0.055) / 1.055) ** 2.4
  }

  function xyz_lab(t: number) {
    if (t > 0.008856452)
      return t ** (1 / 3)
    return t / 0.12841855 + 0.137931034
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

  return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)].map(Math.round) as LabColor
}
