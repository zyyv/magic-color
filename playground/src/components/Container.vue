<script lang='ts' setup>
import { mc } from 'magic-color'
import Chart from './Chart.vue'
import RatioTable from './RatioTable.vue'
import ThemeColors from './ThemeColors.vue'

const color = defineModel<string>('color')
const alpha = defineModel<number>('alpha')

const colors = computed(() => {
  try {
    return mc.theme(color.value!)
  }
  catch {
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
