<script lang='ts' setup>
import { type RgbColor, createMagicColor, HexColor } from 'magic-color';
import { ref, defineProps, watch } from 'vue';
import { useControlBar } from './hook';

const props = defineProps<{
  width: number,
  height: number
  color: string
}>();
const { width, height } = props;

const ctx = ref<CanvasRenderingContext2D | null>(null);
const model = defineModel({ type: Number, default: 1 });

const { canvasRef, barRef, onMouseDown } = useControlBar({ onChange: (value: number) => model.value = value });

const wrapperStyle = ref<any>({
  position: 'relative',
  overflow: 'hidden',
  width: width + 'px',
  height: height + 'px',
})

const barStyle = computed<any>(() => ({
  position: 'absolute',
  top: '0',
  left: model.value * (width - height) + 'px',
  height: 12 + 'px',
  aspectRatio: '1 / 1',
  borderRadius: '50%',
  border: '2px solid white',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 0.6px',
  backgroundColor: getCurrentBgColor(),
  cursor: 'grab',
  userSelect: 'none',
}))

function getCurrentBgColor() {
    const rgb = createMagicColor(props.color).toRgb().value
    const c = rgb.map(i => (i + Math.round((255 - i) * (1 - model.value)))) as RgbColor
    return createMagicColor(c, 'rgb', model.value).toString()
}

function drawBackground(ctx: CanvasRenderingContext2D) {
  const bgGradient: CanvasGradient = ctx.createLinearGradient(0, 0, width, 0);
  bgGradient.addColorStop(0, '#fff');
  bgGradient.addColorStop(1, createMagicColor(props.color).toRgb().toString());
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  const maskGradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, height);
  maskGradient.addColorStop(0, 'transparent');
  maskGradient.addColorStop(1, '#000');
  ctx.fillStyle = maskGradient;
  ctx.fillRect(0, 0, width, height);
}

watch(() => props.color, () => {
  if (ctx.value){
    // 清空画布
    ctx.value.clearRect(0, 0, width, height);
    drawBackground(ctx.value)
  }
})

onMounted(() => {
  if (canvasRef.value) {
    ctx.value = canvasRef.value.getContext('2d');
    drawBackground(ctx.value!);
  }
})
</script>

<template>
  <div :style="wrapperStyle">
    <canvas ref="canvasRef" :width :height style="user-select: none;"></canvas>
    <div ref="barRef" @mousedown="onMouseDown" :style="barStyle"></div>
  </div>
</template>
