<script lang='ts' setup>
import type { ThemeMetas } from 'magic-color'
import Buttons from '../demos/Buttons.vue'

const props = defineProps<{
  colors: ThemeMetas
}>()

const inlineStyle = computed(() => {
  return Object.fromEntries(Object.entries(props.colors).map(([key, value]) => [`--color-${key}`, value]))
})
</script>

<template>
  <div :style="inlineStyle">
    <h3 mb-2 text-xl fsc gap-2>
      <div i-carbon-cics-system-group />
      Components
    </h3>

    <div space-y-4>
      <Buttons />

      <div>
        <h3 mb-1>
          PR welcom to add more components ~
        </h3>
      </div>
    </div>
  </div>
</template>
