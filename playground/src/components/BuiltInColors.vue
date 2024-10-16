<script lang='ts' setup>
import { UnoColors } from '@magic-color/transformer/colors'
import gsap from 'gsap'
import ThemeColors from './ThemeColors.vue'

const colorMap = Object.fromEntries(
  Object.entries(UnoColors)
    .filter(([_, v]) => typeof v === 'object')
    .map(([k, v]) => {
      const numberKeyRe = /^\d{2,3}$/
      const keys = Object.keys(v).filter(k => numberKeyRe.test(k))
      return [k[0].toUpperCase() + k.slice(1).toLowerCase(), Object.fromEntries(keys.map(k => [k, (v as any)[k]]) as [string, string][])]
    }),
)

function onBeforeEnter(el: HTMLElement) {
  el.style.opacity = 0
  el.style.marginLeft = '100%'
}

function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    marginLeft: 'auto',
    delay: el.dataset.index * 0.1,
    onComplete: done,
  })
}
</script>

<template>
  <TransitionGroup appear :css="false" space-y-4 tag="div" @before-enter="onBeforeEnter" @enter="onEnter">
    <ThemeColors
      v-for="(colors, name, index) in colorMap" :key="name" class="m-auto" show-arrow :name="name"
      :colors="colors" type="hex" :data-index="index"
    />
  </TransitionGroup>
</template>
