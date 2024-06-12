import type { RgbColor } from '@magic-color/core'
import { createMagicColor, guessType } from './basic'

export function isColor(color: string): boolean {
  return guessType(color) !== undefined
}

/**
 * Get the contrast ratio between two colors. The contrast ratio is a value between 1 and 21.
 *
 * 获取两种颜色之间的对比度比值。对比度比值是一个介于 1 和 21 之间的值。
 *
 * @param c1 The first color.
 * @param c2 The second color.
 *
 * @returns [Contrast ratio](https://www.w3.org/TR/WCAG20/#contrast-ratiodef) between two colors. The value is between 1 and 21.
 *
 * @example
 * ```ts
 * getContrastRatio('#000000', '#ffffff') // 21
 * getContrastRatio('#000000', '#000000') // 1
 * getContrastRatio('#000000', '#ff0000') // 4.23
 * ```
 */
export function getContrastRatio(c1: string, c2: string): number {
  const _c1 = createMagicColor(c1).toRgb().value
  const _c2 = createMagicColor(c2).toRgb().value

  const luminance1 = calcuRelativeLuminance(_c1)
  const luminance2 = calcuRelativeLuminance(_c2)

  const lighter = Math.max(luminance1, luminance2)
  const darker = Math.min(luminance1, luminance2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Calculate the relative luminance of a color.
 *
 * 计算颜色的相对亮度。
 *
 * @param rgb The RGB color.
 *
 * @returns The relative luminance of the color.
 *
 * @example
 * ```ts
 * calcuRelativeLuminance([255, 255, 255]) // 1
 * calcuRelativeLuminance([0, 0, 0]) // 0
 * calcuRelativeLuminance([255, 0, 0]) // 0.2126
 * ```
 */
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

/**
 * Determine whether a color is a warm color.
 *
 * 判断颜色是否是暖色。
 *
 * @param color The color to be judged.
 *
 * @returns Whether the color is a warm color.
 *
 * @example
 * ```ts
 * isWarmColor('#ff0000') // true
 * isWarmColor('#00ff00') // false
 * ```
 */
export function isWarmColor(color: string): boolean {
  const [r, g, b] = createMagicColor(color).toRgb().value
  let hue = 0
  if (r === g && g === b) {
    hue = 0 // 灰色
  }
  else {
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min

    if (max === r)
      hue = (g - b) / delta + (g < b ? 6 : 0)
    else if (max === g)
      hue = (b - r) / delta + 2
    else
      hue = (r - g) / delta + 4

    hue *= 60
  }

  return (hue >= 0 && hue <= 60) || (hue >= 300 && hue <= 360)
}
