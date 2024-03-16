import type { Color, ColorObject, ColorType, Opacity, hexColor, hsbColor, hslColor, rgbColor } from './types'

const hexRegex = /^#?([a-f\d]{3}|[a-f\d]{6}|[a-f\d]{8})$/i
const hslRegex = /^hsl\(\d+,\s*\d+%\s*,\s*\d+%\)$/
const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/
const rgbaRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(0?\.\d+|1)\)$/
const hsbRegex = /^hsb\(\d+,\s*\d+%\s*,\s*\d+%\)$/

const keywordColors: Record<string, hexColor> = {
  black: '#000000',
  silver: '#c0c0c0',
  gray: '#808080',
  white: '#ffffff',
  maroon: '#800000',
  red: '#ff0000',
  purple: '#800080',
  fuchsia: '#ff00ff',
  green: '#008000',
  lime: '#00ff00',
  olive: '#808000',
  yellow: '#ffff00',
  navy: '#000080',
  blue: '#0000ff',
  teal: '#008080',
  aqua: '#00ffff',
  lightgrey: '#d3d3d3',
  darkgrey: '#a9a9a9',
  grey: '#808080',
  lightgray: '#d3d3d3',
  darkgray: '#a9a9a9',
  lightgreen: '#90ee90',
  darkgreen: '#006400',
  lightblue: '#add8e6',
  darkblue: '#00008b',
  lightyellow: '#ffffe0',
  darkyellow: '#808000',
  lightred: '#ffcccb',
  darkred: '#800000',
  lightpurple: '#e6e6fa',
  darkpurple: '#800080',
  lightorange: '#ffcc99',
  darkorange: '#ff8c00',
  orange: '#ffa500',
  lightpink: '#ffb6c1',
  darkpink: '#ff1493',
  pink: '#ffc0cb',
  lightbrown: '#f4a460',
  darkbrown: '#8b4513',
  brown: '#a52a2a',
  lightcyan: '#e0ffff',
  darkcyan: '#008b8b',
  cyan: '#00ffff',
  lightviolet: '#ee82ee',
  darkviolet: '#9400d3',
  violet: '#8a2be2',
  lightmagenta: '#ff77ff',
  darkmagenta: '#8b008b',
  magenta: '#ff00ff',
  lightgold: '#ffd700',
  darkgold: '#b8860b',
  gold: '#ffd700',
  lightindigo: '#4b0082',
  darkindigo: '#00008b',
  indigo: '#4b0082',
  lightbeige: '#f5f5dc',
  darkbeige: '#a0522d',
  beige: '#f5f5dc',
}

type ColorKeyword = keyof typeof keywordColors

export function createColorObject(type: ColorType, value: Color, opacity: Opacity, hasOpacity = false): ColorObject {
  return {
    type,
    value,
    opacity,
    hasOpacity,
    toString() {
      if (this.type === 'keyword') {
        return this.value as hexColor
      }
      else if (this.type === 'hex') {
        return this.hasOpacity
          ? (this.value as hexColor) + opacityToString(this.opacity)
          : this.value as hexColor
      }
      else if (this.type === 'rgb') {
        return this.hasOpacity
          ? `rgba(${(this.value as rgbColor).join(', ')}, ${this.opacity})`
          : `rgb(${(this.value as rgbColor).join(', ')})`
      }
      else { return `${this.type}(${(this.value as hslColor | hsbColor).join(', ')})` }
    },
  }
}

export function isColorType(color: string): color is ColorType {
  return ['hex', 'hsl', 'rgb', 'hsb', 'keyword'].includes(color)
}

export function isHex(color: string): boolean {
  return hexRegex.test(color)
}

export function isHsl(color: string): boolean {
  return hslRegex.test(color)
}

export function isRgb(color: string): boolean {
  return rgbRegex.test(color) || rgbaRegex.test(color)
}

export function isHsb(color: string): boolean {
  return hsbRegex.test(color)
}

export function isKeyword(color: string): color is ColorKeyword {
  return color in keywordColors
}

export function isColor(color: string): boolean {
  return isHex(color) || isHsl(color) || isRgb(color) || isHsb(color) || isKeyword(color)
}

export function getColorType(color: string): ColorType | null {
  if (isHex(color))
    return 'hex'
  if (isHsl(color))
    return 'hsl'
  if (isRgb(color))
    return 'rgb'
  if (isHsb(color))
    return 'hsb'
  if (isKeyword(color))
    return 'keyword'
  return null
}

export function opacityToString(opacity: Opacity, hex = false): string {
  return hex
    ? Math.round(opacity * 255).toString(16).padStart(2, '0')
    : `${opacity * 100}%`
}

// RGB To Others

