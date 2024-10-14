import type { Colors, ColorType, HexColor, HsbColor, HslColor, LabColor, Opacity, RgbColor } from '@magic-color/transformer'
import type { ColorObject } from '../types'
import {
  hexToHsb,
  hexToHsl,
  hexToLab,
  hexToRgb,

  hsbToHex,
  hsbToHsl,
  hsbToLab,
  hsbToRgb,

  hslToHex,
  hslToHsb,
  hslToLab,
  hslToRgb,

  labToHex,
  labToHsb,
  labToHsl,
  labToRgb,

  rgbToHex,
  rgbToHsb,
  rgbToHsl,
  rgbToLab,

  SupportTypes,
} from '@magic-color/transformer'
import { alphaToString, resolveArgs } from './utils'

export { guessType } from './utils'

export class Magicolor<T extends ColorType> implements ColorObject<T> {
  type: T
  values: Colors[T]
  alpha: Opacity

  cloned = false

  private _stack: Magicolor<any>[] = []

  constructor(value: Colors[T] | Record<string, number>, type?: T, alpha?: Opacity)
  constructor(v1: number, v2: number, v3: number, type?: T, alpha?: Opacity)
  constructor(...args: any[]) {
    const result = resolveArgs<T>(...args)
    if (result) {
      const [values, type, alpha] = result
      this.values = values
      this.type = type
      this.alpha = alpha
    }
    else {
      throw new Error('Invalid color type.')
    }
  }

  private toString(withAlpha = false, round = true): string {
    switch (this.type) {
      case 'keyword':
      case 'hex':
        return this.values + (withAlpha ? alphaToString(this.alpha, true) : '')

      case 'rgb':
        return `${this.type}(${(this.values as RgbColor).map(round ? Math.round : c => c).join(' ')}${withAlpha ? ` / ${this.alpha}` : ''})`

      case 'hsl':
        return `${this.type}(${(this.values as HslColor).map(round ? Math.round : c => c).join(' ')}${withAlpha ? ` / ${this.alpha}` : ''})`

      case 'hsb':
        return `${this.type}(${[this.values[0], `${this.values[1]}%`, `${this.values[2]}%`].join(', ')})`

      case 'lab':
        return `${this.type}(${(this.values as LabColor).map(round ? Math.round : c => c).join(' ')}${withAlpha ? ` / ${alphaToString(this.alpha)}` : ''})`

      default:
        throw new Error('Invalid color type.')
    }
  }

  toRgb(): Magicolor<'rgb'> {
    let value
    switch (this.type) {
      case 'keyword':
      case 'hex':
        value = hexToRgb(this.values as HexColor)
        break
      case 'hsl':
        value = hslToRgb(this.values as HslColor)
        break
      case 'hsb':
        value = hsbToRgb(this.values as HsbColor)
        break
      case 'lab':
        value = labToRgb(this.values as LabColor)
        break
      default:
        value = this.values as RgbColor
    }

    this._push<'rgb'>(value, 'rgb', this.alpha)

    return this as Magicolor<'rgb'>
  }

  toHex(): Magicolor<'hex'> {
    let value
    switch (this.type) {
      case 'rgb':
        value = rgbToHex(this.values as RgbColor)
        break
      case 'hsl':
        value = hslToHex(this.values as HslColor)
        break
      case 'hsb':
        value = hsbToHex(this.values as HsbColor)
        break
      case 'lab':
        value = labToHex(this.values as LabColor)
        break
      case 'keyword':
      default:
        value = this.values as HexColor
    }

    this._push<'hex'>(value, 'hex', this.alpha)

    return this as Magicolor<'hex'>
  }

  toHsl(): Magicolor<'hsl'> {
    let value
    switch (this.type) {
      case 'keyword':
      case 'hex':
        value = hexToHsl(this.values as HexColor)
        break
      case 'rgb':
        value = rgbToHsl(this.values as RgbColor)
        break
      case 'hsb':
        value = hsbToHsl(this.values as HsbColor)
        break
      case 'lab':
        value = labToHsl(this.values as LabColor)
        break
      default:
        value = this.values as HslColor
    }

    this._push<'hsl'>(value, 'hsl', this.alpha)

    return this as Magicolor<'hsl'>
  }

  toHsb(): Magicolor<'hsb'> {
    let value
    switch (this.type) {
      case 'keyword':
      case 'hex':
        value = hexToHsb(this.values as HexColor)
        break
      case 'rgb':
        value = rgbToHsb(this.values as RgbColor)
        break
      case 'hsl':
        value = hslToHsb(this.values as HslColor)
        break
      case 'lab':
        value = labToHsb(this.values as LabColor)
        break
      default:
        value = this.values as HsbColor
    }

    this._push<'hsb'>(value, 'hsb', this.alpha)

    return this as Magicolor<'hsb'>
  }

