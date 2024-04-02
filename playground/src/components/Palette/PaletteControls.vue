<script lang='ts' setup>
import { type RgbColor, createMagicColor, HexColor } from 'magic-color';
import { defineProps, defineModel, onMounted, ref } from 'vue';
import { useControlBar } from './hook';

const { width, height, color, type } = withDefaults(defineProps<{
  width: number,
  height: number
  color: string
  type: 'hue' | 'alpha'
}>(), {
  type: 'hue',
  height: 12,
  width: 168,
  color: '#f00'
})
const model = defineModel({ type: Number, default: 1 });

const { canvasRef, barRef, onMouseDown } = useControlBar({ onChange: (value: number) => model.value = value });

const BarWidth = height;
const BarHeight = height;
const barStyle = computed<any>(() => ({
  position: 'absolute',
  top: '0',
  left: model.value * (width - height) + 'px',
  height: height + 'px',
  aspectRatio: '1 / 1',
  borderRadius: '50%',
  border: '2px solid white',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 0.6px',
  backgroundColor: getCurrentBgColor(),
  cursor: 'grab',
  userSelect: 'none',
}))

const wrapperStyle = ref<any>({
  position: 'relative',
  borderRadius: '9999px',
  overflow: 'hidden',
  width: width + 'px',
})

function getCurrentBgColor() {
  if (type === 'alpha') {
    const rgb = createMagicColor(color, 'hex', model.value).toRgb().value
    const c = rgb.map(i => (i + Math.round((255 - i) * (1 - model.value)))) as RgbColor
    return createMagicColor(c, 'rgb', model.value).toString()
  } else {
    return color
  }
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

function drawColorHue(ctx: CanvasRenderingContext2D) {
  const gradient: CanvasGradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, '#f00');
  gradient.addColorStop(1 / 6, '#ff0');
  gradient.addColorStop(2 / 6, '#0f0');
  gradient.addColorStop(3 / 6, '#0ff');
  gradient.addColorStop(4 / 6, '#00f');
  gradient.addColorStop(5 / 6, '#f0f');
  gradient.addColorStop(1, '#f00');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

onMounted(() => {
  const ctx = canvasRef.value?.getContext('2d');
  if (ctx) {
    type === 'hue' ? drawColorHue(ctx) : drawColorAlpha(ctx);
  }
})
</script>

<template>
  <div :style="wrapperStyle">
    <canvas ref="canvasRef" :width :height style="user-select: none;"></canvas>
    <div ref="barRef" @mousedown="onMouseDown" :style="barStyle"></div>
  </div>

  <div>{{ model }}</div>
</template>
