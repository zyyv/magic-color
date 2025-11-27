import type { ColorType, ThemeMetas } from 'magic-color'
import { mc } from 'magic-color'

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
  const color = ref(import.meta.env.DEV ? '#529e82' : mc.random())
  const alpha = ref(1)
  const exportType = ref<ColorType>('hex')

  const colors = computed<ThemeMetas>(() => {
    try {
      return mc.theme(color.value!, { type: exportType.value })
    }
    catch {
      return {} as any
    }
  })

  const name = computed(() => mc.nameOf(color.value!))

  const shades = computed(() => {
    return Object.keys(colors.value).sort((a, b) => Number(a) - Number(b))
  })

  function getReadable(v: string) {
    return mc.readable({
      bgColor: v,
      textColor: colors.value[100],
      fallbackTextColor: colors.value[900],
    })
  }

  function formatColor(v: string) {
    return mc(v).to(exportType.value).css()
  }

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
          channelValues = val as number[]
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
    copy(formatColor(v))
    copiedColor.value = v
  }

  return {
    color,
    alpha,
    exportType,
    colors,
    name,
    shades,
    getReadable,
    formatColor,
    channelHeaders,
    tableData,
    copyColor,
    copied,
    copiedColor,
  }
}
