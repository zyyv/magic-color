import { describe, expect, it } from 'vitest'
import { isRgb, rgbToHex, rgbToHsb, rgbToHsl, rgbToLab, rgbToLch } from '../src/meta/rgb'

describe('rgb', () => {
  it('isRgb', () => {
    expect(isRgb('rgb(0, 0, 0)')).toBe(true)
    expect(isRgb('rgba(0, 0, 0, 0)')).toBe(true)
    expect(isRgb('rgb(0 0 0)')).toBe(true)
    expect(isRgb('rgb(0 0 0 / 0)')).toBe(true)
  })

  it('rgbToHex', () => {
    expect(rgbToHex([0, 0, 0])).toBe('#000000')
    expect(rgbToHex([255, 255, 255])).toBe('#ffffff')
    expect(rgbToHex([255, 0, 0])).toBe('#ff0000')
    expect(rgbToHex([114, 152, 218])).toBe('#7298da')
  })

  it('rgbToHsl', () => {
    expect(rgbToHsl([0, 0, 0])).toEqual([0, 0, 0])

    const hsl = rgbToHsl([114, 152, 218])
    expect(hsl[0]).toBeCloseTo(218.07, 1)
    expect(hsl[1]).toBeCloseTo(58.42, 1)
    expect(hsl[2]).toBeCloseTo(65.09, 1)
  })

  it('rgbToHsb', () => {
    expect(rgbToHsb([0, 0, 0])).toEqual([0, 0, 0])

    const hsb = rgbToHsb([114, 152, 218])
    expect(hsb[0]).toBeCloseTo(218.07, 1)
    expect(hsb[1]).toBeCloseTo(47.7, 1)
    expect(hsb[2]).toBeCloseTo(85.49, 1)
  })

  it('rgbToLab', () => {
    const lab = rgbToLab([114, 152, 218])
    expect(lab[0]).toBeCloseTo(62.58, 1)
    expect(lab[1]).toBeCloseTo(4.76, 1)
    expect(lab[2]).toBeCloseTo(-37.68, 1)
  })

  it('rgbToLch', () => {
    const lch = rgbToLch([114, 152, 218])
    expect(lch[0]).toBeCloseTo(62.58, 1)
    expect(lch[1]).toBeCloseTo(37.98, 1)
    expect(lch[2]).toBeCloseTo(277.20, 1)
  })
})