export function parseRgb(color: rgbColor | string) {
  let colors
  let opacity = 1
  if (typeof color === 'string') {
    const match = color.match(rgbRegex) || color.match(rgbaRegex)
    if (!match)
      throw new Error('Invalid RGB or RGBA color format.')

    const rgb = [match[1], match[2], match[3]].map(Number) as rgbColor
    opacity = match[4] ? Number.parseFloat(match[4]) : 1
    colors = [...rgb, opacity]
  }
  else { colors = [...color, opacity] }

  return colors as [...rgbColor, Opacity]
}

export function rgbToHex(color: rgbColor | string): hexColor {
  const [r, g, b] = parseRgb(color)

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export function rgbToHsl(color: rgbColor | string): hslColor
export function rgbToHsl(color: rgbColor | string, toString: false): hslColor
export function rgbToHsl(color: rgbColor | string, toString: true): string
export function rgbToHsl(color: rgbColor | string, toString: boolean): hslColor | string
export function rgbToHsl(color: rgbColor | string, toString = false): hslColor | string {
  const [r, g, b] = parseRgb(color).map(i => i / 255)

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

  const colors = [Math.round(h), Math.round(s * 100), Math.round(l * 100)] as hslColor

  return toString ? `hsl(${colors[0]}, ${colors[1]}%, ${colors[2]}%)` : colors
}

export function rgbToHsb(color: rgbColor | string): hsbColor
export function rgbToHsb(color: rgbColor | string, toString: false): hsbColor
export function rgbToHsb(color: rgbColor | string, toString: true): string
export function rgbToHsb(color: rgbColor | string, toString: boolean): hsbColor | string
export function rgbToHsb(color: rgbColor | string, toString = false): hsbColor | string {
  const [r, g, b] = parseRgb(color)

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

  const colors = [Math.round(h), Math.round(s), Math.round(v)] as hsbColor

  return toString ? `hsb(${colors[0]}, ${colors[1]}%, ${colors[2]}%)` : colors
}

// HSL To Others

export function parseHsl(color: hslColor | string): hslColor {
  let colors
  if (typeof color === 'string') {
    const match = color.match(/\d+/g)
    if (!match || match.length < 3)
      throw new Error('Invalid HSL color format.')
    colors = [
      Number.parseInt(match[0]),
      Number.parseInt(match[1]) / 100,
      Number.parseInt(match[2]) / 100,
    ] as hslColor
  }
  else { colors = color }

  return colors
}

export function hslToHex(color: hslColor | string): hexColor {
  return rgbToHex(hslToRgb(parseHsl(color)))
}

export function hslToRgb(color: hslColor | string, toString = false): rgbColor | string {
  const [h, s, l] = parseHsl(color)

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

  const colors = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)] as rgbColor

  return toString ? `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})` : colors
}

export function hslToHsb(color: hslColor | string, toString = false): hsbColor | string {
  return rgbToHsb(hslToRgb(parseHsl(color)), toString)
}

// HEX To Others

export function parseHex(color: hexColor): [...rgbColor, Opacity] {
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

  return [r, g, b, opacity]
}

export function hexToRgb(color: hexColor): rgbColor
export function hexToRgb(color: hexColor, toString: false): rgbColor
export function hexToRgb(color: hexColor, toString: true): string
export function hexToRgb(color: hexColor, toString: boolean): rgbColor | string
export function hexToRgb(color: hexColor, toString = false): rgbColor | string {
  const [r, g, b] = parseHex(color)

  return toString ? `rgb(${r}, ${g}, ${b})` : [r, g, b]
}

export function hexToHsl(color: hexColor, toString = false): hsbColor | string {
  const [r, g, b] = parseHex(color).map(i => i / 255)

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

  const colors = [Math.round(h), Math.round(s * 100), Math.round(l * 100)] as hslColor

  return toString ? `hsl(${colors[0]}, ${colors[1]}%, ${colors[2]}%)` : colors
}

export function hexToHsb(color: hexColor, toString = false): hsbColor | string {
  return rgbToHsb(parseHex(color).slice(0, 3) as rgbColor, toString)
}

// HSB To Others

export function parseHsb(color: hsbColor | string): hsbColor {
  let colors
  if (typeof color === 'string') {
    const match = color.match(/\d+/g)
    if (!match || match.length < 3)
      throw new Error('Invalid HSB color format.')
    colors = [
      Number.parseInt(match[0]),
      Number.parseInt(match[1]) / 100,
      Number.parseInt(match[2]) / 100,
    ] as hsbColor
  }
  else { colors = color }

  return colors
}

