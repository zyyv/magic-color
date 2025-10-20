<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Props {
  width?: number
  height?: number
  color: string
}

const props = withDefaults(defineProps<Props>(), {
  width: 40,
  height: 40,
})

const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)

function drawBg(ctx: CanvasRenderingContext2D) {
  for (let col = 0; col < props.width / 3; col++) {
    for (let row = 0; row < props.height / 3; row++) {
      ctx.fillStyle = (col + row) % 2 === 0 ? 'lightgray' : 'white'
      ctx.fillRect(col * 3, row * 3, 3, 3)
    }
  }
}

onMounted(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d')
    drawBg(ctx.value!)
  }
})
</script>

<template>
  <div style="position: relative; border-radius: 4px; overflow: hidden;">
    <canvas
      ref="canvas"
      :width="width"
      :height="height"
    />
    <div
      :style="`position: absolute; inset: 0; background-color: ${color};`"
    />
  </div>
</template>