  toLab(): Magicolor<'lab'> {
    let value
    switch (this.type) {
      case 'keyword':
      case 'hex':
        value = hexToLab(this.values as HexColor)
        break
      case 'rgb':
        value = rgbToLab(this.values as RgbColor)
        break
      case 'hsl':
        value = hslToLab(this.values as HslColor)
        break
      case 'hsb':
        value = hsbToLab(this.values as HsbColor)
        break
      default:
        value = this.values as LabColor
    }

    this._push<'lab'>(value, 'lab', this.alpha)

    return this as Magicolor<'lab'>
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
      case 'lab':
        return this.toLab()
      default:
        throw new Error('Invalid color type.')
    }
  }

  hex(): string {
    return this.value('hex')
  }

  rgb(round = true): RgbColor {
    return this.value('rgb', round)
  }

  hsl(round = true): HslColor {
    return this.value('hsl', round)
  }

  hsb(round = true): HsbColor {
    return this.value('hsb', round)
  }

  lab(round = true): LabColor {
    return this.value('lab', round)
  }

  value<K extends ColorType = T>(type: K = this.type as unknown as K, round = true): Colors[K] {
    const mc = this.clone().to(type)
    return (Array.isArray(mc.values) && round ? mc.values.map(Math.round) : mc.values) as Colors[K]
  }

  css(): string
  css(typeOrWithAlpha: ColorType): string
  css(typeOrWithAlpha: ColorType, withAlpha: boolean): string
  css(typeOrWithAlpha: ColorType, withAlpha: boolean, round: boolean): string
  css(typeOrWithAlpha: boolean): string
  css(typeOrWithAlpha: boolean, round: boolean): string
  css(...args: any[]) {
    if (args.length === 0)
      return this.toString()
    const [typeOrWithAlpha, withAlphaOrRound, round] = args
    if (typeof typeOrWithAlpha === 'boolean') {
      return this.toString(typeOrWithAlpha, withAlphaOrRound ?? true)
    }
    else {
      return this.clone().to(typeOrWithAlpha).toString(withAlphaOrRound ?? false, round ?? true)
    }
  }

  private _push<T extends ColorType = any>(value: Colors[T], type: ColorType, alpha: Opacity) {
    this._stack.push(new Magicolor(value, type, alpha))
    // @ts-expect-error - value is not assignable to type Colors[T]
    this.values = value
    // @ts-expect-error - type is not assignable to type T
    this.type = type
  }

  get history(): Magicolor<any>[] {
    return this._stack
  }

  get last(): Magicolor<any> {
    return this._stack[this._stack.length - 1]
  }

  get first(): Magicolor<any> {
    return this._stack[0]
  }

  revert(deep = 1) {
    if (deep > this._stack.length)
      throw new Error('Invalid deep.')

    const mc = this._stack[this._stack.length - deep - 1]
    this.type = mc.type
    this.values = mc.values
    this.alpha = mc.alpha
    this._stack = this._stack.slice(0, this._stack.length - deep)
  }

  clear() {
    this._stack = []
  }

  clone(): Magicolor<T> {
    const mc = new Magicolor(this.values, this.type, this.alpha)
    mc._stack = this._stack.slice()
    mc.cloned = true
    return mc
  }

  set<T extends ColorType>(operate: string, value: unknown) {
    const [type, channel] = operate.split('.') as [ColorType?, string?]
    if (!type || !SupportTypes.includes(type)) {
      throw new Error('Invalid operate type.')
    }
    if (!channel) {
      throw new Error('Invalid channel.')
    }

    const typeValue = this.value(type, false)

    if (Array.isArray(typeValue)) {
      const index = type.indexOf(channel)
      if (index === -1) {
        throw new Error('Invalid channel.')
      }

      if (typeof value === 'string' && /^[+\-*/]/.test(value)) {
        const operator = value[0]
        const operand = Number.parseFloat(value.slice(1))
        switch (operator) {
          case '+':
            typeValue[index] += operand
            break
          case '-':
            typeValue[index] -= operand
            break
          case '*':
            typeValue[index] *= operand
            break
          case '/':
            typeValue[index] /= operand
            break
          default:
            throw new Error('Invalid operator.')
        }
      }
      else {
        typeValue[index] = value as any
      }
    }
    else {
      throw new TypeError('Invalid operate type.')
    }

    // @ts-expect-error - type is not assignable to type T
    this.type = type as T
    // @ts-expect-error - value is not assignable to type Colors[T]
    this.values = typeValue as Colors[T]

    return this
  }

  get(operate: string): number {
    const [type, channel] = operate.split('.') as [ColorType?, string?]
    if (!type || !SupportTypes.includes(type)) {
      throw new Error('Invalid operate type.')
    }
    if (!channel) {
      throw new Error('Invalid channel.')
    }

    const typeValue = this.value(type, false)

    if (Array.isArray(typeValue)) {
      const index = type.indexOf(channel)
      if (index === -1) {
        throw new Error('Invalid channel.')
      }
      return typeValue[index]
    }
    else {
      throw new TypeError('Invalid operate type.')
    }
  }
}
