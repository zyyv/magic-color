import type { ColorType } from '@magic-color/core'
import { Magicolor } from './core/basic'

/**
 * Generate a random color
 *
 * @param type ColorType, default is 'hex'
 * @returns any color type
 */
export function random(type: ColorType = 'hex') {
  const color = `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`
  return new Magicolor(color, 'hex').css(type)
}
