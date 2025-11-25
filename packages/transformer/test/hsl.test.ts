import { describe, expect, it } from 'vitest'
import { hslToHex, hslToHsb, hslToLab, hslToLch, hslToRgb, isHsl } from '../src/meta/hsl'

describe('hsl', () => {
  it('isHsl', () => {
    expect(isHsl('hsl(0, 100%, 50%)')).toBe(true)
    expect(isHsl('hsla(0, 100%, 50%, 0.5)')).toBe(true)
    expect(isHsl('hsl(0 100% 50%)')).toBe(true)
    expect(isHsl('hsl(0 100% 50% / 0.5)')).toBe(true)
    expect(isHsl('hsl(0, 0, 0)')).toBe(false)
  })

  it('hslToRgb', () => {
    expect(hslToRgb([0, 100, 50])).toEqual([255, 0, 0])
    expect(hslToRgb([120, 100, 50])).toEqual([0, 255, 0])
    expect(hslToRgb([240, 100, 50])).toEqual([0, 0, 255])
    expect(hslToRgb([0, 0, 100])).toEqual([255, 255, 255])
    expect(hslToRgb([0, 0, 0])).toEqual([0, 0, 0])

    const rgb = hslToRgb([218, 58, 65])
    expect(rgb[0]).toBeCloseTo(113.98, 1)
    expect(rgb[1]).toBeCloseTo(151.94, 1)
    expect(rgb[2]).toBeCloseTo(217.51, 1)
  })

  it('hslToHex', () => {
    expect(hslToHex([0, 100, 50])).toBe('#ff0000')
    expect(hslToHex([218, 58, 65])).toBe('#7298da')
  })

  it('hslToHsb', () => {
    expect(hslToHsb([0, 100, 50])).toEqual([0, 100, 100])

    const hsb = hslToHsb([218, 58, 65])
    expect(hsb[0]).toBeCloseTo(218, 1)
    expect(hsb[1]).toBeCloseTo(47.59, 1)
    expect(hsb[2]).toBeCloseTo(85.3, 1)
  })

  it('hslToLab', () => {
    const lab = hslToLab([218, 58, 65])
    expect(lab[0]).toBeCloseTo(62.54, 1)
    expect(lab[1]).toBeCloseTo(4.64, 1)
    expect(lab[2]).toBeCloseTo(-37.47, 1)
  })

  it('hslToLch', () => {
    const lch = hslToLch([218, 58, 65])
    expect(lch[0]).toBeCloseTo(62.54, 1)
    expect(lch[1]).toBeCloseTo(37.76, 1)
    expect(lch[2]).toBeCloseTo(277.07, 1)
  })
})
