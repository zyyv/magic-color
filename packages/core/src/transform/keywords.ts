import type { HexColor } from '../types'

import { colorbrewer } from '../colors/colorbrewer'
import { unoColors } from '../colors/uno'
import { w3cx11 } from '../colors/w3cx11'
import { isObject } from '../utils'
import { parseHex } from './hex'

export function isKeyword(color: string): boolean {
  return color in unoColors || color in colorbrewer || color in w3cx11
}

export function parseKeyword(color: string) {
  let hex
  let c: any

  c = (unoColors as any)[color]
  if (c) {
    if (isObject(c))
      hex = c.DEFAULT

    else
      hex = c

    return parseHex(hex as HexColor)
  }

  c = (colorbrewer as any)[color]
  if (c) {
    hex = c[3]
    return parseHex(hex)
  }

  c = (w3cx11 as any)[color]
  if (c)
    return parseHex(c)
}
