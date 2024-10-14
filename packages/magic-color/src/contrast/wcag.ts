import type { RgbColor } from '@magic-color/core'
import { Magicolor } from '@magic-color/core'
import { SA98G } from './constant'

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
 * calcWCAG('#000000', '#ffffff') // 21
 * calcWCAG('#000000', '#000000') // 1
 * calcWCAG('#000000', '#ff0000') // 4.23
 * ```
 */
export function calcWCAG(c1: string, c2: string): number {
  const _c1 = new Magicolor(c1).value('rgb')
  const _c2 = new Magicolor(c2).value('rgb')

  const luminance1 = calcuRelativeLuminance(_c1)
  const luminance2 = calcuRelativeLuminance(_c2)

  const lighter = Math.max(luminance1, luminance2)
  const darker = Math.min(luminance1, luminance2)

  return Number.parseFloat(((lighter + 0.05) / (darker + 0.05)).toFixed(2))
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
function calcuRelativeLuminance(rgb: RgbColor): number {
  const [red, green, blue] = rgb.map((channel) => {
    const channelNormalized = channel / 255
    return channelNormalized <= 0.03928
      ? channelNormalized / 12.92
      : ((channelNormalized + 0.055) / 1.055) ** 2.4
  })

  return SA98G.sRco * red + SA98G.sGco * green + SA98G.sBco * blue
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

  return calcWCAG(bgColor, textColor) >= ratio ? textColor : fallbackTextColor
}
