<script lang='ts' setup>
import type { ColorType, ThemeMetas } from 'magic-color'
import { mc } from 'magic-color'
import BuiltInColors from './BuiltInColors.vue'
import Extension from './extension/index.vue'

const color = ref(import.meta.env.DEV ? '#529e82' : mc.random())
const alpha = ref(1)
const type = ref<ColorType>('hex')
const colors = computed<ThemeMetas>(() => {
  try {
    return mc.theme(color.value!)
  }
  catch {
    return {} as any
  }
})
const name = computed(() => mc.nameOf(color.value!))
</script>

<template>
  <div>
    <BuiltInColors v-if="showPanel" />
    <Extension v-else :colors :name :type>
      <Palette v-model:color="color" v-model:alpha="alpha" v-model:type="type" ps top-15 shadow />
    </Extension>
  </div>
</template>
