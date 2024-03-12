import type { ColorType, rgbColor } from '.'
import { convertColor, getColorType, isColor, rgbToHex, rgbToHsb, rgbToHsl } from './'

function tint(components: rgbColor, intensity: number) {
  return components.map(c => Math.round(c + (255 - c) * intensity)) as rgbColor
}

function shade(components: rgbColor, intensity: number) {
  return components.map(c => Math.round(c * intensity)) as rgbColor
}

function withTint(intensity: number) {
  return (hex: rgbColor) => tint(hex, intensity)
}

function withShade(intensity: number) {
  return (hex: rgbColor) => shade(hex, intensity)
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
  if (!isColor(color))
    throw new Error(`Invalid color: ${color}`)

  const defaultOptions: ThemeOptions = {
    type: getColorType(color)! === 'keyword' ? 'hex' : getColorType(color)!,
    render: c => c,
  }

  const { type, render } = { ...defaultOptions, ...options } as Required<ThemeOptions>

  const finnalRender = (meta: [keyof ThemeMetas, rgbColor | string]) => {
    switch (type) {
      case 'hsl':
        meta[1] = rgbToHsl(meta[1], true)
        break
      case 'hsb':
        meta[1] = rgbToHsb(meta[1], true)
        break
      case 'hex':
        meta[1] = rgbToHex(meta[1])
        break
    }

    return render(meta as [keyof ThemeMetas, string])
  }

  const variants = {
    50: withTint(0.95),
    100: withTint(0.9),
    200: withTint(0.75),
    300: withTint(0.6),
    400: withTint(0.3),
    500: (c: rgbColor) => c,
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
          fn(convertColor(color, 'rgb')!),
        ]),
      ]),
    )
  }

  return colors as ThemeMetas
}
