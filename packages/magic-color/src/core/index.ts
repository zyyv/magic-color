import { hash } from '../hash'
import { calcAPCA, calcWCAG, getReadableTextColor, isWarmColor, reverseAPCA } from '../contrast'
import { getColorName, theme } from '../theme'
import { random } from '../utils'
import { mc } from './basic'
import { guessType } from './utils'

export { Magicolor } from './basic'
export * from './types'

// @ts-expect-error - anyway
mc.valid = (color: string) => guessType(color) !== undefined
// @ts-expect-error - anyway
mc.random = random
// @ts-expect-error - anyway
mc.hash = hash
// @ts-expect-error - anyway
mc.theme = theme
// @ts-expect-error - anyway
mc.getColorName = getColorName
// @ts-expect-error - anyway
mc.wcag = calcWCAG
// @ts-expect-error - anyway
mc.apca = calcAPCA
// @ts-expect-error - anyway
mc.apcaReverse = reverseAPCA
// @ts-expect-error - anyway
mc.readable = getReadableTextColor
// @ts-expect-error - anyway
mc.warm = isWarmColor

export {
  mc,
}
