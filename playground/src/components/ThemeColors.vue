<script setup lang="ts">
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import { mc } from 'magic-color'
import CodeSnippet from './CodeSnippet.vue'
import ColorInsights from './ColorInsights.vue'
import ColorOperations from './ColorOperations.vue'
import Extension from './extension/index.vue'
import PaletteTable from './PaletteTable.vue'

const { color, alpha, exportType, colors, name, channelHeaders, tableData, copyColor, copied, copiedColor } = useTheme()
const pickerOpen = ref(false)
const pickerAnchor = useTemplateRef<HTMLElement>('pickerAnchor')
const baseHex = computed(() => {
  try {
    return mc(color.value).hex()
  }
  catch {
    return '#529e82'
  }
})
const paletteCode = computed(() => `mc.theme(${JSON.stringify(color.value)}, { type: ${JSON.stringify(exportType.value)} })\nmc(${JSON.stringify(color.value)}).css(${JSON.stringify(exportType.value)})`)
const activeShade = computed(() => {
  if (!tableData.value.length)
    return null
  const exact = tableData.value.find(row => mc(row.color).hex().toLowerCase() === baseHex.value.toLowerCase())
  if (exact)
    return exact.shade
  return tableData.value.reduce((best, row) => mc.deltaE(baseHex.value, row.color) < mc.deltaE(baseHex.value, best.color) ? row : best).shade
})

onClickOutside(pickerAnchor, () => pickerOpen.value = false)
onKeyStroke('Escape', () => pickerOpen.value = false)

function randomColor() {
  color.value = mc.random()
}
</script>

<template>
  <main id="main-content" class="workspace">
    <section class="intro">
      <div>
        <h2>Find the right <em>shade.</em></h2>
        <p>Build a complete color scale from one idea. Explore its values, test contrast, and export it for your project.</p>
      </div>
    </section>

    <section class="editor-surface" aria-labelledby="palette-title">
      <div class="editor-heading">
        <div class="editor-title">
          <h3 id="palette-title">
            {{ name || 'Custom color' }}
          </h3><span class="color-code">{{ baseHex.toUpperCase() }}</span>
        </div>
        <div class="editor-actions">
          <button class="plain-action" type="button" @click="randomColor">
            <i class="i-carbon-renew" /> Surprise me
          </button>
          <div ref="pickerAnchor" class="editor-popover-anchor">
            <button class="plain-action" type="button" aria-haspopup="dialog" :aria-expanded="pickerOpen" aria-controls="palette-editor" @click="pickerOpen = !pickerOpen">
              <i class="i-carbon-settings-adjust" /> Edit color
            </button>
            <div v-if="pickerOpen" id="palette-editor" class="palette-popover" role="dialog" aria-label="Edit base color">
              <Palette v-model:color="color" v-model:alpha="alpha" v-model:type="exportType" />
            </div>
          </div>
        </div>
      </div>

      <div class="spectrum" aria-label="Generated color scale">
        <button v-for="row in tableData" :key="row.shade" class="spectrum-step" type="button" :style="{ backgroundColor: row.color, color: mc.readable(row.color) }" :title="`Copy ${row.shade}: ${row.color}`" @click="copyColor(row.color)">
          <span>{{ row.shade }}</span>
        </button>
      </div>

      <div class="table-heading">
        <div><p>Click a swatch or row to copy its value.</p></div>
        <label class="format-select">Color format
          <select v-model="exportType" aria-label="Color format"><option v-for="type in mc.supports" :key="type" :value="type">{{ type.toUpperCase() }}</option></select>
        </label>
      </div>
      <PaletteTable :rows="tableData" :headers="channelHeaders" :active-shade="activeShade" :copied-color="copied && copiedColor ? copiedColor : null" @copy="copyColor" />
      <CodeSnippet class="palette-code" :code="paletteCode" />
    </section>

    <ColorInsights :color="baseHex" :colors="colors" />

    <ColorOperations :color="baseHex" @use-color="color = $event" />

    <section class="explore-section">
      <div class="section-heading">
        <h3>Take it further.</h3><p>Inspect your palette, check accessibility, or take the values into your code.</p>
      </div>
      <Extension :colors="colors" :name="name" :type="exportType" />
    </section>
  </main>
</template>

<style scoped>
.palette-code { padding: 0 32px 30px; }
@media (max-width: 680px) { .palette-code { padding: 0 20px 24px; } }
</style>
