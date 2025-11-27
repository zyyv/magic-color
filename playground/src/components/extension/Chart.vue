<script lang='ts' setup>
import type { ColorType, ThemeMetas } from 'magic-color'
import Chart from 'chart.js/auto'
import { Magicolor } from 'magic-color'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  colors: ThemeMetas
  type: ColorType
}>()

const chartRef = ref<HTMLCanvasElement | null>(null)

let chart: Chart | null = null

const CHANNEL_MAP: Record<string, string[]> = {
  rgb: ['Red', 'Green', 'Blue'],
  hsl: ['Hue', 'Saturation', 'Lightness'],
  hsb: ['Hue', 'Saturation', 'Brightness'],
  lab: ['Lightness', 'A', 'B'],
  lch: ['Lightness', 'Chroma', 'Hue'],
  oklab: ['Lightness', 'A', 'B'],
  oklch: ['Lightness', 'Chroma', 'Hue'],
}

function getLabels(type: ColorType) {
  if (type === 'hex' || type === 'keyword')
    return CHANNEL_MAP.rgb
  return CHANNEL_MAP[type] || ['C1', 'C2', 'C3']
}

function getData(colors: ThemeMetas, type: ColorType, index: number) {
  const targetType = (type === 'hex' || type === 'keyword') ? 'rgb' : type
  return Object.values(colors).map((c) => {
    const val = new Magicolor(c).value(targetType, false)
    return Array.isArray(val) ? val[index] : 0
  })
}

const defaultConfig = {
  tension: 0.3,
  pointBorderWidth: 2,
}

function updateChart() {
  if (!chart)
    return

  const labels = getLabels(props.type)

  chart.data.datasets.forEach((dataset, i) => {
    dataset.label = labels[i]
    dataset.data = getData(props.colors, props.type, i)
    dataset.borderColor = props.colors[i === 0 ? 300 : i === 1 ? 500 : 700]
    dataset.backgroundColor = props.colors[i === 0 ? 300 : i === 1 ? 500 : 700]
  })
  chart.update()
}

watch(() => [props.colors, props.type], () => {
  updateChart()
}, { deep: true })

onMounted(() => {
  if (chartRef.value) {
    const labels = getLabels(props.type)

    chart = new Chart(chartRef.value, {
      type: 'line',
      data: {
        labels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
        datasets: [
          {
            label: labels[0],
            data: getData(props.colors, props.type, 0),
            fill: false,
            borderColor: props.colors[300],
            backgroundColor: props.colors[300],
            cubicInterpolationMode: 'default',
            tension: defaultConfig.tension,
            pointBorderWidth: defaultConfig.pointBorderWidth,
          },
          {
            label: labels[1],
            data: getData(props.colors, props.type, 1),
            fill: false,
            borderColor: props.colors[500],
            backgroundColor: props.colors[500],
            pointBorderWidth: defaultConfig.pointBorderWidth,
            tension: defaultConfig.tension,
          },
          {
            label: labels[2],
            data: getData(props.colors, props.type, 2),
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
