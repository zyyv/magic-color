import { createApp } from 'vue'

// import { PalettePlugin } from '../../packages/vue/'
import { PalettePlugin } from '@magic-color/vue'

// eslint-disable-next-line ts/prefer-ts-expect-error
// @ts-ignore *.vue
import App from './App.vue'
import 'uno.css'
import './style.css'

createApp(App).use(PalettePlugin).mount('#app')
