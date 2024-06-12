<script setup lang="ts">
import type { theme } from 'magic-color'
import { getReadableTextColor } from 'magic-color'
import { defineProps } from 'vue'

const { colors } = defineProps<{
  colors: ReturnType<typeof theme>
}>()

const { copy } = useClipboard()
</script>

<template>
  <ul fcc gap-1>
    <li
      v-for="(v, k) in colors"
      :key="k"
      important-duration-100
      hover-scale-105 trans fccc
      p-4 rd-md h-14 md:h-24 text-sm
      font-mono cursor-pointer :style="{ backgroundColor: v, color: getReadableTextColor({ bgColor: v, textColor: colors[100], fallbackTextColor: colors[900] }) }"
      @click="copy(v)"
    >
      <span>{{ k }}</span>
      <span>{{ v }}</span>
    </li>
  </ul>
</template>
