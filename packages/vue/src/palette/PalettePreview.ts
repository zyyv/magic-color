import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  props: {
    width: {
      type: Number,
      default: 40,
    },
    height: {
      type: Number,
      default: 40,
    },
    color: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const canvas = ref<HTMLCanvasElement | null>(null)
    const ctx = ref<CanvasRenderingContext2D | null>(null)

    function drawBg(ctx: CanvasRenderingContext2D) {
      for (let col = 0; col < props.width / 3; col++) {
        for (let row = 0; row < props.height / 3; row++) {
          ctx.fillStyle = (col + row) % 2 === 0 ? 'lightgray' : 'white'
          ctx.fillRect(col * 3, row * 3, 3, 3)
        }
      }
    }

    onMounted(() => {
      if (canvas.value) {
        ctx.value = canvas.value.getContext('2d')
        drawBg(ctx.value!)
      }
    })

    return {
      canvas,
      ctx,
    }
  },
  render() {
    return h('div', { style: 'position: relative; border-radius: 4px; overflow: hidden;' }, [
      h('canvas', { ref: 'canvas', width: this.width, height: this.height }),
      h('div', { style: `position: absolute; inset: 0; background-color: ${this.color};` }),
    ])
  },
})
