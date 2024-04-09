<script setup lang="ts">
import type { theme as themes } from 'magic-color'
import { getReadableTextColor } from 'magic-color'
import { defineProps } from 'vue'

defineProps<{
  theme: ReturnType<typeof themes>
}>()
</script>

<template>
  <ul fccc text-white mt-10>
    <li v-for="(v, k) in theme" :key="k" fccc w="100" h="12" :class="k === '500' ? 'scale-105' : 'scale-100'"
      important-duration-100 hover-scale-105 trans :style="{ backgroundColor: v, color: getReadableTextColor(v) }">
      <span>{{ v }}</span>
    </li>
  </ul>
</template>
