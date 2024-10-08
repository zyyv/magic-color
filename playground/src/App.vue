<script setup lang="ts">
import { mc } from 'magic-color'
import { ref } from 'vue'
import Container from './components/Container.vue'

const color = ref(import.meta.env.DEV ? '#529e82' : mc.random())
const alpha = ref(1)

// @ts-expect-error mc in window
window.mc = mc
</script>

<template>
  <header fcc py-4 pr>
    <h1 text-4xl fw-600 text-transparent bg-clip-text bg-gradient-to-r from-purple to-red fcc gap-2>
      <img inline-block w-10 src="/logo.svg" alt="logo">
      <span>
        Magic Color
      </span>
    </h1>

    <div pa right-10 fcc gap-2>
      <button
        i-carbon-light
        dark:i-carbon-moon
        icon-btn
        title="Toggle Color Mode"
        @click="toggleDark"
      />
      <a
        i-carbon-logo-github icon-btn
        href="https://github.com/zyyv/magic-color"
        target="_blank"
        title="GitHub"
      />
    </div>
  </header>
  <Container v-model:color="color" v-model:alpha="alpha" font-sans mt-8 />
</template>
