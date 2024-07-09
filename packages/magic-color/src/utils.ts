import type { ColorType } from '@magic-color/core'
import { mc } from './core'

export function random(type: ColorType = 'hex') {
  const color = `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`
  return mc(color, 'hex').css(type)
}
