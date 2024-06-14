import { describe, expect, it } from 'vitest'
import { getAPCAContrastRatio, getWCAGContrastRatio } from 'magic-color'

const c1 = '#123123'
const c2 = '#797989'

describe('contrast ratio for WCAG', () => {
  it('wCAG', () => {
    expect(getWCAGContrastRatio('#000', '#fff')).toBe(21)
    expect(getWCAGContrastRatio('#fff', '#000')).toBe(21)
    expect(getWCAGContrastRatio('#000', '#000')).toBe(1)
    expect(getWCAGContrastRatio('#fff', '#fff')).toBe(1)
    expect(getWCAGContrastRatio(c1, c2)).toMatchInlineSnapshot(`3.3`)
  })
})

describe('contrast ratio for APCA', () => {
  it('wCAG', () => {
    expect(getAPCAContrastRatio('#000', '#fff')).toBe(-1)
    expect(getAPCAContrastRatio('#fff', '#000')).toBe(1)
    expect(getAPCAContrastRatio('#000', '#000')).toBe(1)
    expect(getAPCAContrastRatio('#fff', '#fff')).toBe(1)
    expect(`${getAPCAContrastRatio(c1, c2) * 100}%`).toMatchInlineSnapshot(`"-86.8%"`)
  })
})
