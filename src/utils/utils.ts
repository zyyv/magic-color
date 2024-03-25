import type { Color, ColorObject, ColorType, HexColor, HsbColor, HslColor, Opacity, RgbColor } from './types'

const hexRegex = /^#?([a-f\d]{3}|[a-f\d]{6}|[a-f\d]{8})$/i
const hslRegex = /^hsl\(\d+,\s*\d+%\s*,\s*\d+%\)$/
const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/
const rgbaRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(0?\.\d+|1)\)$/
const hsbRegex = /^hsb\(\d+,\s*\d+%\s*,\s*\d+%\)$/

const KeywordColors: Record<string, HexColor> = {
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

type ColorKeyword = keyof typeof KeywordColors

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
  return color in KeywordColors
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

// HSB To Others

export function parseHsb(color: HsbColor | string): HsbColor {
  let colors
  if (typeof color === 'string') {
    const match = color.match(/\d+/g)
    if (!match || match.length < 3)
      throw new Error('Invalid HSB color format.')
    colors = [
      Number.parseInt(match[0]),
      Number.parseInt(match[1]) / 100,
      Number.parseInt(match[2]) / 100,
    ] as HsbColor
  }
  else { colors = color }

  return colors
}

export function parseHsbToRgb(color: HsbColor): RgbColor {
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

export function hsbToHex(color: HsbColor | string): HexColor {
  const [r, g, b] = parseHsbToRgb(parseHsb(color))

  const toHex = (c: number) => {
    const hex = Math.round(c).toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function hsbToRgb(color: HsbColor | string, toString = false): RgbColor | string {
  const [r, g, b] = parseHsbToRgb(parseHsb(color))

  return toString ? `rgb(${r}, ${g}, ${b})` : [r, g, b]
}

export function hsbToHsl(color: HsbColor | string, toString = false): HslColor | string {
  const [h, s, b] = parseHsb(color)
  const l = (2 - s) * b / 2
  const sl = l && l < 0.5 ? s * b / (l * 2) : s * b / (2 - l * 2)
  const colors = [Math.round(h), Math.round(sl * 100), Math.round(l * 100)] as HslColor

  return toString ? `hsl(${colors[0]}, ${colors[1]}%, ${colors[2]}%)` : colors
}

/**
 * Convert color from one format to another.
 * @param colorString valid color string
 * @param format ColorType
 * @returns Result of ColorType
 */
export function convertColor(colorString: string, format: 'rgb'): RgbColor | null
export function convertColor(colorString: string, format: 'rgb', toString: false): RgbColor | null
export function convertColor(colorString: string, format: 'rgb', toString: true): string | null
export function convertColor(colorString: string, format: 'rgb', toString: boolean): RgbColor | string | null
export function convertColor(colorString: string, format: 'hsl'): HslColor | null
export function convertColor(colorString: string, format: 'hsl', toString: false): HslColor | null
export function convertColor(colorString: string, format: 'hsl', toString: true): string | null
export function convertColor(colorString: string, format: 'hsl', toString: boolean): HslColor | string | null
export function convertColor(colorString: string, format: 'hsb'): HsbColor | null
export function convertColor(colorString: string, format: 'hsb', toString: false): HsbColor | null
export function convertColor(colorString: string, format: 'hsb', toString: true): string | null
export function convertColor(colorString: string, format: 'hsb', toString: boolean): HsbColor | string | null
export function convertColor(colorString: string, format: 'hex'): HexColor | null
export function convertColor(colorString: string, format: 'hex', toString: false): HexColor | null
export function convertColor(colorString: string, format: 'hex', toString: true): string | null
export function convertColor(colorString: string, format: 'hex', toString: boolean): HexColor | string | null
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
          return hexToHsl(KeywordColors[color] as HexColor, toString)
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
          return KeywordColors[color]
      }
      break
    case 'rgb':
      switch (type) {
        case 'hsl':
          return hslToRgb(color, toString)
        case 'hex':
          return hexToRgb(color, toString)
        case 'rgb':
          return toString ? color : parseRgb(color).slice(0, 3) as RgbColor
        case 'hsb':
          return hsbToRgb(color, toString)
        case 'keyword':
          return hexToRgb(KeywordColors[color] as HexColor)
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
          return hexToHsb(KeywordColors[color] as HexColor)
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

export function calcuRelativeLuminance(rgb: RgbColor): number {
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
