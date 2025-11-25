import { PalettePlugin } from '@magic-color/vue'
import Aura from '@primeuix/themes/aura'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import App from './App.vue'
import 'uno.css'
import './style.css'

createApp(App)
  .use(PalettePlugin)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        prefix: 'p',
        darkModeSelector: 'system',
        cssLayer: false,
      },
    },
  })
  .mount('#app')
