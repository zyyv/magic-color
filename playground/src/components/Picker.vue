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
  <h1 c-white>Magic Color</h1>
  <div fsc gap-2>
    <input type="text" v-model="color">
    <input type="color" name="color" id="color" v-model="color">
  </div>

  <ListColor :theme="results" />
</template>
