import { describe, expect, it } from 'vitest'
import { hexToHsb, hexToHsl, hexToLab, hexToLch, hexToRgb, isHex } from '../src/meta/hex'

describe('hex', () => {
  it('isHex', () => {
    expect(isHex('#000')).toBe(true)
    expect(isHex('#000000')).toBe(true)
    expect(isHex('#00000000')).toBe(true)
    expect(isHex('000')).toBe(true)
    expect(isHex('000000')).toBe(true)
    expect(isHex('00000000')).toBe(true)
    expect(isHex('#ggg')).toBe(false)
  })

  it('hexToRgb', () => {
    expect(hexToRgb('#000000')).toEqual([0, 0, 0])
    expect(hexToRgb('#ffffff')).toEqual([255, 255, 255])
    expect(hexToRgb('#ff0000')).toEqual([255, 0, 0])
    expect(hexToRgb('#00ff00')).toEqual([0, 255, 0])
    expect(hexToRgb('#0000ff')).toEqual([0, 0, 255])
    expect(hexToRgb('#7298da')).toEqual([114, 152, 218])
  })

  it('hexToHsl', () => {
    expect(hexToHsl('#000000')).toEqual([0, 0, 0])
    expect(hexToHsl('#ffffff')).toEqual([0, 0, 100])
    expect(hexToHsl('#ff0000')).toEqual([0, 100, 50])

    const hsl = hexToHsl('#7298da')
    expect(hsl[0]).toBeCloseTo(218.07, 1)
    expect(hsl[1]).toBeCloseTo(58.42, 1)
    expect(hsl[2]).toBeCloseTo(65.09, 1)
  })

  it('hexToHsb', () => {
    expect(hexToHsb('#000000')).toEqual([0, 0, 0])
    expect(hexToHsb('#ffffff')).toEqual([0, 0, 100])
    expect(hexToHsb('#ff0000')).toEqual([0, 100, 100])

    const hsb = hexToHsb('#7298da')
    expect(hsb[0]).toBeCloseTo(218.07, 1)
    expect(hsb[1]).toBeCloseTo(47.7, 1)
    expect(hsb[2]).toBeCloseTo(85.49, 1)
  })

  it('hexToLab', () => {
    const lab = hexToLab('#7298da')
    expect(lab[0]).toBeCloseTo(62.58, 1)
    expect(lab[1]).toBeCloseTo(4.76, 1)
    expect(lab[2]).toBeCloseTo(-37.68, 1)
  })

  it('hexToLch', () => {
    const lch = hexToLch('#7298da')
    expect(lch[0]).toBeCloseTo(62.58, 1)
    expect(lch[1]).toBeCloseTo(37.98, 1)
    expect(lch[2]).toBeCloseTo(277.20, 1)
  })
})
