<script setup lang="ts">
import type { ColorType, ColorValue, Magicolor } from 'magic-color'
import { mc } from 'magic-color'
import { computed } from 'vue'
import PaletteControls from './PaletteControls.vue'
import PaletteInput from './PaletteInput.vue'
import PalettePanel from './PalettePanel.vue'
import PalettePreview from './PalettePreview.vue'

const props = defineProps<{ alpha?: number }>()
const emit = defineEmits<{ 'update:alpha': [value: number] }>()

const color = defineModel<string>('color', { default: '#ff0000' })
const type = defineModel<ColorType>('type', { default: 'hex' })

const currentColor = computed(() => mc(color.value))
const alpha = computed({
  get: () => props.alpha ?? currentColor.value.alpha,
  set: (value: number) => {
    if (props.alpha === undefined) {
      const updated = currentColor.value.clone()
      updated.alpha = value
      color.value = updated.css(type.value, value !== 1, false)
    }
    emit('update:alpha', value)
  },
})

function updateColor(updated: Magicolor<ColorType>, opacity?: number, round = true) {
  updated.alpha = opacity ?? alpha.value
  const includeAlpha = props.alpha === undefined && (opacity !== undefined || updated.alpha !== 1)
  color.value = updated.css(type.value, includeAlpha, round)
  if (opacity !== undefined)
    emit('update:alpha', opacity)
}

const panelType = computed(() => type.value === 'hsl' ? 'hsl' : 'hsb')
const panelColor = computed({
  get: () => panelType.value === 'hsl' ? currentColor.value.hsl(false) : currentColor.value.hsb(),
  set: (v) => {
    updateColor(mc(v, panelType.value), undefined, panelType.value !== 'hsl')
  },
})

const hue = computed({
  get: () => panelColor.value[0] / 360,
  set: (v) => {
    const [, saturation, lightnessOrBrightness] = panelColor.value
    panelColor.value = [Math.round(v * 360), saturation, lightnessOrBrightness]
  },
})

const controlColor = computed(() => currentColor.value.hex())

const displayBgColor = computed(() => {
  const mcColor = currentColor.value.clone()
  mcColor.alpha = alpha.value
  return mcColor.css('rgb', true)
})

const colorValue = computed({
  get: () => {
    if (type.value === 'hex' && props.alpha === undefined && currentColor.value.alpha !== 1)
      return currentColor.value.css('hex', true)
    return currentColor.value.value(type.value)
  },
  set: (v: ColorValue) => {
    const updated = mc(v, type.value)
    const digits = typeof v === 'string' ? v.replace(/^#/, '').length : 0
    updateColor(updated, digits === 4 || digits === 8 ? updated.alpha : undefined)
  },
})

function handlePanelChange({ x, y }: { x: number, y: number }) {
  panelColor.value = [panelColor.value[0], x, 100 - y]
}
</script>

<template>
  <div
    style="
      width: 240px;
      height: fit-content;
      background-color: #272727;
      padding-bottom: 8px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    "
  >
    <PalettePanel
      :width="240"
      :height="240"
      :bar-size="12"
      :color="panelColor"
      :type="panelType"
      @change="handlePanelChange"
    />
    <div
      style="
        display: flex;
        justify-content: space-evenly;
        padding: 8px 0;
      "
    >
      <PalettePreview
        :width="40"
        :height="40"
        :color="displayBgColor"
      />
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 2px 0;
        "
      >
        <PaletteControls
          v-model="hue"
          :width="168"
          :height="12"
          type="hue"
        />
        <PaletteControls
          v-model="alpha"
          :width="168"
          :height="12"
          :color="controlColor"
          type="alpha"
        />
      </div>
    </div>
    <PaletteInput
      v-model:alpha="alpha"
      v-model:color="colorValue"
      v-model:type="type"
    />
  </div>
</template>
