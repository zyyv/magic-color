<script lang='ts' setup>
import { isDark, toggleDark } from '../composables/useDark'
</script>

<template>
  <button
    bg-inherit
    border-none
    @click="toggleDark"
  >
    <div
      v-if="!isDark"
      icon-btn
      i-carbon:light-filled
    />
    <div
      v-else
      icon-btn
      i-akar-icons:moon-fill
    />
  </button>
</template>
