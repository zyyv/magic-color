import { computed, defineComponent, h, onMounted, ref, watch } from 'vue'
import type { HsbColor } from 'magic-color'
import { Magicolor } from 'magic-color'
import { useControlBlock } from './hook'

export default /* #__PURE__ */ defineComponent({
  props: {
    width: {
      type: Number,
      default: 240,
    },
    height: {
      type: Number,
      default: 240,
    },
    barSize: {
      type: Number,
      default: 12,
    },
    color: {
      type: Array as unknown as PropType<HsbColor>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const ctx = ref<CanvasRenderingContext2D | null>(null)
    const { canvasRef, barRef, onMouseDown } = useControlBlock({
      onChange: v => emit('change', { x: Math.round(v.x * 100), y: Math.round(v.y * 100) }),
      overflows: false,
    })

    const wrapperStyle = computed(() => ({
      position: 'relative',
      width: `${props.width}px`,
      height: `${props.height}px`,
    }))

    const barStyle = computed(() => ({
      position: 'absolute',
      left: `${props.color[1]}%`,
      top: `${100 - props.color[2]}%`,
      height: `${props.barSize}px`,
      aspectRatio: '1 / 1',
      borderRadius: '50%',
      border: '2px solid white',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 0.6px',
      backgroundColor: new Magicolor(props.color, 'hsb').hex(),
      cursor: 'grab',
      userSelect: 'none',
    }))

    function drawBackground(ctx: CanvasRenderingContext2D) {
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

    watch(() => props.color, () => {
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

    return {
      canvasRef,
      barRef,
      wrapperStyle,
      barStyle,
      onMouseDown,
    }
  },
  render() {
    return h('div', { style: this.wrapperStyle }, [
      h('canvas', { ref: 'canvasRef', width: this.width, height: this.height, style: 'user-select: none;' }),
      h('div', { ref: 'barRef', style: this.barStyle, onMousedown: this.onMouseDown }),
    ])
  },
})
