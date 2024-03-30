<script lang='ts' setup>
import { ref, defineProps, watch } from 'vue';

const { width, height, color } = defineProps<{
  width: number,
  height: number
  color: string
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

function drawBackground(ctx: CanvasRenderingContext2D) {
  const bgGradient: CanvasGradient = ctx.createLinearGradient(0, 0, width, 0);
  bgGradient.addColorStop(0, '#fff');
  bgGradient.addColorStop(1, color);
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  const maskGradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, height);
  maskGradient.addColorStop(0, 'transparent');
  maskGradient.addColorStop(1, '#000');
  ctx.fillStyle = maskGradient;
  ctx.fillRect(0, 0, width, height);
}

watch(() => color, () => drawBackground(ctx.value!))

onMounted(() => {
  if (canvasRef.value) {
    ctx.value = canvasRef.value.getContext('2d');
    drawBackground(ctx.value!);
  }
})
</script>

<template>
  <canvas ref="canvasRef" :width :height></canvas>
</template>
