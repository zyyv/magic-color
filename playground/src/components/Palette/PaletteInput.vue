<script lang='ts' setup>
import type { PropType } from 'vue'
import type { ColorType } from 'magic-color'

const type = defineModel('type', { type: String as PropType<ColorType> })
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
const aplhaStringify = computed({
  get: () => Math.round(alpha.value! * 100),
  set: (v: number) => {
    alpha.value = Math.min(1, Math.max(0, Number((v / 100).toFixed(2))))
  },
})

function handleAlphaBlur(e: any) {
  console.log(e.target.value)
  console.log(aplhaStringify.value)
  if (aplhaStringify.value !== e.target.value)
    e.target.value = aplhaStringify.value
}
</script>

<template>
  <div flex c-white text-11px px-8px>
    <div flex="[0_0_64px]" px-8px>
      <select v-model="type" w-full h="28px" bg-transparent style="outline: none;">
        <option value="hex">
          HEX
        </option>
        <option value="rgb">
          RGB
        </option>
        <option value="hsl">
          HSL
        </option>
        <option value="hsb">
          HSB
        </option>
      </select>
    </div>
    <div flex flex-1 rd-2px class="group" b="~ #3c3c3c op-0" hover="b-op-100">
      <label v-if="type === 'hex'" flex items-center flex-1 b-r="~ #3c3c3c op-0" group-hover-b-r="op-100">
        <input v-model="hexV" pl-8px outline-none bg-transparent w-full type="text">
      </label>
      <template v-else>
        <label flex items-center flex-1 b-r="~ #3c3c3c op-0" group-hover-b-r="op-100">
          <input v-model="v0" class="no-spinners" pl-8px w-full outline-none bg-transparent :min="0" type="number">
        </label>
        <label flex items-center flex-1 b-r="~ #3c3c3c op-0" group-hover-b-r="op-100">
          <input v-model="v1" class="no-spinners" pl-8px w-full outline-none bg-transparent type="number">
        </label>
        <label flex items-center flex-1 b-r="~ #3c3c3c op-0" group-hover-b-r="op-100">
          <input v-model="v2" class="no-spinners" pl-8px w-full outline-none bg-transparent type="number">
        </label>
      </template>
      <label :class="type === 'hex' ? 'flex-[0_0_46px]' : 'flex-1'" flex items-center h="100%">
        <input
          v-model="aplhaStringify" class="no-spinners" w-full outline-none bg-transparent pl-8px type="number" min="0"
          max="100" @blur="handleAlphaBlur"
        >
      </label>
    </div>
  </div>
</template>

<style scoped>
.no-spinners::-webkit-outer-spin-button,
.no-spinners::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
