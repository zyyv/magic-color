import { expect, it } from 'vitest'
import type { LabColor, RgbColor } from '@magic-color/core'
import { isLab, labToRgb, rgbToLab } from '@magic-color/core'
import { MagicColor } from 'magic-color'

it('isLabColor', () => {
  expect(isLab('lab(50 20 30)')).toBe(true) // true
  expect(isLab('lab(100 -128 127)')).toBe(true) // true
  expect(isLab('lab(75 20 30 / 0.5)')).toBe(true) // true
  expect(isLab('lab(75 20 30 / 1)')).toBe(true) // true
  expect(isLab('lab(75 20 30 / 1.0)')).toBe(true) // true
  expect(isLab('lab(50 20 30.5)')).toBe(true) // true
  expect(isLab('lab(101 20 30)')).toBe(false) // false
  expect(isLab('lab(50 -130 30)')).toBe(false) // false
  expect(isLab('lab(50 20 30 / 1.5)')).toBe(false) // false
})

it('labToRgb', () => {
  expect(labToRgb([50, 20, 30])).toMatchInlineSnapshot(`
    [
      164.25208773869528,
      104.8433217869744,
      68.71466076356329,
    ]
  `)
  expect(labToRgb([100, -128, 127])).toMatchInlineSnapshot(`
    [
      -972.2825874428702,
      304.40956777224443,
      -416.00483070502156,
    ]
  `)
  expect(labToRgb([75, 20, 30])).toMatchInlineSnapshot(`
    [
      236.82325973780596,
      169.8002010736493,
      130.52031424115725,
    ]
  `)
  expect(labToRgb([50, 20, 30])).toMatchInlineSnapshot(`
    [
      164.25208773869528,
      104.8433217869744,
      68.71466076356329,
    ]
  `)
})

it('rgbToLab', () => {
  expect(rgbToLab([164, 105, 69])).toMatchInlineSnapshot(`
    [
      50.01022911983196,
      19.82671731880359,
      29.845650407467296,
    ]
  `)
  expect(rgbToLab([0, 255, 0])).toMatchInlineSnapshot(`
    [
      87.73472235279792,
      -86.1827164205346,
      83.17932050269782,
    ]
  `)

  expect(rgbToLab([237, 170, 131])).toMatchInlineSnapshot(`
    [
      75.07423625590387,
      20.012134272798633,
      29.845636679036012,
    ]
  `)
  expect(rgbToLab([164, 105, 69])).toMatchInlineSnapshot(`
    [
      50.01022911983196,
      19.82671731880359,
      29.845650407467296,
    ]
  `)

  expect(rgbToLab([255, 242, 200])).toMatchInlineSnapshot(`
    [
      95.55366509379728,
      -2.1208794524856245,
      21.880330115432557,
    ]
  `)
  expect(rgbToLab([0, 154, 62])).toMatchInlineSnapshot(`
    [
      55.54032302177262,
      -54.610362643217556,
      38.10564093179264,
    ]
  `)
})

it('magic for rgb and lab', () => {
  const rgb = [164, 105, 69] as RgbColor
  const lab = [50, 20, 30] as LabColor

  const mc = new MagicColor(rgb, 'rgb')
  expect(mc.toLab().value()).toEqual(lab)
  expect(mc.toLab().css()).toEqual(`lab(50 20 30)`)
  expect(mc.toLab().value('rgb')).toEqual(rgb)
  expect(mc.lab()).toEqual('lab(50 20 30)')
  expect(mc.lab(true)).toEqual('lab(50 20 30 / 100%)')

  const mc2 = new MagicColor(lab, 'lab')
  expect(mc2.toRgb().value()).toEqual(rgb)
  expect(mc2.toRgb().css()).toEqual(`rgb(164 105 69)`)
  expect(mc2.toRgb().value('lab')).toEqual(lab)
})
