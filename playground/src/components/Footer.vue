<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <span>Made for the curious.</span><div><a href="https://github.com/zyyv/magic-color/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a><span>© {{ new Date().getFullYear() }} <a href="https://github.com/zyyv" target="_blank" rel="noopener noreferrer">Chris</a></span></div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer { border-top: 1px solid #dfe5dd; color: #96a49a; font-size: .75rem; }
.footer-inner { max-width: 1232px; margin: auto; padding: 24px 32px 34px; display: flex; justify-content: space-between; gap: 20px; }
.footer-inner > div { display: flex; gap: 22px; }
.site-footer a { color: inherit; text-decoration: none; }
.site-footer a:hover { color: #496c52; }
:global(html.dark .site-footer) { border-color: #303030; }
@media (max-width: 680px) { .footer-inner { padding: 20px 16px 30px; flex-direction: column; gap: 8px; } }
</style>
