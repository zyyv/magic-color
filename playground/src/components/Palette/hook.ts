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
  const width = ref(0)
  const height = ref(0)

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
    const realWidth = width.value - height.value
    const left = Math.min(Math.max(dis, 0), realWidth)
    barRef.value!.style.left = `${left}px`
    onChange?.(left / realWidth)
  }

  function handleMouseUp() {
    barRef.value!.style.cursor = 'grab'
    barRef.value!.style.transition = 'all 0.2s ease-in-out'

    removeListeners()
  }

  function handleClick(e: MouseEvent) {
    e.stopPropagation()
    const dis = e.offsetX - height.value / 2
    const realWidth = width.value - height.value
    const left = Math.min(Math.max(dis, 0), realWidth)
    barRef.value!.style.transition = 'all 0.2s ease-in-out'
    barRef.value!.style.left = `${left}px`
    onChange?.(left / realWidth)
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
    if (canvasRef.value) {
      width.value = canvasRef.value.width
      height.value = canvasRef.value.height
      canvasRef.value.addEventListener('click', handleClick)
    }
    if (barRef.value)
      barRef.value.addEventListener('click', e => e.stopPropagation())
  })

  return {
    active,
    canvasRef,
    barRef,
    onMouseDown: handleMouseDown,
  }
}
