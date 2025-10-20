import type { App } from 'vue'
import Palette from './Palette.vue'
import PaletteControls from './PaletteControls.vue'
import PaletteInput from './PaletteInput.vue'
import PalettePanel from './PalettePanel.vue'
import PalettePreview from './PalettePreview.vue'

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
