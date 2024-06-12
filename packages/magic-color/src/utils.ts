import { guessType } from './core/basic'

export function isColor(color: string): boolean {
  return guessType(color) !== undefined
}
