<script lang='ts' setup>
import { computed, ref } from 'vue'
import { MagicColor } from 'magic-color'

const h = ref(0)
const s = ref(1)
const b = ref(0)

const bg = computed(() => {
  const c = `hsb(${Math.round(360 * h.value)}, ${Math.round(100 * s.value)}%, ${Math.round(100 * (1 - b.value))}%)`
  return new MagicColor(c).rgb()
})
</script>

<template>
  <div fccc gap-2 mt-10>
    <div fcc gap-2>
      h:
      <PaletteControls v-model="h" :width="168" :height="12" type="hue" />
      <div w-36px>
        {{ Math.round(360 * h) }}
      </div>
    </div>
    <div fcc gap-2>
      s:
      <PaletteControls v-model="s" :width="168" :height="12" type="alpha" color="#fff" />
      <div w-36px>
        {{ Math.round(100 * s) }}
      </div>
    </div>
    <div fcc gap-2>
      b:
      <PaletteControls v-model="b" :width="168" :height="12" type="alpha" color="#000" />
      <div w-36px>
        {{ Math.round(100 * b) }}
      </div>
    </div>
    <div w-20 h-20 trans ml--24px :style="{ backgroundColor: bg }" b />
  </div>
</template>
