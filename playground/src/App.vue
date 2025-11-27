<script setup lang="ts">
import { mc } from 'magic-color'
import Container from './components/Container.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'

// @ts-expect-error Provide `mc` in window
window.mc = mc
</script>

<template>
  <Header />
  <Container my-8 />
  <Footer />
</template>
