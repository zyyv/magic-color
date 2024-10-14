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
  <div>
    <div w-fit mxa>
      <div fbc mb-2>
        <p text-xl fw-700>
          {{ name }}
        </p>
        <button v-if="showArrow" icon-btn i-carbon-arrows-horizontal title="Show Analytics" @click="setToggle()" />
      </div>
      <ul fcc gap-1>
        <li v-for="(v, k) in colors" :key="k">
          <ThemeColorItem
            :k="k as any"
            :v
            :color="getReadable(v)"
            :type
          />
        </li>
      </ul>
    </div>
    <Transition
      enter-active-class="animate-slide-in-up animate-duration-500"
      leave-active-class="animate-slide-out-right animate-duration-500"
      mode="out-in"
    >
      <KeepAlive>
        <Extension v-if="toggle" mt-8 :colors :name>
          <slot name="ext" />
        </Extension>
      </KeepAlive>
    </Transition>
  </div>
</template>
