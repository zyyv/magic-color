export type ColorType = 'hsl' | 'hsb' | 'rgb' | 'hex' | 'keyword'
/**
 * [0-360, 0-100, 0-100]
 */
export type hslColor = [number, number, number]
/**
 * [0-360, 0-100, 0-100]
 */
export type hsbColor = [number, number, number]
/**
 * [0-255, 0-255, 0-255]
 */
export type rgbColor = [number, number, number]
/**
 * #RRGGBB or #RRGGBBAA
 */
export type hexColor = string
/**
 * CSS color keyword
 */
export type keywordColor = string
export type Color = hslColor | hsbColor | rgbColor | hexColor | keywordColor
/**
 * 0-1
 */
export type Opacity = number

export interface ColorObject {
  type: ColorType
  value: Color
  opacity: Opacity
  hasOpacity: boolean
  toString: () => string
}
