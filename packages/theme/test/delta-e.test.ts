import { deltaE } from '@magic-color/theme'
import { describe, expect, it } from 'vitest'

describe('color difference using CIEDE2000', () => {
  // Sharma, Wu, and Dalal's supplementary test data, rows 11, 12, and 15.
  // https://hajim.rochester.edu/ece/sites/gsharma/ciede2000/
  it.each([
    ['lab(50 2.49 -0.001)', 'lab(50 -2.49 0.0011)', 7.2195],
    ['lab(50 2.49 -0.001)', 'lab(50 -2.49 0.0012)', 7.2195],
    ['lab(50 -0.001 2.49)', 'lab(50 0.0011 -2.49)', 4.7461],
  ])('matches the reference for %s and %s', (first, second, expected) => {
    expect(deltaE(first, second)).toBeCloseTo(expected, 4)
    expect(deltaE(second, first)).toBeCloseTo(expected, 4)
  })

  it('preserves lightness differences below one thousandth', () => {
    expect(deltaE('lab(50 0 0)', 'lab(50.0004 0 0)')).toBeCloseTo(0.0004, 8)
  })

  it('returns differences beyond 100', () => {
    expect(deltaE('#00ff00', '#ff00ff')).toBeCloseTo(108.5854, 4)
    expect(deltaE('#000', '#fff', 0.5)).toBeCloseTo(200, 9)
  })
})
