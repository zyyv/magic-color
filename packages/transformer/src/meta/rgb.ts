import type { HexColor, HsbColor, HslColor, LabColor, LchColor, RgbColor } from '../types'
import { alphaPattern, numberPattern, parseFunctionalColor } from './functional-color'
import { labToLch } from './lab'
import { linearRgbToXyzD50, xyzD50ToLab } from './lab-xyz'
import { linearRgbToOklab } from './oklab-linear'

const channel = `(${numberPattern}%?)`
const rgbRegex = new RegExp(String.raw`^rgba?\(\s*${channel}\s*,\s*${channel}\s*,\s*${channel}(?:\s*,\s*(${alphaPattern}))?\s*\)$`, 'i')
const newRgbRegex = new RegExp(String.raw`^rgba?\(\s*${channel}\s+${channel}\s+${channel}(?:\s*\/\s*(${alphaPattern}))?\s*\)$`, 'i')

export function isRgb(color: string): boolean {
  return matchRgb(color) !== undefined
}

function matchRgb(color: string) {
  return parseFunctionalColor(color.match(rgbRegex) || color.match(newRgbRegex), [255, 255, 255])
}

export function parseRgb(color: string) {
  const parsed = matchRgb(color)
  if (!parsed)
    throw new Error('Invalid RGB or RGBA color format.')
  return parsed
}

export function rgbToHex(color: RgbColor): HexColor {
  const [r, g, b] = color.map(channel => Math.min(255, Math.max(0, Math.round(channel))))
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

function srgbToLinear(channel: number): number {
  const value = channel / 255
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

export function rgbToLab(color: RgbColor): LabColor {
  const [r, g, b] = color.map(srgbToLinear)
  return xyzD50ToLab(linearRgbToXyzD50(r, g, b))
}

export function rgbToLch(color: RgbColor): LchColor {
  return labToLch(rgbToLab(color))
}

export function rgbToOklab(color: RgbColor): LabColor {
  const [r, g, b] = color.map(srgbToLinear)
  return linearRgbToOklab(r, g, b)
}

export function rgbToOklch(color: RgbColor): LchColor {
  const [l, a, b] = rgbToOklab(color)
  const c = Math.sqrt(a * a + b * b)
  const h = c < 0.00005 ? 0 : (Math.atan2(b, a) * 180 / Math.PI + 360) % 360
  return [l, c, h]
}
