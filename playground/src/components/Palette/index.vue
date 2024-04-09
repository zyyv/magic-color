<script lang='ts' setup>
import { ColorValue, HexColor, HsbColor, HslColor, RgbColor, createMagicColor } from 'magic-color'
import { computed, defineModel, ref } from 'vue'

const color = defineModel('color', { type: String, default: '#ff0000' })
const alpha = defineModel('alpha', { type: Number, default: 1 })

const type = ref(createMagicColor(color.value).type)

const mcHsbColor = computed({
  get: () => createMagicColor(color.value).toHsb().value,
  set: (v: HsbColor) => {
    switch (type.value) {
      case 'hex':
        color.value = createMagicColor(v, 'hsb').toHex().toString()
        break
      case 'rgb':
        color.value = createMagicColor(v, 'hsb').toRgb().toString()
        break
      case 'hsl':
        color.value = createMagicColor(v, 'hsb').toHsl().toString()
        break
      case 'hsb':
        color.value = createMagicColor(v, 'hsb').toString()
        break
      default:
        break
    }
  }
})

const hue = computed({
  get: () => mcHsbColor.value[0] / 360,
  set: v => {
    const hsb = [...mcHsbColor.value] as HsbColor
    hsb[0] = Math.round(v * 360)
    mcHsbColor.value = hsb
  }
})

const controlColor = computed(() => createMagicColor(color.value).toHex().toString())

const displayBgColor = computed(() => {
  const mcColor = createMagicColor(color.value)
  mcColor.opacity = alpha.value
  return mcColor.toRgb().toString(true)
})
const colorValue = computed({
  get: () => {
    switch (type.value) {
      case 'hex':
        return createMagicColor(color.value).toHex().value
      case 'rgb':
        return createMagicColor(color.value).toRgb().value
      case 'hsl':
        return createMagicColor(color.value).toHsl().value
      case 'hsb':
        return createMagicColor(color.value).toHsb().value
      default:
        return ''
    }
  },
  set: (v: ColorValue) => {
    switch (type.value) {
      case 'hex':
        color.value = createMagicColor(v as HexColor, 'hex').toString()
        break
      case 'rgb':
        color.value = createMagicColor(v as RgbColor, 'rgb').toString()
        break
      case 'hsl':
        color.value = createMagicColor(v as HslColor, 'hsl').toString()
        break
      case 'hsb':
        color.value = createMagicColor(v as HsbColor, 'hsb').toString()
        break
      default:
        break
    }
  }
})

function handlePanelChange({ x, y }: { x: number, y: number }) {
  mcHsbColor.value = [mcHsbColor.value[0], x, 100 - y]
}
</script>
<template>
  <div style="width: 240px;" m-10>
    <PalettePanel :width="240" :height="240" :bar-size="12" :color="mcHsbColor" @change="handlePanelChange" />
    <div flex justify-evenly py="2">
      <PalettePreview :width="40" :height="40" :color="displayBgColor" />
      <!-- <div w="40px" h="40px" rd of-hidden :style="{ backgroundColor: displayBgColor }"></div> -->
      <div fbc flex-col py="2px">
        <PaletteControls :width="168" :height="12" type="hue" v-model="hue" />
        <PaletteControls :width="168" :height="12" :color="controlColor" type="alpha" v-model="alpha" />
      </div>
    </div>
    <PaletteInput v-model:alpha="alpha" v-model:color="colorValue" v-model:type="type" />
  </div>
</template>
