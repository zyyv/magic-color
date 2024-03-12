export type ColorType = 'hsl' | 'hsb' | 'rgb' | 'hex' | 'keyword'
export type hslColor = [number, number, number]
export type hsbColor = [number, number, number]
export type rgbColor = [number, number, number]
export type hexColor = string
export type keywordColor = string
export type Color = hslColor | hsbColor | rgbColor | hexColor | keywordColor
