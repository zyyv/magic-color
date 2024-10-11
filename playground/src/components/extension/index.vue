<script lang='ts' setup>
import type { ColorType, ThemeMetas } from 'magic-color'
import ThemeColors from '../ThemeColors.vue'
import Chart from './Chart.vue'
import Demo from './Demo.vue'
import Exports from './Exports.vue'
import RatioTable from './RatioTable.vue'

defineProps<{
  colors: ThemeMetas
  name: string
  type: ColorType
}>()

const panels = [
  { label: 'Chart', component: Chart, icon: 'i-carbon-chart-line-smooth' },
  { label: 'Contrast', component: RatioTable, icon: 'i-carbon-brightness-contrast' },
  { label: 'Export', component: Exports, icon: 'i-carbon-download' },
  { label: 'Demo', component: Demo, icon: 'i-carbon-demo' },

]
const panel = ref('Chart')
const cp = computed(() => panels.find(p => p.label === panel.value)!.component)
</script>

<template>
  <div>
    <ThemeColors :name :colors />

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
          <component :is="cp" :colors="colors" :name />
        </KeepAlive>
      </div>
      <slot />
    </div>
  </div>
</template>
