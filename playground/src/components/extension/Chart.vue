<script lang='ts' setup>
import type { ThemeMetas } from 'magic-color'
import Chart from 'chart.js/auto'
import { Magicolor } from 'magic-color'
import { ref } from 'vue'

const props = defineProps<{
  colors: ThemeMetas
}>()

const chartRef = ref<HTMLCanvasElement | null>(null)

let chart: Chart | null = null

function getData(colors: ThemeMetas, type: 'h' | 's' | 'l') {
  return Object.values(colors).map(c => new Magicolor(c).value('hsl')[type === 'h' ? 0 : type === 's' ? 1 : 2])
}

const defaultConfig = {
  tension: 0.3,
  pointBorderWidth: 2,
}

watch(() => props.colors, (newColors) => {
  if (chart) {
    chart.data.datasets.forEach((dataset, i) => {
      dataset.data = getData(newColors, i === 0 ? 'h' : i === 1 ? 's' : 'l')
      dataset.borderColor = newColors[i === 0 ? 300 : i === 1 ? 500 : 700]
      dataset.backgroundColor = newColors[i === 0 ? 300 : i === 1 ? 500 : 700]
    })
    chart.update()
  }
}, { deep: true })

onMounted(() => {
  if (chartRef.value) {
    chart = new Chart(chartRef.value, {
      type: 'line',
      data: {
        labels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
        datasets: [
          {
            label: 'Hue',
            data: getData(props.colors, 'h'),
            fill: false,
            borderColor: props.colors[300],
            backgroundColor: props.colors[300],
            cubicInterpolationMode: 'default',
            tension: defaultConfig.tension,
            pointBorderWidth: defaultConfig.pointBorderWidth,
          },
          {
            label: 'Saturation',
            data: getData(props.colors, 's'),
            fill: false,
            borderColor: props.colors[500],
            backgroundColor: props.colors[500],
            pointBorderWidth: defaultConfig.pointBorderWidth,
            tension: defaultConfig.tension,
          },
          {
            label: 'Lightness',
            data: getData(props.colors, 'l'),
            fill: false,
            borderColor: props.colors[700],
            backgroundColor: props.colors[700],
            tension: defaultConfig.tension,
            pointBorderWidth: defaultConfig.pointBorderWidth,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        interaction: {
          intersect: false,
        },
      },
    })
  }
})
</script>

<template>
  <div w-700px>
    <canvas ref="chartRef" />
  </div>
</template>
