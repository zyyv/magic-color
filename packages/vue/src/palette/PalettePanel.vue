<script setup lang="ts">
import type { ColorType, HsbColor } from 'magic-color'
import { Magicolor } from 'magic-color'
import { computed, onMounted, ref, watch } from 'vue'
import { useControlBlock } from './hook'

interface Props {
  width?: number
  height?: number
  barSize?: number
  color: HsbColor
  type?: ColorType
}

const props = withDefaults(defineProps<Props>(), {
  width: 240,
  height: 240,
  barSize: 12,
  type: 'hex',
})

const emit = defineEmits<{
  change: [{ x: number, y: number }]
}>()

const ctx = ref<CanvasRenderingContext2D | null>(null)
const { canvasRef, barRef, onMouseDown } = useControlBlock({
  onChange: v => emit('change', { x: Math.round(v.x * 100), y: Math.round(v.y * 100) }),
  overflows: false,
})

const wrapperStyle = computed(() => ({
  position: 'relative',
  width: `${props.width}px`,
  height: `${props.height}px`,
} as any))

const barStyle = computed(() => ({
  position: 'absolute',
  left: `${props.color[1]}%`,
  top: `${100 - props.color[2]}%`,
  height: `${props.barSize}px`,
  aspectRatio: '1 / 1',
  borderRadius: '50%',
  border: '2px solid white',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 0.6px',
  backgroundColor: new Magicolor(props.color, props.type === 'hsl' ? 'hsl' : 'hsb').hex(),
  cursor: 'grab',
  userSelect: 'none',
} as any))

function drawBackground(ctx: CanvasRenderingContext2D) {
  if (props.type === 'hsl') {
    const image = ctx.createImageData(props.width, props.height)
    const data = image.data

    for (let y = 0; y < props.height; y++) {
      const l = 100 - (y / props.height) * 100
      for (let x = 0; x < props.width; x++) {
        const h = props.color[0]
        const s = (x / props.width) * 100
        const [r, g, b] = new Magicolor([h, s, l], 'hsl').rgb()
        const idx = (y * props.width + x) * 4
        data[idx] = r
        data[idx + 1] = g
        data[idx + 2] = b
        data[idx + 3] = 255
      }
    }

    ctx.putImageData(image, 0, 0)
    return
  }

  const bgGradient: CanvasGradient = ctx.createLinearGradient(0, 0, props.width, 0)
  bgGradient.addColorStop(0, '#fff')
  bgGradient.addColorStop(1, new Magicolor([props.color[0], 100, 100], 'hsb').hex())
  ctx.fillStyle = bgGradient
  ctx.fillRect(0, 0, props.width, props.height)

  const maskGradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, props.height)
  maskGradient.addColorStop(0, 'transparent')
  maskGradient.addColorStop(1, '#000')
  ctx.fillStyle = maskGradient
  ctx.fillRect(0, 0, props.width, props.height)
}

watch(() => [props.color[0], props.type], (current, old) => {
  if (current[0] === old[0] && current[1] === old[1])
    return

  if (ctx.value) {
    ctx.value.clearRect(0, 0, props.width, props.height)
    drawBackground(ctx.value)
  }
})

onMounted(() => {
  if (canvasRef.value) {
    ctx.value = canvasRef.value.getContext('2d')
    drawBackground(ctx.value!)
  }
})
</script>

<template>
  <div :style="wrapperStyle">
    <canvas
      ref="canvasRef"
      :width="width"
      :height="height"
      style="user-select: none;"
    />
    <div
      ref="barRef"
      :style="barStyle"
      @mousedown="onMouseDown"
    />
  </div>
</template>
