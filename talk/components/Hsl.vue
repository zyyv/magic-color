<script lang='ts' setup>
import { computed, ref } from 'vue'

const h = ref(0)
const s = ref(0)
const b = ref(0)

const bg = computed(() => {
  const c = `hsl(${Math.round(360 * h.value)}, ${Math.round(100 * s.value)}%, ${Math.round(100 * (1 - b.value))}%)`
  return c
})
</script>

<template>
  <div fccc gap-2 mt-10>
    <div fcc gap-2>
      h:
      <PaletteControls v-model="h" type="hue" />
      <div w-48px>
        {{ Math.round(360 * h) }}
      </div>
    </div>
    <div fcc gap-2>
      s:
      <PaletteControls v-model="s" type="alpha" color="#808080" />
      <div w-48px>
        {{ Math.round(100 * s) }}
      </div>
    </div>
    <div fcc gap-2>
      l:
      <PaletteControls v-model="b" type="alpha" color="#000" />
      <div w-48px>
        {{ Math.round(100 * b) }}
      </div>
    </div>
    <div w-20 h-20 trans :style="{ backgroundColor: bg }" b />
  </div>
</template>
