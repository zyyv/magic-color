<script setup lang="ts">
import type { ThemeMetas } from 'magic-color'
import CodeSnippet from '../CodeSnippet.vue'
import RatioTableSquare from './RatioTableSquare.vue'

const props = defineProps<{ colors: ThemeMetas }>()
type ContrastType = 'WCAG' | 'APCA'

const type = ref<ContrastType>('APCA')
const threshold = ref(0)
const options = computed(() => type.value === 'WCAG'
  ? [{ label: 'All', value: 1 }, { label: 'AA 4.5+', value: 4.5 }, { label: 'AAA 7+', value: 7 }]
  : [{ label: 'All', value: 0 }, { label: 'Lc 75+', value: 75 }, { label: 'Lc 90+', value: 90 }])
const entries = computed(() => [
  { label: 'White', color: '#ffffff' },
  ...Object.entries(props.colors).map(([label, color]) => ({ label, color })),
  { label: 'Black', color: '#000000' },
])
const selectedPair = shallowRef({ foreground: 'White', background: '500' })
const selectedForeground = computed(() => entries.value.find(entry => entry.label === selectedPair.value.foreground) ?? entries.value[0])
const selectedBackground = computed(() => entries.value.find(entry => entry.label === selectedPair.value.background) ?? entries.value[1] ?? entries.value[0])
const ratioCode = computed(() => {
  const foreground = JSON.stringify(selectedForeground.value.color)
  const background = JSON.stringify(selectedBackground.value.color)
  return type.value === 'WCAG' ? `mc.wcag(${foreground}, ${background})` : `mc.apca(${foreground}, ${background})`
})

watch(type, () => threshold.value = options.value[0].value)
</script>

<template>
  <section class="ratio-panel" aria-label="Contrast matrix">
    <div class="ratio-heading">
      <div><h3>Contrast matrix</h3><p>Text colors down the side · background colors across the top</p></div><span>{{ type === 'APCA' ? 'Lightness contrast (Lc)' : 'WCAG 2 contrast ratio' }}</span>
    </div>
    <div class="ratio-controls">
      <div class="ratio-segment" role="group" aria-label="Contrast algorithm">
        <button v-for="option in (['APCA', 'WCAG'] as const)" :key="option" type="button" :class="{ active: type === option }" :aria-pressed="type === option" @click="type = option">
          {{ option }}
        </button>
      </div>
      <div class="ratio-segment" role="group" aria-label="Minimum contrast">
        <button v-for="option in options" :key="option.value" type="button" :class="{ active: threshold === option.value }" :aria-pressed="threshold === option.value" @click="threshold = option.value">
          {{ option.label }}
        </button>
      </div>
    </div>
    <div class="ratio-scroll">
      <table class="ratio-table">
        <thead>
          <tr>
            <th scope="col">
              Text ↓<br>Background →
            </th><th v-for="entry in entries" :key="entry.label" scope="col">
              {{ entry.label }}
            </th>
          </tr>
        </thead><tbody>
          <tr v-for="foreground in entries" :key="foreground.label">
            <th scope="row">
              {{ foreground.label }}
            </th><td v-for="background in entries" :key="background.label">
              <RatioTableSquare :type="type" :background-color="background.color" :color="foreground.color" :ratio="threshold" :selected="selectedPair.foreground === foreground.label && selectedPair.background === background.label" @select="selectedPair = { foreground: foreground.label, background: background.label }" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="ratio-note">
      APCA preserves text/background direction. A negative Lc indicates light text on a dark background.
    </p>
    <p class="ratio-code-context">
      {{ selectedForeground.label }} text on {{ selectedBackground.label }} background · Select a cell to update the code.
    </p>
    <CodeSnippet class="ratio-code" :code="ratioCode" />
  </section>
</template>

<style scoped>
.ratio-panel { min-width: 0; }
.ratio-heading { display: flex; justify-content: space-between; align-items: start; gap: 12px; }
.ratio-heading h3 { margin: 0 0 5px; color: #344b3c; font-size: 1.12rem; letter-spacing: -.04em; }
.ratio-heading p { margin: 0; color: #94a298; font-size: .76rem; }
.ratio-heading > span { color: #97a79a; font-family: 'Commit Mono', monospace; font-size: .65rem; white-space: nowrap; }
.ratio-controls { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin: 22px 0 17px; }
.ratio-segment { display: flex; gap: 3px; background: #f2f6f1; padding: 3px; border-radius: 7px; }
.ratio-segment button { border: 0; border-radius: 5px; color: #829286; background: transparent; padding: 7px 11px; font-size: .73rem; font-weight: 600; transition: background .2s, color .2s; }
.ratio-segment button.active { background: #fff; color: #3e6549; box-shadow: 0 1px 4px #3154391a; }
.ratio-scroll { overflow-x: auto; }
.ratio-table { border-collapse: separate; border-spacing: 3px; width: 100%; min-width: 830px; table-layout: fixed; }
.ratio-table th { color: #78897c; font-family: 'Commit Mono', monospace; font-weight: 500; font-size: .65rem; text-align: center; }
.ratio-table thead th { height: 48px; }
.ratio-table thead th:first-child { font-size: .55rem; line-height: 1.3; }
.ratio-table tbody th { width: 68px; }
.ratio-table td { padding: 0; }
.ratio-note { margin: 15px 0 0; color: #9ca99e; font-size: .7rem; }
.ratio-code-context { margin: 22px 0 10px; color: #6e8474; font-size: .76rem; }
.ratio-code { max-width: 100%; }
:global(html.dark .ratio-heading h3) { color: #e8e8e8; }
:global(html.dark .ratio-segment) { background: #282828; }
:global(html.dark .ratio-segment button.active) { background: #3a3a3a; color: #eeeeee; }
</style>
