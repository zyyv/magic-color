<script lang='ts' setup>
import { computed, ref } from 'vue'
import { MagicColor } from 'magic-color'

const { hex } = defineProps<{ hex?: boolean }>()

const r = ref(0)
const g = ref(0)
const b = ref(0)

const color = computed(() => `rgb(${Math.round(255 * r.value)}, ${Math.round(255 * g.value)}, ${Math.round(255 * b.value)})`)

function toHexColor(value: number) {
  const hex = Math.round(255 * value).toString(16)
  return (hex.length === 1 ? `0${hex}` : hex).toUpperCase()
}
</script>

<template>
  <div fccc gap-2 mt-10>
    <div fcc gap-2>
      <PaletteControls v-model="r" :width="168" :height="12" type="alpha" color="#f00" />
      {{ hex ? toHexColor(r) : '' }}
    </div>
    <div fcc gap-2>
      <PaletteControls v-model="g" :width="168" :height="12" type="alpha" color="#0f0" />
      {{ hex ? toHexColor(g) : '' }}
    </div>
    <div fcc gap-2>
      <PaletteControls v-model="b" :width="168" :height="12" type="alpha" color="#00f" />
      {{ hex ? toHexColor(b) : '' }}
    </div>
    <div w-20 h-20 trans :style="{ backgroundColor: color }" b />
    {{ hex ? new MagicColor(color).hex().toUpperCase() : color }}
  </div>
</template>
