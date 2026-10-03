<script setup lang="ts">
const props = defineProps<{ code: string }>()
const { copy, copied, text } = useClipboard()
const isCopied = computed(() => copied.value && text.value === props.code)
</script>

<template>
  <div class="code-snippet">
    <div class="code-heading">
      <span><i class="i-carbon-code" aria-hidden="true" /> THE CODE</span>
      <button type="button" :aria-label="isCopied ? 'Code copied' : 'Copy code'" @click="copy(code)">
        <i :class="isCopied ? 'i-carbon-checkmark' : 'i-carbon-copy'" aria-hidden="true" />
        {{ isCopied ? 'Copied' : 'Copy code' }}
      </button>
    </div>
    <pre><code>{{ code }}</code></pre>
  </div>
</template>

<style scoped>
.code-snippet { min-width: 0; }
.code-heading { display: flex; align-items: center; justify-content: space-between; gap: 10px; color: #91a297; font-family: 'Commit Mono', monospace; font-size: .66rem; font-weight: 600; letter-spacing: .1em; }
.code-heading span, .code-heading button { display: inline-flex; align-items: center; gap: 6px; }
.code-heading i { font-size: .95rem; }
.code-heading button { border: 0; background: transparent; color: #547e60; padding: 3px 0; font-family: inherit; font-size: .69rem; font-weight: 600; letter-spacing: 0; white-space: nowrap; }
.code-heading button:hover { color: #315b3c; }
.code-snippet pre { margin: 10px 0 0; padding: 15px; border-radius: 7px; overflow-x: auto; background: #f3f7f2; color: #42664c; font-family: 'Commit Mono', monospace; font-size: .76rem; line-height: 1.5; }
:global(html.dark .code-heading) { color: #a8bbaa; }
:global(html.dark .code-heading button) { color: #a8d8b3; }
:global(html.dark .code-snippet pre) { background: #252b26; color: #c6e6cc; }
</style>
