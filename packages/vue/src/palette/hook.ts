import { nextTick, onMounted, ref } from 'vue'

interface useControlBlockOptions {
  /**
   * When the value of the control block changes, this function will be called.
   *
   * @param value { x: number, y: number } - The new value of the control block.
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
  disable?: boolean
}

export function useControlBlock(options: useControlBlockOptions = {}) {
  const { onChange, overflows = true, disable = false } = options

  const canvasRef = ref<HTMLCanvasElement | null>(null)
  const barRef = ref<HTMLDivElement | null>(null)

  const active = ref(false)
  const startX = ref(0)
  const startY = ref(0)
  const startLeft = ref(0)
  const startTop = ref(0)
  const realWidth = ref(0)
  const realHeight = ref(0)

  function handleMouseDown(e: MouseEvent) {
    if (disable)
      return
    startX.value = e.clientX
    startY.value = e.clientY
    startLeft.value = barRef.value!.offsetLeft
    startTop.value = barRef.value!.offsetTop

    barRef.value!.style.cursor = 'grabbing'
    barRef.value!.style.transition = 'none'

    registerListeners()
  }

  function handleMouseMove(e: MouseEvent) {
    if (disable)
      return
    e.preventDefault()
    const disX = startLeft.value + e.clientX - startX.value
    const disY = startTop.value + e.clientY - startY.value
    const left = Math.min(Math.max(disX, 0), realWidth.value)
    const top = Math.min(Math.max(disY, 0), realHeight.value)
    const value = {
      x: Number((left / realWidth.value).toFixed(2)),
      y: Number((top / realHeight.value).toFixed(2)),
    }
    onChange?.(value)
    nextTick(() => {
      barRef.value!.style.left = `${left}px`
      barRef.value!.style.top = `${top}px`
    })
  }

  function handleMouseUp() {
    if (disable)
      return
    barRef.value!.style.cursor = 'grab'
    barRef.value!.style.transition = 'all 0.2s ease-in-out'

    removeListeners()
  }

  function handleClick(e: MouseEvent) {
    if (disable)
      return
    e.stopPropagation()
    barRef.value!.style.transition = 'all 0.2s ease-in-out'
    const left = Math.min(Math.max(e.offsetX - (overflows ? barRef.value!.offsetWidth / 2 : 0), 0), realWidth.value)
    const top = Math.min(Math.max(e.offsetY - (overflows ? barRef.value!.offsetHeight / 2 : 0), 0), realHeight.value)
    const value = {
      x: Number((left / realWidth.value).toFixed(2)),
      y: Number((top / realHeight.value).toFixed(2)),
    }

    onChange?.(value)
    nextTick(() => {
      barRef.value!.style.left = `${left}px`
      barRef.value!.style.top = `${top}px`
    })
  }

  function registerListeners() {
    active.value = true
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  function removeListeners() {
    active.value = false
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  onMounted(() => {
    if (canvasRef.value)
      canvasRef.value.addEventListener('click', handleClick)

    if (barRef.value) {
      barRef.value.addEventListener('click', e => e.stopPropagation())

      if (!overflows)
        barRef.value.style.transform = 'translate(-50%, -50%)'
    }

    if (canvasRef.value && barRef.value) {
      realWidth.value = canvasRef.value.width - (overflows ? barRef.value.offsetWidth : 0)
      realHeight.value = canvasRef.value.height - (overflows ? barRef.value.offsetHeight : 0)
    }
  })

  return {
    active,
    canvasRef,
    barRef,
    onMouseDown: handleMouseDown,
  }
}
