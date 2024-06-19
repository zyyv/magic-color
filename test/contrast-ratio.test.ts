import { describe, expect, it } from 'vitest'
import { calcAPCA, calcWCAG, reverseAPCA } from 'magic-color'

const c1 = '#123123'
const c2 = '#797989'

describe('contrast ratio for WCAG', () => {
  it('wCAG', () => {
    expect(calcWCAG('#000', '#fff')).toBe(21)
    expect(calcWCAG('#fff', '#000')).toBe(21)
    expect(calcWCAG('#000', '#000')).toBe(1)
    expect(calcWCAG('#fff', '#fff')).toBe(1)
    expect(calcWCAG(c1, c2)).toMatchInlineSnapshot(`3.3`)
  })
})

describe('contrast ratio for APCA', () => {
  it('aPCA', () => {
    expect(calcAPCA('#000', '#fff')).toMatchInlineSnapshot(`106.04067321268862`)
    expect(calcAPCA('#fff', '#000')).toMatchInlineSnapshot(`-107.88473318309848`)
    expect(calcAPCA('#000', '#000')).toMatchInlineSnapshot(`0`)
    expect(calcAPCA('#fff', '#fff')).toMatchInlineSnapshot(`0`)
    expect(calcAPCA('#89889867', '#fff')).toMatchInlineSnapshot(`25.345168601044676`)
  })

  it('reverseAPCA', () => {
    const color = ['#000', '#888', '#FFF', '#000', '#aaa', '#123', '#def', '#123', '#444', '#006']
    const color4rev = '#a4a4a4'
    const contrasts = [-60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60]

    expect(color.map(c => reverseAPCA(10, c, 'text'))).toMatchInlineSnapshot(`
      [
        "#404040",
        "#a0a0a0",
        false,
        "#404040",
        "#c1c1c1",
        "#484848",
        "#ffffff",
        "#484848",
        "#626262",
        "#494949",
      ]
    `)

    expect(contrasts.map(c => reverseAPCA(c, color4rev, 'background'))).toMatchInlineSnapshot(`
      [
        false,
        "#f9f9f9",
        "#e9e9e9",
        "#d9d9d9",
        "#c9c9c9",
        "#b8b8b8",
        false,
        "#8c8c8c",
        "#777777",
        "#616161",
        "#484848",
        "#2a2a2a",
        "#000000",
      ]
    `)
  })
})
