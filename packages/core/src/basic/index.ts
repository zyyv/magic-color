import type { Colors, ColorType, HsbColor, HslColor, LabColor, Opacity, RgbColor } from '@magic-color/transformer'
import type { ColorObject } from '../types'
import {
  hexToHsb,
  hexToHsl,
  hexToLab,
  hexToLch,
  hexToRgb,

  hsbToHex,
  hsbToHsl,
  hsbToLab,
  hsbToLch,
  hsbToRgb,

  hslToHex,
  hslToHsb,
  hslToLab,
  hslToLch,
  hslToRgb,

  labToHex,
  labToHsb,
  labToHsl,
  labToLch,
  labToRgb,

  lchToHex,
  lchToHsb,
  lchToHsl,
  lchToLab,
  lchToRgb,

  rgbToHex,
  rgbToHsb,
  rgbToHsl,
  rgbToLab,
  rgbToLch,

  SupportTypes,
} from '@magic-color/transformer'
import { alphaToString, resolveArgs } from './utils'

export { guessType } from './utils'

// 颜色转换映射表
type ConversionFunction = (color: any) => any

const CONVERSION_MAP: Record<string, Partial<Record<ColorType, ConversionFunction>>> = {
  hex: {
    rgb: hexToRgb,
    hsl: hexToHsl,
    hsb: hexToHsb,
    lab: hexToLab,
    lch: hexToLch,
  },
  keyword: {
    rgb: hexToRgb,
    hsl: hexToHsl,
    hsb: hexToHsb,
    lab: hexToLab,
    lch: hexToLch,
  },
  rgb: {
    hex: rgbToHex,
    hsl: rgbToHsl,
    hsb: rgbToHsb,
    lab: rgbToLab,
    lch: rgbToLch,
  },
  hsl: {
    hex: hslToHex,
    rgb: hslToRgb,
    hsb: hslToHsb,
    lab: hslToLab,
    lch: hslToLch,
  },
  hsb: {
    hex: hsbToHex,
    rgb: hsbToRgb,
    hsl: hsbToHsl,
    lab: hsbToLab,
    lch: hsbToLch,
  },
  lab: {
    hex: labToHex,
    rgb: labToRgb,
    hsl: labToHsl,
    hsb: labToHsb,
    lch: labToLch,
  },
  lch: {
    hex: lchToHex,
    rgb: lchToRgb,
    hsl: lchToHsl,
    hsb: lchToHsb,
    lab: lchToLab,
  },
}

