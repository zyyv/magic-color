<script lang='ts' setup>
import { theme } from 'magic-color'
import ThemeColors from './ThemeColors.vue'
import Chart from './Chart.vue'
import RatioTable from './RatioTable.vue'

const color = defineModel<string>('color')
const alpha = defineModel<number>('alpha')

const colors = computed(() => {
  try {
    return theme(color.value!)
  }
  catch (e) {
    return {} as any
  }
})
</script>

<template>
  <div>
    <ThemeColors :colors />
    <div mt-8 fc gap-8>
      <div>
        <Chart :colors />
        <RatioTable :colors />
      </div>
      <Palette v-model:color="color" v-model:alpha="alpha" ps top-15 shadow />
    </div>
  </div>
</template>
