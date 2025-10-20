<script setup lang="ts">
import type { ColorType } from 'magic-color'
import { computed, onMounted } from 'vue'

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

function handleAlphaBlur(e: Event) {
  const target = e.target as HTMLInputElement
  if (alphaStringify.value !== Number(target.value))
    target.value = String(alphaStringify.value)
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
          @blur="handleAlphaBlur"
        >
      </label>
    </div>
  </div>
</template>
