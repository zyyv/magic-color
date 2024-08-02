import { createApp } from 'vue'
import { PalettePlugin } from '@magic-color/vue'

// @ts-ignore *.vue
import App from './App.vue'
import 'uno.css'
import './style.css'

createApp(App).use(PalettePlugin).mount('#app')
