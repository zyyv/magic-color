<script lang='ts' setup>
import type { ColorType, ThemeMetas } from 'magic-color'

defineProps<{
  colors: ThemeMetas
  name: string
  type: ColorType
}>()

const Chart = defineAsyncComponent(() => import('./Chart.vue'))
const Demo = defineAsyncComponent(() => import('./Demo.vue'))
const Exports = defineAsyncComponent(() => import('./Exports.vue'))
const RatioTable = defineAsyncComponent(() => import('./RatioTable.vue'))

const panels = [
  { label: 'Chart', component: Chart, icon: 'i-carbon-chart-line-smooth' },
  { label: 'Contrast', component: RatioTable, icon: 'i-carbon-brightness-contrast' },
  { label: 'Export', component: Exports, icon: 'i-carbon-download' },
  { label: 'Demo', component: Demo, icon: 'i-carbon-demo' },
]

const panel = ref(panels[0].label)
const cp = computed(() => panels.find(p => p.label === panel.value)!.component)
</script>

<template>
  <div fc gap-8>
    <div>
      <div fc mb-8>
        <ul b="~ #ccc dark:#3c3c3c" p1 rd fcc gap-2>
          <li
            v-for="p in panels" :key="p.label" text-sm px-2 cursor-pointer rd-sm
            :class="panel === p.label ? 'bg-orange/10 text-orange' : 'text-#666 dark:text-#999'"
            @click="panel = p.label"
          >
            <div :class="p.icon" icon-btn />
            <span ml-1 select-none>{{ p.label }}</span>
          </li>
        </ul>
      </div>
      <!-- <KeepAlive> -->
      <Suspense :timeout="50">
        <component :is="cp" :colors="colors" :name :type="type" />
        <template #fallback>
          <div size-full fcc gap-1 animate-pulse>
            <i text-lg inline-block i-carbon-circle-dash animate-spin />
            <span>Loading···</span>
          </div>
        </template>
      </Suspense>
      <!-- </KeepAlive> -->
    </div>
    <slot />
  </div>
</template>
