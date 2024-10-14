<script lang='ts' setup>
import { UnoColors } from '@magic-color/transformer/colors'
import ThemeColors from './ThemeColors.vue'

const colorMap = Object.fromEntries(
  Object.entries(UnoColors)
    .filter(([_, v]) => typeof v === 'object')
    .map(([k, v]) => {
      const numberKeyRe = /^\d{2,3}$/
      const keys = Object.keys(v).filter(k => numberKeyRe.test(k))
      return [k[0].toUpperCase() + k.slice(1).toLowerCase(), Object.fromEntries(keys.map(k => [k, (v as any)[k]]) as [string, string][])]
    }),
)
</script>

<template>
  <div space-y-4>
    <div v-for="(colors, name) in colorMap" :key="name">
      <ThemeColors show-arrow :name="name as string" :colors="colors as any" type="hex" />
    </div>
  </div>
</template>
