import { type PropType, computed, defineComponent, h, onMounted, ref, useModel, watch } from 'vue'
import type { RgbColor } from 'magic-color'
import { createMagicColor } from 'magic-color'
import { useControlBlock } from './hook'

export default defineComponent({
  props: {
    type: {
      type: String as PropType<'hue' | 'alpha'>,
      default: 'hue',
    },
    width: {
      type: Number,
      default: 168,
    },
    height: {
      type: Number,
      default: 12,
    },
    color: {
      type: String,
      default: '#f00',
    },
    modelValue: {
      type: Number,
      default: 1,
    },
  },
  emits: ['update:modelValue'],
  setup(props) {
    const model = useModel(props, 'modelValue')

    const width = ref(props.width)
    const height = ref(props.height)
    const color = ref(props.color)

    const { canvasRef, barRef, onMouseDown } = useControlBlock({ onChange: ({ x }) => model.value = x })

    const ctx = ref<CanvasRenderingContext2D | null>(null)

    const barStyle = computed(() => ({
      position: 'absolute',
      top: '0',
      left: `${model.value * Math.round(width.value - height.value)}px`,
      height: `${height.value}px`,
      aspectRatio: '1 / 1',
      borderRadius: '50%',
      border: '2px solid white',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 0.6px',
      backgroundColor: getCurrentBgColor(),
      cursor: 'grab',
      userSelect: 'none',
    }))

    const wrapperStyle = computed(() => ({
      position: 'relative',
      borderRadius: '9999px',
      overflow: 'hidden',
      width: `${width.value}px`,
    }))

    function getCurrentBgColor() {
      if (props.type === 'alpha') {
        const rgb = createMagicColor(props.color, 'hex', model.value).toRgb().value
        const c = rgb.map(i => i + Math.round((255 - i) * (1 - model.value))) as RgbColor
        return createMagicColor(c, 'rgb', model.value).toString()
      }
      else {
        return createMagicColor([Math.round(model.value * 360), 100, 100], 'hsb', 1).toHex().toString()
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

    onMounted(() => {
      const _ctx = canvasRef.value?.getContext('2d')
      if (_ctx) {
        ctx.value = _ctx
        props.type === 'hue' ? drawColorHue(ctx.value) : drawColorAlpha(ctx.value)
      }
    })

    watch(() => color.value, () => {
      if (ctx.value && props.type === 'alpha') {
        ctx.value.clearRect(0, 0, width.value, height.value)
        drawColorAlpha(ctx.value)
      }
    })

    return {
      canvasRef,
      barRef,
      wrapperStyle,
      barStyle,
      onMouseDown,
      model,
    }
  },
  render() {
    return h('div', { style: this.wrapperStyle }, [
      h('canvas', { ref: 'canvasRef', width: this.width, height: this.height, style: 'user-select: none;' }),
      h('div', { ref: 'barRef', style: this.barStyle, onMousedown: this.onMouseDown }),
    ])
  },
})
