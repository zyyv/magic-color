import type { ColorObject, ColorType, ColorValue, Colors, HexColor, HsbColor, HslColor, Opacity, RgbColor } from './types'
import { hsbToHex, hsbToHsl, hsbToRgb, isHsb, parseHsb } from './hsb'
import { hslToHex, hslToHsb, hslToRgb, isHsl, parseHsl } from './hsl'
import { hexToHsb, hexToHsl, hexToRgb, isHex, parseHex } from './hex'
import { isRgb, parseRgb, rgbToHex, rgbToHsb, rgbToHsl } from './rgb'
import { isKeyword, parseKeyword } from './keywords'

export class MagicColor<T extends ColorType> implements ColorObject<T> {
  type: T
  value: Colors[T]
  opacity: Opacity

  constructor(value: Colors[T], type: T, opacity: Opacity) {
    this.type = type
    this.value = value
    this.opacity = opacity
  }

  toString(withOpacity = false) {
    switch (this.type) {
      case 'keyword':
        return this.value + (withOpacity ? opacityToString(this.opacity, true) : '')

      case 'hex':
        return withOpacity
          ? this.value + opacityToString(this.opacity, true)
          : this.value as HexColor

      case 'rgb':
        return withOpacity
          ? `rgba(${(this.value as RgbColor).join(', ')}, ${this.opacity})`
          : `rgb(${(this.value as RgbColor).join(', ')})`

      case 'hsl':
        return `${this.type}${withOpacity ? 'a' : ''}(${[this.value[0], `${this.value[1]}%`, `${this.value[2]}%`].join(', ')})`

      case 'hsb':
        return `${this.type}(${[this.value[0], `${this.value[1]}%`, `${this.value[2]}%`].join(', ')})`

      default:
        throw new Error('Invalid color type.')
    }
  }

  toRgb() {
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
        value = this.value
    }

    return new MagicColor(value as RgbColor, 'rgb', this.opacity)
  }

  toHex() {
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
        value = this.value
    }

    return new MagicColor(value as HexColor, 'hex', this.opacity)
  }

  toHsl() {
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
        value = this.value
    }

    return new MagicColor(value as HslColor, 'hsl', this.opacity)
  }

  toHsb() {
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
        value = this.value
    }

    return new MagicColor(value as HsbColor, 'hsb', this.opacity)
  }
}

export function createMagicColor<T extends ColorType = any>(value: string, type?: T, opacity?: Opacity): MagicColor<T>
export function createMagicColor<T extends ColorType = any>(value: Colors[T], type: T, opacity?: Opacity): MagicColor<T>
export function createMagicColor<T extends ColorType = any>(value: Colors[T] | string, type?: T, opacity?: Opacity): MagicColor<T> {
  if (typeof value === 'string') {
    const {
      value: _value,
      type: _type,
      opacity: _opacity,
    } = parseColorString(value)

    if (type && type !== _type)
      throw new Error(`Invalid color type: ${_type}.`)

    return new MagicColor<any>(_value, _type, opacity ?? _opacity)
  }

  opacity = opacity ?? 1

  return new MagicColor<T>(value, type!, opacity)
}

export function opacityToString(opacity: Opacity, toHex = false): string {
  return toHex
    ? Math.round(opacity * 255).toString(16).padStart(2, '0')
    : `${opacity * 100}%`
}

function parseColorString(color: string) {
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

function guessType(color: string) {
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
