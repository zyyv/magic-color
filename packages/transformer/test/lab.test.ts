import { describe, expect, it } from 'vitest'
import { isLab, labToHex, labToHsb, labToHsl, labToLch, labToRgb } from '../src/meta/lab'

describe('lab', () => {
  it('isLab', () => {
    expect(isLab('lab(50 20 30)')).toBe(true)
    expect(isLab('lab(100 -128 127)')).toBe(true)
    expect(isLab('lab(75 20 30 / 0.5)')).toBe(true)
    expect(isLab('lab(50 20 30.5)')).toBe(true)
    expect(isLab('lab(101 20 30)')).toBe(false)
  })

  it('labToRgb', () => {
    const white = labToRgb([100, 0, 0])
    expect(white[0]).toBeCloseTo(255, 1)
    expect(white[1]).toBeCloseTo(255, 1)
    expect(white[2]).toBeCloseTo(255, 1)

    expect(labToRgb([0, 0, 0])).toEqual([0, 0, 0])

    const rgb = labToRgb([62.66, 4.29, -38.38])
    expect(rgb[0]).toBeCloseTo(111.51, 1)
    expect(rgb[1]).toBeCloseTo(152.54, 1)
    expect(rgb[2]).toBeCloseTo(219.43, 1)
  })

  it('labToHex', () => {
    expect(labToHex([100, 0, 0])).toBe('#ffffff')
    expect(labToHex([0, 0, 0])).toBe('#000000')
    expect(labToHex([62.66, 4.29, -38.38])).toBe('#7099db')
  })

  it('labToHsl', () => {
    const white = labToHsl([100, 0, 0])
    expect(white[1]).toBeCloseTo(0, 1) // Saturation might be weird if hue is weird, but for white it should be 0 or undefined?
    // Actually, for white, L=100.
    expect(white[2]).toBeCloseTo(100, 1)

    const hsl = labToHsl([62.66, 4.29, -38.38])
    expect(hsl[0]).toBeCloseTo(217.18, 1)
    expect(hsl[1]).toBeCloseTo(60.27, 1)
    expect(hsl[2]).toBeCloseTo(64.89, 1)
  })

  it('labToHsb', () => {
    const white = labToHsb([100, 0, 0])
    expect(white[1]).toBeCloseTo(0, 1)
    expect(white[2]).toBeCloseTo(100, 1)

    const hsb = labToHsb([62.66, 4.29, -38.38])
    expect(hsb[0]).toBeCloseTo(217.18, 1)
    expect(hsb[1]).toBeCloseTo(49.18, 1)
    expect(hsb[2]).toBeCloseTo(86.05, 1)
  })

  it('labToLch', () => {
    const lch = labToLch([62.66, 4.29, -38.38])
    expect(lch[0]).toBeCloseTo(62.66, 1)
    expect(lch[1]).toBeCloseTo(38.61, 1)
    expect(lch[2]).toBeCloseTo(276.37, 1)
  })
})
