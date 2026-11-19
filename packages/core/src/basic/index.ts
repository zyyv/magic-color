import type { Colors, ColorType, ColorValue, HsbColor, HslColor, LabColor, LchColor, Opacity, RgbColor } from '@magic-color/transformer'
import type { ColorObject } from '../types'
import { SupportTypes } from '@magic-color/transformer'
import { CHANNEL_MAP, CONVERSION_MAP } from './map'
import { alphaToString, resolveArgs } from './utils'

export { guessType } from './utils'

const DECIMAL_RE = /^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i

export class Magicolor<T extends ColorType> implements ColorObject<ColorType> {
  type: ColorObject<ColorType>['type']
  values: ColorValue

  cloned = false

  private _stack: Magicolor<any>[] = []
  private _origin?: Magicolor<any>
  private _alpha = 1

  constructor(value: Colors[T] | Record<string, number>, type?: T | ColorObject<T>['type'], alpha?: Opacity)
  constructor(v1: number, v2: number, v3: number, typeOrAlpha?: T | Opacity, alpha?: Opacity)
  constructor(...args: any[]) {
    const result = resolveArgs<T>(...args)
    if (result) {
      const [input, type, alpha] = result
      if (!SupportTypes.includes(type)) {
        throw new TypeError(`Invalid color type: ${type}.`)
      }
      const values = Array.isArray(input) ? [...input] as [number, number, number] : input
      if (Array.isArray(values) && (values.length !== 3 || !values.every(Number.isFinite))) {
        throw new TypeError('Color channels must be three finite numbers.')
      }
      if ((type === 'hex') !== (typeof values === 'string')) {
        throw new TypeError(`Invalid value for color type: ${type}.`)
      }
      this.values = values
      this.type = type
      this.alpha = alpha
    }
    else {
      throw new TypeError('Invalid color type.')
    }
  }

  get alpha(): Opacity {
    return this._alpha
  }

  set alpha(value: Opacity) {
    if (!Number.isFinite(value) || value < 0 || value > 1) {
      throw new RangeError('Alpha must be a finite number between 0 and 1.')
    }
    this._alpha = value
  }

  private toString(withAlpha = false, round = true, type: ColorType = this.type, values: Colors[ColorType] = this.values): string {
    if (type === 'hex' || type === 'keyword') {
      return values + (withAlpha ? alphaToString(this.alpha, true) : '')
    }

    // 处理数组类型的颜色值
    if (Array.isArray(values)) {
      switch (type) {
        case 'rgb':
        case 'hsl': {
          const processedValues = (round ? (values as number[]).map(Math.round) : values) as number[]
          return `${type}(${processedValues.join(' ')}${withAlpha ? ` / ${this.alpha}` : ''})`
        }

        case 'hsb': {
          const processedValues = (round ? (values as number[]).map(Math.round) : values) as number[]
          const formattedValues = (processedValues as number[]).map((c, i) => i > 0 ? `${c}%` : c).join(', ')
          return `${type}${withAlpha ? 'a' : ''}(${formattedValues}${withAlpha ? `, ${this.alpha}` : ''})`
        }

        case 'lab':
        case 'lch':
        case 'oklab':
        case 'oklch': {
          const v = values as number[]
          const format = (n: number) => round ? Math.round(n * 1000) / 1000 : n
          const isOk = type.startsWith('ok')
          const L = isOk ? `${format(v[0])}%` : format(v[0])
          const A = format(v[1])
          const B = format(v[2])
          const alpha = round ? alphaToString(this.alpha) : this.alpha
          return `${type}(${L} ${A} ${B}${withAlpha ? ` / ${alpha}` : ''})`
        }

        default:
          throw new Error('Invalid color type.')
      }
    }

    throw new Error('Invalid color type.')
  }

  darken(amount = 1): Magicolor<T> {
    return this.shiftLightness(-18 * amount)
  }

  lighten(amount = 1): Magicolor<T> {
    return this.shiftLightness(18 * amount)
  }

  private shiftLightness(offset: number): Magicolor<T> {
    if (offset === 0)
      return this.clone()

    const [l, a, b] = this.convert('lab')
    const lightness = Math.min(100, Math.max(0, l + offset))
    return new Magicolor([lightness, a, b], 'lab', this.alpha).to(this.type) as Magicolor<T>
  }

