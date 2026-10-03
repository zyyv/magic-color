<script setup lang="ts">
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
  <div class="extension-shell">
    <div class="extension-tabs" role="tablist" aria-label="Explore palette">
      <button
        v-for="p in panels" :key="p.label" type="button" role="tab"
        :id="`tab-${p.label}`" :aria-controls="'extension-panel'" :aria-selected="panel === p.label"
        :class="['extension-tab', { active: panel === p.label }]"
        @click="panel = p.label"
      ><i :class="p.icon" aria-hidden="true" />{{ p.label }}</button>
    </div>
    <div id="extension-panel" class="extension-content" role="tabpanel" :aria-labelledby="`tab-${panel}`">
      <Suspense :timeout="50">
        <component :is="cp" :colors="colors" :name :type="type" />
        <template #fallback>
          <div class="extension-loading">Loading palette details…</div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<style scoped>
.extension-shell { background: #fff; border: 1px solid #e0e5dc; border-radius: 16px; overflow: hidden; min-width: 0; }
.extension-tabs { display: flex; gap: 4px; flex-wrap: wrap; padding: 11px 16px; border-bottom: 1px solid #e9eee7; background: #fbfcfa; }
.extension-tab { border: 0; background: transparent; color: #829187; display: inline-flex; align-items: center; gap: 8px; border-radius: 7px; padding: 9px 14px; font-size: .78rem; font-weight: 650; transition: background .2s, color .2s; }
.extension-tab:hover { background: #edf3ec; color: #42614b; }
.extension-tab.active { color: #355d43; background: #eaf3e9; }
.extension-tab i { font-size: .95rem; }
.extension-content { padding: 32px; min-width: 0; overflow-x: auto; }
.extension-loading { padding: 35px; text-align: center; color: #829187; }
:global(.dark) .extension-shell { background: #1b1b1b; border-color: #323232; }
:global(.dark) .extension-tabs { background: #202020; border-color: #303030; }
:global(.dark) .extension-tab:hover { background: #2c2c2c; color: #eeeeee; }
:global(.dark) .extension-tab.active { background: #303030; color: #e9e9e9; }
@media (max-width: 680px) { .extension-tabs { padding: 9px; gap: 2px; } .extension-tab { flex: 1; justify-content: center; padding: 9px; font-size: .73rem; } .extension-content { padding: 18px; } }
</style>
