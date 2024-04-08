import { ref } from 'vue'

interface useControlBlockProps {
  onChange?: (value: { x: number, y: number }) => void
}

export function useControlBlock({ onChange }: useControlBlockProps = {}) {
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
    startX.value = e.clientX
    startY.value = e.clientY
    startLeft.value = barRef.value!.offsetLeft
    startTop.value = barRef.value!.offsetTop

    barRef.value!.style.cursor = 'grabbing'
    barRef.value!.style.transition = 'none'

    registerListeners()
  }

  function handleMouseMove(e: MouseEvent) {
    e.preventDefault()
    const disX = startLeft.value + e.clientX - startX.value
    const disY = startTop.value + e.clientY - startY.value
    const left = Math.min(Math.max(disX, 0), realWidth.value)
    const top = Math.min(Math.max(disY, 0), realHeight.value)
    const value = {
      x: Math.round((left / realWidth.value) * 100) / 100,
      y: Math.round((top / realHeight.value) * 100) / 100,
    }
    onChange?.(value)
    nextTick(() => {
      barRef.value!.style.left = `${left}px`
      barRef.value!.style.top = `${top}px`
    })
  }

  function handleMouseUp() {
    barRef.value!.style.cursor = 'grab'
    barRef.value!.style.transition = 'all 0.2s ease-in-out'

    removeListeners()
  }

  function handleClick(e: MouseEvent) {
    e.stopPropagation()
    barRef.value!.style.transition = 'all 0.2s ease-in-out'
    const left = Math.min(Math.max(e.offsetX - (barRef.value!.offsetWidth / 2), 0), realWidth.value)
    const top = Math.min(Math.max(e.offsetY - (barRef.value!.offsetHeight / 2), 0), realHeight.value)
    const value = {
      x: Math.round((left / realWidth.value) * 100) / 100,
      y: Math.round((top / realHeight.value) * 100) / 100,
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

    if (barRef.value)
      barRef.value.addEventListener('click', e => e.stopPropagation())

    if (canvasRef.value && barRef.value) {
      realWidth.value = canvasRef.value.width - barRef.value.offsetWidth
      realHeight.value = canvasRef.value.height - barRef.value.offsetHeight
    }
  })

  return {
    active,
    canvasRef,
    barRef,
    onMouseDown: handleMouseDown,
  }
}
