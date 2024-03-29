<script lang='ts' setup>
import { ref } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);

function drawMask(ctx: CanvasRenderingContext2D) {
  const gradient2: CanvasGradient = ctx.createLinearGradient(0, 0, 240, 0);
  gradient2.addColorStop(0, '#ffffff');
  gradient2.addColorStop(1, 'rgba(255,255,255,0)');

  ctx.fillStyle = gradient2;
  ctx.fillRect(0, 0, 240, 240);

  const gradient1: CanvasGradient = ctx.createLinearGradient(0, 240, 0, 0);
  gradient1.addColorStop(0, '#000000');
  gradient1.addColorStop(1, 'transparent');

  ctx.fillStyle = gradient1;
  ctx.fillRect(0, 0, 240, 240);
}

function drawBackground(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#9455d3'; // 这里以白色为例
  ctx.fillRect(0, 0, 240, 240);
}

function draw() {
  const ctx = canvas.value?.getContext('2d');
  if (ctx) {
    drawBackground(ctx);
    drawMask(ctx);
  }
}


onMounted(() => {
  draw();
})

</script>

<template>
  <div w="240px">
    <canvas ref="canvas" width="240px" height="240px"></canvas>
  </div>
</template>
