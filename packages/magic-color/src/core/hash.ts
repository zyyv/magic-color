/**
 * Color Hash
 * By [Roland Rytz](https://github.com/RolandR)
 *
 * This function takes a string and returns a color hash.
 *
 * @param inputString The string to hash
 * @returns
 */

import type { ColorType } from '@magic-color/core'
import { Magicolor } from '@magic-color/core'

export function hash(inputString: string, type: ColorType = 'hex'): string {
  let sum = 0

  for (let i = 0; i < inputString.length; i++)
    sum += inputString.charCodeAt(i)

  const r = Math.floor(Number.parseFloat(`0.${Math.sin(sum + 1).toString().substring(6)}`) * 256)
  const g = Math.floor(Number.parseFloat(`0.${Math.sin(sum + 2).toString().substring(6)}`) * 256)
  const b = Math.floor(Number.parseFloat(`0.${Math.sin(sum + 3).toString().substring(6)}`) * 256)

  return new Magicolor([r, g, b], 'rgb').css(type)
}
