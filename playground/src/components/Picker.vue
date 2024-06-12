<script setup lang="ts">
import { theme } from 'magic-color'
import ThemeColors from './ThemeColors.vue'

const color = defineModel<string>()
const colors = computed(() => {
  try {
    return theme(color.value!)
  }
  catch (e) {
    return {} as any
  }
})
</script>

<template>
  <div fccc>
    <ThemeColors :colors="colors" />
  </div>
</template>
