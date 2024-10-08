import type { Colors, ColorType, Opacity } from '@magic-color/core'
import { calcAPCA, calcWCAG, getReadableTextColor, isWarmColor, reverseAPCA } from '../contrast'
import { hash } from '../hash'
import { getColorName, theme } from '../theme'
import { random } from '../utils'
import { Magicolor } from './basic'
import { valid } from './utils'

export interface MagicolorInstance {
  <T extends ColorType>(value: Colors[T] | Record<string, number>, type?: T, alpha?: Opacity): Magicolor<T>
  <T extends ColorType = 'rgb'>(v1: number, v2: number, v3: number, type?: T, alpha?: Opacity): Magicolor<T>
  valid: typeof valid
  random: typeof random
  hash: typeof hash
  theme: typeof theme
  names: typeof getColorName
  wcag: typeof calcWCAG
  apca: typeof calcAPCA
  apcaReverse: typeof reverseAPCA
  readable: typeof getReadableTextColor
  warm: typeof isWarmColor
}

export const mc: MagicolorInstance = <T extends ColorType>(...args: any[]): Magicolor<T> => {
  // @ts-expect-error allow the type to be inferred
  return new Magicolor(...args) as Magicolor<T>
}

mc.valid = valid
mc.random = random
mc.hash = hash
mc.theme = theme
mc.names = getColorName
mc.wcag = calcWCAG
mc.apca = calcAPCA
mc.apcaReverse = reverseAPCA
mc.readable = getReadableTextColor
mc.warm = isWarmColor
