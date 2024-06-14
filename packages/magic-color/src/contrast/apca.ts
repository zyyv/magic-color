import type { RgbColor } from '@magic-color/core'
import { createMagicColor } from '../core/basic'

export function getAPCAContrastRatio(c1: string, c2: string): number {
  const _c1 = createMagicColor(c1).toRgb().value
  const _c2 = createMagicColor(c2).toRgb().value

  const l1 = calcuLuminance(_c1)
  const l2 = calcuLuminance(_c2)

  const __c1 = calcuContrast(_c1)
  const __c2 = calcuContrast(_c2)

  return Number.parseFloat(((__c1 - __c2) / Math.sqrt(l1 ** 2 + l2 ** 2)).toFixed(3))
}

/**
 * Calculate the luminance of a color.
 *
 * 计算颜色的亮度。
 *
 * @param rgb The RGB color.
 *
 * @returns The luminance of the color.
 *
 * @example
 * ```ts
 * calcuLuminance([255, 255, 255]) // 1
 * calcuLuminance([0, 0, 0]) // 0
 * calcuLuminance([255, 0, 0]) // 0.2126
 * ```
 */
function calcuLuminance(rgb: RgbColor): number {
  const [red, green, blue] = rgb.map((channel) => {
    const channelNormalized = channel / 255
    return channelNormalized <= 0.03928
      ? channelNormalized / 12.92
      : ((channelNormalized + 0.055) / 1.055) ** 2.4
  })

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

/**
 * Calculate the contrast of a color.
 *
 * 计算颜色的对比度。
 *
 * @param rgb The RGB color.
 *
 * @returns The contrast of the color.
 *
 * @example
 * ```ts
 * calcuContrast([255, 255, 255]) // 1
 * calcuContrast([0, 0, 0]) // 1
 * calcuContrast([255, 0, 0]) // 4.23
 * ```
 */
function calcuContrast(rgb: RgbColor): number {
  const [red, green, blue] = rgb.map((channel) => {
    const channelNormalized = channel / 255
    return channelNormalized <= 0.03928
      ? channelNormalized / 12.92
      : ((channelNormalized + 0.055) / 1.055) ** 2.4
  })

  return (red + 0.05) * 0.2126 + (green + 0.05) * 0.7152 + (blue + 0.05) * 0.0722
}
