import { describe, expect, it } from 'vitest'
import { theme } from 'magic-color'

describe('theme colors', () => {
  const testColor = '#9955FF'

  it('simple theme', () => {
    expect(theme(testColor)).toMatchInlineSnapshot(`
      {
        "100": "#ffe8e5",
        "200": "#00d9d5",
        "300": "#01b8b0",
        "400": "#009083",
        "50": "#00f5f4",
        "500": "#9955FF",
        "600": "#f74531",
        "700": "#e3301c",
        "800": "#bd2919",
        "900": "#9c2417",
        "950": "#6a150b",
      }
    `)
  })

  it('theme to other type', () => {
    expect(theme(testColor, { type: 'rgb' })).toMatchInlineSnapshot(`
      {
        "100": "rgb(255 232 229)",
        "200": "rgb(0 217 213)",
        "300": "rgb(1 184 176)",
        "400": "rgb(0 144 131)",
        "50": "rgb(0 245 244)",
        "500": "rgb(153 85 255)",
        "600": "rgb(247 69 49)",
        "700": "rgb(227 48 28)",
        "800": "rgb(189 41 25)",
        "900": "rgb(156 36 23)",
        "950": "rgb(106 21 11)",
      }
    `)
  })

  it.skip('theme with render', () => {
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
        "--color-primary-100": "153 85 255",
        "--color-primary-200": "153 85 255",
        "--color-primary-300": "153 85 255",
        "--color-primary-400": "153 85 255",
        "--color-primary-50": "153 85 255",
        "--color-primary-500": "153 85 255",
        "--color-primary-600": "153 85 255",
        "--color-primary-700": "153 85 255",
        "--color-primary-800": "153 85 255",
        "--color-primary-900": "153 85 255",
        "--color-primary-950": "153 85 255",
      }
    `)
  })
})
