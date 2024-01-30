import { describe, expect, it } from 'vitest'
import { theme } from '../src'

describe('theme colors', () => {
  const testColor = '#9955FF'

  it('simple theme', () => {
    expect(theme(testColor)).toMatchInlineSnapshot(`
{
  "100": "#f5eeff",
  "200": "#e6d5ff",
  "300": "#d6bbff",
  "400": "#b888ff",
  "50": "#faf7ff",
  "500": "#9955ff",
  "600": "#8a4de6",
  "700": "#5c3399",
  "800": "#452673",
  "900": "#2e1a4d",
  "950": "#1f1133",
}
    `)
  })

  it('theme to other type', () => {
    expect(theme(testColor, { type: 'hsl' })).toMatchInlineSnapshot(`
      {
        "100": "hsl(265, 100%, 97%)",
        "200": "hsl(264, 100%, 92%)",
        "300": "hsl(264, 100%, 87%)",
        "400": "hsl(264, 100%, 77%)",
        "50": "hsl(262, 100%, 98%)",
        "500": "hsl(264, 100%, 67%)",
        "600": "hsl(264, 75%, 60%)",
        "700": "hsl(264, 50%, 40%)",
        "800": "hsl(264, 50%, 30%)",
        "900": "hsl(264, 50%, 20%)",
        "950": "hsl(265, 50%, 13%)",
      }
    `)
  })

  it('theme with render', () => {
    expect(theme(testColor, {
      type: 'rgb',
      render: (c) => {
        return c.replace(/rgb\((.*)\)/, '$1').replace(/,/g, '')
      },
    })).toMatchInlineSnapshot(`
      {
        "100": "245 238 255",
        "200": "230 213 255",
        "300": "214 187 255",
        "400": "184 136 255",
        "50": "250 247 255",
        "500": "153 85 255",
        "600": "138 77 230",
        "700": "92 51 153",
        "800": "69 38 115",
        "900": "46 26 77",
        "950": "31 17 51",
      }
    `)
  })
})
