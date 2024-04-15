import { computed, defineComponent, defineModel, h } from 'vue'

export default defineComponent({
  setup() {
    const type = defineModel('type', { type: String })
    const colorValue = defineModel('color', { type: [String, Object] })
    const alpha = defineModel('alpha', { type: Number })

    const hexV = computed({
      get: () => type.value === 'hex' ? colorValue.value : '',
      set: (v: string) => {
        colorValue.value = v
      },
    })
    const v0 = computed({
      get: () => colorValue.value[0],
      set: (v: number) => {
        colorValue.value = [v, colorValue.value[1], colorValue.value[2]]
      },
    })
    const v1 = computed({
      get: () => colorValue.value[1],
      set: (v: number) => {
        colorValue.value = [colorValue.value[0], v, colorValue.value[2]]
      },
    })
    const v2 = computed({
      get: () => colorValue.value[2],
      set: (v: number) => {
        colorValue.value = [colorValue.value[0], colorValue.value[1], v]
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
            backgroundColor: 'transparent',
          },
          value: this.type,
          onChange: (e: Event) => this.type = (e.target as HTMLSelectElement).value,
        }, [
          h('option', { value: 'hex' }, 'HEX'),
          h('option', { value: 'rgb' }, 'RGB'),
          h('option', { value: 'hsb' }, 'HSB'),
        ]),
      ]),
      h('div', {
        style: {
          display: 'flex',
          flex: '1',
          borderRadius: '2px',
        },
        class: 'flex flex-1 rd-2px group ~ #3c3c3c op-0 hover b-op-100',
      }, [
        this.type === 'hex'
          ? h('label', {
            class: 'flex items-center flex-1 b-r ~ #3c3c3c op-0 group-hover-b-r op-100',
          }, [
            h('input', {
              value: this.hexV,
              class: 'pl-8px outline-none bg-transparent w-full',
              type: 'text',
              onInput: (e: Event) => this.hexV = (e.target as HTMLInputElement).value,
            }),
          ])
          : [
              h('label', {
                class: 'flex items-center flex-1 b-r ~ #3c3c3c op-0 group-hover-b-r op-100',
              }, [
                h('input', {
                  value: this.v0,
                  class: 'no-spinners pl-8px w-full outline-none bg-transparent',
                  min: '0',
                  type: 'number',
                  onInput: (e: Event) => this.v0 = Number((e.target as HTMLInputElement).value),
                }),
              ]),
              h('label', {
                class: 'flex items-center flex-1 b-r ~ #3c3c3c op-0 group-hover-b-r op-100',
              }, [
                h('input', {
                  value: this.v1,
                  class: 'no-spinners pl-8px w-full outline-none bg-transparent',
                  type: 'number',
                  onInput: (e: Event) => this.v1 = Number((e.target as HTMLInputElement).value),
                }),
              ]),
              h('label', {
                class: 'flex items-center flex-1 b-r ~ #3c3c3c op-0 group-hover-b-r op-100',
              }, [
                h('input', {
                  value: this.v2,
                  class: 'no-spinners pl-8px w-full outline-none bg-transparent',
                  type: 'number',
                  onInput: (e: Event) => this.v2 = Number((e.target as HTMLInputElement).value),
                }),
              ]),
            ],
        h('label', {
          class: `flex items-center h-100% ${this.type === 'hex' ? 'flex-[0_0_46px]' : 'flex-1'}`,
        }, [
          h('input', {
            value: this.alphaStringify,
            class: 'no-spinners pl-8px w-full outline-none bg-transparent',
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
