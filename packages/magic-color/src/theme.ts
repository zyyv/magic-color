import type { ColorType, RgbColor } from './core/types'
import { createMagicColor } from './core'

function tint(components: RgbColor, intensity: number) {
  return components.map(c => Math.round(c + (255 - c) * intensity)) as RgbColor
}

function shade(components: RgbColor, intensity: number) {
  return components.map(c => Math.round(c * intensity)) as RgbColor
}

function withTint(intensity: number) {
  return (hex: RgbColor) => tint(hex, intensity)
}

function withShade(intensity: number) {
  return (hex: RgbColor) => shade(hex, intensity)
}

export interface ThemeMetas {
  '50': string
  '100': string
  '200': string
  '300': string
  '400': string
  '500': string
  '600': string
  '700': string
  '800': string
  '900': string
  '950': string
}

export interface ThemeOptions {
  /**
   * Output color type
   *
   * @default same type as input
   */
  type?: ColorType

  /**
   * Custom render output color
   *
   * @param meta [name, color]
   * @returns [CustomedName, CustomedColor]
   */
  render?: (meta: [keyof ThemeMetas, string]) => [string, string]
}

/**
 * Generate a theme from a color
 *
 * @example
 * ```ts
 * theme('#9955FF')
 * =>
 {
   "50": "#faf7ff",
  "100": "#f5eeff",
  "200": "#e6d5ff",
  "300": "#d6bbff",
  "400": "#b888ff",
  "500": "#9955ff",
  "600": "#8a4de6",
  "700": "#5c3399",
  "800": "#452673",
  "900": "#2e1a4d",
  "950": "#1f1133",
  }
 * ```
 *
 * @param color theme color
 * @param options ThemeOptions
 * @returns ThemeMetas
 */
export function theme(color: string, options: ThemeOptions = {}): ThemeMetas {
  const mc = createMagicColor(color)

  const defaultOptions: ThemeOptions = {
    type: mc.type,
    render: c => c,
  }

  const { type, render } = { ...defaultOptions, ...options } as Required<ThemeOptions>

  const finnalRender = (meta: [keyof ThemeMetas, RgbColor]) => {
    let cs = ''

    switch (type) {
      case 'hsl':
        cs = createMagicColor(meta[1], 'rgb').toHsl().toString()
        break
      case 'hsb':
        cs = createMagicColor(meta[1], 'rgb').toHsb().toString()
        break
      case 'hex':
        cs = createMagicColor(meta[1], 'rgb').toHex().toString()
        break
      case 'rgb':
        cs = createMagicColor(meta[1], 'rgb').toRgb().toString()
        break
      default:
        throw new Error(`Invalid type: ${type}`)
    }

    return render([meta[0], cs])
  }

  const variants = {
    50: withTint(0.95),
    100: withTint(0.9),
    200: withTint(0.75),
    300: withTint(0.6),
    400: withTint(0.3),
    500: (c: RgbColor) => c,
    600: withShade(0.9),
    700: withShade(0.6),
    800: withShade(0.45),
    900: withShade(0.3),
    950: withShade(0.2),
  }

  const colors = {}

  for (const [name, fn] of Object.entries(variants)) {
    Object.assign(
      colors,
      Object.fromEntries([
        finnalRender([
          name as keyof ThemeMetas,
          fn(mc.toRgb().value),
        ]),
      ]),
    )
  }

  return colors as ThemeMetas
}
