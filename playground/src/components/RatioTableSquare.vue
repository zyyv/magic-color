<script setup lang="ts">
import { calcAPCA, getWCAGContrastRatio } from 'magic-color'
import { computed, defineProps } from 'vue'

const props = defineProps<{
  backgroundColor: string
  color: string
  ratio: number
  type: 'WCAG' | 'APCA'
}>()

const calcRatio = computed(() => {
  if (props.type === 'WCAG')
    return getWCAGContrastRatio(props.backgroundColor, props.color)

  else if (props.type === 'APCA')
    return calcAPCA(props.backgroundColor, props.color)

  return 'N/A'
})
const isDisplay = computed(() => {
  if (props.type === 'WCAG')
    return Number(calcRatio.value) >= props.ratio

  else if (props.type === 'APCA')
    return Math.abs(Number(calcRatio.value)) >= props.ratio

  return false
})
const text = computed(() => {
  if (isDisplay.value) {
    if (props.type === 'WCAG')
      return calcRatio.value

    else if (props.type === 'APCA')
      return (Number(calcRatio.value.toString())).toFixed(1)
  }
  return ''
})
</script>

<template>
  <div class="squared" trans :class="[isDisplay ? '' : 'placeholder']" :style="isDisplay ? { backgroundColor, color } : {}">
    {{ text }}
  </div>
</template>

<style scoped>
.squared {
  --uno: fcc w-12 h-12 text-size-12px rd;
}

.placeholder {
  background-image: linear-gradient(45deg, rgb(255 255 255/6%) 26%, rgb(255 255 255/3%) 0, rgb(255 255 255/3%) 50%, rgb(255 255 255/6%) 0, rgb(255 255 255/6%) 75%, rgb(255 255 255/3%) 0, rgb(255 255 255/3%));
}
</style>
