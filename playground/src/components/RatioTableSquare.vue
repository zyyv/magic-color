<script setup lang="ts">
import { getContrastRatio } from 'magic-color'
import { computed, defineProps } from 'vue'

const props = defineProps<{
  backgroundColor: string
  color: string
  ratio: number
}>()

const calcRatio = computed(() => getContrastRatio(props.backgroundColor, props.color))
const isDisplay = computed(() => calcRatio.value >= props.ratio)
</script>

<template>
  <div class="squared" :class="[isDisplay ? '' : 'placeholder']" :style="isDisplay ? { backgroundColor, color } : {}">
    {{ isDisplay ? calcRatio : '' }}
  </div>
</template>

<style scoped>
.squared {
  --uno: fcc w-12 h-12 text-size-sm rd;
}

.placeholder {
  background-image: linear-gradient(45deg, rgb(255 255 255/6%) 26%, rgb(255 255 255/3%) 0, rgb(255 255 255/3%) 50%, rgb(255 255 255/6%) 0, rgb(255 255 255/6%) 75%, rgb(255 255 255/3%) 0, rgb(255 255 255/3%));
}
</style>
