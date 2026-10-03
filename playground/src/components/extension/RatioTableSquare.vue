<script setup lang="ts">
import { mc } from 'magic-color'

const props = defineProps<{
  backgroundColor: string
  color: string
  ratio: number
  type: 'WCAG' | 'APCA'
  selected: boolean
}>()
const emit = defineEmits<{ select: [] }>()

const value = computed(() => props.type === 'WCAG'
  ? mc.wcag(props.color, props.backgroundColor)
  : Number(mc.apca(props.color, props.backgroundColor)))
const passes = computed(() => props.type === 'WCAG' ? value.value >= props.ratio : Math.abs(value.value) >= props.ratio)
const displayValue = computed(() => props.type === 'WCAG' ? value.value.toFixed(1) : value.value.toFixed(0))
const style = computed(() => passes.value ? { backgroundColor: props.backgroundColor, color: mc.readable(props.backgroundColor) } : undefined)
</script>

<template>
  <button type="button" class="ratio-square" :class="{ filtered: !passes, selected }" :style="style" :title="`${type}: ${displayValue} for ${color} on ${backgroundColor}`" :aria-label="`${type}: ${displayValue} for ${color} text on ${backgroundColor} background. Show code`" :aria-pressed="selected" @click="emit('select')">
    {{ passes ? displayValue : '—' }}
  </button>
</template>

<style scoped>
.ratio-square { width: 100%; height: 38px; border: 0; padding: 0; display: grid; place-items: center; font-family: 'Commit Mono', monospace; font-size: .66rem; font-variant-numeric: tabular-nums; border-radius: 3px; }
.ratio-square:hover { outline: 2px solid #6a9c76; outline-offset: -2px; }
.ratio-square.selected { outline: 2px solid #467a55; outline-offset: -2px; }
.ratio-square.filtered { background: #f0f3ee; color: #bcc7bc; }
:global(html.dark .ratio-square.filtered) { background: #292929; color: #777777; }
:global(html.dark .ratio-square.selected) { outline-color: #a3d0aa; }
</style>
