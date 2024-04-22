import { describe, expect, it } from 'vitest'
import { isColor, mc } from 'magic-color'

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
    expect(mc(rgb).toHex().toString()).toEqual(hex)
    expect(mc(rgb).toHsb().toString()).toEqual(hsb)
    expect(mc(rgb).toHsl().toString()).toEqual(hsl)

    // hex to others test case
    expect(mc('#f00')).toMatchInlineSnapshot(`
      MagicColor {
        "opacity": 1,
        "type": "hex",
        "value": "#ff0000",
      }
    `)
    expect(mc(hex).toRgb().toString()).toEqual(rgb)
    expect(mc(hex).toHsl().toString()).toEqual(hsl)
    expect(mc(hex).toHsb().toString()).toEqual(hsb)
    expect(mc(shortHex).toRgb().toString()).toEqual(rgb)

    // hsl to others test case
    expect(mc(hsl).toRgb().toString()).toEqual(rgb)
    expect(mc(hsl).toHsb().toString()).toEqual(hsb)
    expect(mc(hsl).toHex().toString()).toEqual(hex)

    // hsb to others test case
    expect(mc(hsb).toRgb().toString()).toEqual(rgb)
    expect(mc(hsb).toHsl().toString()).toEqual(hsl)
    expect(mc(hsb).toHex().toString()).toEqual(hex)
  })

  const opacity = 0.6789

  it('in magic color', () => {
    const c = `rgba(100, 100, 100, ${opacity})`
    const mcColor = mc(c)
    expect(mcColor.toRgb().toString(true)).toEqual('rgba(100, 100, 100, 67.89%)')
    expect(mcColor.toHex().toString(true)).toEqual('#646464ad')
    expect(mcColor.toHsl().toString(true)).toEqual('hsla(0, 0%, 39%, 67.89%)')
    expect(mcColor.toHsl().toString(true)).toEqual('hsla(0, 0%, 39%, 67.89%)')
    expect(mcColor.toHsb().toString(true)).toEqual('hsb(0, 0%, 39%)')
  })
})
