<script setup lang="ts">
import { ref } from 'vue'
import { randomColor } from 'magic-color'
import Picker from './components/Picker.vue'
import Hash from './components/Hash.vue'

const color = ref(import.meta.env.DEV ? '#529e82' : randomColor())
const alpha = ref(1)
</script>

<template>
  <header fc py-4>
    <h1 text-4xl fw-600 text-transparent bg-clip-text bg-gradient-to-r from-purple to-red>
      <a href="https://github.com/zyyv/magic-color" target="_blank">
        <img inline-block w-10 src="/logo.svg" alt="logo">
        Magic Color
      </a>
      <span text-sm>palette.</span>
    </h1>
  </header>
  <div mt-8 fcc gap-8>
    <Palette v-model:color="color" v-model:alpha="alpha" shadow />
    <Hash w-60 />
  </div>
  <Picker v-model="color" mt-8 />
</template>
