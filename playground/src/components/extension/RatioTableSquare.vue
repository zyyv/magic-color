<script setup lang="ts">
import { mc } from 'magic-color'

const props = defineProps<{
  backgroundColor: string
  color: string
  ratio: number
  type: 'WCAG' | 'APCA'
}>()

const value = computed(() => props.type === 'WCAG'
  ? mc.wcag(props.color, props.backgroundColor)
  : Number(mc.apca(props.color, props.backgroundColor)))
const passes = computed(() => props.type === 'WCAG' ? value.value >= props.ratio : Math.abs(value.value) >= props.ratio)
const displayValue = computed(() => props.type === 'WCAG' ? value.value.toFixed(1) : value.value.toFixed(0))
const style = computed(() => passes.value ? { backgroundColor: props.backgroundColor, color: mc.readable(props.backgroundColor) } : undefined)
</script>

<template>
  <div class="ratio-square" :class="{ filtered: !passes }" :style="style" :title="`${type}: ${displayValue} for ${color} on ${backgroundColor}`">{{ passes ? displayValue : '—' }}</div>
</template>

<style scoped>
.ratio-square { height: 38px; display: grid; place-items: center; font-family: 'Commit Mono', monospace; font-size: .66rem; font-variant-numeric: tabular-nums; border-radius: 3px; }
.ratio-square.filtered { background: #f0f3ee; color: #bcc7bc; }
:global(.dark) .ratio-square.filtered { background: #292929; color: #777777; }
</style>
