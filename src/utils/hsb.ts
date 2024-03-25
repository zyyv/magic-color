import type { HsbColor, RgbColor } from './types'
import { toHex } from './hex'
import { createColorObject } from '.'

export function parseHsb(color: HsbColor | string) {
  if (typeof color === 'string') {
    const match = color.match(/\d+/g)
    if (!match || match.length < 3)
      throw new Error('Invalid HSB color format.')
    color = [
      Number.parseInt(match[0]),
      Number.parseInt(match[1]) / 100,
      Number.parseInt(match[2]) / 100,
    ] as HsbColor
  }

  return createColorObject('hsb', color, 1)
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

export function hsbToHex(color: HsbColor | string) {
  const parsed = parseHsb(color)
  const [r, g, b] = parseHsbToRgb(parsed.value)

  return createColorObject('hex', `#${toHex(r)}${toHex(g)}${toHex(b)}`, parsed.opacity)
}

export function hsbToRgb(color: HsbColor | string) {
  const parsed = parseHsb(color)
  return createColorObject('rgb', parseHsbToRgb(parsed.value), parsed.opacity)
}

export function hsbToHsl(color: HsbColor | string) {
  const parsed = parseHsb(color)
  const [h, s, b] = parsed.value
  const l = (2 - s) * b / 2
  const sl = l && l < 0.5 ? s * b / (l * 2) : s * b / (2 - l * 2)

  return createColorObject('hsl', [Math.round(h), Math.round(sl * 100), Math.round(l * 100)], parsed.opacity)
  // const colors = [Math.round(h), Math.round(sl * 100), Math.round(l * 100)] as HslColor

  // return toString ? `hsl(${colors[0]}, ${colors[1]}%, ${colors[2]}%)` : colors
}
