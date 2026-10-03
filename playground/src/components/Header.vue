<script setup lang="ts">
const { copied, copy } = useClipboard()
const homeUrl = import.meta.env.BASE_URL
function handleShare() { copy(location.href) }
</script>

<template>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" :href="homeUrl" aria-label="Magicolor home"><img src="/logo.svg" width="34" height="34" alt=""><span>magicolor<span class="brand-period">.</span></span></a>
      <span class="header-descriptor">A tiny studio for color</span>
      <nav class="header-actions" aria-label="Site actions">
        <button class="header-action" type="button" :title="copied ? 'Link copied' : 'Copy share link'" :aria-label="copied ? 'Link copied' : 'Copy share link'" @click="handleShare"><i :class="copied ? 'i-carbon-checkmark' : 'i-carbon-share'" /> <span>{{ copied ? 'Copied' : 'Share' }}</span></button>
        <button class="header-action icon-only" type="button" title="Toggle color mode" aria-label="Toggle color mode" @click="toggleDark"><i class="i-carbon-sun dark:i-carbon-moon" /></button>
        <a class="header-action icon-only" href="https://github.com/zyyv/magic-color" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub"><i class="i-carbon-logo-github" /></a>
      </nav>
    </div>
  </header>
</template>
