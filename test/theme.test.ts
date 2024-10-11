import type { ThemeMetas } from '../packages/magic-color/src/theme/types'
import { mc } from 'magic-color'
import { describe, expect, it } from 'vitest'

describe('theme colors', () => {
  const testColor = '#9955FF'

  it('simple theme', () => {
    expect(mc.theme(testColor)).toMatchInlineSnapshot(`
      {
        "100": "#eee8ff",
        "200": "#e0d5ff",
        "300": "#cab3ff",
        "400": "#b086ff",
        "50": "#f6f3ff",
        "500": "#9955FF",
        "600": "#8c30f7",
        "700": "#7e1ee3",
        "800": "#6918bf",
        "900": "#57169c",
        "950": "#360b6a",
      }
    `)
  })

  it('theme to other type', () => {
    expect(mc.theme(testColor, { type: 'rgb' })).toMatchInlineSnapshot(`
      {
        "100": "rgb(238 232 255)",
        "200": "rgb(224 213 255)",
        "300": "rgb(202 179 255)",
        "400": "rgb(176 134 255)",
        "50": "rgb(246 243 255)",
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
    expect(mc.theme(testColor, {
      type: 'rgb',
      render: (meta: [keyof ThemeMetas, string]) => {
        return [
          `--color-primary-${meta[0]}`,
          meta[1].replace(/rgb\((.*)\)/, '$1').replace(/,/g, ''),
        ]
      },
    })).toMatchInlineSnapshot(`
      {
        "--color-primary-100": "238 232 255",
        "--color-primary-200": "224 213 255",
        "--color-primary-300": "202 179 255",
        "--color-primary-400": "176 134 255",
        "--color-primary-50": "246 243 255",
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
