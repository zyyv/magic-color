import { describe, expect, it } from 'vitest'
import { convertColor, hexToHsb, hexToHsl, hexToRgb, hsbToHex, hsbToHsl, hsbToRgb, hslToHex, hslToHsb, hslToRgb, isColor, rgbToHex, rgbToHsb, rgbToHsl } from '../src'
import type { ColorType } from '../src/types'

describe('utils scoped', () => {
  const hex = '#ff0000'
  const shortHex = '#f00'
  const rgb = 'rgb(255, 0, 0)'
  const hsl = 'hsl(0, 100%, 50%)'
  const hsb = 'hsb(0, 100%, 100%)'
  const isnotHex = 'rgb(255, 0, 0, 0.5)'
  const isnotRgb = 'rgb(255, 0)'
  const isnotHsl = 'hsl(0, 100%)'
  const isnotHsb = 'hsb(0, 100%)'

  const colors = [hex, rgb, hsl, hsb]
  const notColors = [isnotHex, isnotRgb, isnotHsl, isnotHsb]

  it('isColor', () => {
    expect(colors.every(isColor)).toEqual(true)
    expect(notColors.every(isColor)).toEqual(false)
  })

  it('simple convert', () => {
    // rgb to others test case
    expect(rgbToHsl(rgb, true)).toEqual(hsl)
    expect(rgbToHsb(rgb, true)).toEqual(hsb)
    expect(rgbToHex(rgb)).toEqual(hex)

    // hex to others test case
    expect(hexToHsb(hex, true)).toEqual(hsb)
    expect(hexToHsl(hex, true)).toEqual(hsl)
    expect(hexToRgb(hex, true)).toEqual(rgb)
    expect(hexToRgb(shortHex, true)).toEqual(rgb)

    // hsl to others test case
    expect(hslToRgb(hsl, true)).toEqual(rgb)
    expect(hslToHex(hsl)).toEqual(hex)
    expect(hslToHsb(hsl, true)).toEqual(hsb)

    // hsb to others test case
    expect(hsbToRgb(hsb, true)).toEqual(rgb)
    expect(hsbToHex(hsb)).toEqual(hex)
    expect(hsbToHsl(hsb, true)).toEqual(hsl)
  })

  it('convertColor', () => {
    type TestType = Parameters<typeof convertColor>[1]

    function testTrueConvert(type: TestType) {
      return colors.map(c => convertColor(c, type))
    }

    function testFalseConvert(type: TestType) {
      return notColors.map(c => convertColor(c, type))
    }

    expect((['rgb', 'hex', 'hsl', 'hsb'] as TestType[]).map(testTrueConvert)).toMatchInlineSnapshot(`
      [
        [
          "rgb(255, 0, 0)",
          "rgb(255, 0, 0)",
          "rgb(255, 0, 0)",
          "rgb(255, 0, 0)",
        ],
        [
          "#ff0000",
          "#ff0000",
          "#ff0000",
          "#ff0000",
        ],
        [
          "hsl(0, 100%, 50%)",
          "hsl(0, 100%, 50%)",
          "hsl(0, 100%, 50%)",
          "hsl(0, 100%, 50%)",
        ],
        [
          "hsb(0, 100%, 100%)",
          "hsb(0, 100%, 100%)",
          "hsb(0, 100%, 100%)",
          "hsb(0, 100%, 100%)",
        ],
      ]
    `)

    expect(testFalseConvert('hex').filter(Boolean)).toEqual([])
  })
})
