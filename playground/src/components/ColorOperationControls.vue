<script setup lang="ts">
type Operation = 'lighten' | 'darken' | 'hue'

const operation = defineModel<Operation>('operation', { required: true })
const amount = defineModel<number>('amount', { required: true })
const hueOffset = defineModel<number>('hueOffset', { required: true })

const operations: { value: Operation, label: string, icon: string }[] = [
  { value: 'lighten', label: 'Lighten', icon: 'i-carbon-sun' },
  { value: 'darken', label: 'Darken', icon: 'i-carbon-moon' },
  { value: 'hue', label: 'Shift hue', icon: 'i-carbon-color-switch' },
]

const isHue = computed(() => operation.value === 'hue')
const displayValue = computed(() => isHue.value
  ? `${hueOffset.value > 0 ? '+' : ''}${hueOffset.value}°`
  : amount.value.toFixed(2))
</script>

<template>
  <div class="operation-controls">
    <span class="control-kicker">ADJUST COLOR</span>
    <h4>Choose an operation</h4>
    <div class="operation-choices" role="group" aria-label="Color operation">
      <button v-for="item in operations" :key="item.value" type="button" :aria-pressed="operation === item.value" :class="{ active: operation === item.value }" @click="operation = item.value">
        <i :class="item.icon" aria-hidden="true" />
        {{ item.label }}
      </button>
    </div>
    <div class="range-heading">
      <label for="operation-range">{{ isHue ? 'Hue shift' : 'Amount' }}</label>
      <output for="operation-range">{{ displayValue }}</output>
    </div>
    <input v-if="isHue" id="operation-range" v-model.number="hueOffset" class="operation-range" type="range" min="-180" max="180" step="1" aria-label="Hue shift in degrees">
    <input v-else id="operation-range" v-model.number="amount" class="operation-range" type="range" min="0" max="1" step="0.05" :aria-label="`${operation} amount`">
    <div class="range-endpoints">
      <span>{{ isHue ? '−180°' : '0' }}</span><span>{{ isHue ? '+180°' : '1' }}</span>
    </div>
    <p>{{ isHue ? 'Rotate around the color wheel.' : 'Adjust the color in Lab lightness.' }}</p>
  </div>
</template>

<style scoped>
.operation-controls { padding: 30px 32px; border-right: 1px solid #e7ece4; }
.control-kicker { color: #83a08b; font-family: 'Commit Mono', monospace; font-size: .66rem; font-weight: 600; letter-spacing: .11em; }
.operation-controls h4 { margin: 14px 0 22px; font-size: 1.32rem; letter-spacing: -.04em; }
.operation-choices { display: flex; flex-wrap: wrap; gap: 7px; }
.operation-choices button { display: inline-flex; align-items: center; gap: 7px; padding: 9px 12px; border: 1px solid #dce6dc; border-radius: 7px; background: #f8faf7; color: #617265; font-size: .78rem; font-weight: 600; }
.operation-choices button i { font-size: 1rem; }
.operation-choices button.active { background: #e4efe4; border-color: #a8c7ad; color: #315d3d; }
.range-heading, .range-endpoints { display: flex; justify-content: space-between; align-items: center; }
.range-heading { margin-top: 34px; color: #62766a; font-size: .78rem; font-weight: 600; }
.range-heading output { color: #3d694a; font-family: 'Commit Mono', monospace; font-size: .9rem; }
.operation-range { width: 100%; margin: 18px 0 7px; accent-color: #629774; cursor: pointer; }
.range-endpoints { color: #a0afa3; font-family: 'Commit Mono', monospace; font-size: .68rem; }
.operation-controls p { margin: 25px 0 0; color: #97a49a; font-size: .77rem; line-height: 1.5; }
:global(html.dark .operation-controls) { background: #1b1b1b; border-color: #323232; }
:global(html.dark .operation-controls h4) { color: #eee; }
:global(html.dark .operation-choices button) { background: #252525; border-color: #3b3b3b; color: #c4d0c6; }
:global(html.dark .operation-choices button:hover) { background: #303a32; border-color: #647e6a; }
:global(html.dark .operation-choices button.active) { background: #314637; border-color: #668975; color: #e5f3e8; }
:global(html.dark .range-heading), :global(html.dark .range-heading output) { color: #d2e0d4; }
:global(html.dark .operation-range) { accent-color: #9ac9a4; }
@media (max-width: 780px) { .operation-controls { border-right: 0; border-bottom: 1px solid #e7ece4; } }
@media (max-width: 680px) { .operation-controls { padding: 24px 20px; } }
</style>
