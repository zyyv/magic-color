<script setup lang="ts">
import type { ColorType } from 'magic-color'
import { mc } from 'magic-color'

const props = defineProps<{
  k: string
  v: string
  color: string
}>()

const { copy, copied } = useClipboard()
const type = inject<Ref<ColorType>>('type')!
const value = computed(() => {
  return mc(props.v).to(type.value).css().toUpperCase()
})
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
      color,
    }"
    @click="copy(value)"
  >
    <span>{{ k }}</span>
    <span>{{ value }}</span>
    <i pa top-2 right-2 op-0 group-hover-op-100 trans :class="copied ? 'i-carbon-checkmark' : 'i-carbon-bring-forward'" />
  </div>
</template>
