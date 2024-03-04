<script setup lang="ts">
import { theme as themes } from 'magic-color'

defineProps<{
  theme: ReturnType<typeof themes>
}>()
</script>

<template>
  <ul fcc text-white gap-8 mt-10>
    <li fccc v-for="(v, k) in theme" :key="k">
      <div w-10 h-10 :style="{ backgroundColor: v }"></div>
      <span>{{ k }}</span>
    </li>
  </ul>
</template>
