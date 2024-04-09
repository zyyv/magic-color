<script setup lang="ts">
const color = ref('#9455d3')
const alpha = ref(1)
</script>

<template>
  <Palette v-model:color="color" v-model:alpha="alpha" />
  <div h="20px" />
  <Picker v-model="color" />
</template>
