<script lang='ts' setup>
import { HsbColor, createMagicColor } from 'magic-color'
import { computed } from 'vue'


const color = defineModel('color', { type: String, default: '#ff0000' })
const type = defineModel('type', { type: String, default: 'hex' })
const alpha = defineModel('alpha', { type: Number, default: 1 })

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
    hsb[0] = v * 360
    switch (type.value) {
      case 'hex':
        color.value = createMagicColor(hsb, 'hsb').toHex().toString()
        break
      case 'rgb':
        color.value = createMagicColor(hsb, 'hsb').toRgb().toString()
        break
      case 'hsl':
        color.value = createMagicColor(hsb, 'hsb').toHsl().toString()
        break
      case 'hsb':
        color.value = createMagicColor(hsb, 'hsb').toString()
        break
      default:
        break
    }
  }
})

const controlColor = computed(() => createMagicColor(color.value).toHex().toString())
</script>

<template>
  <div style="width: 240px;">
    <PalettePanel :width="240" :height="240" :bar-size="12" v-model:color="mcHsbColor" />
    <div flex justify-evenly py="2">
      <div w="40px" h="40px" rd :style="{backgroundColor: color}" ></div>
      <div fbc flex-col py="2px">
        <PaletteControls :width="168" :height="12" :color="controlColor" type="hue" v-model="hue" />
        <PaletteControls :width="168" :height="12" :color="controlColor" type="alpha" v-model="alpha" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped></style>