  /**
   * 统一的颜色转换方法
   * @param targetType 目标颜色类型
   * @returns 转换后的颜色值
   */
  private convert<K extends ColorType>(targetType: K): Colors[K] {
    const target = targetType === 'keyword' ? 'hex' : targetType as ColorObject<ColorType>['type']
    if (!SupportTypes.includes(target)) {
      throw new TypeError(`Invalid target color type: ${targetType}.`)
    }
    if (this.type === target) {
      return this.values as Colors[K]
    }

    const sourceType = this.type
    const converters = CONVERSION_MAP[sourceType]

    if (!converters) {
      throw new Error(`Unsupported source type: ${sourceType}`)
    }

    const converter = converters[target]
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

  toOklab(): Magicolor<'oklab'> {
    const value = this.convert('oklab')
    this._push('oklab', value, this.alpha)
    return this as Magicolor<'oklab'>
  }

  toOklch(): Magicolor<'oklch'> {
    const value = this.convert('oklch')
    this._push('oklch', value, this.alpha)
    return this as Magicolor<'oklch'>
  }

  to(type: ColorType) {
    switch (type) {
      case 'rgb':
        return this.toRgb()
      case 'hex':
      case 'keyword':
        return this.toHex()
      case 'hsl':
        return this.toHsl()
      case 'hsb':
        return this.toHsb()
      case 'lab':
        return this.toLab()
      case 'lch':
        return this.toLch()
      case 'oklab':
        return this.toOklab()
      case 'oklch':
        return this.toOklch()
      default:
        throw new TypeError(`Invalid target color type: ${type}.`)
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

  lch(round = true): LchColor {
    return this.value('lch', round)
  }

  oklab(round = true): LabColor {
    return this.value('oklab', round)
  }

  oklch(round = true): LchColor {
    return this.value('oklch', round)
  }

  value(type?: undefined, round?: boolean): ColorValue
  value<K extends ColorType>(type: K, round?: boolean): Colors[K]
  value(type: ColorType = this.type, round = true): ColorValue {
    const values = this.convert(type)
    if (!Array.isArray(values))
      return values

    if (!round)
      return [...values]

    const precision = type === 'oklab' || type === 'oklch' ? 1e6 : 1
    return values.map(value => Math.round(value * precision) / precision) as [number, number, number]
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
      return this.toString(withAlphaOrRound ?? false, round ?? true, typeOrWithAlpha, this.convert(typeOrWithAlpha))
    }
  }

  private _push<K extends Exclude<ColorType, 'keyword'>>(type: K, value: Colors[K], alpha: Opacity) {
    if (this._stack.length === 0)
      this._origin = new Magicolor(this.values, this.type, this.alpha)
    this._stack.push(new Magicolor(value, type, alpha))
    this.values = value
    this.type = type
  }

  get history(): Magicolor<any>[] {
    return this._stack.map(color => color.clone())
  }

  get last(): Magicolor<any> | undefined {
    return this._stack[this._stack.length - 1]?.clone()
  }

  get first(): Magicolor<any> | undefined {
    return this._stack[0]?.clone()
  }

  revert(deep = 1) {
    if (!Number.isInteger(deep) || deep < 1) {
      throw new RangeError('Deep must be at least 1 and an integer.')
    }
    if (deep > this._stack.length) {
      throw new RangeError(`Cannot revert ${deep} steps. Only ${this._stack.length} steps in history.`)
    }

    const mc = deep === this._stack.length ? this._origin! : this._stack[this._stack.length - deep - 1]
    this.type = mc.type
    this.values = Array.isArray(mc.values) ? [...mc.values] : mc.values
    this.alpha = mc.alpha
    this._stack = this._stack.slice(0, this._stack.length - deep)
    if (this._stack.length === 0)
      this._origin = undefined

    return this
  }

  clear() {
    this._stack = []
    this._origin = undefined
  }

  clone(): Magicolor<T> {
    const mc = new Magicolor(this.values, this.type, this.alpha)
    // History entries stay internal. Public reads and reverts copy their values.
    if (this._stack.length > 0) {
      mc._stack = this._stack.slice()
      mc._origin = this._origin
    }
    mc.cloned = true
    return mc
  }

  /**
   * 解析 `type.channel` 操作字符串，定位到对应的通道
   * @param operate 形如 `rgb.r`、`hsl.h` 的操作字符串
   * @param action  当前操作（用于在非数组类型上抛出更友好的错误信息）
   */
  private resolveChannel(operate: string, action: 'get' | 'set') {
    const [type, channel] = operate.split('.') as [ColorType?, string?]
    if (!type || !SupportTypes.includes(type as any)) {
      throw new TypeError(`Invalid operate type: ${type}`)
    }
    if (!channel) {
      throw new TypeError('Invalid channel.')
    }

    const values = this.value(type, false)
    if (!Array.isArray(values)) {
      throw new TypeError(`Cannot ${action} value ${action === 'get' ? 'from' : 'on'} non-array type: ${type}`)
    }

    const channels = CHANNEL_MAP[type]
    if (!channels) {
      throw new Error(`Unknown color type: ${type}`)
    }

    const index = channels.indexOf(channel)
    if (index === -1) {
      throw new TypeError(`Invalid channel: ${channel} for type ${type}. Valid channels: ${channels.join(', ')}`)
    }

    return { type, values, index }
  }

  /**
   * 计算通道的新值：支持直接赋值（number）与操作符表达式（如 `+50`、`/2`）
   */
  private resolveValue(current: number, value: unknown): number {
    if (typeof value === 'number') {
      if (!Number.isFinite(value))
        throw new TypeError('Value must be a finite number.')
      return value
    }

    if (typeof value === 'string') {
      const input = value.trim()
      // 操作符表达式，如 `+50`、`-20`、`*2`、`/2`
      if (/^[+\-*/]/.test(input)) {
        const operator = input[0]
        const operandText = input.slice(1)
        if (!DECIMAL_RE.test(operandText) || !Number.isFinite(Number(operandText))) {
          throw new TypeError(`Invalid operand value: ${operandText}`)
        }
        const operand = Number(operandText)

        let result: number
        switch (operator) {
          case '+': result = current + operand
            break
          case '-': result = current - operand
            break
          case '*': result = current * operand
            break
          case '/':
            if (operand === 0) {
              throw new RangeError('Division by zero.')
            }
            result = current / operand
            break
          default:
            throw new TypeError(`Invalid operator: ${operator}`)
        }
        if (!Number.isFinite(result))
          throw new RangeError('Result must be a finite number.')
        return result
      }

      // 纯数字字符串，直接作为绝对值
      if (DECIMAL_RE.test(input) && Number.isFinite(Number(input)))
        return Number(input)
    }

    throw new TypeError(`Invalid value type: expected number or operator string, got ${typeof value}`)
  }

  set(operate: string, value: unknown) {
    const { type, values, index } = this.resolveChannel(operate, 'set')

    values[index] = this.resolveValue(values[index], value)

    this.type = type as any
    this.values = values as any

    return this
  }

  get(operate: string): number {
    const { values, index } = this.resolveChannel(operate, 'get')
    return values[index]
  }
}
