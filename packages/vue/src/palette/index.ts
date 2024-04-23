import type { App } from 'vue'
import Palette from './Palette'
import PaletteControls from './PaletteControls'
import PaletteInput from './PaletteInput'
import PalettePanel from './PalettePanel'
import PalettePreview from './PalettePreview'

export {
  Palette,
  PaletteControls,
  PaletteInput,
  PalettePanel,
  PalettePreview,
}

export const PalettePlugin = {
  install: (app: App) => {
    app.component('Palette', Palette)
    app.component('PaletteControls', PaletteControls)
    app.component('PaletteInput', PaletteInput)
    app.component('PalettePanel', PalettePanel)
    app.component('PalettePreview', PalettePreview)
  },
}
