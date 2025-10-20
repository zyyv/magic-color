<script setup lang="ts">
import type { ColorType, ColorValue, HexColor, HsbColor } from 'magic-color'
import { mc } from 'magic-color'
import { computed } from 'vue'
import PaletteControls from './PaletteControls.vue'
import PaletteInput from './PaletteInput.vue'
import PalettePanel from './PalettePanel.vue'
import PalettePreview from './PalettePreview.vue'

const color = defineModel<string>('color', { default: '#ff0000' })
const alpha = defineModel<number>('alpha', { default: 1 })
const type = defineModel<ColorType>('type', { default: 'hex' })

const mcHsbColor = computed({
  get: () => mc(color.value).value('hsb'),
  set: (v) => {
    color.value = mc(v, 'hsb').css(type.value)
  },
})

const hue = computed({
  get: () => mcHsbColor.value[0] / 360,
  set: (v) => {
    const hsb = [...mcHsbColor.value]
    hsb[0] = Math.round(v * 360)
    mcHsbColor.value = hsb as HsbColor
  },
})

const controlColor = computed(() => mc(color.value).hex())

const displayBgColor = computed(() => {
  const mcColor = mc(color.value)
  mcColor.alpha = alpha.value
  return mcColor.css('rgb', true)
})

const colorValue = computed({
  get: () => {
    return mc(color.value).value(type.value)
  },
  set: (v: ColorValue) => {
    color.value = mc(v as HexColor, type.value).css()
  },
})

function handlePanelChange({ x, y }: { x: number, y: number }) {
  mcHsbColor.value = [mcHsbColor.value[0], x, 100 - y]
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
      :color="mcHsbColor"
      :type="type"
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
