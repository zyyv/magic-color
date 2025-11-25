import { describe, expect, it } from 'vitest'
import { hsbToHex, hsbToHsl, hsbToLab, hsbToLch, hsbToRgb, isHsb } from '../src/meta/hsb'

describe('hsb', () => {
  it('isHsb', () => {
    expect(isHsb('hsb(0, 100%, 100%)')).toBe(true)
    expect(isHsb('hsb(360, 0%, 0%)')).toBe(true)
    expect(isHsb('hsb(0, 0, 0)')).toBe(false)
  })

  it('hsbToRgb', () => {
    expect(hsbToRgb([0, 100, 100])).toEqual([255, 0, 0])
    expect(hsbToRgb([120, 100, 100])).toEqual([0, 255, 0])
    expect(hsbToRgb([240, 100, 100])).toEqual([0, 0, 255])
    expect(hsbToRgb([0, 0, 100])).toEqual([255, 255, 255])
    expect(hsbToRgb([0, 0, 0])).toEqual([0, 0, 0])

    const rgb = hsbToRgb([218, 48, 85])
    expect(rgb[0]).toBeCloseTo(112.71, 1)
    expect(rgb[1]).toBeCloseTo(150.88, 1)
    expect(rgb[2]).toBeCloseTo(216.75, 1)
  })

  it('hsbToHex', () => {
    expect(hsbToHex([0, 100, 100])).toBe('#ff0000')
    expect(hsbToHex([218, 48, 85])).toBe('#7197d9')
  })

  it('hsbToHsl', () => {
    expect(hsbToHsl([0, 100, 100])).toEqual([0, 100, 50])

    const hsl = hsbToHsl([218, 48, 85])
    expect(hsl[0]).toBeCloseTo(218, 1)
    expect(hsl[1]).toBeCloseTo(57.62, 1)
    expect(hsl[2]).toBeCloseTo(64.6, 1)
  })

  it('hsbToLab', () => {
    const lab = hsbToLab([218, 48, 85])
    expect(lab[0]).toBeCloseTo(62.14, 1)
    expect(lab[1]).toBeCloseTo(4.74, 1)
    expect(lab[2]).toBeCloseTo(-37.68, 1)
  })

  it('hsbToLch', () => {
    const lch = hsbToLch([218, 48, 85])
    expect(lch[0]).toBeCloseTo(62.14, 1)
    expect(lch[1]).toBeCloseTo(37.98, 1)
    expect(lch[2]).toBeCloseTo(277.17, 1)
  })
})