export function parseHsbToRgb(color: hsbColor): rgbColor {
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

export function hsbToHex(color: hsbColor | string): hexColor {
  const [r, g, b] = parseHsbToRgb(parseHsb(color))

  const toHex = (c: number) => {
    const hex = Math.round(c).toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function hsbToRgb(color: hsbColor | string, toString = false): rgbColor | string {
  const [r, g, b] = parseHsbToRgb(parseHsb(color))

  return toString ? `rgb(${r}, ${g}, ${b})` : [r, g, b]
}

export function hsbToHsl(color: hsbColor | string, toString = false): hslColor | string {
  const [h, s, b] = parseHsb(color)
  const l = (2 - s) * b / 2
  const sl = l && l < 0.5 ? s * b / (l * 2) : s * b / (2 - l * 2)
  const colors = [Math.round(h), Math.round(sl * 100), Math.round(l * 100)] as hslColor

  return toString ? `hsl(${colors[0]}, ${colors[1]}%, ${colors[2]}%)` : colors
}

/**
 * Convert color from one format to another.
 * @param colorString valid color string
 * @param format ColorType
 * @returns Result of ColorType
 */
export function convertColor(colorString: string, format: 'rgb'): rgbColor | null
export function convertColor(colorString: string, format: 'rgb', toString: false): rgbColor | null
export function convertColor(colorString: string, format: 'rgb', toString: true): string | null
export function convertColor(colorString: string, format: 'rgb', toString: boolean): rgbColor | string | null
export function convertColor(colorString: string, format: 'hsl'): hslColor | null
export function convertColor(colorString: string, format: 'hsl', toString: false): hslColor | null
export function convertColor(colorString: string, format: 'hsl', toString: true): string | null
export function convertColor(colorString: string, format: 'hsl', toString: boolean): hslColor | string | null
export function convertColor(colorString: string, format: 'hsb'): hsbColor | null
export function convertColor(colorString: string, format: 'hsb', toString: false): hsbColor | null
export function convertColor(colorString: string, format: 'hsb', toString: true): string | null
export function convertColor(colorString: string, format: 'hsb', toString: boolean): hsbColor | string | null
export function convertColor(colorString: string, format: 'hex'): hexColor | null
export function convertColor(colorString: string, format: 'hex', toString: false): hexColor | null
export function convertColor(colorString: string, format: 'hex', toString: true): string | null
export function convertColor(colorString: string, format: 'hex', toString: boolean): hexColor | string | null
export function convertColor(
  colorString: string,
  format: Exclude<ColorType, 'keyword'>,
  toString = false,
): Color | null {
  const color = colorString.toLowerCase()
  const type = getColorType(color)

  if (!isColorType(format))
    throw new Error('Invalid format type.')

  switch (format) {
    case 'hsl':
      switch (type) {
        case 'hsl':
          return toString ? color : parseHsl(color)
        case 'hex':
          return hexToHsl(color, toString)
        case 'rgb':
          return rgbToHsl(color, toString)
        case 'hsb':
          return hsbToHsl(color, toString)
        case 'keyword':
          return hexToHsl(keywordColors[color] as hexColor, toString)
      }
      break
    case 'hex':
      switch (type) {
        case 'hsl':
          return hslToHex(color)
        case 'hex':
          return color
        case 'rgb':
          return rgbToHex(color)
        case 'hsb':
          return hsbToHex(color)
        case 'keyword':
          return keywordColors[color]
      }
      break
    case 'rgb':
      switch (type) {
        case 'hsl':
          return hslToRgb(color, toString)
        case 'hex':
          return hexToRgb(color, toString)
        case 'rgb':
          return toString ? color : parseRgb(color).slice(0, 3) as rgbColor
        case 'hsb':
          return hsbToRgb(color, toString)
        case 'keyword':
          return hexToRgb(keywordColors[color] as hexColor)
      }
      break
    case 'hsb':
      switch (type) {
        case 'hsl':
          return hslToHsb(color, toString)
        case 'hex':
          return hexToHsb(color, toString)
        case 'rgb':
          return rgbToHsb(color, toString)
        case 'hsb':
          return toString ? color : parseHsb(color)
        case 'keyword':
          return hexToHsb(keywordColors[color] as hexColor)
      }
      break
  }

  return null
}

export function getContrastRatio(c1: string, c2: string): number {
  const luminance1 = calcuRelativeLuminance(hexToRgb(c1))
  const luminance2 = calcuRelativeLuminance(hexToRgb(c2))

  const lighter = Math.max(luminance1, luminance2)
  const darker = Math.min(luminance1, luminance2)

  return (lighter + 0.05) / (darker + 0.05)
}

export function calcuRelativeLuminance(rgb: rgbColor): number {
  const [red, green, blue] = rgb.map((channel) => {
    const channelNormalized = channel / 255
    return channelNormalized <= 0.03928
      ? channelNormalized / 12.92
      : ((channelNormalized + 0.055) / 1.055) ** 2.4
  })

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

export function getReadableTextColor(bgColor: string, textColor = '#ffffff'): '#000000' | '#ffffff' {
  return getContrastRatio(textColor, bgColor) >= 4.5
    ? '#ffffff'
    : '#000000'
}
