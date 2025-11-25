import { describe, expect, it } from 'vitest'
import { isOklab, oklabToHex, oklabToHsb, oklabToHsl, oklabToOklch, oklabToRgb } from '../src/meta/oklab'

describe('oklab', () => {
  it('isOklab', () => {
    expect(isOklab('oklab(50% 0.5 0.5)')).toBe(true)
    expect(isOklab('oklab(50 0.5 0.5)')).toBe(true)
    expect(isOklab('oklab(50% 0.5 0.5 / 0.5)')).toBe(true)
  })

  it('oklabToRgb', () => {
    expect(oklabToRgb([100, 0, 0])).toEqual([255, 255, 255])
    expect(oklabToRgb([0, 0, 0])).toEqual([0, 0, 0])

    const rgb = oklabToRgb([66.5, -0.03, -0.11])
    expect(rgb[0]).toBeCloseTo(97.49, 1)
    expect(rgb[1]).toBeCloseTo(150.19, 1)
    expect(rgb[2]).toBeCloseTo(216.33, 1)
  })

  it('oklabToHex', () => {
    expect(oklabToHex([100, 0, 0])).toBe('#ffffff')
    expect(oklabToHex([0, 0, 0])).toBe('#000000')
    expect(oklabToHex([66.5, -0.03, -0.11])).toBe('#6196d8')
  })

  it('oklabToHsl', () => {
    expect(oklabToHsl([100, 0, 0])).toEqual([0, 0, 100])

    const hsl = oklabToHsl([66.5, -0.03, -0.11])
    expect(hsl[0]).toBeCloseTo(213.39, 1)
    expect(hsl[1]).toBeCloseTo(60.57, 1)
    expect(hsl[2]).toBeCloseTo(61.53, 1)
  })

  it('oklabToHsb', () => {
    expect(oklabToHsb([100, 0, 0])).toEqual([0, 0, 100])

    const hsb = oklabToHsb([66.5, -0.03, -0.11])
    expect(hsb[0]).toBeCloseTo(213.39, 1)
    expect(hsb[1]).toBeCloseTo(54.93, 1)
    expect(hsb[2]).toBeCloseTo(84.83, 1)
  })

  it('oklabToOklch', () => {
    const oklch = oklabToOklch([66.5, -0.03, -0.11])
    expect(oklch[0]).toBeCloseTo(66.5, 1)
    expect(oklch[1]).toBeCloseTo(0.11, 1)
    expect(oklch[2]).toBeCloseTo(254.74, 1)
  })
})
