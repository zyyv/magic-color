<script lang='ts' setup>
import { type RgbColor, createMagicColor, HexColor } from 'magic-color';
import { defineProps, defineModel, onMounted, ref } from 'vue';

const noop = () => { };
const { width, height, color } = defineProps<{
  width: number;
  height: number;
  color: HexColor;
}>();
const alpha = defineModel({ type: Number, default: 1 });

const canvasRef = ref<HTMLCanvasElement | null>(null);
const barRef = ref<HTMLDivElement | null>(null);

const barStyle = ref<any>({
  position: 'absolute',
  top: '0',
  left: alpha.value * (width - height) + 'px',
  height: height + 'px',
  aspectRatio: '1 / 1',
  borderRadius: '50%',
  border: '2px solid white',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 0.6px',
  backgroundColor: getColorByAlpha(color, alpha.value),
  cursor: 'grab',
  userSelect: 'none',
  transition: 'all 0.2s ease-in-out',
})

const wrapperStyle = ref<any>({
  position: 'relative',
  borderRadius: '9999px',
  overflow: 'hidden',
  userSelect: 'none',
  width: width + 'px',
})

function getColorByAlpha(color: HexColor, alpha: number) {
  const rgb = createMagicColor(color, 'hex', alpha).toRgb().value
  const c = rgb.map(i => (i + Math.round((255 - i) * (1 - alpha)))) as RgbColor
  return createMagicColor(c, 'rgb', alpha).toString()
}

function drawColorAlpha(ctx: CanvasRenderingContext2D) {
  for (let col = 0; col < width / 3; col++) {
    for (let row = 0; row < height / 3; row++) {
      ctx.fillStyle = (col + row) % 2 === 0 ? 'lightgray' : 'white';
      ctx.fillRect(col * 3, row * 3, 3, 3);
    }
  }

  const gradient: CanvasGradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, 'transparent');
  gradient.addColorStop(1, color);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

// listeners
const startX = ref(0);
const startLeft = ref(0);

function handleMouseDown(e: MouseEvent) {
  startX.value = e.clientX;
  startLeft.value = barRef.value!.offsetLeft;
  barStyle.value.cursor = 'grabbing';
  barStyle.value.transition = 'none';

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
}

function handleMouseMove(e: MouseEvent) {
  e.preventDefault()
  const dis = startLeft.value + e.clientX - startX.value;
  const left = Math.min(Math.max(dis, 0), width - height)
  const opacity = left / (width - height)
  alpha.value = opacity;
  barStyle.value.left = left + 'px';
  barStyle.value.backgroundColor = getColorByAlpha(color, opacity);
}

function handleMouseUp() {
  barStyle.value.cursor = 'grab';
  barStyle.value.transition = 'all 0.2s ease-in-out';

  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mouseup', handleMouseUp);
}

function handleClick(e: MouseEvent) {
  const dis = e.offsetX - height / 2;
  const left = Math.min(Math.max(dis, 0), width - height)
  const opacity = left / (width - height)
  alpha.value = opacity;
  barStyle.value.left = left + 'px';
  barStyle.value.backgroundColor = getColorByAlpha(color, opacity);
}

onMounted(() => {
  const ctx = canvasRef.value?.getContext('2d');
  if (ctx)
    drawColorAlpha(ctx);
})
</script>

<template>
  <div :style="wrapperStyle">
    <canvas @click.stop="handleClick" ref="canvasRef" :width :height style="user-select: none;"></canvas>
    <div ref="barRef" @click.stop="noop" @mousedown="handleMouseDown" :style="barStyle"></div>
  </div>
</template>
