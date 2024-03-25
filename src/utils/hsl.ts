import { rgbToHex, rgbToHsb } from './rgb'
import { type HslColor, createColorObject } from '.'

export function parseHsl(color: HslColor | string) {
  if (typeof color === 'string') {
    const match = color.match(/\d+/g)
    if (!match || match.length < 3)
      throw new Error('Invalid HSL color format.')
    color = [
      Number.parseInt(match[0]),
      Number.parseInt(match[1]) / 100,
      Number.parseInt(match[2]) / 100,
    ] as HslColor
  }

  return createColorObject('hsl', color, 1)
}

export function hslToHex(color: HslColor | string) {
  return rgbToHex(hslToRgb(parseHsl(color).value).value)
}

export function hslToRgb(color: HslColor | string) {
  const parsed = parseHsl(color)
  const [h, s, l] = parsed.value

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

  return createColorObject('rgb', [r * 255, g * 255, b * 255], parsed.opacity)
}

export function hslToHsb(color: HslColor | string) {
  return rgbToHsb(hslToRgb(parseHsl(color).value).value)
}
