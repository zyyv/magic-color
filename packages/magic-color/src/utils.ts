import { guessType } from './core'

export function isColor(color: string): boolean {
  return guessType(color) !== undefined
}

export function randomColor(): string {
  return `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`
}
