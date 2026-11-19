<script setup lang="ts">
import type { RgbColor } from 'magic-color'
import { Magicolor } from 'magic-color'
import { computed, onMounted, watch } from 'vue'
import { useControlBlock } from './hook'

interface Props {
  disable?: boolean
  type?: 'hue' | 'alpha' | 'normal'
  width?: number
  height?: number
  color?: string
  barColor?: string
  wrapperColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  disable: false,
  type: 'hue',
  width: 168,
  height: 12,
  color: '#f00',
  barColor: '#f87171',
  wrapperColor: '#3c3c3c',
})

const model = defineModel<number>({ default: 1 })

const { canvasRef, barRef, onMouseDown } = useControlBlock({
  disable: () => props.disable,
  onChange: ({ x }) => model.value = Number(x.toFixed(2)),
})

const barStyle = computed(() => ({
  position: 'absolute',
  top: '0',
  left: `${model.value * Math.max(0, props.width - props.height)}px`,
  height: `${props.height}px`,
  aspectRatio: '1 / 1',
  borderRadius: '50%',
  border: '2px solid white',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 0.6px',
  backgroundColor: getBarBgColor(),
  cursor: props.disable ? 'not-allowed' : 'grab',
  userSelect: 'none',
  ...((props.disable || props.type === 'normal') ? { transition: 'left 0.3s ease-in-out' } : {}),
} as any))

const wrapperStyle = computed(() => ({
  position: 'relative',
  borderRadius: '9999px',
  overflow: 'hidden',
  width: `${props.width}px`,
} as any))

function getBarBgColor() {
  switch (props.type) {
    case 'alpha': {
      const rgb = new Magicolor(props.color, 'hex', model.value).value('rgb')
      const c = rgb.map(i => i + Math.round((255 - i) * (1 - model.value))) as RgbColor
      return new Magicolor(c, 'rgb', model.value).css()
    }
    case 'hue':
      return new Magicolor([Math.round(model.value * 360), 100, 100], 'hsb', 1).hex()
    default:
      return props.barColor
  }
}

function drawColorAlpha(ctx: CanvasRenderingContext2D) {
  for (let col = 0; col < props.width / 3; col++) {
    for (let row = 0; row < props.height / 3; row++) {
      ctx.fillStyle = (col + row) % 2 === 0 ? 'lightgray' : 'white'
      ctx.fillRect(col * 3, row * 3, 3, 3)
    }
  }

  const gradient: CanvasGradient = ctx.createLinearGradient(0, 0, props.width, 0)
  gradient.addColorStop(0, 'transparent')
  gradient.addColorStop(1, props.color)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, props.width, props.height)
}

function drawColorHue(ctx: CanvasRenderingContext2D) {
  const gradient: CanvasGradient = ctx.createLinearGradient(0, 0, props.width, 0)
  gradient.addColorStop(0, '#ff0000')
  gradient.addColorStop(1 / 6, '#ffff00')
  gradient.addColorStop(2 / 6, '#00ff00')
  gradient.addColorStop(3 / 6, '#00ffff')
  gradient.addColorStop(4 / 6, '#0000ff')
  gradient.addColorStop(5 / 6, '#ff00ff')
  gradient.addColorStop(1, '#ff0000')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, props.width, props.height)
}

function drawColorNormal(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = props.wrapperColor
  ctx.fillRect(0, 0, props.width, props.height)
}

function redraw() {
  const ctx = canvasRef.value?.getContext('2d')
  if (!ctx)
    return

  ctx.clearRect(0, 0, props.width, props.height)
  switch (props.type) {
    case 'hue':
      drawColorHue(ctx)
      break
    case 'alpha':
      drawColorAlpha(ctx)
      break
    default:
      drawColorNormal(ctx)
      break
  }
}

onMounted(redraw)
watch(() => [props.width, props.height, props.type, props.color, props.wrapperColor], redraw, { flush: 'post' })
</script>

<template>
  <div :style="wrapperStyle">
    <canvas
      ref="canvasRef"
      :width="props.width"
      :height="props.height"
      style="user-select: none;"
    />
    <div
      ref="barRef"
      :style="barStyle"
      @mousedown="onMouseDown"
    />
  </div>
</template>
