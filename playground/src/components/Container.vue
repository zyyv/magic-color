<script lang='ts' setup>
import type { ColorType, ThemeMetas } from 'magic-color'
import { mc } from 'magic-color'
import Chart from './Chart.vue'
import Demo from './Demo.vue'
import Exports from './Exports.vue'
import RatioTable from './RatioTable.vue'
import ThemeColors from './ThemeColors.vue'

const color = defineModel<string>('color')
const alpha = defineModel<number>('alpha')
const type = defineModel<ColorType>('type', { default: 'hex' })
const colors = computed<ThemeMetas>(() => {
  try {
    return mc.theme(color.value!)
  }
  catch {
    return {} as any
  }
})
const colorName = computed(() => mc.nameOf(color.value!))

const panels = [
  { label: 'Chart', component: Chart, icon: 'i-carbon-chart-line-smooth' },
  { label: 'Contrast', component: RatioTable, icon: 'i-carbon-brightness-contrast' },
  { label: 'Export', component: Exports, icon: 'i-carbon-download' },
  { label: 'Demo', component: Demo, icon: 'i-carbon-demo' },

]
const panel = ref('Chart')
const cp = computed(() => panels.find(p => p.label === panel.value)!.component)

provide('type', type)
provide('color', color)
provide('colors', colors)
provide('colorName', colorName)
</script>

<template>
  <div>
    <ThemeColors />

    <div mt-8 fc gap-8>
      <div>
        <div fc mb-8>
          <ul b="~ #ccc dark:#3c3c3c" p1 rd fcc gap-2>
            <li
              v-for="p in panels" :key="p.label"
              text-sm px-2 cursor-pointer rd-sm
              :class="panel === p.label ? 'bg-orange/10 text-orange' : 'text-#666 dark:text-#999'"
              @click="panel = p.label"
            >
              <div :class="p.icon" icon-btn />
              <span ml-1 select-none>{{ p.label }}</span>
            </li>
          </ul>
        </div>
        <KeepAlive>
          <component :is="cp" :colors="colors" />
        </KeepAlive>
      </div>
      <Palette v-model:color="color" v-model:alpha="alpha" v-model:type="type" ps top-15 shadow />
    </div>
  </div>
</template>
