<script setup lang="ts">
import { mc } from 'magic-color'
import Container from './components/Container.vue'
import Header from './components/Header.vue'

// @ts-expect-error Provide `mc` in window
window.mc = mc

const value = ref(null)
</script>

<template>
  <Header />
  <Rating v-model="value" />
  <Container my-8 />
</template>
