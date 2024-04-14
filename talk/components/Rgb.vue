<script lang='ts' setup>
import { computed, ref } from 'vue'

const r = ref(0)
const g = ref(0)
const b = ref(0)

const color = computed(() => `rgb(${Math.round(255 * r.value)}, ${Math.round(255 * g.value)}, ${Math.round(255 * b.value)})`)
</script>

<template>
  <div fccc gap-2 mt-10>
    <PaletteControls v-model="r" type="alpha" color="#f00" />
    <PaletteControls v-model="g" type="alpha" color="#0f0" />
    <PaletteControls v-model="b" type="alpha" color="#00f" />
    <div w-20 h-20 trans :style="{ backgroundColor: color }" b />
  </div>
</template>
