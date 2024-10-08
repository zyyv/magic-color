import { Magicolor } from '../core/basic'

export * from './apca'
export * from './wcag'

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
  const [r, g, b] = new Magicolor(color).rgb()
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
