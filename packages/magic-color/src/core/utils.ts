import type { Colors, ColorType, Opacity } from '@magic-color/core'
import type { ColorObject } from './types'
import { isArray, isHex, isHsb, isHsl, isKeyword, isNumber, isObject, isRgb, isString, parseHex, parseHsb, parseHsl, parseKeyword, parseLab, parseRgb } from '@magic-color/core'

export const SupportTypes = ['rgb', 'hex', 'hsl', 'hsb', 'lab']

export function alphaToString(alpha: Opacity, toHex = false): string {
  return toHex
    ? Math.round(alpha * 255).toString(16).padStart(2, '0')
    : `${Math.round(alpha * 10000) / 100}%`
}

function resolveColorString(color: string) {
  const type = guessType(color)
  if (!type)
    throw new Error(`Invalid color: ${color}.`)

  const parseMap = {
    rgb: parseRgb,
    hex: parseHex,
    hsl: parseHsl,
    hsb: parseHsb,
    keyword: parseKeyword,
    lab: parseLab,
  }

  return {
    ...parseMap[type](color),
    type,
  } as ColorObject<ColorType>
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
  }

  for (const [type, test] of Object.entries(map)) {
    if (test(color))
      return type as ColorType
  }
}

export function resolveArgs<T extends ColorType = 'rgb'>(...args: any[]): [Colors[T], T, Opacity] | undefined {
  args = Array.from(args)
  if (args.length === 1) {
    if (isString(args[0])) {
      const { values, type, alpha } = resolveColorString(args[0])

      return [values as Colors[T], type as T, alpha]
    }
    else if (isObject(args[0])) {
      for (const type of SupportTypes) {
        const keys = type.split('')
        if (keys.every((k: string) => args[0][k] != null)) {
          return [keys.map((k: string) => args[0][k]) as Colors[T], type as T, 1]
        }
      }
    }
    else if (isArray(args[0])) {
      return [args[0] as Colors[T], 'rgb' as T, 1]
    }
    else {
      throw new TypeError('Invalid color type.')
    }
  }

  else if (args.length === 2) {
    const [anyValue, type] = args
    /**
     * @example
     * ```ts
     * mc({ r: 255, g: 0, b: 0 }, 'rgb')
     * ```
     */
    if (isObject(anyValue)) {
      const values = type.split('').map((k: string) => anyValue[k])
      return [values, type, 1]
    }
    /**
     * @example
     * ```ts
     * mc([255, 0, 0], 'rgb')
     * ```
     */
    else if (isArray(anyValue)) {
      return [anyValue as Colors[T], type, 1]
    }
    else if (isString(anyValue)) {
      const { values, type: _type, alpha } = resolveColorString(anyValue)
      if (type !== _type) {
        throw new Error(`Invalid color type: ${type}.`)
      }
      return [values as Colors[T], type, alpha]
    }
  }

  else if (args.length >= 3) {
    /**
     * @example
     * ```ts
     * mc(255, 0, 0, 1)
     * mc(255, 0, 0, 'rgb')
     * mc([255, 0, 0], 'rgb', 1)
     * mc({ r: 255, g: 0, b: 0 }, 'rgb', 1)
     * mc(255, 0, 0, 'rgb', 1)
     * ```
     */
    if (args && args.every(isNumber)) {
      return [
        args.slice(0, 3) as Colors[T],
        'rgb' as T,
        args[4] ?? 1,
      ]
    }

    let _alpha = 1
    let _type
    let _values
    const last = (args as any[]).pop()
    if (isNumber(last)) {
      _alpha = last
      _type = (args as any[]).pop()
    }
    else {
      _type = last
    }

    const anyValue = args[0]
    if (isObject(anyValue)) {
      _values = _type.split('').map((k: string) => anyValue[k])
    }
    else if (isArray(anyValue)) {
      _values = anyValue
    }
    else if (isString(anyValue)) {
      const { values } = resolveColorString(anyValue)
      return [values as Colors[T], _type as T, _alpha]
    }
    else if (isNumber(anyValue)) {
      return [
        args.slice(0, 3) as Colors[T],
        _type as T,
        _alpha,
      ]
    }

    return [_values, _type, _alpha]
  }
}

export function valid(color: string) {
  return guessType(color) !== undefined
}
