import type { ColorType, Colors, HexColor, HsbColor, HslColor, Opacity, RgbColor } from '@magic-color/core'
import { hexToHsb, hexToHsl, hexToRgb, hsbToHex, hsbToHsl, hsbToRgb, hslToHex, hslToHsb, hslToRgb, isHex, isHsb, isHsl, isKeyword, isRgb, parseHex, parseHsb, parseHsl, parseKeyword, parseRgb, rgbToHex, rgbToHsb, rgbToHsl } from '@magic-color/core'
import type { ColorObject } from './types'

export class MagicColor<T extends ColorType> implements ColorObject<T> {
  type: T
  value: Colors[T]
  alpha: Opacity

  private _stack: MagicColor<any>[] = []

  constructor(value: Colors[T], type: T, alpha: Opacity) {
    this.type = type
    this.value = value
    this.alpha = alpha
  }

  toString(withOpacity = false): string {
    switch (this.type) {
      case 'keyword':
        return this.value + (withOpacity ? alphaToString(this.alpha, true) : '')

      case 'hex':
        return withOpacity
          ? this.value + alphaToString(this.alpha, true)
          : this.value as HexColor

      case 'rgb':
        return withOpacity
          ? `rgba(${(this.value as RgbColor).join(', ')}, ${alphaToString(this.alpha)})`
          : `rgb(${(this.value as RgbColor).join(', ')})`

      case 'hsl':
        return `${this.type}${withOpacity ? 'a' : ''}(${[this.value[0], `${this.value[1]}%`, `${this.value[2]}%`].join(', ')}${withOpacity ? `, ${alphaToString(this.alpha)}` : ''})`

      case 'hsb':
        return `${this.type}(${[this.value[0], `${this.value[1]}%`, `${this.value[2]}%`].join(', ')})`

      default:
        throw new Error('Invalid color type.')
    }
  }

  toRgb(): MagicColor<'rgb'> {
    let value
    switch (this.type) {
      case 'keyword':
      case 'hex':
        value = hexToRgb(this.value as HexColor)
        break
      case 'hsl':
        value = hslToRgb(this.value as HslColor)
        break
      case 'hsb':
        value = hsbToRgb(this.value as HsbColor)
        break
      default:
        value = this.value as RgbColor
    }

    this._push<'rgb'>(value, 'rgb', this.alpha)

    return this as MagicColor<'rgb'>
  }

  toHex(): MagicColor<'hex'> {
    let value
    switch (this.type) {
      case 'rgb':
        value = rgbToHex(this.value as RgbColor)
        break
      case 'hsl':
        value = hslToHex(this.value as HslColor)
        break
      case 'hsb':
        value = hsbToHex(this.value as HsbColor)
        break
      case 'keyword':
      default:
        value = this.value as HexColor
    }

    this._push<'hex'>(value, 'hex', this.alpha)

    return this as MagicColor<'hex'>
  }

  toHsl(): MagicColor<'hsl'> {
    let value
    switch (this.type) {
      case 'keyword':
      case 'hex':
        value = hexToHsl(this.value as HexColor)
        break
      case 'rgb':
        value = rgbToHsl(this.value as RgbColor)
        break
      case 'hsb':
        value = hsbToHsl(this.value as HsbColor)
        break
      default:
        value = this.value as HslColor
    }

    this._push<'hsl'>(value, 'hsl', this.alpha)

    return this as MagicColor<'hsl'>
  }

  toHsb(): MagicColor<'hsb'> {
    let value
    switch (this.type) {
      case 'keyword':
      case 'hex':
        value = hexToHsb(this.value as HexColor)
        break
      case 'rgb':
        value = rgbToHsb(this.value as RgbColor)
        break
      case 'hsl':
        value = hslToHsb(this.value as HslColor)
        break
      default:
        value = this.value as HsbColor
    }

    this._push<'hsb'>(value, 'hsb', this.alpha)

    return this as MagicColor<'hsb'>
  }

  to(type: ColorType) {
    switch (type) {
      case 'rgb':
        return this.toRgb()
      case 'hex':
        return this.toHex()
      case 'hsl':
        return this.toHsl()
      case 'hsb':
        return this.toHsb()
      default:
        throw new Error('Invalid color type.')
    }
  }

  private _push<T extends ColorType = any>(value: Colors[T], type: ColorType, alpha: Opacity) {
    this._stack.push(new MagicColor(value, type, alpha))
    // @ts-expect-error - value is not assignable to type Colors[T]
    this.value = value
    // @ts-expect-error - type is not assignable to type T
    this.type = type
  }

  get history(): MagicColor<any>[] {
    return this._stack
  }

  get last(): MagicColor<any> {
    return this._stack[this._stack.length - 1]
  }

  get first(): MagicColor<any> {
    return this._stack[0]
  }

  revert() {
    if (this._stack.length) {
      const last = this._stack.pop()
      this.value = last!.value
      this.type = last!.type
    }
  }

  clear() {
    this._stack = []
  }
}

export function createMagicColor<T extends ColorType = any>(value: string, type?: T, alpha?: Opacity): MagicColor<T>
export function createMagicColor<T extends ColorType = any>(value: Colors[T], type: T, alpha?: Opacity): MagicColor<T>
export function createMagicColor<T extends ColorType = any>(value: Colors[T] | string, type?: T, alpha?: Opacity): MagicColor<T> {
  if (typeof value === 'string') {
    const {
      value: _value,
      type: _type,
      alpha: _opacity,
    } = resolveColorString(value)

    if (type && type !== _type)
      throw new Error(`Invalid color type: ${_type}.`)

    return new MagicColor<any>(_value, _type, alpha ?? _opacity)
  }

  alpha = alpha ?? 1

  return new MagicColor<T>(value, type!, alpha)
}

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
  }

  return {
    ...parseMap[type](color),
    type,
  } as ColorObject<ColorType>
}

export function guessType(color: string): ColorType | undefined {
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

export const mc: typeof createMagicColor = createMagicColor
