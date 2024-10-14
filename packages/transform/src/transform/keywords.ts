import type { HexColor } from '@magic-color/core'
import { colorbrewer, unoColors, w3cx11 } from '@magic-color/core'
import { isObject } from '@magic-color/shared'

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
