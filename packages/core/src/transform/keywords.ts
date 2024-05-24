import type { HexColor } from '../types'
import { parseHex } from './hex'

export const KeywordColors: Record<string, HexColor> = {
  black: '#000000',
  silver: '#c0c0c0',
  gray: '#808080',
  white: '#ffffff',
  maroon: '#800000',
  red: '#ff0000',
  purple: '#800080',
  green: '#008000',
  lime: '#00ff00',
  teal: '#008080',
  aqua: '#00ffff',
  navy: '#000080',
  blue: '#0000ff',
  olive: '#808000',
  yellow: '#ffff00',
  fuchsia: '#ff00ff',
  orange: '#ffa500',
  cyan: '#00ffff',
  violet: '#8a2be2',
  indigo: '#4b0082',
  pink: '#ffc0cb',
  peach: '#ffdab9',
  brown: '#a52a2a',
  beige: '#f5f5dc',
  magenta: '#ff00ff',
  crimson: '#dc143c',
  coral: '#ff7f50',
  lavender: '#e6e6fa',
  turquoise: '#40e0d0',
  khaki: '#f0e68c',
  gold: '#ffd700',
}

export const UnoColors: Record<string, HexColor> = {
  amber: '#fbbf24',
  black: '#000',
  blue: '#60a5fa',
  blueGray: '#94a3b8',
  bluegray: '#94a3b8',
  coolGray: '#9ca3af',
  coolgray: '#9ca3af',
  cyan: '#22d3ee',
  dark: '#222222',
  emerald: '#34d399',
  fuchsia: '#e879f9',
  gray: '#9ca3af',
  green: '#4ade80',
  indigo: '#818cf8',
  inherit: 'inherit',
  light: '#f6f6f6',
  lightBlue: '#38bdf8',
  lightblue: '#38bdf8',
  lime: '#a3e635',
  neutral: '#a3a3a3',
  orange: '#fb923c',
  pink: '#f472b6',
  purple: '#c084fc',
  red: '#f87171',
  rose: '#fb7185',
  sky: '#38bdf8',
  slate: '#94a3b8',
  stone: '#a8a29e',
  teal: '#2dd4bf',
  trueGray: '#a3a3a3',
  truegray: '#a3a3a3',
  violet: '#a78bfa',
  warmGray: '#a8a29e',
  warmgray: '#a8a29e',
  white: '#fff',
  yellow: '#facc15',
  zinc: '#a1a1aa',
}

export function isKeyword(color: string): color is keyof typeof KeywordColors {
  return color in KeywordColors || color in UnoColors
}

export function parseKeyword(color: string) {
  return parseHex(KeywordColors[color] ?? UnoColors[color])
}
