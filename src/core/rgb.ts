import type { HexColor, HsbColor, HslColor, RgbColor } from './types'

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
  const opacity = match[4] ? Number.parseFloat(match[4]) : 1

  return { value: rgb, opacity }
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
  const [r, g, b] = color

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  let h = 0
  let s = 0
  let v = max / 255

  if (delta !== 0) {
    s = delta / max
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
    s *= 100
    v *= 100
  }

  return [Math.round(h), Math.round(s), Math.round(v)]
}
