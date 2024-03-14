<script setup lang="ts">
import { theme as themes } from 'magic-color'

defineProps<{
  theme: ReturnType<typeof themes>
}>()
</script>

<template>
  <ul fcc text-white gap-8 mt-10>
    <li fccc v-for="(v, k) in theme" :key="k">
      <button px-3 py-2 text-sm rd-md :style="{ backgroundColor: v }">button</button>
      <span>{{ k }}</span>
      <span>{{ v }}</span>
    </li>
  </ul>
</template>
