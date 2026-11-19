import type { RgbColor } from '@magic-color/core'
import { Magicolor } from '@magic-color/core'

const white: RgbColor = [255, 255, 255]

export function compositeContrastColors(textColor: string, bgColor: string, round = false) {
  const background = composite(bgColor, white, round)
  return { background, foreground: composite(textColor, background, round) }
}

function composite(color: string, background: RgbColor, round: boolean): RgbColor {
  const parsed = new Magicolor(color)
  const { alpha } = parsed
  return parsed.rgb(round).map((value, index) => {
    const channel = Math.min(255, Math.max(0, value))
    const composited = channel * alpha + background[index] * (1 - alpha)
    return round ? Math.round(composited) : composited
  }) as RgbColor
}
