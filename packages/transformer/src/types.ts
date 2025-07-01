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
 * [0-100, -128-127, -128-127]
 */
export type LabColor = [number, number, number]
/**
 * [0-100, 0-150, 0-360]
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value/lch
 */
export type LchColor = [number, number, number]

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
  lab: LabColor
  lch: LchColor
}

export type ColorType = keyof Colors
export type ColorValue = Colors[keyof Colors]
