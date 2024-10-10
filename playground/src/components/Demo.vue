<script lang='ts' setup>
import type { ThemeMetas } from 'magic-color'

const props = defineProps<{
  colors: ThemeMetas
}>()

const inlineStyle = computed(() => {
  return Object.fromEntries(Object.entries(props.colors).map(([key, value]) => [`--color-${key}`, value]))
})
</script>

<template>
  <div w-700px :style="inlineStyle">
    Demo
    <button p="x2 y1" rd bg="$color-400" text="$color-50">
      button
    </button>
  </div>
</template>
