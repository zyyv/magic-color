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
})
