import type { ColorType } from 'magic-color'
import { Magicolor } from 'magic-color'
import { describe, expect, it } from 'vitest'

describe('utils scoped', () => {
  const hex = '#d15b14'
  const rgbValue = [209, 91, 20]
  const rgb = `rgb(${rgbValue.join(' ')})`

  const hslValue = [22, 82, 45]
  const hsl = `hsl(${hslValue.map((v, i) => i === 0 ? v : `${v}%`).join(', ')})`

  const hsbValue = [22, 90, 82]
  const hsb = `hsb(${hsbValue.map((v, i) => i === 0 ? v : `${v}%`).join(', ')})`

  // 是否在误差允许范围内
  function isClose(a: number, b: number, tolerance = 1) {
    return Math.abs(a - b) <= tolerance
  }

  function testClose<T extends Omit<ColorType, 'hex'>>(valueString: string, type: T, compareValue: number[]) {
    const color = new Magicolor(valueString)
    const value = color.to(type as any).value() as any
    return value.every((v: number, i: number) => isClose(v, compareValue[i]))
  }

  it('basic convert', () => {
    // rgb to others test case
    expect(new Magicolor(rgb).hex()).toEqual(hex)
    expect(testClose(rgb, 'hsb', hsbValue)).toEqual(true)
    expect(testClose(rgb, 'hsl', hslValue)).toEqual(true)

    // hex to others test case
    expect(new Magicolor(hex).css('rgb')).toEqual(rgb)
    expect(testClose(hex, 'hsb', hsbValue)).toEqual(true)
    expect(testClose(hex, 'hsl', hslValue)).toEqual(true)

    // hsl to others test case
    expect(testClose(hsl, 'rgb', rgbValue)).toEqual(true)
    expect(testClose(hsl, 'hsb', hsbValue)).toEqual(true)
    // TODO: Allow the output string for a tolerance of 1 when converting to hex
    // expect(mc(hsl).toHex().toString()).toEqual(hex)

    // hsb to others test case
    expect(testClose(hsb, 'rgb', rgbValue)).toEqual(true)
    expect(testClose(hsb, 'hsl', hslValue)).toEqual(true)
    // TODO: Allow the output string for a tolerance of 1 when converting to hex
    // expect(mc(hsb).toHex().toString()).toEqual(hex)

    const c = '#0894B2'
    const mc = new Magicolor(c)

    expect(mc.css('hsb')).toMatchInlineSnapshot(`"hsb(191, 96%, 70%)"`)

    expect(mc.css('lab')).toMatchInlineSnapshot(`"lab(57 -22 -25)"`)
  })

  it('color with opacity', () => {
    const opacity = 0.6789
    const c = `rgba(100, 100, 100, ${opacity})`
    const mcColor = new Magicolor(c)

    expect(mcColor.rgb(true)).toMatchInlineSnapshot(`
      [
        100,
        100,
        100,
      ]
    `)
    expect(mcColor.hex()).toMatchInlineSnapshot(`"#646464"`)
    expect(mcColor.hsl(true)).toMatchInlineSnapshot(`
      [
        0,
        0,
        39,
      ]
    `)
    expect(mcColor.hsl(true)).toMatchInlineSnapshot(`
      [
        0,
        0,
        39,
      ]
    `)
    expect(mcColor.hsb(true)).toMatchInlineSnapshot(`
      [
        0,
        0,
        39,
      ]
    `)
  })

  it('magicColor history', () => {
    const hexString = '#808080'
    const color = new Magicolor(hexString, 'hex', 1)

    expect(color.history).toEqual([])

    color.toHsb()
    color.toRgb()

    expect(color.history.length).toBe(2)

    color.clear()

    expect(color.history.length).toBe(0)

    color.toHex()
    color.toRgb()
    color.toHsl()
    color.toHsb()

    color.revert()

    expect(color.type).toEqual('hsl')
    expect(color.history.length).toMatchInlineSnapshot(`3`)

    color.revert(2)

    expect(color.type).toEqual('hex')
    expect(color.history.length).toMatchInlineSnapshot(`1`)
  })

  it('darken and lighten', () => {
    const mc = new Magicolor(hex) // #d15b14

    expect(mc.darken(0.1).hex()).toMatchInlineSnapshot(`"#cb570c"`)
    expect(mc.darken(0.2).hex()).toMatchInlineSnapshot(`"#c55205"`)
    expect(mc.darken(0.3).hex()).toMatchInlineSnapshot(`"#bf4d00"`)
    expect(mc.darken(0.4).hex()).toMatchInlineSnapshot(`"#ba4900"`)
    expect(mc.darken(0.5).hex()).toMatchInlineSnapshot(`"#b44400"`)
    expect(mc.darken(0.6).hex()).toMatchInlineSnapshot(`"#af3f00"`)
    expect(mc.darken(0.7).hex()).toMatchInlineSnapshot(`"#a93b00"`)
    expect(mc.darken(0.8).hex()).toMatchInlineSnapshot(`"#a33600"`)
    expect(mc.darken(0.9).hex()).toMatchInlineSnapshot(`"#9e3100"`)
    expect(mc.darken().hex()).toMatchInlineSnapshot(`"#982c00"`)
    expect(mc.darken().darken().hex()).toMatchInlineSnapshot(`"#640000"`)
    expect(mc.darken().darken().darken().hex()).toMatchInlineSnapshot(`"#3b0000"`)

    expect(mc.lighten(0.1).hex()).toMatchInlineSnapshot(`"#d66018"`)
    expect(mc.lighten(0.2).hex()).toMatchInlineSnapshot(`"#dc651e"`)
    expect(mc.lighten(0.3).hex()).toMatchInlineSnapshot(`"#e16923"`)
    expect(mc.lighten(0.4).hex()).toMatchInlineSnapshot(`"#e76e27"`)
    expect(mc.lighten(0.5).hex()).toMatchInlineSnapshot(`"#ed732c"`)
    expect(mc.lighten(0.6).hex()).toMatchInlineSnapshot(`"#f37831"`)
    expect(mc.lighten(0.7).hex()).toMatchInlineSnapshot(`"#f87c36"`)
    expect(mc.lighten(0.8).hex()).toMatchInlineSnapshot(`"#fe813a"`)
    expect(mc.lighten(0.9).hex()).toMatchInlineSnapshot(`"#ff863f"`)
    expect(mc.lighten().hex()).toMatchInlineSnapshot(`"#ff8b43"`)
    expect(mc.lighten().lighten().hex()).toMatchInlineSnapshot(`"#ffbd73"`)
    expect(mc.lighten().lighten().lighten().hex()).toMatchInlineSnapshot(`"#ffefa3"`)
  })

  it('get and set methods', () => {
    const color = new Magicolor('#ff6600')

    // Test get method for different color types
    expect(color.get('rgb.r')).toBe(255)
    expect(color.get('rgb.g')).toBe(102)
    expect(color.get('rgb.b')).toBe(0)

    expect(color.get('hsl.h')).toBeCloseTo(24, 0)
    expect(color.get('hsl.s')).toBeCloseTo(100, 0)
    expect(color.get('hsl.l')).toBeCloseTo(50, 0)

    expect(color.get('hsb.h')).toBeCloseTo(24, 0)
    expect(color.get('hsb.s')).toBeCloseTo(100, 0)
    expect(color.get('hsb.b')).toBeCloseTo(100, 0)

    // Test set method with direct value
    const color2 = new Magicolor('#ff6600')
    color2.set('rgb.r', 128)
    expect(color2.get('rgb.r')).toBe(128)
    expect(color2.rgb()).toEqual([128, 102, 0])

    // Test set method with operators
    const color3 = new Magicolor('#ff6600')
    color3.set('rgb.r', '+50')
    expect(color3.get('rgb.r')).toBe(305) // 255 + 50

    const color4 = new Magicolor('#ff6600')
    color4.set('rgb.g', '-20')
    expect(color4.get('rgb.g')).toBe(82) // 102 - 20

    const color5 = new Magicolor('#ff6600')
    color5.set('rgb.b', '*2')
    expect(color5.get('rgb.b')).toBe(0) // 0 * 2

    const color6 = new Magicolor('#808080')
    color6.set('rgb.r', '/2')
    expect(color6.get('rgb.r')).toBe(64) // 128 / 2

    // Test chaining
    const color7 = new Magicolor('#ff6600')
    color7.set('rgb.r', 200).set('rgb.g', 100).set('rgb.b', 50)
    expect(color7.rgb()).toEqual([200, 100, 50])

    // Test set with HSL
    const color8 = new Magicolor('#ff6600')
    color8.set('hsl.h', 180)
    expect(color8.get('hsl.h')).toBeCloseTo(180, 0)

    // Test set with LAB
    const color9 = new Magicolor('#ff6600')
    color9.set('lab.l', 70)
    expect(color9.get('lab.l')).toBeCloseTo(70, 0)
  })

  it('get and set error handling', () => {
    const color = new Magicolor('#ff6600')

    // Test invalid type
    expect(() => color.get('invalid.r')).toThrow('Invalid operate type')

    // Test invalid channel
    expect(() => color.get('rgb.x')).toThrow('Invalid channel: x for type rgb')

    // Test missing channel
    expect(() => color.get('rgb')).toThrow('Invalid channel')

    // Test set with invalid type
    expect(() => color.set('invalid.r', 100)).toThrow('Invalid operate type')

    // Test set with invalid channel
    expect(() => color.set('rgb.x', 100)).toThrow('Invalid channel: x for type rgb')

    // Test set with invalid value type
    expect(() => color.set('rgb.r', {} as any)).toThrow('Invalid value type')

    // Test set with invalid operator (string that doesn't match operator pattern)
    expect(() => color.set('rgb.r', 'invalid')).toThrow('Invalid value type')

    // Test set with invalid operand
    expect(() => color.set('rgb.r', '+abc')).toThrow('Invalid operand value')

    // Test division by zero
    expect(() => color.set('rgb.r', '/0')).toThrow('Division by zero')

    // Test set on hex type (non-array)
    expect(() => color.set('hex.r', 100)).toThrow('Cannot set value on non-array type')

    // Test get on hex type (non-array)
    expect(() => color.get('hex.r')).toThrow('Cannot get value from non-array type')
  })

  it('revert error handling', () => {
    const color = new Magicolor('#ff6600')
    color.toRgb()
    color.toHsl()

    // Test invalid deep (< 1)
    expect(() => color.revert(0)).toThrow('Deep must be at least 1')

    // Test invalid deep (> stack length)
    expect(() => color.revert(10)).toThrow('Cannot revert 10 steps. Only 2 steps in history')

    // Test valid revert returns this
    expect(color.revert(1)).toBe(color)
  })
})
