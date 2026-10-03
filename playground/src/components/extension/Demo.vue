<script setup lang="ts">
import type { ThemeMetas } from 'magic-color'

const props = defineProps<{ colors: ThemeMetas }>()
const isDark = ref(false)
const saved = ref(false)
const inlineStyle = computed(() => Object.fromEntries(Object.entries(props.colors).map(([key, value]) => [`--color-${key}`, value])))
</script>

<template>
  <div class="demo-frame" :class="{ 'demo-dark': isDark }" :style="inlineStyle">
    <div class="demo-toolbar">
      <div class="demo-wordmark">
        <span class="demo-mark">a.</span> atelier
      </div>
      <div class="demo-tools">
        <span class="demo-caption">PALETTE IN CONTEXT</span><button type="button" :aria-label="isDark ? 'Show light preview' : 'Show dark preview'" @click="isDark = !isDark">
          <i :class="isDark ? 'i-carbon-moon' : 'i-carbon-sun'" />
        </button>
      </div>
    </div>
    <div class="demo-body">
      <div class="demo-copy">
        <div class="demo-overline">
          A quieter kind of workspace · 2026
        </div>
        <h2>Space to make<br><em>something good.</em></h2>
        <p>A focused place for the ideas, notes, and small details that make a project yours.</p>
        <div class="demo-cta">
          <button type="button" class="demo-primary" @click="saved = !saved">
            {{ saved ? 'Added to your list ✓' : 'Save this idea ↗' }}
          </button><span>Thoughtfully made, every day.</span>
        </div>
      </div>
      <div class="demo-art" aria-hidden="true">
        <div class="art-border" /><div class="art-circle circle-one" /><div class="art-circle circle-two" /><div class="art-circle circle-three" /><span>STUDY IN COLOR</span>
      </div>
    </div>
    <div class="demo-footer">
      <span>Created with magicolor</span><div><span class="demo-mini-swatch" /><span class="demo-mini-swatch" /><span class="demo-mini-swatch" /><span class="demo-mini-swatch" /><span class="demo-mini-swatch" /></div>
    </div>
  </div>
</template>

<style scoped>
.demo-frame { --surface: #f8faf7; --ink: var(--color-900); color: var(--ink); background: var(--surface); border: 1px solid var(--color-200); border-radius: 10px; overflow: hidden; font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
.demo-frame.demo-dark { --surface: #151515; --ink: #f2f2f2; border-color: #333; }
.demo-toolbar { min-height: 72px; padding: 0 34px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-200); }
.demo-dark .demo-toolbar { border-color: var(--color-800); }
.demo-wordmark { display: flex; align-items: center; gap: 8px; font-weight: 750; font-size: 1rem; letter-spacing: -.04em; }
.demo-mark { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 6px; color: var(--surface); background: var(--color-600); font-family: Georgia, serif; font-size: 1.1rem; }
.demo-tools { display: flex; align-items: center; gap: 24px; }
.demo-caption, .demo-overline, .demo-art > span, .demo-footer { font-family: 'Commit Mono', monospace; font-size: .65rem; letter-spacing: .08em; }
.demo-caption { color: var(--color-600); }
.demo-tools button { display: grid; place-items: center; width: 34px; height: 34px; border: 1px solid var(--color-200); color: var(--ink); background: transparent; border-radius: 7px; }
.demo-tools button:hover { background: var(--color-100); }
.demo-body { display: grid; grid-template-columns: 1fr .85fr; align-items: stretch; gap: 30px; padding: 62px 34px; }
.demo-copy { display: flex; flex-direction: column; align-items: start; }
.demo-overline { color: var(--color-600); text-transform: uppercase; }
.demo-copy h2 { font-size: clamp(2.5rem, 5vw, 4.5rem); line-height: 1.06; letter-spacing: -.075em; font-weight: 600; margin: 19px 0 18px; }
.demo-copy h2 em { font-family: Georgia, serif; font-weight: 400; color: var(--color-600); }
.demo-copy p { max-width: 410px; color: var(--color-600); line-height: 1.65; margin: 0; font-size: .9rem; }
.demo-cta { display: flex; align-items: center; gap: 16px; margin-top: 34px; }
.demo-primary { border: 0; background: var(--color-600); color: #fff; padding: 12px 18px; border-radius: 6px; font-weight: 650; font-size: .78rem; transition: background .2s, transform .2s; }
.demo-primary:hover { background: var(--color-700); transform: translateY(-2px); }
.demo-cta span { color: var(--color-500); font-size: .7rem; }
.demo-art { position: relative; min-height: 335px; border-radius: 4px; overflow: hidden; background: var(--color-100); }
.art-border { position: absolute; inset: 14px; border: 1px solid var(--color-300); }
.art-circle { position: absolute; border-radius: 50%; }
.circle-one { width: 270px; height: 270px; left: 10%; top: 20%; background: var(--color-300); }
.circle-two { width: 215px; height: 215px; right: 5%; top: 5%; background: var(--color-500); mix-blend-mode: multiply; }
.circle-three { width: 150px; height: 150px; right: 15%; bottom: -8%; background: var(--color-800); opacity: .85; }
.demo-art > span { position: absolute; left: 30px; bottom: 26px; color: var(--color-900); }
.demo-footer { border-top: 1px solid var(--color-200); min-height: 56px; padding: 0 34px; display: flex; justify-content: space-between; align-items: center; color: var(--color-600); }
.demo-dark .demo-footer { border-color: var(--color-800); }
.demo-footer > div { display: flex; gap: 4px; }
.demo-mini-swatch { width: 14px; height: 14px; background: var(--color-300); }
.demo-mini-swatch:nth-child(2) { background: var(--color-400); }.demo-mini-swatch:nth-child(3) { background: var(--color-500); }.demo-mini-swatch:nth-child(4) { background: var(--color-600); }.demo-mini-swatch:nth-child(5) { background: var(--color-700); }
@media (max-width: 750px) { .demo-body { grid-template-columns: 1fr; padding: 32px 22px; } .demo-toolbar, .demo-footer { padding: 0 22px; } .demo-art { min-height: 260px; } .demo-copy h2 { font-size: 2.7rem; } .demo-caption { display: none; } }
</style>
