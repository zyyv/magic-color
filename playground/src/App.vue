<script setup lang="ts">
import Picker from './components/Picker.vue'

const color = ref('#9455d3')
const alpha = ref(1)
</script>

<template>
  <div fc pt-16 ma gap-20>
    <div fccc gap-8>
      <div>
        <h1 text-4xl fw-600 text-transparent bg-clip-text bg-gradient-to-r from-purple to-red>
          <a href="https://github.com/zyyv/magic-color" target="_blank">
            Magic Color
          </a>
          <span text-sm>palette.</span>
        </h1>
      </div>
      <Palette v-model:color="color" v-model:alpha="alpha" />

      <div fsc gap-2>
        <input v-model="color" type="text">
        <input id="color" v-model="color" type="color" name="color">
      </div>
    </div>
    <Picker v-model="color" />
  </div>
</template>
