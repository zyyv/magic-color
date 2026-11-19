<script setup lang="ts">
import type { ColorType } from 'magic-color'
import { guessType } from 'magic-color'
import { computed, onMounted, ref, watch } from 'vue'

type ArrayValue = [number, number, number]

interface Props {
  color?: string | ArrayValue
  type?: ColorType
  alpha?: number
}

defineProps<Props>()

const type = defineModel<ColorType>('type')
const colorValue = defineModel<string | ArrayValue>('color')
const alpha = defineModel<number>('alpha')

const hexDraft = ref<string | null>(null)
const hexV = computed({
  get: () => hexDraft.value ?? (typeof colorValue.value === 'string' ? colorValue.value : ''),
  set: (v: string) => {
    hexDraft.value = v
    const candidate = v.trim()
    // Four digits can also be an intermediate value while typing six or eight.
    if (candidate.replace(/^#/, '').length !== 4 && guessType(candidate) === 'hex')
      colorValue.value = candidate
  },
})

function finishHexEdit() {
  const candidate = hexDraft.value?.trim()
  if (candidate?.replace(/^#/, '').length === 4 && guessType(candidate) === 'hex')
    colorValue.value = candidate
  hexDraft.value = null
}

watch(type, () => {
  hexDraft.value = null
})

function channelModel(index: 0 | 1 | 2) {
  return computed({
    get: () => Array.isArray(colorValue.value) ? colorValue.value[index] : undefined,
    set: (value) => {
      if (typeof value !== 'number' || !Number.isFinite(value) || !Array.isArray(colorValue.value))
        return
      const channels: ArrayValue = [...colorValue.value]
      channels[index] = value
      colorValue.value = channels
    },
  })
}

const v0 = channelModel(0)
const v1 = channelModel(1)
const v2 = channelModel(2)

const alphaStringify = computed({
  get: () => Math.round((alpha.value ?? 1) * 100),
  set: (v: number) => {
    if (Number.isFinite(v))
      alpha.value = Math.min(1, Math.max(0, Number((v / 100).toFixed(2))))
  },
})

function restoreNumberOnBlur(e: Event, value: number | undefined) {
  const target = e.target as HTMLInputElement
  target.value = value === undefined ? '' : String(value)
}

onMounted(() => {
  const css = `.no-spinners::-webkit-outer-spin-button,.no-spinners::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}`
  const style = document.createElement('style')
  style.appendChild(document.createTextNode(css))
  document.head.appendChild(style)
})
</script>

<template>
  <div
    style="
      display: flex;
      color: white;
      font-size: 11px;
      padding: 0 8px;
    "
  >
    <div
      style="
        display: flex;
        flex: 0 0 64px;
        padding: 0 8px;
      "
    >
      <select
        v-model="type"
        style="
          width: 100%;
          height: 28px;
          background-color: #272727;
          outline: none;
        "
      >
        <option value="hex">
          HEX
        </option>
        <option value="rgb">
          RGB
        </option>
        <option value="hsb">
          HSB
        </option>
        <option value="hsl">
          HSL
        </option>
        <option value="lab">
          LAB
        </option>
        <option value="lch">
          LCH
        </option>
      </select>
    </div>
    <div
      style="
        display: flex;
        flex: 1;
        border-radius: 2px;
        border: 1px solid #3c3c3c;
      "
      class="group"
    >
      <label
        v-if="type === 'hex'"
        style="
          display: flex;
          align-items: center;
          flex: 1;
          border-right: 1px solid #3c3c3c;
        "
      >
        <input
          v-model="hexV"
          type="text"
          style="
            text-align: center;
            outline: none;
            background-color: transparent;
            width: 100%;
          "
          @blur="finishHexEdit"
          @keydown.enter="finishHexEdit"
        >
      </label>
      <template v-else>
        <label
          style="
            display: flex;
            align-items: center;
            flex: 1;
            border-right: 1px solid #3c3c3c;
          "
        >
          <input
            v-model.number="v0"
            type="number"
            min="0"
            class="no-spinners"
            style="
              text-align: center;
              outline: none;
              background-color: transparent;
              width: 100%;
            "
            @blur="restoreNumberOnBlur($event, v0)"
          >
        </label>
        <label
          style="
            display: flex;
            align-items: center;
            flex: 1;
            border-right: 1px solid #3c3c3c;
          "
        >
          <input
            v-model.number="v1"
            type="number"
            class="no-spinners"
            style="
              text-align: center;
              outline: none;
              background-color: transparent;
              width: 100%;
            "
            @blur="restoreNumberOnBlur($event, v1)"
          >
        </label>
        <label
          style="
            display: flex;
            align-items: center;
            flex: 1;
            border-right: 1px solid #3c3c3c;
          "
        >
          <input
            v-model.number="v2"
            type="number"
            class="no-spinners"
            style="
              text-align: center;
              outline: none;
              background-color: transparent;
              width: 100%;
            "
            @blur="restoreNumberOnBlur($event, v2)"
          >
        </label>
      </template>
      <label
        :style="{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          flex: type === 'hex' ? '0 0 46px' : '1',
        }"
      >
        <input
          v-model.number="alphaStringify"
          type="number"
          min="0"
          max="100"
          class="no-spinners"
          style="
            text-align: center;
            outline: none;
            background-color: transparent;
            width: 100%;
          "
          @blur="restoreNumberOnBlur($event, alphaStringify)"
        >
      </label>
    </div>
  </div>
</template>
