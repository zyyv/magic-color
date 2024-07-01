<p align="center">
<img src="https://raw.githubusercontent.com/zyyv/magic-color/main/public/logo.svg" style="width:100px;" />
</p>

<h1 align="center">magic-color</h1>

<p align="center">🌈 Make the colors be magical.</p>

<p align="center">
<a>
<img src="https://img.shields.io/npm/v/magic-color?style=flat&colorA=080f12&colorB=1fa669" alt="npm version" />
</a>
<a>
<img src="https://img.shields.io/npm/dm/magic-color?style=flat&colorA=080f12&colorB=1fa669" alt="npm downloads" />
</a>
<a>
<img src="https://api.netlify.com/api/v1/badges/53ddaf28-1a23-40b2-8ed9-7ed65931744c/deploy-status" alt="Netlify Status" />
</a>
<a>
<img src="https://img.shields.io/bundlephobia/minzip/magic-color?style=flat&colorA=080f12&colorB=1fa669&label=minzip" alt="bundle" />
</a>
<a>
<img src="https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669" alt="JSDocs" />
</a>
<a>
<img src="https://img.shields.io/github/license/zyyv/magic-color.svg?style=flat&colorA=080f12&colorB=1fa669" alt="License" />
</a>
</p>

<p align="center">
Watch my <a href="https://color.zyob.top/talk" target='_blank'>Talk</a> to learn more basic knowledge points.
</p>

## Features

- 💫 Support `multi-color model` conversion.
- 📦 Built-in color related components.
- 🚀 Provides utility toolset functions
- 🦄 Theme color generator and fully customizable.
- 🥳 `esm` only & 0 dependencies.

## Usage

```bash
pnpm add magic-color
```

A lot of color tool functions for you to use, providing easy conversion, generation, parsing, comparison, operation and other functions.

### basic

```ts
import { Magicolor } from 'magic-color'

const mc = new Magicolor('#ffffff') // auto parse color
const mc = new Magicolor('#ffffff', 'hex') // specify color type
const mc = new Magicolor('#ffffff', 'hex', 1) // specify opacity
```

`Magicolor` will automatically infer the input color type and the opacity.

Now support color types: `RGB`, `HEX`, `HSL`, `HSB`, `Keyword`.

You can convert between supported types.

```ts
mc.toRgb() // RGB value: [255, 255, 255]
mc.toHex() // HEX value: '#ffffff'
mc.toHsl() // HSL value: [0, 0, 100]
mc.toHsb() // HSB value: [0, 0, 100]

// or you can use the `to` method
mc.to('your transformed type')
```

If you want to output a color string, you can use the `toString` method, and you can choose whether you need opacity.

```ts
mc.toString() // '#ffffff'
// with opacity
mc.toString(true) // '#ffffffff'
mc.toRgb().toString(true) // 'rgba(255, 255, 255, 100%)'
```

Refer to the [type documentation](https://github.com/zyyv/magic-color/blob/main/src/core/types.ts) for more information.

And more...

### theme

Well, you can use it to create a theme color.

```ts
import { theme } from 'magic-color'

theme('#9955ff')

// Will output:
// {
//   "50": "#faf7ff",
//   "100": "#f5eeff",
//   "200": "#e6d5ff",
//   "300": "#d6bbff",
//   "400": "#b888ff",
//   "500": "#9955ff",
//   "600": "#8a4de6",
//   "700": "#5c3399",
//   "800": "#452673",
//   "900": "#2e1a4d",
//   "950": "#1f1133",
// }
```

And you can custom it with `themeOptions`.

```ts
export interface ThemeOptions {
  /**
   * Output color type
   *
   * @default same type as input
   */
  type?: ColorType

  /**
   * Custom render output color
   *
   * @param meta [name, color]
   * @returns [CustomedName, CustomedColor]
   */
  render?: (meta: [string, string]) => [string, string]
}
```

```ts
import { theme } from 'magic-color'

theme('#9955ff', {
  type: 'rgb',
  render: (meta) => {
    return [
      `--color-primary-${meta[0]}`,
      meta[1].replace(/rgb\((.*)\)/, '$1').replace(/,/g, ''),
    ]
  },
})

// Will output:
// {
//   "--color-primary-50": "250 247 255",
//   "--color-primary-100": "245 238 255",
//   "--color-primary-200": "230 213 255",
//   "--color-primary-300": "214 187 255",
//   "--color-primary-400": "184 136 255",
//   "--color-primary-500": "153 85 255",
//   "--color-primary-600": "138 77 230",
//   "--color-primary-700": "92 51 153",
//   "--color-primary-800": "69 38 115",
//   "--color-primary-900": "46 26 77",
//   "--color-primary-950": "31 17 51",
// }
```

## Credits

- [apca-w3](https://github.com/Myndex/apca-w3)
- [chroma.js](https://github.com/gka/chroma.js)
- [theme-colors](https://github.com/unjs/theme-colors)

## license

[MIT](./LICENSE)
