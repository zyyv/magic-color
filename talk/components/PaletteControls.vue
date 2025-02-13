<script lang='ts' setup>
import type { RgbColor } from 'magic-color'
import { mc } from 'magic-color'
import { computed, defineModel, onMounted, ref, watch, withDefaults } from 'vue'
import { useControlBlock } from '../../packages/vue/src/palette/hook'

const props = withDefaults(defineProps<{
  width?: number
  height?: number
  color?: string
  type: 'hue' | 'alpha'
}>(), {
  type: 'hue',
  height: 12,
  width: 168,
  color: '#f00',
})
const { width, height, type } = props
const model = defineModel({ type: Number, default: 1 })

const ctx = ref<CanvasRenderingContext2D | null>(null)
const { canvasRef, barRef, onMouseDown } = useControlBlock({ onChange: ({ x }) => model.value = x })

const barStyle = computed<any>(() => ({
  position: 'absolute',
  top: '0',
  left: `${model.value * Math.round(width - height)}px`,
  height: `${height}px`,
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
  width: `${width}px`,
})

function getCurrentBgColor() {
  if (type === 'alpha') {
    const rgb = mc(props.color, 'hex', model.value).rgb()
    const c = rgb.map(i => i + Math.round((255 - i) * (1 - model.value))) as RgbColor
    return mc(c, 'rgb', model.value).css()
  }
  else {
    return mc([Math.round(model.value * 360), 100, 100], 'hsb', 1).hex()
  }
}

function drawColorAlpha(ctx: CanvasRenderingContext2D) {
  for (let col = 0; col < width / 3; col++) {
    for (let row = 0; row < height / 3; row++) {
      ctx.fillStyle = (col + row) % 2 === 0 ? 'lightgray' : 'white'
      ctx.fillRect(col * 3, row * 3, 3, 3)
    }
  }

  const gradient: CanvasGradient = ctx.createLinearGradient(0, 0, width, 0)
  gradient.addColorStop(0, 'transparent')
  gradient.addColorStop(1, props.color)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
}

function drawColorHue(ctx: CanvasRenderingContext2D) {
  const gradient: CanvasGradient = ctx.createLinearGradient(0, 0, width, 0)
  gradient.addColorStop(0, '#ff0000')
  gradient.addColorStop(1 / 6, '#ffff00')
  gradient.addColorStop(2 / 6, '#00ff00')
  gradient.addColorStop(3 / 6, '#00ffff')
  gradient.addColorStop(4 / 6, '#0000ff')
  gradient.addColorStop(5 / 6, '#ff00ff')
  gradient.addColorStop(1, '#ff0000')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
}

onMounted(() => {
  const _ctx = canvasRef.value?.getContext('2d')
  if (_ctx) {
    ctx.value = _ctx
    if (type === 'hue')
      drawColorHue(ctx.value)
    else
      drawColorAlpha(ctx.value)
  }
})

watch(() => props.color, () => {
  if (ctx.value && type === 'alpha') {
    ctx.value.clearRect(0, 0, width, height)
    drawColorAlpha(ctx.value)
  }
})
</script>

<template>
  <div :style="wrapperStyle">
    <canvas ref="canvasRef" :width :height style="user-select: none;" />
    <div ref="barRef" :style="barStyle" @mousedown="onMouseDown" />
  </div>
</template>
