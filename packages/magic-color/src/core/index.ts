import type { Colors, ColorType, Opacity } from '@magic-color/core'
import { guessType, Magicolor, SupportTypes } from '@magic-color/core'
import { deltaE, getColorName, random } from '@magic-color/theme'
import { calcAPCA, calcWCAG, getReadableTextColor, isWarmColor, reverseAPCA } from '../contrast'
import { hash } from './hash'

export interface MagicolorInstance {
  <T extends ColorType>(value: Colors[T] | Record<string, number>, type?: T, alpha?: Opacity): Magicolor<T>
  <T extends ColorType = 'rgb'>(v1: number, v2: number, v3: number, type?: T, alpha?: Opacity): Magicolor<T>
  valid: typeof guessType
  random: typeof random
  hash: typeof hash
  wcag: typeof calcWCAG
  apca: typeof calcAPCA
  apcaReverse: typeof reverseAPCA
  readable: typeof getReadableTextColor
  warm: typeof isWarmColor
  supports: typeof SupportTypes
  deltaE: typeof deltaE
  nameOf: typeof getColorName
}

export const mc: MagicolorInstance = <T extends ColorType>(...args: any[]): Magicolor<T> => {
  // @ts-expect-error allow the type to be inferred
  return new Magicolor(...args) as Magicolor<T>
}

mc.valid = guessType
mc.random = random
mc.hash = hash
mc.wcag = calcWCAG
mc.apca = calcAPCA
mc.apcaReverse = reverseAPCA
mc.readable = getReadableTextColor
mc.warm = isWarmColor
mc.supports = SupportTypes
mc.deltaE = deltaE
mc.nameOf = getColorName
