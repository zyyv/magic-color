import { mc } from 'magic-color'
import { describe, expect, it } from 'vitest'

const c1 = '#123123'
const c2 = '#797989'

describe('contrast ratio for WCAG', () => {
  it('returns the full contrast ratio', () => {
    expect(mc.wcag('#000', '#fff')).toBe(21)
    expect(mc.wcag('#fff', '#000')).toBe(21)
    expect(mc.wcag('#000', '#000')).toBe(1)
    expect(mc.wcag('#fff', '#fff')).toBe(1)
    expect(mc.wcag(c1, c2)).toBeCloseTo(3.296259251, 9)
    expect(mc.wcag('#000', '#f00')).toBeCloseTo(5.252, 9)
  })

  it('uses full precision at the WCAG threshold', () => {
    expect(mc.wcag('#fff', '#018580')).toBeCloseTo(4.498710137, 9)
    expect(mc.readable('#018580')).toBe('#000000')
  })

  it('composites text over the background and transparent backgrounds over white', () => {
    expect(mc.wcag('#00000000', '#fff')).toBe(1)
    expect(mc.wcag('rgb(0 0 0 / 50%)', '#fff')).toBeCloseTo(3.97665, 5)
    expect(mc.wcag('#000', 'transparent')).toBe(21)
    expect(mc.readable({ bgColor: '#fff', textColor: 'transparent' })).toBe('#000000')
  })
})

describe('contrast ratio for APCA', () => {
  it('aPCA', () => {
    expect(mc.apca('#000', '#fff')).toMatchInlineSnapshot(`106.04067321268862`)
    expect(mc.apca('#fff', '#000')).toMatchInlineSnapshot(`-107.88473318309848`)
    expect(mc.apca('#000', '#000')).toMatchInlineSnapshot(`0`)
    expect(mc.apca('#fff', '#fff')).toMatchInlineSnapshot(`0`)
    expect(mc.apca('#89889867', '#fff')).toMatchInlineSnapshot(`25.345168601044666`)
  })

  it('composites transparent backgrounds over white for APCA', () => {
    expect(mc.apca('#fff', 'transparent')).toBe(0)
    expect(mc.apca('#000', 'transparent')).toBe(mc.apca('#000', '#fff'))
    expect(mc.apca('#000', 'rgb(0 0 0 / 50%)')).toBe(mc.apca('#000', '#808080'))
    expect(mc.apca('transparent', '#0008')).toBe(0)
  })

  it('clips RGB channels and honors unrounded APCA inputs', () => {
    expect(mc.apca('rgb(300 -5 0)', '#fff')).toBe(mc.apca('#f00', '#fff'))
    expect(mc.apca('#000', 'rgb(0 0 0 / 50%)', -1, false))
      .toBe(mc.apca('#000', 'rgb(127.5 127.5 127.5)', -1, false))
    const fractional = mc.apca('rgb(127.4 127.4 127.4)', '#fff', -1, false)
    expect(fractional).not.toBe(mc.apca('rgb(127 127 127)', '#fff', -1, false))
  })

  it('reverseAPCA', () => {
    const color = ['#000', '#888', '#FFF', '#000', '#aaa', '#123', '#def', '#123', '#444', '#006']
    const color4rev = '#a4a4a4'
    const contrasts = [-60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60]

    expect(color.map(c => mc.apcaReverse(10, c, 'text'))).toMatchInlineSnapshot(`
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

    expect(contrasts.map(c => mc.apcaReverse(c, color4rev, 'background'))).toMatchInlineSnapshot(`
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
