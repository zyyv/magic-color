import type { ColorType, ThemeMetas } from 'magic-color'
import { guessType, mc } from 'magic-color'

const CHANNEL_MAP: Record<string, string[]> = {
  rgb: ['R', 'G', 'B'],
  hsl: ['H', 'S', 'L'],
  hsb: ['H', 'S', 'B'],
  lab: ['L', 'A', 'B'],
  lch: ['L', 'C', 'H'],
  oklab: ['L', 'A', 'B'],
  oklch: ['L', 'C', 'H'],
}

export function useTheme() {
  const params = useUrlSearchParams('history')
  const initialColor = typeof params.color === 'string' && mc.valid(params.color) ? params.color : '#529e82'
  const color = ref(initialColor)

  watch(color, (v) => {
    params.color = v
  })

  watch(() => params.color, (v) => {
    if (typeof v === 'string' && mc.valid(v) && v !== color.value)
      color.value = v as string
  })

  const alpha = ref(1)
  const exportType = ref<ColorType>(guessType(color.value!) || 'hex')

  const colors = computed<ThemeMetas>(() => {
    try {
      return mc.theme(color.value!, { type: exportType.value })
    }
    catch {
      return {} as any
    }
  })

  const name = computed(() => mc.nameOf(color.value!) || 'Custom color')

  const shades = computed(() => {
    return Object.keys(colors.value).sort((a, b) => Number(a) - Number(b))
  })

  const channelHeaders = computed(() => {
    const type = exportType.value
    if (type === 'hex' || type === 'keyword')
      return ['R', 'G', 'B']
    return CHANNEL_MAP[type] || ['C1', 'C2', 'C3']
  })

  const tableData = computed(() => {
    return shades.value.map((shade) => {
      const c = (colors.value as any)[shade]
      const type = exportType.value
      let channelValues: number[] = []

      if (type === 'hex' || type === 'keyword') {
        channelValues = mc(c).value('rgb')
      }
      else {
        const val = mc(c).value(type, false)
        if (Array.isArray(val))
          channelValues = (val as number[]).map(value => Number(value.toFixed(2)))
      }

      return {
        shade,
        color: c,
        channelValues,
      }
    })
  })

  const { copy, copied } = useClipboard()
  const copiedColor = ref<string | null>(null)

  function copyColor(v: string) {
    copy(v)
    copiedColor.value = v
  }

  return {
    color,
    alpha,
    exportType,
    colors,
    name,
    shades,
    channelHeaders,
    tableData,
    copyColor,
    copied,
    copiedColor,
  }
}
