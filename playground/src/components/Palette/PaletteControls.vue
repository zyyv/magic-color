<script lang='ts' setup>
const { width, height } = defineProps<{
  width: number;
  height: number;
}>();


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

function initBar() {
  const bar = barRef.value;
  if (bar) {
    let isDragging = false;
    let startX = 0;
    let startLeft = 0;
    bar.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startLeft = bar.offsetLeft;
      barStyle.value.cursor = 'grabbing';
      barStyle.value.transition = 'none';
    });
    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const dis = startLeft + e.clientX - startX;
        const left = Math.min(Math.max(dis, 0), width - height)
        const precent = left / (width - height)
        console.log(precent)
        barStyle.value.left = left + 'px';
      }
    });
    window.addEventListener('mouseup', () => {
      isDragging = false;
      barStyle.value.cursor = 'grab';
      barStyle.value.transition = 'all 0.2s ease-in-out';
    });
  }
}

function handleClick(e: MouseEvent) {
  const dis = e.offsetX - height / 2;
  const left = Math.min(Math.max(dis, 0), width - height)
  barStyle.value.left = left + 'px';
}

onMounted(() => {
  initBar()
  const ctx = canvasRef.value?.getContext('2d');
  if (ctx)
    drawColorControl(ctx);
})

</script>

<template>
  <div @click.stop="handleClick" :style="wrapperStyle">
    <canvas ref="canvasRef" :width :height></canvas>
    <div ref="barRef" :style="barStyle"></div>
  </div>
</template>
