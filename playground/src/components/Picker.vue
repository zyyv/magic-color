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
  <h1 c-white>
    Magic Color
  </h1>
  <div fsc gap-2>
    <input v-model="color" type="text">
    <input id="color" v-model="color" type="color" name="color">
  </div>

  <ListColor :theme="results" />
</template>
