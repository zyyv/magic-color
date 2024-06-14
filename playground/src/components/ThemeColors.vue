<script setup lang="ts">
import type { theme } from 'magic-color'
import { defineProps } from 'vue'
import ThemeColorItem from './ThemeColorItem.vue'

defineProps<{
  colors: ReturnType<typeof theme>
}>()
</script>

<template>
  <div>
    <ul fcc gap-1>
      <li
        v-for="(v, k) in colors"
        :key="k"
      >
        <ThemeColorItem :k="k" :v="v" :colors="colors" />
      </li>
    </ul>
  </div>
</template>
