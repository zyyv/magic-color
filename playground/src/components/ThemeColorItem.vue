<script setup lang="ts">
import type { ThemeMetas } from 'magic-color'
import { mc } from 'magic-color'

defineProps<{
  k: string
  v: string
  colors: ThemeMetas
}>()

const { copy, copied } = useClipboard()
</script>

<template>
  <div
    pr
    class="group"
    important-duration-100
    hover-scale-105 trans fccc
    p-4 rd-md h-14 md:h-24 text-sm w-22
    cursor-pointer
    :style="{
      backgroundColor: v,
      color: mc.readable({
        bgColor: v,
        textColor: colors[100],
        fallbackTextColor: colors[900],
      }),
    }"
    @click="copy(v.toUpperCase())"
  >
    <span>{{ k }}</span>
    <span>{{ v.toUpperCase() }}</span>
    <i pa top-2 right-2 op-0 group-hover-op-100 trans :class="copied ? 'i-carbon-checkmark' : 'i-carbon-bring-forward'" />
  </div>
</template>
