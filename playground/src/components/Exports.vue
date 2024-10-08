<script lang='ts' setup>
import type { ThemeMetas } from 'magic-color'

const colorName = inject<ComputedRef<string>>('colorName')!
const colors = inject<ComputedRef<ThemeMetas>>('colors')!

const highlightCode = computedAsync(async () => {
  const key = colorName.value.toLowerCase().replace(/\s+/g, '-')
  const c = JSON.stringify({ [key]: colors.value }, null, 2)
  const formatted = (await prettierCode(c, 'babel')).trim()
  return highlight(formatted, 'javascript')
})
</script>

<template>
  <div w-700px>
    <div v-html="highlightCode" />
  </div>
</template>
