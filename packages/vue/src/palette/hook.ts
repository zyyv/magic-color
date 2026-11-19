import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

interface useControlBlockOptions {
  /**
   * When the value of the control block changes, this function will be called.
   *
   * @param value - The new value of the control block.
   * @param value.x - The x value.
   * @param value.y - The y value.
   * @example value = { x: 0.5, y: 0.5 }
   */
  onChange?: (value: { x: number, y: number }) => void

  /**
   * Whether to enable the overflow limit of the bar
   *
   * @default true
   */
  overflows?: boolean

  /**
   * Whether to disable the control block
   *
   * @default false
   */
  disable?: () => boolean
}

export function useControlBlock(options: useControlBlockOptions = {}) {
  const { onChange, overflows = true, disable } = options

  const canvasRef = ref<HTMLCanvasElement | null>(null)
  const barRef = ref<HTMLDivElement | null>(null)

  const active = ref(false)
  const startX = ref(0)
  const startY = ref(0)
  const startLeft = ref(0)
  const startTop = ref(0)

  function handleMouseDown(e: MouseEvent) {
    const bar = barRef.value
    if (disable?.() || !bar)
      return
    e.preventDefault()
    startX.value = e.clientX
    startY.value = e.clientY
    startLeft.value = bar.offsetLeft
    startTop.value = bar.offsetTop

    bar.style.cursor = 'grabbing'
    bar.style.transition = 'none'

    registerListeners()
  }

  function handleMouseMove(e: MouseEvent) {
    const bar = barRef.value
    if (disable?.() || !bar)
      return
    e.preventDefault()
    bar.style.cursor = 'grabbing'
    const disX = startLeft.value + e.clientX - startX.value
    const disY = startTop.value + e.clientY - startY.value
    updatePosition(disX, disY)
  }

  function handleMouseUp() {
    removeListeners()
    if (barRef.value) {
      barRef.value.style.cursor = disable?.() ? 'not-allowed' : 'grab'
      barRef.value.style.transition = 'all 0.2s ease-in-out'
    }
  }

  function handleClick(e: MouseEvent) {
    const bar = barRef.value
    if (disable?.() || !bar)
      return
    e.stopPropagation()
    bar.style.transition = 'all 0.2s ease-in-out'
    updatePosition(
      e.offsetX - (overflows ? bar.offsetWidth / 2 : 0),
      e.offsetY - (overflows ? bar.offsetHeight / 2 : 0),
    )
  }

  function updatePosition(x: number, y: number) {
    const canvas = canvasRef.value
    const bar = barRef.value
    if (!canvas || !bar)
      return

    const width = Math.max(0, canvas.width - (overflows ? bar.offsetWidth : 0))
    const height = Math.max(0, canvas.height - (overflows ? bar.offsetHeight : 0))
    const left = Math.min(Math.max(x, 0), width)
    const top = Math.min(Math.max(y, 0), height)
    onChange?.({
      x: width > 0 ? left / width : 0,
      y: height > 0 ? top / height : 0,
    })
    nextTick(() => {
      if (barRef.value) {
        barRef.value.style.left = `${left}px`
        barRef.value.style.top = `${top}px`
      }
    })
  }

  function registerListeners() {
    active.value = true
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  function removeListeners() {
    if (!active.value)
      return
    active.value = false
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  function stopBarClick(e: MouseEvent) {
    e.stopPropagation()
  }

  onMounted(() => {
    if (canvasRef.value)
      canvasRef.value.addEventListener('click', handleClick)

    if (barRef.value) {
      barRef.value.addEventListener('click', stopBarClick)

      if (!overflows)
        barRef.value.style.transform = 'translate(-50%, -50%)'
    }
  })

  if (disable) {
    watch(disable, (disabled) => {
      if (disabled && active.value)
        handleMouseUp()
    })
  }

  onBeforeUnmount(() => {
    removeListeners()
    canvasRef.value?.removeEventListener('click', handleClick)
    barRef.value?.removeEventListener('click', stopBarClick)
  })

  return {
    active,
    canvasRef,
    barRef,
    onMouseDown: handleMouseDown,
  }
}
