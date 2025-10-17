import type { ColorType } from 'magic-color'
import { computed, defineComponent, h, useModel } from 'vue'

type ArrayValue = [number, number, number]

export default /* @__PURE__ */ defineComponent({
  props: {
    color: {
      type: [String, Array as unknown as () => ArrayValue],
    },
    type: {
      type: String as PropType<ColorType>,
    },
    alpha: {
      type: Number,
    },
  },
  emits: ['update:color', 'update:type', 'update:alpha'],
  setup(props) {
    const type = useModel(props, 'type')
    const colorValue = useModel(props, 'color')
    const alpha = useModel(props, 'alpha')

    const hexV = computed({
      get: () => {
        return type.value === 'hex' ? colorValue.value as string : ''
      },
      set: (v: string) => {
        colorValue.value = v
      },
    })
    const v0 = computed({
      get: () => (colorValue.value as ArrayValue)[0],
      set: (v: number) => {
        colorValue.value = [v, (colorValue.value as ArrayValue)[1], (colorValue.value as ArrayValue)[2]]
      },
    })
    const v1 = computed({
      get: () => (colorValue.value as ArrayValue)[1],
      set: (v: number) => {
        colorValue.value = [(colorValue.value as ArrayValue)[0], v, (colorValue.value as ArrayValue)[2]]
      },
    })
    const v2 = computed({
      get: () => (colorValue.value as ArrayValue)[2],
      set: (v: number) => {
        colorValue.value = [(colorValue.value as ArrayValue)[0], (colorValue.value as ArrayValue)[1], v]
      },
    })
    const alphaStringify = computed({
      get: () => Math.round(alpha.value! * 100),
      set: (v: number) => {
        alpha.value = Math.min(1, Math.max(0, Number((v / 100).toFixed(2))))
      },
    })

    function handleAlphaBlur(e: any) {
      if (alphaStringify.value !== e.target.value)
        e.target.value = alphaStringify.value
    }

    return {
      type,
      hexV,
      v0,
      v1,
      v2,
      alphaStringify,
      handleAlphaBlur,
    }
  },
  mounted() {
    const css = `.no-spinners::-webkit-outer-spin-button,.no-spinners::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}`
    const style = document.createElement('style')
    style.appendChild(document.createTextNode(css))
    document.head.appendChild(style)
  },
  render() {
    return h('div', {
      style: {
        display: 'flex',
        color: 'white',
        fontSize: '11px',
        padding: '0 8px',
      },
    }, [
      h('div', {
        style: {
          display: 'flex',
          flex: '0 0 64px',
          padding: '0 8px',
        },
      }, [
        h('select', {
          style: {
            width: '100%',
            height: '28px',
            backgroundColor: '#272727',
            outline: 'none',
          },
          value: this.type,
          onChange: (e: Event) => this.type = (e.target as HTMLSelectElement).value as ColorType,
        }, [
          h('option', { value: 'hex' }, 'HEX'),
          h('option', { value: 'rgb' }, 'RGB'),
          h('option', { value: 'hsb' }, 'HSB'),
          h('option', { value: 'hsl' }, 'HSL'),
          h('option', { value: 'lab' }, 'LAB'),
          h('option', { value: 'lch' }, 'LCH'),
        ]),
      ]),
      h('div', {
        style: {
          display: 'flex',
          flex: '1',
          borderRadius: '2px',
          border: '1px solid #3c3c3c',
        },
        // TODO: group-hover
        class: 'group',
      }, [
        this.type === 'hex'
          ? h('label', {
              style: {
                display: 'flex',
                alignItems: 'center',
                flex: '1',
                borderRight: '1px solid #3c3c3c',
              },
            }, [
              h('input', {
                value: this.hexV,
                style: {
                  textAlign: 'center',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  width: '100%',
                },
                type: 'text',
                onInput: (e: Event) => this.hexV = (e.target as HTMLInputElement).value,
              }),
            ])
          : [
              h('label', {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  flex: '1',
                  borderRight: '1px solid #3c3c3c',
                },
              }, [
                h('input', {
                  value: this.v0,
                  style: {
                    textAlign: 'center',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    width: '100%',
                  },
                  class: 'no-spinners',
                  min: '0',
                  type: 'number',
                  onInput: (e: Event) => this.v0 = Number((e.target as HTMLInputElement).value),
                }),
              ]),
              h('label', {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  flex: '1',
                  borderRight: '1px solid #3c3c3c',
                },
              }, [
                h('input', {
                  value: this.v1,
                  style: {
                    textAlign: 'center',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    width: '100%',
                  },
                  class: 'no-spinners',
                  type: 'number',
                  onInput: (e: Event) => this.v1 = Number((e.target as HTMLInputElement).value),
                }),
              ]),
              h('label', {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  flex: '1',
                  borderRight: '1px solid #3c3c3c',
                },
              }, [
                h('input', {
                  value: this.v2,
                  style: {
                    textAlign: 'center',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    width: '100%',
                  },
                  class: 'no-spinners',
                  type: 'number',
                  onInput: (e: Event) => this.v2 = Number((e.target as HTMLInputElement).value),
                }),
              ]),
            ],
        h('label', {
          style: {
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            flex: this.type === 'hex' ? '0 0 46px' : '1',
          },
        }, [
          h('input', {
            value: this.alphaStringify,
            style: {
              textAlign: 'center',
              outline: 'none',
              backgroundColor: 'transparent',
              width: '100%',
            },
            class: 'no-spinners',
            type: 'number',
            min: '0',
            max: '100',
            onBlur: this.handleAlphaBlur,
            onInput: (e: Event) => this.alphaStringify = Number((e.target as HTMLInputElement).value),
          }),
        ]),
      ]),
    ])
  },
})
