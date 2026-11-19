import type { RgbColor } from '@magic-color/core'
import { compositeContrastColors } from './composite'

/**
 * Get the contrast ratio between two colors. The contrast ratio is a value between 1 and 21.
 *
 * 获取两种颜色之间的对比度比值。对比度比值是一个介于 1 和 21 之间的值。
 *
 * Translucent text is composited over the background. A translucent background
 * is composited over white.
 *
 * @param textColor The foreground color.
 * @param bgColor The background color.
 *
 * @returns [Contrast ratio](https://www.w3.org/TR/WCAG20/#contrast-ratiodef) between two colors. The value is between 1 and 21.
 *
 * @example
 * ```ts
 * calcWCAG('#000000', '#ffffff') // 21
 * calcWCAG('#000000', '#000000') // 1
 * calcWCAG('#000000', '#ff0000') // 5.252
 * ```
 */
export function calcWCAG(textColor: string, bgColor: string): number {
  const { background, foreground } = compositeContrastColors(textColor, bgColor)

  const luminance1 = relativeLuminance(foreground)
  const luminance2 = relativeLuminance(background)

  const lighter = Math.max(luminance1, luminance2)
  const darker = Math.min(luminance1, luminance2)

  return (lighter + 0.05) / (darker + 0.05)
}

function relativeLuminance(rgb: RgbColor): number {
  const [red, green, blue] = rgb.map((channel) => {
    const channelNormalized = channel / 255
    return channelNormalized <= 0.04045
      ? channelNormalized / 12.92
      : ((channelNormalized + 0.055) / 1.055) ** 2.4
  })

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

interface ReadableOptions {
  bgColor: string

  /**
   * The text color. Default is `#ffffff`.
   *
   * 文本颜色，默认为 `#ffffff`。
   */

  textColor?: string

  /**
   * The ratio of the contrast ratio. Default is `4.5`.
   *
   * 对比度比值，默认为 `4.5`。
   */
  ratio?: number

  /**
   * The text color when the contrast ratio is not met. Default is `#000000`.
   *
   * 当对比度不符合时的文本颜色，默认为 `#000000`。
   */
  fallbackTextColor?: string
}

/**
 * Get the readable Text color with `WCAG` standard.
 *
 * 使用 `WCAG` 标准获取可读性文本颜色。
 *
 * @param options {@link ReadableOptions} The background color or option Configuration.
 */
export function getReadableTextColor(options: string): string
export function getReadableTextColor(options: ReadableOptions): string
export function getReadableTextColor(options: ReadableOptions | string) {
  const _options = typeof options === 'string' ? { bgColor: options } : options
  const {
    bgColor,
    textColor = '#ffffff',
    fallbackTextColor = '#000000',
    ratio = 4.5,
  } = _options

  return calcWCAG(textColor, bgColor) >= ratio ? textColor : fallbackTextColor
}
