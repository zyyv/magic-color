import { computed, defineComponent, h, ref, resolveComponent, useModel } from 'vue'
import type { ColorValue, HexColor, HsbColor, HslColor, RgbColor } from 'magic-color'
import { createMagicColor } from 'magic-color'
import PalettePanel from './PalettePanel.vue'

export default defineComponent({
  props: {
    color: { type: String, default: '#ff0000' },
    alpha: { type: Number, default: 1 },
  },
  components: [PalettePanel],
  emits: ['update:color', 'update:alpha'],
  setup(props) {
    const color = useModel(props, 'color')
    const alpha = useModel(props, 'alpha')

    const type = ref(createMagicColor(color.value).type)

    const mcHsbColor = computed({
      get: () => createMagicColor(color.value).toHsb().value,
      set: (v) => {
        switch (type.value) {
          case 'hex':
            color.value = createMagicColor(v, 'hsb').toHex().toString()
            break
          case 'rgb':
            color.value = createMagicColor(v, 'hsb').toRgb().toString()
            break
          case 'hsl':
            color.value = createMagicColor(v, 'hsb').toHsl().toString()
            break
          case 'hsb':
            color.value = createMagicColor(v, 'hsb').toString()
            break
          default:
            break
        }
      },
    })

    const hue = computed({
      get: () => mcHsbColor.value[0] / 360,
      set: (v) => {
        const hsb = [...mcHsbColor.value]
        hsb[0] = Math.round(v * 360)
        mcHsbColor.value = hsb as HsbColor
      },
    })

    const controlColor = computed(() => createMagicColor(color.value).toHex().toString())

    const displayBgColor = computed(() => {
      const mcColor = createMagicColor(color.value)
      mcColor.opacity = alpha.value
      return mcColor.toRgb().toString(true)
    })

    const colorValue = computed({
      get: () => {
        switch (type.value) {
          case 'hex':
            return createMagicColor(color.value).toHex().value
          case 'rgb':
            return createMagicColor(color.value).toRgb().value
          case 'hsl':
            return createMagicColor(color.value).toHsl().value
          case 'hsb':
            return createMagicColor(color.value).toHsb().value
          default:
            return ''
        }
      },
      set: (v: ColorValue) => {
        switch (type.value) {
          case 'hex':
            color.value = createMagicColor(v as HexColor, 'hex').toString()
            break
          case 'rgb':
            color.value = createMagicColor(v as RgbColor, 'rgb').toString()
            break
          case 'hsl':
            color.value = createMagicColor(v as HslColor, 'hsl').toString()
            break
          case 'hsb':
            color.value = createMagicColor(v as HsbColor, 'hsb').toString()
            break
          default:
            break
        }
      },
    })

    function handlePanelChange({ x, y }: { x: number, y: number }) {
      mcHsbColor.value = [mcHsbColor.value[0], x, 100 - y]
    }

    return {
      color,
      alpha,
      type,
      mcHsbColor,
      hue,
      controlColor,
      displayBgColor,
      colorValue,
      handlePanelChange,
    }
  },
  render(ctx, cache, props, setup) {
    const wrappedStyle = {
      style: { width: '240px' },
      class: 'h-fit bg-#272727 pb-8px shadow',
    }

    return h('div', wrappedStyle, [
      h(PalettePanel, {
        width: 240,
        height: 240,
        barSize: 12,
        color: setup.mcHsbColor,
        onChange: setup.handlePanelChange,
      }),
    ])
  },
})
