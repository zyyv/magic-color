# @magic-color/vue

Magic color vue component.

## Install

```bash
pnpm add @magic-color/vue
```

## Usage

```ts
import { PalettePlugin } from '@magic-color/vue'
import { createApp } from 'vue'

const app = createApp(App)
app.use(PalettePlugin)
```

Or import components directly:

```ts
import { Palette } from '@magic-color/vue'
```

`v-model:color` includes transparency when used on its own. Bind `v-model:alpha` to control opacity separately. Pasting a HEX value with alpha updates the alpha model when it is bound.

## License

[MIT](../../LICENSE)
