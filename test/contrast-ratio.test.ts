import { describe, expect, it } from 'vitest'
import { calcAPCA, getWCAGContrastRatio } from 'magic-color'

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
  it('aPCA', () => {
    // expect(calcAPCA('#000', '#fff')).toBe()
    // expect(calcAPCA('#fff', '#000')).toBe(1)
    // expect(calcAPCA('#000', '#000')).toBe(1)
    // expect(calcAPCA('#fff', '#fff')).toBe(1)
    // expect(`${calcAPCA(c1, c2) * 100}%`).toMatchInlineSnapshot(`"-86.8%"`)
    expect(calcAPCA('#000', '#fff')).toMatchInlineSnapshot(`106.04067321268862`)
    expect(calcAPCA('#fff', '#000')).toMatchInlineSnapshot(`-107.88473318309848`)
    expect(calcAPCA('#000', '#000')).toMatchInlineSnapshot(`0`)
    expect(calcAPCA('#fff', '#fff')).toMatchInlineSnapshot(`0`)
  })
})
