import { describe, expect, it } from 'vitest'
import { isLch, lchToHex, lchToHsb, lchToHsl, lchToLab, lchToRgb } from '../src/meta/lch'

describe('lch', () => {
  it('isLch', () => {
    expect(isLch('lch(50% 100 0)')).toBe(true)
    expect(isLch('lch(50 100 0)')).toBe(true)
    expect(isLch('lch(50% 100 0 / 0.5)')).toBe(true)
    expect(isLch('lch(50 100 0 / 0.5)')).toBe(true)
    expect(isLch('lch(50 100 0deg)')).toBe(true)
  })

  it('lchToRgb', () => {
    const white = lchToRgb([100, 0, 0])
    expect(white[0]).toBeCloseTo(255, 1)
    expect(white[1]).toBeCloseTo(255, 1)
    expect(white[2]).toBeCloseTo(255, 1)

    expect(lchToRgb([0, 0, 0])).toEqual([0, 0, 0])

    const rgb = lchToRgb([62.66, 38.62, 276.38])
    expect(rgb[0]).toBeCloseTo(111.51, 1)
    expect(rgb[1]).toBeCloseTo(152.54, 1)
    expect(rgb[2]).toBeCloseTo(219.43, 1)
  })

  it('lchToHex', () => {
    expect(lchToHex([100, 0, 0])).toBe('#ffffff')
    expect(lchToHex([0, 0, 0])).toBe('#000000')
    expect(lchToHex([62.66, 38.62, 276.38])).toBe('#7099db')
  })

  it('lchToHsl', () => {
    const white = lchToHsl([100, 0, 0])
    expect(white[2]).toBeCloseTo(100, 1)

    const hsl = lchToHsl([62.66, 38.62, 276.38])
    expect(hsl[0]).toBeCloseTo(217.19, 1)
    expect(hsl[1]).toBeCloseTo(60.27, 1)
    expect(hsl[2]).toBeCloseTo(64.89, 1)
  })

  it('lchToHsb', () => {
    const white = lchToHsb([100, 0, 0])
    expect(white[2]).toBeCloseTo(100, 1)

    const hsb = lchToHsb([62.66, 38.62, 276.38])
    expect(hsb[0]).toBeCloseTo(217.19, 1)
    expect(hsb[1]).toBeCloseTo(49.18, 1)
    expect(hsb[2]).toBeCloseTo(86.05, 1)
  })

  it('lchToLab', () => {
    expect(lchToLab([50, 100, 0])).toEqual([50, 100, 0])

    const lab = lchToLab([50, 100, 90])
    expect(lab[0]).toBeCloseTo(50)
    expect(lab[1]).toBeCloseTo(0)
    expect(lab[2]).toBeCloseTo(100)

    const lab2 = lchToLab([62.66, 38.62, 276.38])
    expect(lab2[0]).toBeCloseTo(62.66, 1)
    expect(lab2[1]).toBeCloseTo(4.29, 1)
    expect(lab2[2]).toBeCloseTo(-38.38, 1)
  })
})
