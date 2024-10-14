import { deltaE } from '../delta-e'
import collections from './colors.json'

export function getColorName(color: string): string {
  return collections
    .map(t => [...t, deltaE(color, t[0])])
    .reduce((t, i) => t[2] < i[2] ? t : i)[1] as string
}
