<script setup lang="ts">
import { mc } from 'magic-color'
import ColorOperationControls from './ColorOperationControls.vue'
import ColorOperationResult from './ColorOperationResult.vue'

type Operation = 'lighten' | 'darken' | 'hue'

const props = defineProps<{ color: string }>()
const emit = defineEmits<{ useColor: [color: string] }>()

const operation = shallowRef<Operation>('lighten')
const amount = shallowRef(0.35)
const hueOffset = shallowRef(30)

const targetHue = computed(() => {
  const hue = Math.round(mc(props.color).get('hsl.h'))
  return (hue + hueOffset.value + 360) % 360
})

const result = computed(() => {
  const source = mc(props.color)
  if (operation.value === 'hue')
    return source.set('hsl.h', targetHue.value).hex()
  return source[operation.value](amount.value).hex()
})

const code = computed(() => {
  const input = JSON.stringify(props.color)
  if (operation.value === 'hue')
    return `mc(${input}).set('hsl.h', ${targetHue.value}).hex()`
  return `mc(${input}).${operation.value}(${amount.value}).hex()`
})
</script>

<template>
  <section class="operations-section" aria-labelledby="operations-title">
    <div class="section-heading">
      <h3 id="operations-title">
        Shape a color.
      </h3>
      <p>Try a color operation, see the result, and copy the exact code.</p>
    </div>
    <div class="operations-surface">
      <ColorOperationControls v-model:operation="operation" v-model:amount="amount" v-model:hue-offset="hueOffset" />
      <ColorOperationResult :source="color" :result="result" :code="code" @use-color="emit('useColor', $event)" />
    </div>
  </section>
</template>

<style scoped>
.operations-section { margin-top: 88px; }
.operations-surface { display: grid; grid-template-columns: minmax(275px, .85fr) minmax(0, 1.15fr); gap: 0; border: 1px solid #e0e5dc; border-radius: 16px; background: #fff; overflow: hidden; box-shadow: 0 18px 55px #526d5210; }
:global(html.dark .operations-surface) { color: #e8e8e8; color-scheme: dark; background: #1b1b1b; border-color: #323232; box-shadow: none; }
@media (max-width: 780px) { .operations-surface { grid-template-columns: 1fr; } }
@media (max-width: 680px) { .operations-section { margin-top: 65px; } }
</style>
