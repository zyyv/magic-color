import type { HexColor } from '../types'
import { isObject } from '@magic-color/shared'
import { Colorbrewer, UnoColors, W3cx11 } from '../colors'

import { parseHex } from './hex'

export function isKeyword(color: string): boolean {
  return color in UnoColors || color in Colorbrewer || color in W3cx11
}

export function parseKeyword(color: string) {
  let hex
  let c: any

  c = (UnoColors as any)[color]
  if (c) {
    if (isObject(c))
      hex = c.DEFAULT

    else
      hex = c

    return parseHex(hex as HexColor)
  }

  c = (Colorbrewer as any)[color]
  if (c) {
    hex = c[3]
    return parseHex(hex)
  }

  c = (W3cx11 as any)[color]
  if (c)
    return parseHex(c)
}
