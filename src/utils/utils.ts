import type { RgbColor } from './types'
import { createMagicColor } from './basic'

export function getContrastRatio(c1: string, c2: string): number {
  const _c1 = createMagicColor(c1).toRgb().value
  const _c2 = createMagicColor(c2).toRgb().value

  const luminance1 = calcuRelativeLuminance(_c1)
  const luminance2 = calcuRelativeLuminance(_c2)

  const lighter = Math.max(luminance1, luminance2)
  const darker = Math.min(luminance1, luminance2)

  return (lighter + 0.05) / (darker + 0.05)
}

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
