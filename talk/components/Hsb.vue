<script lang='ts' setup>
import { computed, ref } from 'vue'
import { createMagicColor } from 'magic-color'

const h = ref(0)
const s = ref(0)
const b = ref(0)

const bg = computed(() => {
  const c = `hsb(${Math.round(360 * h.value)}, ${Math.round(100 * s.value)}%, ${Math.round(100 * (1 - b.value))}%)`
  return createMagicColor(c).toRgb().toString()
})
</script>

<template>
  <div fccc gap-2 mt-10>
    <div fcc gap-2>
      <PaletteControls v-model="h" type="hue" />
      <div w-48px>
        {{ Math.round(360 * h) }}
      </div>
    </div>
    <div fcc gap-2>
      <PaletteControls v-model="s" type="alpha" color="#fff" />
      <div w-48px>
        {{ Math.round(100 * s) }}
      </div>
    </div>
    <div fcc gap-2>
      <PaletteControls v-model="b" type="alpha" color="#000" />
      <div w-48px>
        {{ Math.round(100 * b) }}
      </div>
    </div>
    <div w-20 h-20 trans :style="{ backgroundColor: bg }" b />
  </div>
</template>
