import { describe, expect, it } from 'vitest'
import { theme } from '../src'

describe('theme colors', () => {
  const testColor = '#f00'

  it('simple theme', () => {
    expect(theme(testColor)).toMatchInlineSnapshot(`
      {
        "100": "#ffe6e6",
        "200": "#ffbfbf",
        "300": "#ff9999",
        "400": "#ff4d4d",
        "50": "#fff2f2",
        "500": "#ff0000",
        "600": "#e60000",
        "700": "#990000",
        "800": "#730000",
        "900": "#4d0000",
        "950": "#330000",
      }
    `)
  })

  it('theme to other type', () => {
    expect(theme(testColor, { type: 'hsl' })).toMatchInlineSnapshot(`
      {
        "100": "hsl(0, 100%, 95%)",
        "200": "hsl(0, 100%, 87%)",
        "300": "hsl(0, 100%, 80%)",
        "400": "hsl(0, 100%, 65%)",
        "50": "hsl(0, 100%, 97%)",
        "500": "hsl(0, 100%, 50%)",
        "600": "hsl(0, 100%, 45%)",
        "700": "hsl(0, 100%, 30%)",
        "800": "hsl(0, 100%, 23%)",
        "900": "hsl(0, 100%, 15%)",
        "950": "hsl(0, 100%, 10%)",
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
        "100": "255 230 230",
        "200": "255 191 191",
        "300": "255 153 153",
        "400": "255 77 77",
        "50": "255 242 242",
        "500": "255 0 0",
        "600": "230 0 0",
        "700": "153 0 0",
        "800": "115 0 0",
        "900": "77 0 0",
        "950": "51 0 0",
      }
    `)
  })
})
