<script setup lang="ts">
import type { ColorType, ThemeMetas } from 'magic-color'
import { mc } from 'magic-color'
import ThemeColorItem from './ThemeColorItem.vue'

const props = withDefaults(defineProps<{
  name: string
  colors: ThemeMetas
  type?: ColorType
}>(), {
  type: 'hex',
})

function getReadable(v: string) {
  return mc.readable({
    bgColor: v,
    textColor: props.colors[100],
    fallbackTextColor: props.colors[900],
  })
}
</script>

<template>
  <div>
    <div w-fit mxa>
      <p mb-2 text-xl fw-700>
        {{ name }}
      </p>
      <ul fcc gap-1>
        <li v-for="(v, k) in colors" :key="k">
          <ThemeColorItem :k="k as unknown as string" :v="v" :color="getReadable(v)" :type />
        </li>
      </ul>
    </div>
  </div>
</template>
