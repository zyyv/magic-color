<script setup lang="ts">
import { hash } from 'magic-color'
import Picker from './components/Picker.vue'

const color = ref('#9455d3')
const alpha = ref(1)

const hashInput = ref('')
const hashValue = computed(() => {
  if (hashInput.value) {
    return hash(hashInput.value).hex
  }
  return '👈 Hash'
})
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

      <div w-full fsc gap-4>
        <input
          v-model="hashInput" text-sm w-40 px-2 py-1 rd
          b="~ #3c3c3c" bg-transparent c-white
          outline-none
          type="text"
          placeholder="Enter a string to hash"
          placeholder-text="gray op-60"
        >

        <p font-mono text-transparent bg-clip-text bg-gradient-to-r from-red to-purple>
          {{ hashValue }}
        </p>
      </div>
    </div>
    <Picker v-model="color" />
  </div>
</template>
