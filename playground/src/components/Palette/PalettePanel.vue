<script lang='ts' setup>
import { createMagicColor, HsbColor } from 'magic-color';
import { ref, defineProps, watch, type PropType } from 'vue';
import { useControlBlock } from './hook';

const props = withDefaults(defineProps<{
  width?: number,
  height?: number
  barSize?: number
  color: HsbColor
}>(), {
  height: 240,
  width: 240,
  barSize: 12
})

const { width, height, barSize } = props;
const emit = defineEmits<{
  (e: 'change', v: { x: number, y: number }): void
}>()

const ctx = ref<CanvasRenderingContext2D | null>(null);
const { canvasRef, barRef, onMouseDown } = useControlBlock({
  onChange: v => emit('change', { x: Math.round(v.x * 100), y: Math.round(v.y * 100) }),
  overflows: false
});

const wrapperStyle = ref<any>({
  position: 'relative',
  width: width + 'px',
  height: height + 'px',
})

const barStyle = computed<any>(() => ({
  position: 'absolute',
  left: props.color[1] + '%',
  top: (100 - props.color[2]) + '%',
  height: barSize + 'px',
  aspectRatio: '1 / 1',
  borderRadius: '50%',
  border: '2px solid white',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 0.6px',
  backgroundColor: createMagicColor([props.color[0], 100, 100], 'hsb').toHex().toString(),
  cursor: 'grab',
  userSelect: 'none',
}))

function drawBackground(ctx: CanvasRenderingContext2D) {
  const bgGradient: CanvasGradient = ctx.createLinearGradient(0, 0, width, 0);
  bgGradient.addColorStop(0, '#fff');
  bgGradient.addColorStop(1, createMagicColor([props.color[0], 100, 100], 'hsb').toHex().toString());
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  const maskGradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, height);
  maskGradient.addColorStop(0, 'transparent');
  maskGradient.addColorStop(1, '#000');
  ctx.fillStyle = maskGradient;
  ctx.fillRect(0, 0, width, height);
}

watch(() => props.color, () => {
  if (ctx.value) {
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
