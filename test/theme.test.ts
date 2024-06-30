import { describe, expect, it } from 'vitest'
import { theme } from 'magic-color'

describe('theme colors', () => {
  const testColor = '#9955FF'

  it('simple theme', () => {
    expect(theme(testColor)).toMatchInlineSnapshot(`
      {
        "100": "#eee8ff",
        "200": "#dfd4ff",
        "300": "#c9b1ff",
        "400": "#b085ff",
        "50": "#f6f2ff",
        "500": "#9955ff",
        "600": "#8c30f7",
        "700": "#7e1ee3",
        "800": "#6918bf",
        "900": "#57169c",
        "950": "#360b6a",
      }
    `)
  })

  it('theme to other type', () => {
    expect(theme(testColor, { type: 'rgb' })).toMatchInlineSnapshot(`
      {
        "100": "rgb(238 232 255)",
        "200": "rgb(223 212 255)",
        "300": "rgb(201 177 255)",
        "400": "rgb(176 133 255)",
        "50": "rgb(246 242 255)",
        "500": "rgb(153 85 255)",
        "600": "rgb(140 48 247)",
        "700": "rgb(126 30 227)",
        "800": "rgb(105 24 191)",
        "900": "rgb(87 22 156)",
        "950": "rgb(54 11 106)",
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
        "--color-primary-100": "238 232 255",
        "--color-primary-200": "223 212 255",
        "--color-primary-300": "201 177 255",
        "--color-primary-400": "176 133 255",
        "--color-primary-50": "246 242 255",
        "--color-primary-500": "153 85 255",
        "--color-primary-600": "140 48 247",
        "--color-primary-700": "126 30 227",
        "--color-primary-800": "105 24 191",
        "--color-primary-900": "87 22 156",
        "--color-primary-950": "54 11 106",
      }
    `)
  })
})
