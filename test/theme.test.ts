import { describe, expect, it } from 'vitest'
import { theme } from 'magic-color'

describe('theme colors', () => {
  const testColor = '#9955FF'

  it('simple theme', () => {
    expect(theme(testColor)).toMatchInlineSnapshot(`
      {
        "100": "#ece8fe",
        "200": "#dcd5fe",
        "300": "#c4b5fd",
        "400": "#a68afa",
        "50": "#f5f3ff",
        "500": "#8a5bf6",
        "600": "#7b3aed",
        "700": "#6c27d9",
        "800": "#5a20b6",
        "900": "#4c1c95",
        "950": "#9955FF",
      }
    `)
  })

  it('theme to other type', () => {
    expect(theme(testColor, { type: 'rgb' })).toMatchInlineSnapshot(`
      {
        "100": "rgb(236 232 254)",
        "200": "rgb(220 213 254)",
        "300": "rgb(196 181 253)",
        "400": "rgb(166 138 250)",
        "50": "rgb(245 243 255)",
        "500": "rgb(138 91 246)",
        "600": "rgb(123 58 237)",
        "700": "rgb(108 39 217)",
        "800": "rgb(90 32 182)",
        "900": "rgb(76 28 149)",
        "950": "rgb(153 85 255)",
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
        "--color-primary-100": "236 232 254",
        "--color-primary-200": "220 213 254",
        "--color-primary-300": "196 181 253",
        "--color-primary-400": "166 138 250",
        "--color-primary-50": "245 243 255",
        "--color-primary-500": "138 91 246",
        "--color-primary-600": "123 58 237",
        "--color-primary-700": "108 39 217",
        "--color-primary-800": "90 32 182",
        "--color-primary-900": "76 28 149",
        "--color-primary-950": "153 85 255",
      }
    `)
  })
})
