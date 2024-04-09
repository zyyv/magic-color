<script setup lang="ts">
import { theme } from 'magic-color'

const color = defineModel<string>()

const results = computed(() => {
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
    <ThemeButtons :theme="results" />
    <ThemeHue :theme="results" />
  </div>
</template>
