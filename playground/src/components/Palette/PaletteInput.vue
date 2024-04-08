<script lang='ts' setup>
import { type PropType } from 'vue'
import { type ColorType, type ColorValue } from 'magic-color'

const type = defineModel('type', { type: String as PropType<ColorType> })
const colorValue = defineModel('color', { type: [String, Object] })
const alpha = defineModel('alpha', { type: Number })

const hexV = computed({
  get: () => type.value === 'hex' ? colorValue.value : '',
  set: (v: string) => {
    colorValue.value = v;
  }
})
const v0 = computed({
  get: () => colorValue.value[0],
  set: (v: number) => {
    colorValue.value = [v, colorValue.value[1], colorValue.value[2]];
  }
})
const v1 = computed({
  get: () => colorValue.value[1],
  set: (v: number) => {
    colorValue.value = [colorValue.value[0], v, colorValue.value[2]];
  }
})
const v2 = computed({
  get: () => colorValue.value[2],
  set: (v: number) => {
    colorValue.value = [colorValue.value[0], colorValue.value[1], v];
  }
})
const aplhaStringify = computed({
  get: () => alpha.value! * 100,
  set: (v: number) => {
    alpha.value = Math.min(1, Math.max(0, Number((v / 100).toFixed(2))));
  }
})

watchEffect(() => {
  console.log(colorValue.value);
})

function handleAlphaBlur(e: any) {
  console.log(e.target.value);
  console.log(aplhaStringify.value);
  if (aplhaStringify.value !== e.target.value) {
    e.target.value = aplhaStringify.value;
  }
}
</script>

<template>
  <div flex>
    <select v-model="type">
      <option value="hex">HEX</option>
      <option value="rgb">RGB</option>
      <option value="hsl">HSL</option>
      <option value="hsb">HSB</option>
    </select>
    <div flex>
      <input type="text" v-if="type === 'hex'" v-model="hexV" />
      <template v-else>
        <input v-model="v0" :min="0" type="number" />
        <input v-model="v1" type="number" />
        <input v-model="v2" type="number" />
      </template>
      <input type="number" min="0" max="100" v-model="aplhaStringify" @blur="handleAlphaBlur">
    </div>
  </div>
</template>
