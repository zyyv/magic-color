import type { Colors, ColorType, Opacity } from '@magic-color/transformer'
import type { ColorObject } from '../types'
import { isArray, isNumber, isObject, isString } from '@magic-color/shared'
import { isHex, isHsb, isHsl, isKeyword, isLab, isLch, isOklab, isOklch, isRgb, parseHex, parseHsb, parseHsl, parseKeyword, parseLab, parseLch, parseOklab, parseOklch, parseRgb, SupportTypes } from '@magic-color/transformer'
import { CHANNEL_MAP } from './map'

export function alphaToString(alpha: Opacity, toHex = false): string {
  return toHex
    ? Math.round(alpha * 255).toString(16).padStart(2, '0')
    : `${Math.round(alpha * 10000) / 100}%`
}

function resolveColorString(color: string) {
  const type = guessType(color)
  if (!type)
    throw new TypeError(`Invalid color: ${color}.`)

  const parseMap = {
    rgb: parseRgb,
    hex: parseHex,
    hsl: parseHsl,
    hsb: parseHsb,
    keyword: parseKeyword,
    lab: parseLab,
    lch: parseLch,
    oklch: parseOklch,
    oklab: parseOklab,
  }

  const parsed = parseMap[type](color)
  if (!parsed)
    throw new TypeError(`Invalid color: ${color}.`)

  return { ...parsed, type }
}

export function guessType(color: string): ColorType | undefined {
  if (!color)
    return

  const map = {
    rgb: isRgb,
    hex: isHex,
    hsl: isHsl,
    hsb: isHsb,
    keyword: isKeyword,
    lab: isLab,
    lch: isLch,
    oklab: isOklab,
    oklch: isOklch,
  }

  for (const [type, test] of Object.entries(map)) {
    if (test(color))
      return type as ColorType
  }
}

export function resolveArgs<T extends ColorType = 'rgb'>(...args: any[]): [Colors[T], ColorObject<T>['type'], Opacity] | undefined {
  const [input, inputType, inputAlpha, typeOrAlpha = 'rgb', channelAlpha = 1] = args
  if (isNumber(input)) {
    if (args.length < 3 || args.length > 5)
      return
    const type = isNumber(typeOrAlpha) ? 'rgb' : typeOrAlpha
    const alpha = isNumber(typeOrAlpha) ? typeOrAlpha : channelAlpha
    return [[input, inputType, inputAlpha] as Colors[T], type, alpha]
  }

  if (args.length > 3)
    return

  if (isString(input)) {
    const parsed = resolveColorString(input)
    const type = parsed.type === 'keyword' ? 'hex' : parsed.type
    if (inputType !== undefined && inputType !== parsed.type && !(inputType === 'keyword' && type === 'hex')) {
      throw new TypeError(`Invalid color type: ${inputType}. Detected ${parsed.type}.`)
    }
    return [parsed.values as Colors[T], type as ColorObject<T>['type'], inputAlpha === undefined ? parsed.alpha : inputAlpha]
  }

  const alpha = inputAlpha === undefined ? 1 : inputAlpha
  if (isArray(input))
    return [input as Colors[T], inputType === undefined ? 'rgb' : inputType, alpha]

  if (isObject(input)) {
    const type = inputType === undefined
      ? SupportTypes.find(candidate => CHANNEL_MAP[candidate]?.every(channel => input[channel] != null))
      : inputType
    if (type === undefined)
      return
    const channels = Object.hasOwn(CHANNEL_MAP, type) ? CHANNEL_MAP[type] : []
    return [channels.map(channel => input[channel]) as Colors[T], type, alpha]
  }
}
