import { describe, expect, it } from 'vitest'
import { isOklch, oklchToHex, oklchToHsb, oklchToHsl, oklchToRgb } from '../src/meta/oklch'

describe('oklch', () => {
  it('isOklch', () => {
    expect(isOklch('oklch(50% 0.5 0)')).toBe(true)
    expect(isOklch('oklch(50 0.5 0)')).toBe(true)
    expect(isOklch('oklch(50% 0.5 0 / 0.5)')).toBe(true)
    expect(isOklch('oklch(50 0.5 0deg)')).toBe(true)
  })

  it('oklchToRgb', () => {
    expect(oklchToRgb([100, 0, 0])).toEqual([255, 255, 255])
    expect(oklchToRgb([0, 0, 0])).toEqual([0, 0, 0])

    const rgb = oklchToRgb([66.5, 0.11, 254.7])
    expect(rgb[0]).toBeCloseTo(99.48, 1)
    expect(rgb[1]).toBeCloseTo(150.26, 1)
    expect(rgb[2]).toBeCloseTo(213.98, 1)
  })

  it('oklchToHex', () => {
    expect(oklchToHex([100, 0, 0])).toBe('#ffffff')
    expect(oklchToHex([0, 0, 0])).toBe('#000000')
    expect(oklchToHex([66.5, 0.11, 254.7])).toBe('#6396d6')
    expect(oklchToHex([13.8, 0.044, 259.5])).toBe('#01081a')
  })

  it('oklchToHsl', () => {
    expect(oklchToHsl([100, 0, 0])).toEqual([0, 0, 100])

    const hsl = oklchToHsl([66.5, 0.11, 254.7])
    expect(hsl[0]).toBeCloseTo(213.38, 1)
    expect(hsl[1]).toBeCloseTo(58.25, 1)
    expect(hsl[2]).toBeCloseTo(61.46, 1)
  })

  it('oklchToHsb', () => {
    expect(oklchToHsb([100, 0, 0])).toEqual([0, 0, 100])

    const hsb = oklchToHsb([66.5, 0.11, 254.7])
    expect(hsb[0]).toBeCloseTo(213.38, 1)
    expect(hsb[1]).toBeCloseTo(53.50, 1)
    expect(hsb[2]).toBeCloseTo(83.91, 1)
  })
})
