<script setup lang="ts">
import type { ThemeMetas } from 'magic-color'
import { mc } from 'magic-color'
import CodeSnippet from './CodeSnippet.vue'

const props = defineProps<{ color: string, colors: ThemeMetas }>()
const compareInput = ref('#ffffff')
const compareColor = computed(() => mc.valid(compareInput.value.trim()) ? compareInput.value.trim() : null)
const hashInput = ref('magic-color')
const hashColor = computed(() => hashInput.value ? mc.hash(hashInput.value) : null)
const { copy, copied } = useClipboard()

const metrics = computed(() => {
  if (!compareColor.value)
    return null
  return {
    wcag: mc.wcag(props.color, compareColor.value),
    apca: Math.abs(Number(mc.apca(compareColor.value, props.color))),
    delta: mc.deltaE(props.color, compareColor.value),
  }
})
const textColor = computed(() => mc.readable({ bgColor: props.color, textColor: '#ffffff', fallbackTextColor: '#000000' }))
const textRatio = computed(() => mc.wcag(props.color, textColor.value))
const sampleStyle = computed(() => ({ backgroundColor: props.color, color: textColor.value }))
const temperature = computed(() => mc.warm(props.color) ? 'Warm' : 'Cool')
const readableCode = computed(() => `const text = mc.readable({ bgColor: ${JSON.stringify(props.color)}, textColor: '#ffffff', fallbackTextColor: '#000000' })\nmc.wcag(${JSON.stringify(props.color)}, text)`)
const compareCode = computed(() => {
  if (!compareColor.value)
    return ''
  const base = JSON.stringify(props.color)
  const other = JSON.stringify(compareColor.value)
  return `mc.wcag(${base}, ${other})\nMath.abs(Number(mc.apca(${other}, ${base})))\nmc.deltaE(${base}, ${other})`
})
const hashCode = computed(() => `mc.hash(${JSON.stringify(hashInput.value)})`)
</script>

<template>
  <section class="insights-section" aria-labelledby="insights-title">
    <div class="section-heading">
      <h3 id="insights-title">
        More than a color.
      </h3><p>Small checks that make a palette easier to use in a real interface.</p>
    </div>
    <div class="insight-grid">
      <article class="insight-card contrast-card">
        <div class="insight-topline">
          <span>READABILITY</span><span>WCAG</span>
        </div>
        <div class="type-preview" :style="sampleStyle">
          <span class="preview-caption">TYPE ON YOUR COLOR</span><strong>Aa</strong><span class="preview-sentence">Good color makes every word feel effortless.</span>
        </div>
        <div class="insight-bottomline">
          <span>Suggested text <strong>{{ textColor }}</strong></span><span>{{ textRatio.toFixed(2) }}:1 <span class="metric-note">{{ textRatio >= 4.5 ? 'AA pass' : 'Below AA' }}</span></span>
        </div>
        <CodeSnippet class="insight-code" :code="readableCode" />
      </article>
      <article class="insight-card compare-card">
        <div class="insight-topline">
          <span>COMPARE COLORS</span><span>ΔE 2000</span>
        </div>
        <h4>How different are they?</h4><p>Compare your base color with another shade.</p>
        <label class="insight-input-label" for="compare-color">Compare with</label>
        <div class="insight-input-wrap">
          <span class="input-dot" :style="compareColor ? { backgroundColor: compareColor } : undefined" /><input id="compare-color" v-model="compareInput" type="text" spellcheck="false" placeholder="#ffffff">
        </div>
        <p v-if="!compareColor" class="field-error" role="alert">
          Enter a valid color to compare.
        </p>
        <div v-if="metrics" class="metric-row">
          <div><strong>{{ metrics.wcag.toFixed(2) }}:1</strong><span>WCAG ratio</span></div><div><strong>{{ metrics.apca.toFixed(1) }}</strong><span>APCA Lc</span></div><div><strong>{{ metrics.delta.toFixed(1) }}</strong><span>Color difference</span></div>
        </div>
        <CodeSnippet v-if="compareColor" class="insight-code" :code="compareCode" />
      </article>
      <article class="insight-card hash-card">
        <div class="insight-topline">
          <span>STRING TO COLOR</span><span>MC.HASH</span>
        </div>
        <h4>A color for any word.</h4><p>Turn a name or label into a repeatable color.</p>
        <label class="insight-input-label" for="hash-input">Your text</label>
        <input id="hash-input" v-model="hashInput" class="hash-input" type="text" maxlength="100" placeholder="Type a name or idea">
        <button v-if="hashColor" class="hash-result" type="button" :style="{ backgroundColor: hashColor, color: mc.readable(hashColor) }" @click="copy(hashColor)">
          <span>{{ hashColor }}</span><span>{{ copied ? 'Copied' : 'Click to copy ↗' }}</span>
        </button>
        <div v-else class="hash-placeholder">
          Enter text to create a color.
        </div>
        <CodeSnippet v-if="hashColor" class="insight-code" :code="hashCode" />
      </article>
    </div>
    <div class="palette-footnote">
      <span>{{ temperature }} hue</span><span>Base color · {{ color.toUpperCase() }}</span><span>{{ Object.keys(colors).length }} generated shades</span>
    </div>
  </section>
</template>

<style scoped>
.insight-card { display: flex; flex-direction: column; }
.insight-code { margin-top: auto; padding-top: 24px; }
</style>