// 颜色通道映射表
const CHANNEL_MAP: Record<string, readonly string[]> = {
  rgb: ['r', 'g', 'b'],
  hsl: ['h', 's', 'l'],
  hsb: ['h', 's', 'b'],
  lab: ['l', 'a', 'b'],
  lch: ['l', 'c', 'h'],
} as const

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
    const type = this.type
    const values = this.values

    // 处理 hex 和 keyword 类型
    if (type === 'hex' || type === 'keyword') {
      return values + (withAlpha ? alphaToString(this.alpha, true) : '')
    }

    // 处理数组类型的颜色值
    if (Array.isArray(values)) {
      const processedValues = (round ? values.map(Math.round) : values) as number[]

      switch (type) {
        case 'rgb':
        case 'hsl':
          return `${type}(${processedValues.join(' ')}${withAlpha ? ` / ${this.alpha}` : ''})`

        case 'hsb': {
          const formattedValues = (processedValues as number[]).map((c, i) => i > 0 ? `${c}%` : c).join(', ')
          return `${type}${withAlpha ? 'a' : ''}(${formattedValues}${withAlpha ? `, ${this.alpha}` : ''})`
        }

        case 'lab':
        case 'lch':
          return `${type}(${processedValues.join(' ')}${withAlpha ? ` / ${alphaToString(this.alpha)}` : ''})`

        default:
          throw new Error('Invalid color type.')
      }
    }

    throw new Error('Invalid color type.')
  }

  darken(amount = 1): Magicolor<T> {
    const lab = this.lab()
    lab[0] = Math.max(0, lab[0] - 18 * amount)
    return new Magicolor(lab, 'lab', this.alpha).to(this.type) as Magicolor<T>
  }

  lighten(amount = 1): Magicolor<T> {
    const lab = this.lab()
    lab[0] = Math.min(100, lab[0] + 18 * amount)
    return new Magicolor(lab, 'lab', this.alpha).to(this.type) as Magicolor<T>
  }

  /**
   * 统一的颜色转换方法
   * @param targetType 目标颜色类型
   * @returns 转换后的颜色值
   */
  private convert<K extends ColorType>(targetType: K): Colors[K] {
    if (this.type === targetType as any) {
      return this.values as Colors[K]
    }

    const sourceType = this.type === 'keyword' ? 'hex' : this.type
    const converters = CONVERSION_MAP[sourceType]

    if (!converters) {
      throw new Error(`Unsupported source type: ${sourceType}`)
    }

    const converter = converters[targetType]
    if (!converter) {
      throw new Error(`Cannot convert from ${this.type} to ${targetType}`)
    }

    return converter(this.values) as Colors[K]
  }

  toRgb(): Magicolor<'rgb'> {
    const value = this.convert('rgb')
    this._push('rgb', value, this.alpha)
    return this as Magicolor<'rgb'>
  }

  toHex(): Magicolor<'hex'> {
    const value = this.convert('hex')
    this._push('hex', value, this.alpha)
    return this as Magicolor<'hex'>
  }

  toHsl(): Magicolor<'hsl'> {
    const value = this.convert('hsl')
    this._push('hsl', value, this.alpha)
    return this as Magicolor<'hsl'>
  }

  toHsb(): Magicolor<'hsb'> {
    const value = this.convert('hsb')
    this._push('hsb', value, this.alpha)
    return this as Magicolor<'hsb'>
  }

  toLab(): Magicolor<'lab'> {
    const value = this.convert('lab')
    this._push('lab', value, this.alpha)
    return this as Magicolor<'lab'>
  }

  toLch(): Magicolor<'lch'> {
    const value = this.convert('lch')
    this._push('lch', value, this.alpha)
    return this as Magicolor<'lch'>
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
      case 'lch':
        return this.toLch()
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

  private _push<K extends ColorType>(type: K, value: Colors[K], alpha: Opacity) {
    this._stack.push(new Magicolor(value, type, alpha))
    this.values = value as any
    this.type = type as any
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
    if (deep < 1) {
      throw new Error('Deep must be at least 1.')
    }
    if (deep > this._stack.length) {
      throw new Error(`Cannot revert ${deep} steps. Only ${this._stack.length} steps in history.`)
    }

    const mc = this._stack[this._stack.length - deep - 1]
    this.type = mc.type
    this.values = mc.values
    this.alpha = mc.alpha
    this._stack = this._stack.slice(0, this._stack.length - deep)

    return this
  }

  clear() {
    this._stack = []
  }

  clone(): Magicolor<T> {
    const mc = new Magicolor(this.values, this.type, this.alpha)
    // 只在需要时复制历史记录，避免不必要的性能开销
    if (this._stack.length > 0) {
      mc._stack = this._stack.slice()
    }
    mc.cloned = true
    return mc
  }

  set(operate: string, value: unknown) {
    const [type, channel] = operate.split('.') as [ColorType?, string?]
    if (!type || !SupportTypes.includes(type as any)) {
      throw new Error(`Invalid operate type: ${type}`)
    }
    if (!channel) {
      throw new Error('Invalid channel.')
    }

    const typeValue = this.value(type, false)

    if (!Array.isArray(typeValue)) {
      throw new TypeError(`Cannot set value on non-array type: ${type}`)
    }

    const channels = CHANNEL_MAP[type]
    if (!channels) {
      throw new Error(`Unknown color type: ${type}`)
    }

    const index = channels.indexOf(channel)
    if (index === -1) {
      throw new Error(`Invalid channel: ${channel} for type ${type}. Valid channels: ${channels.join(', ')}`)
    }

    // 处理操作符
    if (typeof value === 'string' && /^[+\-*/]/.test(value)) {
      const operator = value[0]
      const operand = Number.parseFloat(value.slice(1))

      if (Number.isNaN(operand)) {
        throw new TypeError(`Invalid operand value: ${value.slice(1)}`)
      }

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
          if (operand === 0) {
            throw new Error('Division by zero.')
          }
          typeValue[index] /= operand
          break
        default:
          throw new Error(`Invalid operator: ${operator}`)
      }
    }
    else if (typeof value === 'number') {
      typeValue[index] = value
    }
    else {
      throw new TypeError(`Invalid value type: expected number or operator string, got ${typeof value}`)
    }

    this.type = type as any
    this.values = typeValue as any

    return this
  }

  get(operate: string): number {
    const [type, channel] = operate.split('.') as [ColorType?, string?]
    if (!type || !SupportTypes.includes(type as any)) {
      throw new Error(`Invalid operate type: ${type}`)
    }
    if (!channel) {
      throw new Error('Invalid channel.')
    }

    const typeValue = this.value(type, false)

    if (!Array.isArray(typeValue)) {
      throw new TypeError(`Cannot get value from non-array type: ${type}`)
    }

    const channels = CHANNEL_MAP[type]
    if (!channels) {
      throw new Error(`Unknown color type: ${type}`)
    }

    const index = channels.indexOf(channel)
    if (index === -1) {
      throw new Error(`Invalid channel: ${channel} for type ${type}. Valid channels: ${channels.join(', ')}`)
    }

    return typeValue[index]
  }
}
