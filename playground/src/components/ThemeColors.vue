<script setup lang="ts">
import type { ThemeMetas } from 'magic-color'
import { mc } from 'magic-color'
import ThemeColorItem from './ThemeColorItem.vue'

const colors = inject<ComputedRef<ThemeMetas>>('colors')!

function getReadable(v: string) {
  return mc.readable({
    bgColor: v,
    textColor: colors.value[100],
    fallbackTextColor: colors.value[900],
  })
}
</script>

<template>
  <div>
    <ul fcc gap-1>
      <li v-for="(v, k) in colors" :key="k">
        <ThemeColorItem :k="k as unknown as string" :v="v" :color="getReadable(v)" />
      </li>
    </ul>
  </div>
</template>
