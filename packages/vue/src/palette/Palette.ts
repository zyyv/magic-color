import type { ColorType, ColorValue, HexColor, HsbColor } from 'magic-color'
import { mc } from 'magic-color'
import { computed, defineComponent, h, ref, useModel } from 'vue'
import PaletteControls from './PaletteControls'
import PaletteInput from './PaletteInput'
import PalettePanel from './PalettePanel'
import PalettePreview from './PalettePreview'

export default /* @__PURE__ */ defineComponent({
  props: {
    color: { type: String, default: '#ff0000' },
    alpha: { type: Number, default: 1 },
  },
  emits: ['update:color', 'update:alpha'],
  setup(props) {
    const color = useModel(props, 'color')
    const alpha = useModel(props, 'alpha')

    const type = ref<ColorType>(mc(color.value).type)

    const mcHsbColor = computed({
      get: () => mc(color.value).value('hsb'),
      set: (v) => {
        color.value = mc(v, 'hsb').css(type.value)
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

    const controlColor = computed(() => mc(color.value).hex())

    const displayBgColor = computed(() => {
      const mcColor = mc(color.value)
      mcColor.alpha = alpha.value
      return mcColor.css('rgb', true)
    })

    const colorValue = computed({
      get: () => {
        return mc(color.value).value(type.value)
      },
      set: (v: ColorValue) => {
        color.value = mc(v as HexColor, type.value).css()
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
  render() {
    return h('div', {
      style: {
        width: '240px',
        height: 'fit-content',
        backgroundColor: '#272727',
        paddingBottom: '8px',
        shadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
      },
    }, [
      h(PalettePanel, {
        width: 240,
        height: 240,
        barSize: 12,
        color: this.mcHsbColor,
        onChange: this.handlePanelChange,
      }),
      h('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: '8px 0',
        },
      }, [
        h(PalettePreview, {
          width: 40,
          height: 40,
          color: this.displayBgColor,
        }),
        h('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '2px 0',
          },
        }, [
          h(PaletteControls, {
            'modelValue': this.hue,
            'width': 168,
            'height': 12,
            'type': 'hue',
            'onUpdate:modelValue': (value: number) => this.hue = value,
          }),
          h(PaletteControls, {
            'modelValue': this.alpha,
            'width': 168,
            'height': 12,
            'color': this.controlColor,
            'type': 'alpha',
            'onUpdate:modelValue': (value: number) => this.alpha = value,
          }),
        ]),
      ]),
      h(PaletteInput, {
        'alpha': this.alpha,
        'color': this.colorValue,
        'type': this.type,
        'onUpdate:alpha': (value: number) => this.alpha = value,
        'onUpdate:color': (value: ColorValue) => this.colorValue = value,
        'onUpdate:type': (value: ColorType) => this.type = value,
      }),
    ])
  },
})
