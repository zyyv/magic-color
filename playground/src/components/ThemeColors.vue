<script setup lang="ts">
import type { ColorType, ThemeMetas } from 'magic-color'
import { mc } from 'magic-color'
import Extension from './extension/index.vue'
import ThemeColorItem from './ThemeColorItem.vue'

const props = withDefaults(defineProps<{
  name: string
  colors: ThemeMetas
  type?: ColorType
  showArrow?: boolean
  ext?: boolean
}>(), {
  type: 'hex',
  showArrow: false,
  ext: false,
})

function getReadable(v: string) {
  return mc.readable({
    bgColor: v,
    textColor: props.colors[100],
    fallbackTextColor: props.colors[900],
  })
}

const [toggle, setToggle] = useToggle(props.ext)
</script>

<template>
  <div w="75%" pt-4 pb-6 px-6 rd-3 transition hover:bg-sort:10 max-h-min>
    <div fbc mb-2>
      <p text-xl fw-700>
        {{ name }}
      </p>
      <button v-if="showArrow" icon-btn i-carbon-arrows-vertical title="Show Analytics" @click="setToggle()" />
    </div>
    <ul fbc>
      <li v-for="(v, k) in colors" :key="k">
        <ThemeColorItem :k="k as any" :v :color="getReadable(v)" :type />
      </li>
    </ul>
    <KeepAlive>
      <Extension v-if="toggle" mt-8 :colors :name>
        <slot name="ext" />
      </Extension>
    </KeepAlive>
  </div>
</template>
