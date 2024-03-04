<script setup lang="ts">
import { theme } from 'magic-color'
const color = ref('#9455d3')

const results = computed(() => {
  try {
    return theme(color.value)
  } catch (e) {
    return {} as any
  }
})

</script>

<template>
  <h1>Magic Color</h1>
  <input type="text" v-model="color">

  <ListColor :theme="results" />
</template>
