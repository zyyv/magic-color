import type { HexColor } from './types'
import { rgbToHsb } from './rgb'
import { createColorObject } from '.'

const hexRegex = /^#?([a-f\d]{3}|[a-f\d]{6}|[a-f\d]{8})$/i

export function isHex(color: string): boolean {
  return hexRegex.test(color)
}

export function parseHex(color: HexColor) {
  let r
  let g
  let b
  let opacity = 1

  const match = color.match(hexRegex)
  if (!match)
    throw new Error('Invalid HEX color format.')

  if (match[1].length === 3) {
    r = match[1][0] + match[1][0]
    g = match[1][1] + match[1][1]
    b = match[1][2] + match[1][2]
  }
  else if (match[1].length === 6) {
    r = match[1].substring(0, 2)
    g = match[1].substring(2, 4)
    b = match[1].substring(4, 6)
  }
  else {
    r = match[1].substring(0, 2)
    g = match[1].substring(2, 4)
    b = match[1].substring(4, 6)
    opacity = Number.parseInt(match[1].substring(6, 8), 16) / 255
  }

  r = Number.parseInt(r, 16)
  g = Number.parseInt(g, 16)
  b = Number.parseInt(b, 16)

  return createColorObject('rgb', [r, g, b], opacity)
}

export function hexToRgb(color: HexColor) {
  return parseHex(color)
}

export function hexToHsl(color: HexColor) {
  const parsed = parseHex(color)
  const [r, g, b] = parsed.value.map(i => i / 255)

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

  return createColorObject(
    'hsl',
    [Math.round(h), Math.round(s * 100), Math.round(l * 100)],
    parsed.opacity,
  )
}

export function hexToHsb(color: HexColor) {
  return rgbToHsb(parseHex(color).value)
}

export function toHex(c: number) {
  const hex = Math.round(c).toString(16)
  return hex.length === 1 ? `0${hex}` : hex
}
