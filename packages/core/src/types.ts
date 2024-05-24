/**
 * [0-360, 0-100, 0-100]
 */
export type HslColor = [number, number, number]
/**
 * [0-360, 0-100, 0-100]
 */
export type HsbColor = [number, number, number]
/**
 * [0-255, 0-255, 0-255]
 */
export type RgbColor = [number, number, number]
/**
 * #RRGGBB or #RRGGBBAA
 */
export type HexColor = string
/**
 * CSS color keyword
 */
export type KeywordColor = string

/**
 * 0-1
 */
export type Opacity = number

export interface Colors {
  keyword: KeywordColor
  rgb: RgbColor
  hex: HexColor
  hsb: HsbColor
  hsl: HslColor
}

export type ColorType = keyof Colors
export type ColorValue = Colors[keyof Colors]
