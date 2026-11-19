import type { ColorType } from '@magic-color/transformer'
import { mc } from 'magic-color'
import { describe, expect, it } from 'vitest'

const formats: ColorType[] = ['rgb', 'hex', 'hsl', 'hsb', 'lab', 'lch', 'oklab', 'oklch']

describe('color conversion boundaries', () => {
  it('converts every supported source to every target without NaN', () => {
    const sources = [
      '#000000',
      '#fff',
      '#ff000080',
      '#ffffff',
      '#808080',
      'red',
      'rgb(255 0 0)',
      'hsl(0 0% 50%)',
      'hsb(360, 0%, 0%)',
      'lab(50 0 0)',
      'lch(50% 0 0)',
      'oklab(50% 0 0)',
      'oklch(50% 0 0)',
    ]

    for (const source of sources) {
      for (const target of formats) {
        const color = mc(source)
        const value = color.value(target, false)
        if (Array.isArray(value))
          expect(value.every(Number.isFinite), `${source} -> ${target}`).toBe(true)
        const css = color.css(target)
        expect(css, `${source} -> ${target}`).not.toContain('NaN')
        expect(() => mc(css), `${source} -> ${target}: ${css}`).not.toThrow()
      }
    }
  })

  it('keeps achromatic polar colors finite and round-trippable', () => {
    for (const source of ['#000000', 'lab(50 0 0)', 'oklab(50% 0 0)']) {
      for (const target of ['lch', 'oklch'] as const) {
        const polar = mc(source).value(target)
        expect(polar[2]).toBe(0)
        expect(mc(polar, target).value('rgb').every(Number.isFinite)).toBe(true)
      }
    }
  })

  it('parses percentage lightness and wraps HSB hue', () => {
    expect(mc('lch(50% 0 0)').value('lab')).toEqual([50, 0, 0])
    expect(mc('hsb(360, 100%, 100%)').hex()).toBe('#ff0000')
    expect(mc('hsb(0, 100%, 0%)').hsl()).toEqual([0, 0, 0])
    expect(mc('hsb(0, 100%, 100%)').hsl()).toEqual([0, 100, 50])
  })

  it('round-trips CSS Lab and LCH with a D50 white point', () => {
    const color = mc('#3b82f6')
    const lab = 'lab(54.619 8.763 -65.791)'
    const lch = 'lch(54.619 66.372 277.587)'

    expect(color.css('lab')).toBe(lab)
    expect(color.css('lch')).toBe(lch)
    expect(mc(lab).hex()).toBe('#3b82f6')
    expect(mc(lch).hex()).toBe('#3b82f6')
  })

  it('parses unitless CSS OKLab and OKLCH lightness', () => {
    expect(mc('oklab(0.62 -0.1 0.1)').hex()).toBe('#5f9839')
    expect(mc('oklab(62% -0.1 0.1)').hex()).toBe('#5f9839')
    expect(mc('oklch(0.62 0.2 30)').hex()).toBe('#e54533')
    expect(mc('oklch(62% 0.2 30)').hex()).toBe('#e54533')

    const translucent = mc('oklch(.62 0.2 30 / 0.5)')
    expect(translucent.values).toEqual([62, 0.2, 30])
    expect(translucent.alpha).toBe(0.5)
    expect(mc('oklab(1 0 0)').hex()).toBe('#ffffff')
    expect(mc('oklab(1% 0 0)').values).toEqual([1, 0, 0])
    expect(mc('oklab(62 -0.1 0.1)').hex()).toBe('#5f9839')
  })
})
