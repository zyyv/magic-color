import type { ColorType } from '@magic-color/core'

export interface ThemeMetas {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
}

interface Shade {
  key: keyof ThemeMetas
  color: string
}

interface NormalizedShade extends Shade {
  delta: number
  lightnessDiff: number
}

interface HslShade extends Shade {
  hsl: [number, number, number]
}

export interface BasicColorShades {
  id: string
  name: string
  shades: Shade[]
}

export interface ClosestColorShades extends BasicColorShades {
  shades: NormalizedShade[]
  closestShade: NormalizedShade
  closestShadeLightness: NormalizedShade
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

export interface GenerateMeta extends BasicColorShades {
  shades: HslShade[]
}
