import type { ColorType, RgbColor } from '@magic-color/core'
import { Magicolor } from '@magic-color/core'

const encoder = new TextEncoder()

/**
 * Hash a string to a color using FNV-1a over UTF-8.
 * Use `legacy` to reproduce color assignments from earlier versions.
 */
export function hash(inputString: string, type: ColorType = 'hex', algorithm: 'fnv1a' | 'legacy' = 'fnv1a'): string {
  return new Magicolor(algorithm === 'legacy' ? legacyHash(inputString) : fnv1aHash(inputString), 'rgb').css(type)
}

function fnv1aHash(inputString: string): RgbColor {
  let hash = 0x811C9DC5
  for (const byte of encoder.encode(inputString))
    hash = Math.imul(hash ^ byte, 0x01000193)
  return [(hash >>> 16) & 0xFF, (hash >>> 8) & 0xFF, hash & 0xFF]
}

// Original color hash by Roland Rytz.
function legacyHash(inputString: string): RgbColor {
  let sum = 0

  for (let i = 0; i < inputString.length; i++)
    sum += inputString.charCodeAt(i)

  const r = Math.floor(Number.parseFloat(`0.${Math.sin(sum + 1).toString().substring(6)}`) * 256)
  const g = Math.floor(Number.parseFloat(`0.${Math.sin(sum + 2).toString().substring(6)}`) * 256)
  const b = Math.floor(Number.parseFloat(`0.${Math.sin(sum + 3).toString().substring(6)}`) * 256)

  return [r, g, b]
}
