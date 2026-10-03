<script setup lang="ts">
import { mc } from 'magic-color'
import CodeSnippet from './CodeSnippet.vue'

const props = defineProps<{ source: string, result: string, code: string }>()
const emit = defineEmits<{ useColor: [color: string] }>()
const { copy, copied, text } = useClipboard()

const sourceText = computed(() => mc.readable(props.source))
const resultText = computed(() => mc.readable(props.result))
</script>

<template>
  <div class="operation-result">
    <div class="result-heading">
      <span>COLOR RESULT</span><span>LIVE PREVIEW</span>
    </div>
    <div class="result-swatches">
      <div class="result-swatch" :style="{ backgroundColor: source, color: sourceText }">
        <span>Original</span><strong>{{ source.toUpperCase() }}</strong>
      </div>
      <div class="result-swatch" :style="{ backgroundColor: result, color: resultText }">
        <span>Result</span><strong>{{ result.toUpperCase() }}</strong>
      </div>
    </div>
    <div class="result-actions">
      <button type="button" @click="copy(result)">
        <i :class="copied && text === result ? 'i-carbon-checkmark' : 'i-carbon-copy'" aria-hidden="true" />
        {{ copied && text === result ? 'Color copied' : 'Copy color' }}
      </button>
      <button type="button" @click="emit('useColor', result)">
        <i class="i-carbon-color-palette" aria-hidden="true" />
        Use as base color
      </button>
    </div>
    <CodeSnippet class="result-code" :code="code" />
  </div>
</template>

<style scoped>
.operation-result { min-width: 0; padding: 30px 32px; }
.result-heading { display: flex; align-items: center; justify-content: space-between; gap: 10px; color: #91a297; font-family: 'Commit Mono', monospace; font-size: .66rem; font-weight: 600; letter-spacing: .1em; }
.result-swatches { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 22px; }
.result-swatch { min-width: 0; min-height: 142px; box-sizing: border-box; padding: 18px; border-radius: 8px; display: flex; flex-direction: column; justify-content: space-between; }
.result-swatch span { font-size: .72rem; font-weight: 600; }
.result-swatch strong { overflow-wrap: anywhere; font-family: 'Commit Mono', monospace; font-size: clamp(.85rem, 1.6vw, 1.2rem); }
.result-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.result-actions button { display: inline-flex; align-items: center; gap: 7px; border: 1px solid #dce6dc; border-radius: 7px; background: #fff; color: #486450; padding: 9px 12px; font-size: .75rem; font-weight: 600; }
.result-actions button i { font-size: .95rem; }
.result-actions button:last-child { background: #e8f1e7; border-color: #d2e4d2; }
.result-actions button:hover { filter: brightness(.94); }
.result-code { margin-top: 26px; }
:global(html.dark .operation-result) { background: #1b1b1b; }
:global(html.dark .result-actions button) { background: #252525; border-color: #414141; color: #d5e6d8; }
:global(html.dark .result-actions button:last-child) { background: #314637; }
:global(html.dark .result-actions button:hover) { background: #354039; }
:global(html.dark .result-heading) { color: #a8bbaa; }
@media (max-width: 680px) { .operation-result { padding: 24px 20px; } .result-swatch { min-height: 115px; padding: 13px; } }
</style>
