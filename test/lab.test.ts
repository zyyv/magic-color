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
  expect(labToRgb([50, 20, 30])).toEqual([164, 105, 69])
  expect(labToRgb([100, -128, 127])).toEqual([0, 255, 0])
  expect(labToRgb([75, 20, 30])).toEqual([237, 170, 131])
  expect(labToRgb([50, 20, 30])).toEqual([164, 105, 69])
})

it('rgbToLab', () => {
  expect(rgbToLab([164, 105, 69])).toEqual([50, 20, 30])
  expect(rgbToLab([0, 255, 0])).toEqual([88, -86, 83])

  expect(rgbToLab([237, 170, 131])).toEqual([75, 20, 30])
  expect(rgbToLab([164, 105, 69])).toEqual([50, 20, 30])

  expect(rgbToLab([255, 242, 200])).toEqual([96, -2, 22])
  expect(rgbToLab([0, 154, 62])).toEqual([56, -55, 38])
})

it('magic for rgb and lab', () => {
  const rgb = [164, 105, 69] as RgbColor
  const lab = [50, 20, 30] as LabColor

  const mc = new MagicColor(rgb, 'rgb')
  expect(mc.toLab().value).toEqual(lab)
  expect(mc.toLab().toString()).toEqual(`lab(50 20 30)`)
  expect(mc.toLab().toRgb().value).toEqual(rgb)
  expect(mc.lab()).toEqual('lab(50 20 30)')
  expect(mc.lab(true)).toEqual('lab(50 20 30 / 100%)')

  const mc2 = new MagicColor(lab, 'lab')
  expect(mc2.toRgb().value).toEqual(rgb)
  expect(mc2.toRgb().toString()).toEqual(`rgb(164, 105, 69)`)
  expect(mc2.toRgb().toLab().value).toEqual(lab)
})
