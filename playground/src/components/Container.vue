<script lang='ts' setup>
import type { ColorType, ThemeMetas } from 'magic-color'
import { mc } from 'magic-color'
import ThemeColors from './ThemeColors.vue'

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
    <Transition
      enter-active-class="animate-fade-in animate-duration-150"
      leave-active-class="animate-fade-out animate-duration-150"
      mode="out-in"
    >
      <ThemeColors m-auto :name :colors :type ext>
        <template #ext>
          <Palette v-model:color="color" v-model:alpha="alpha" v-model:type="type" ps top-15 shadow />
        </template>
      </ThemeColors>
    </Transition>
  </div>
</template>
