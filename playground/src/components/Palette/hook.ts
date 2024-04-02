import { ref } from 'vue'

interface useControlBarProps {
  onChange?: (value: number) => void
}

export function useControlBar({ onChange }: useControlBarProps) {
  const canvasRef = ref<HTMLCanvasElement | null>(null)
  const barRef = ref<HTMLDivElement | null>(null)

  const active = ref(false)
  const startX = ref(0)
  const startLeft = ref(0)
  const realWidth = ref(0)
  const realHeight = ref(0)

  function handleMouseDown(e: MouseEvent) {
    startX.value = e.clientX
    startLeft.value = barRef.value!.offsetLeft

    barRef.value!.style.cursor = 'grabbing'
    barRef.value!.style.transition = 'none'

    registerListeners()
  }

  function handleMouseMove(e: MouseEvent) {
    e.preventDefault()
    const dis = startLeft.value + e.clientX - startX.value
    const left = Math.min(Math.max(dis, 0), realWidth.value)
    barRef.value!.style.left = `${left}px`
    onChange?.(Math.round((left / realWidth.value) * 100) / 100)
  }

  function handleMouseUp() {
    barRef.value!.style.cursor = 'grab'
    barRef.value!.style.transition = 'all 0.2s ease-in-out'

    removeListeners()
  }

  function handleClick(e: MouseEvent) {
    e.stopPropagation()
    barRef.value!.style.transition = 'all 0.2s ease-in-out'
    const left = Math.min(Math.max(e.offsetX - 6, 0), realWidth.value)
    onChange?.(Math.round((left / realWidth.value) * 100) / 100)
    nextTick(() => {
      barRef.value!.style.left = `${left}px`
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
