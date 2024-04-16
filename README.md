<img src="https://raw.githubusercontent.com/zyyv/magic-color/main/public/logo.svg" style="width:100px;" />

# magic-color [![NPM version](https://img.shields.io/npm/v/magic-color?color=a1b858&label=)](https://www.npmjs.com/package/magic-color) [![Netlify Status](https://api.netlify.com/api/v1/badges/53ddaf28-1a23-40b2-8ed9-7ed65931744c/deploy-status)](https://app.netlify.com/sites/quiet-entremet-477970/deploys)

Make the colors be magical.

## Features

- 💫 Support `multi-color model` conversion.
- 📦 Built-in color related components.
- 🚀 Provides utility toolset functions
- 🦄 Theme color generator and fully customizable.
- 🥳 esm only & 0 dependencies.

## Usage

```bash
pnpm add magic-color
```

A lot of color tool functions for you to use, providing easy conversion, generation, parsing, comparison, operation and other functions.

### basic

```ts
import { MagicColor, createMagicColor, mc } from 'magic-color'

const mc = new MagicColor('#ffffff', 'hex', '1')
// or (mc is createMagicColor alias)
const mc = mc('#ffffff') // recommended
```

`createMagicColor` will automatically infer the input color type and the opacity.

Now support color types: `RGB`, `HEX`, `HSL`, `HSB`, `Keyword`.

You can convert between supported types.

```ts
mc.toRgb().value // [255, 255, 255]
mc.toHex().value // '#ffffff'
mc.toHsl().value // [0, 0, 100]
mc.toHsb().value // [0, 0, 100]
```

If you want to output a color string, you can use the `toString` method, and you can choose whether you need opacity.

```ts
mc.toRgb().toString() // 'rgb(255, 255, 255)'
// with opacity
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

- [theme-colors](https://github.com/unjs/theme-colors) - (*Better than it*)

## license

[MIT](./LICENSE)
