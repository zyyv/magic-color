import type { ColorType, Colors, HexColor, HsbColor, HslColor, LabColor, Opacity, RgbColor } from '@magic-color/core'
import { hexToHsb, hexToHsl, hexToLab, hexToRgb, hsbToHex, hsbToHsl, hsbToLab, hsbToRgb, hslToHex, hslToHsb, hslToLab, hslToRgb, labToHex, labToHsb, labToHsl, labToRgb, rgbToHex, rgbToHsb, rgbToHsl, rgbToLab } from '@magic-color/core'
import { getColorName, theme } from '../theme'

import { hash } from '../hash'
import { calcAPCA, calcWCAG, getReadableTextColor, isWarmColor, reverseAPCA } from '../contrast'
import { random } from '../utils'
import { SupportTypes, alphaToString, resolveArgs, valid } from './utils'
import type { ColorObject } from './types'

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

  get name() {
    return getColorName(this.css('hex'))
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

  // TODO
  set(operate: string, value: unknown) {
    const [type, channel] = operate.split('.')
    if (!type || !SupportTypes.includes(type)) {
      throw new Error('Invalid operate type.')
    }
    // TODO
    if (!channel) {
      const oldValueType = typeof this.values
      const newValueType = typeof value
      if (oldValueType !== newValueType) {
        throw new Error('Invalid value type.')
      }
      if (Array.isArray(this.values) && Array.isArray(value) && this.values.length !== value.length) {
        throw new Error('Invalid value length.')
      }
    }
  }
}

export interface MagicolorInstance {
  <T extends ColorType>(value: Colors[T] | Record<string, number>, type?: T, alpha?: Opacity): Magicolor<T>
  <T extends ColorType = 'rgb'>(v1: number, v2: number, v3: number, type?: T, alpha?: Opacity): Magicolor<T>
  valid: typeof valid
  random: typeof random
  hash: typeof hash
  theme: typeof theme
  getColorName: typeof getColorName
  wcag: typeof calcWCAG
  apca: typeof calcAPCA
  apcaReverse: typeof reverseAPCA
  readable: typeof getReadableTextColor
  warm: typeof isWarmColor
}

export const mc: MagicolorInstance = <T extends ColorType>(...args: any[]): Magicolor<T> => {
  // @ts-expect-error allow the type to be inferred
  return new Magicolor(...args) as Magicolor<T>
}

mc.valid = valid
mc.random = random
mc.hash = hash
mc.theme = theme
mc.getColorName = getColorName
mc.wcag = calcWCAG
mc.apca = calcAPCA
mc.apcaReverse = reverseAPCA
mc.readable = getReadableTextColor
mc.warm = isWarmColor
