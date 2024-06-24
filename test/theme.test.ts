import { describe, expect, it } from 'vitest'
import { theme } from 'magic-color'

describe('theme colors', () => {
  const testColor = '#9955FF'

  it('simple theme', () => {
    expect(theme(testColor)).toMatchInlineSnapshot(`
      {
        "100": "#ffeae8",
        "200": "#00d8d4",
        "300": "#01b8b1",
        "400": "#009085",
        "50": "#00f4f2",
        "500": "#9955FF",
        "600": "#f74230",
        "700": "#e3301e",
        "800": "#bf2818",
        "900": "#9c2316",
        "950": "#6a140b",
      }
    `)
  })

  it('theme to other type', () => {
    expect(theme(testColor, { type: 'rgb' })).toMatchInlineSnapshot(`
      {
        "100": "rgb(255, 234, 232)",
        "200": "rgb(0, 216, 212)",
        "300": "rgb(1, 184, 177)",
        "400": "rgb(0, 144, 133)",
        "50": "rgb(0, 244, 242)",
        "500": "rgb(153, 85, 255)",
        "600": "rgb(247, 66, 48)",
        "700": "rgb(227, 48, 30)",
        "800": "rgb(191, 40, 24)",
        "900": "rgb(156, 35, 22)",
        "950": "rgb(106, 20, 11)",
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
        "--color-primary-100": "255 234 232",
        "--color-primary-200": "0 216 212",
        "--color-primary-300": "1 184 177",
        "--color-primary-400": "0 144 133",
        "--color-primary-50": "0 244 242",
        "--color-primary-500": "153 85 255",
        "--color-primary-600": "247 66 48",
        "--color-primary-700": "227 48 30",
        "--color-primary-800": "191 40 24",
        "--color-primary-900": "156 35 22",
        "--color-primary-950": "106 20 11",
      }
    `)
  })
})
