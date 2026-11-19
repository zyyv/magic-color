import type { ColorType } from '@magic-color/transformer'
import { mc } from 'magic-color'
import { describe, expect, it } from 'vitest'

const formats: ColorType[] = ['rgb', 'hex', 'hsl', 'hsb', 'lab', 'lch', 'oklab', 'oklch']

describe('color conversion boundaries', () => {
  it('accepts four-digit HEX, percentage channels, and CSS angle units', () => {
    expect(mc('#f008').css(true)).toBe('#ff000088')
    expect(mc('#0f0a').alpha).toBe(0xAA / 255)
    expect(mc('lab(50% 20% -30%)').lab(false)).toEqual([50, 25, -37.5])
    expect(mc('lch(50% 20% .5turn)').lch(false)).toEqual([50, 30, 180])
    expect(mc('oklab(50% 25% -50%)').oklab(false)).toEqual([50, 0.1, -0.2])
    expect(mc('oklch(50% 25% 200grad)').oklch(false)).toEqual([50, 0.1, 180])
    expect(mc('hsl(0.5turn 100% 50%)').hex()).toBe('#00ffff')
    expect(mc('hsl(200grad, 100%, 50%)').hex()).toBe('#00ffff')
    expect(mc('hsl(3.141592653589793rad 100% 50%)').hex()).toBe('#00ffff')
  })

  it('preserves color when round-tripping default OKLab and OKLCH arrays', () => {
    const red = mc('#f00')
    const oklab = red.oklab()
    const oklch = red.oklch()
    expect(oklab[1]).toBeCloseTo(0.224863, 6)
    expect(oklch[1]).toBeCloseTo(0.257683, 6)
    expect(mc(oklab, 'oklab').hex()).toBe('#ff0000')
    expect(mc(oklch, 'oklch').hex()).toBe('#ff0000')

    const precise = mc('oklch(50.1234567% 0.000012345 43.1234567)')
    expect(precise.oklch(false)).toEqual([50.1234567, 0.000012345, 43.1234567])
  })

  it('resolves named channels and optional arguments for each constructor form', () => {
    expect(mc({ l: 62.8, a: 0.225, b: 0.126 }, 'oklab').hex()).toBe('#ff0000')
    expect(mc({ l: 62.8, c: 0.258, h: 29.2 }, 'oklch', 0.5).css('hex', true)).toBe('#ff000080')
    expect(mc({ l: 60, a: 20, b: 10 }, undefined).type).toBe('lab')
    expect(mc({ r: 1, g: 2, b: 3 }, undefined, 0.5).alpha).toBe(0.5)

    expect(mc([1, 2, 3], undefined).hex()).toBe('#010203')
    expect(mc([1, 2, 3], 'rgb', undefined).hex()).toBe('#010203')
    expect(mc(1, 2, 3, undefined).hex()).toBe('#010203')
    expect(mc(1, 2, 3, 'rgb', undefined).hex()).toBe('#010203')
    expect(mc(1, 2, 3, undefined, 0.5).alpha).toBe(0.5)
  })

  it.each([
    ['oklch(65% 0.3 30)', 'lab', [65, 0.3, 30]],
    ['lab(60 120 80)', 'oklab', [60, 120, 80]],
    ['lch(45 110 300)', 'oklch', [45, 110, 300]],
    ['oklab(70% -0.28 0.18)', 'lch', [70, -0.28, 0.18]],
  ] as const)('round-trips wide-gamut %s through %s', (source, target, expected) => {
    const color = mc(source)
    const originalType = color.type
    const converted = color.to(target).to(originalType)
    expect(converted.values).toEqual(expected.map(channel => expect.closeTo(channel, 4)))
  })

  it('resolves CSS named colors to HEX and keeps their opacity', () => {
    expect(mc.valid(' ReD ')).toBe('keyword')
    expect(mc(' ReD ').type).toBe('hex')
    expect(mc('red').value()).toBe('#ff0000')
    expect(mc('green').hex()).toBe('#008000')
    expect(mc('blue').hex()).toBe('#0000ff')
    expect(mc('red', 'keyword', 0.2).clone().css(true)).toBe('#ff000033')
    expect(mc('transparent').css(true)).toBe('#00000000')
    expect(mc.theme('red')).toEqual(mc.theme('#ff0000'))

    for (const input of ['rose', 'Purples', 'purple3', 'currentColor', 'inherit', 'constructor']) {
      expect(mc.valid(input)).toBeUndefined()
      expect(() => mc(input)).toThrow()
    }
  })

  it('round-trips CSS output with alpha in every format', () => {
    const color = mc('#3b82f680')
    for (const type of formats) {
      const rounded = mc(color.css(type, true))
      expect(rounded.alpha, type).toBeCloseTo(color.alpha, 4)

      const precise = mc(color.css(type, true, false))
      expect(precise.alpha, type).toBeCloseTo(color.alpha, 12)
      expect(precise.hex(), type).toBe(color.hex())
    }

    const preciseRgb = mc([-0.125, 1e-7, 3.5], 'rgb', 1e-8)
    const parsedRgb = mc(preciseRgb.css(true, false))
    expect(parsedRgb.values).toEqual(preciseRgb.values)
    expect(parsedRgb.alpha).toBe(preciseRgb.alpha)
  })

  it('clamps RGB channels when converting to HEX without changing stored values', () => {
    expect(mc([300, -1, 128.5]).hex()).toBe('#ff0081')
    const color = mc('#ff0000').set('rgb.r', '+1')
    expect(color.get('rgb.r')).toBe(256)
    expect(color.hex()).toBe('#ff0000')
    expect(mc('#0000ff').set('rgb.b', '+1').hex()).toBe('#0000ff')
  })

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

  it('parses percentage lightness and wraps hue angles', () => {
    expect(mc('lch(50% 0 0)').value('lab')).toEqual([50, 0, 0])
    expect(mc('hsl(-720 100% 50%)').hex()).toBe('#ff0000')
    expect(mc('hsl(780 100% 50%)').hex()).toBe('#ffff00')
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
