import { describe, expect, it } from 'vitest'
import type { ColorType } from 'magic-color'
import { MagicColor } from 'magic-color'

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
    const color = new MagicColor(valueString)
    const value = color.to(type as any).value() as any
    return value.every((v: number, i: number) => isClose(v, compareValue[i]))
  }

  it('basic convert', () => {
    // rgb to others test case
    expect(new MagicColor(rgb).hex()).toEqual(hex)
    expect(testClose(rgb, 'hsb', hsbValue)).toEqual(true)
    expect(testClose(rgb, 'hsl', hslValue)).toEqual(true)

    // hex to others test case
    expect(new MagicColor(hex).css('rgb')).toEqual(rgb)
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
  })

  it('color with opacity', () => {
    const opacity = 0.6789
    const c = `rgba(100, 100, 100, ${opacity})`
    const mcColor = new MagicColor(c)

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
    const color = new MagicColor(hexString, 'hex', 1)

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
})
