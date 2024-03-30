<script lang='ts' setup>
const { width, height } = defineProps<{
  width: number;
  height: number;
}>();

const noop = () => { };
const canvasRef = ref<HTMLCanvasElement | null>(null);
const barRef = ref<HTMLDivElement | null>(null);

const barStyle = ref<any>({
  position: 'absolute',
  top: '0',
  left: '0',
  height: height + 'px',
  aspectRatio: '1 / 1',
  borderRadius: '50%',
  border: '2px solid white',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 0.6px',
  // backgroundColor: getColorByAlpha(color, alpha.value),
  backgroundColor: 'red',
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

function drawColorControl(ctx: CanvasRenderingContext2D) {
  const gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 168, 0);
  gradient.addColorStop(0, '#f00');
  gradient.addColorStop(1 / 6, '#ff0');
  gradient.addColorStop(2 / 6, '#0f0');
  gradient.addColorStop(3 / 6, '#0ff');
  gradient.addColorStop(4 / 6, '#00f');
  gradient.addColorStop(5 / 6, '#f0f');
  gradient.addColorStop(1, '#f00');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 168, 12);
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
  const dis = startLeft.value + e.clientX - startX.value;
  const left = Math.min(Math.max(dis, 0), width - height)
  const precent = left / (width - height)
  console.log(precent)
  barStyle.value.left = left + 'px';
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
  barStyle.value.left = left + 'px';
}

onMounted(() => {
  const ctx = canvasRef.value?.getContext('2d');
  if (ctx)
    drawColorControl(ctx);
})

</script>

<template>
  <div :style="wrapperStyle">
    <canvas @click.stop="handleClick" ref="canvasRef" :width :height></canvas>
    <div @click.stop="noop" @mousedown="handleMouseDown" ref="barRef" :style="barStyle"></div>
  </div>
</template>
