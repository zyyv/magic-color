import { W3cx11 } from '../colors/w3cx11'
import { parseHex } from './hex'

function keywordToHex(color: string) {
  const name = color.trim().toLowerCase()
  if (name === 'transparent')
    return '#00000000'
  if (Object.hasOwn(W3cx11, name))
    return W3cx11[name as keyof typeof W3cx11]
}

export function isKeyword(color: string): boolean {
  return keywordToHex(color) !== undefined
}

export function parseKeyword(color: string) {
  const hex = keywordToHex(color)
  if (hex !== undefined)
    return parseHex(hex)
}
