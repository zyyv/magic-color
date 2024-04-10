import { describe, expect, it } from 'vitest'
import { theme } from 'magic-color'

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
    expect(theme(testColor, { type: 'rgb' })).toMatchInlineSnapshot(`
      {
        "100": "rgb(245, 238, 255)",
        "200": "rgb(230, 213, 255)",
        "300": "rgb(214, 187, 255)",
        "400": "rgb(184, 136, 255)",
        "50": "rgb(250, 247, 255)",
        "500": "rgb(153, 85, 255)",
        "600": "rgb(138, 77, 230)",
        "700": "rgb(92, 51, 153)",
        "800": "rgb(69, 38, 115)",
        "900": "rgb(46, 26, 77)",
        "950": "rgb(31, 17, 51)",
      }
    `)
  })

  it('theme with render', () => {
    expect(theme(testColor, {
      type: 'rgb',
      render: (meta) => {
        return [
          `--color-primary-${meta[0]}`,
          meta[1].replace(/rgb\((.*)\)/, '$1').replace(/,/g, ''),
        ]
      },
    })).toMatchInlineSnapshot(`
      {
        "--color-primary-100": "245 238 255",
        "--color-primary-200": "230 213 255",
        "--color-primary-300": "214 187 255",
        "--color-primary-400": "184 136 255",
        "--color-primary-50": "250 247 255",
        "--color-primary-500": "153 85 255",
        "--color-primary-600": "138 77 230",
        "--color-primary-700": "92 51 153",
        "--color-primary-800": "69 38 115",
        "--color-primary-900": "46 26 77",
        "--color-primary-950": "31 17 51",
      }
    `)
  })
})
