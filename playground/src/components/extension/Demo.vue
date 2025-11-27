<script lang='ts' setup>
import type { ThemeMetas } from 'magic-color'

const props = defineProps<{
  colors: ThemeMetas
}>()

const inlineStyle = computed(() => {
  return Object.fromEntries(Object.entries(props.colors).map(([key, value]) => [`--color-${key}`, value]))
})
</script>

<template>
  <div class="demo-container" :style="inlineStyle">
    <header class="demo-header">
      <div class="demo-logo">
        Portal
      </div>
      <nav class="demo-nav">
        <a href="#" class="active">Home</a>
        <a href="#">Products</a>
        <a href="#">About</a>
      </nav>
      <div class="demo-actions">
        <button class="demo-btn-outline">
          Login
        </button>
        <button class="demo-btn-primary">
          Sign up
        </button>
      </div>
    </header>

    <main class="demo-main">
      <section class="demo-hero">
        <h1>Build faster with Magic Color</h1>
        <p>Generate perfect color palettes for your next project instantly.</p>
        <div class="demo-hero-actions">
          <button class="demo-btn-primary large">
            Get Started
          </button>
          <button class="demo-btn-text">
            Learn more →
          </button>
        </div>
      </section>

      <section class="demo-features">
        <div v-for="i in 3" :key="i" class="demo-card">
          <div class="demo-card-icon" />
          <h3>Feature {{ i }}</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
          <a href="#" class="demo-link">Read more</a>
        </div>
      </section>
    </main>

    <footer class="demo-footer">
      <div class="demo-footer-content">
        <div class="demo-footer-col">
          <h4>Product</h4>
          <a href="#">Features</a>
          <a href="#">Pricing</a>
        </div>
        <div class="demo-footer-col">
          <h4>Resources</h4>
          <a href="#">Documentation</a>
          <a href="#">Blog</a>
        </div>
        <div class="demo-footer-col">
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Careers</a>
        </div>
      </div>
      <div class="demo-copyright">
        © 2025 Magic Color Portal. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<style scoped>
.demo-container {
  font-family: "dm sans";
  background-color: white;
  color: var(--color-900);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-200);
  display: flex;
  flex-direction: column;
}

.demo-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--color-100);
  background-color: white;
}

.demo-logo {
  font-weight: 800;
  font-size: 1.25rem;
  color: var(--color-600);
}

.demo-nav {
  display: flex;
  gap: 2rem;
}

.demo-nav a {
  text-decoration: none;
  color: var(--color-600);
  font-weight: 500;
  font-size: 0.9rem;
}

.demo-nav a.active {
  color: var(--color-600);
}

.demo-nav a:hover {
  color: var(--color-800);
}

.demo-actions {
  display: flex;
  gap: 1rem;
}

.demo-btn-primary {
  background-color: var(--color-600);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.demo-btn-primary:hover {
  background-color: var(--color-700);
}

.demo-btn-outline {
  background-color: transparent;
  color: var(--color-600);
  border: 1px solid var(--color-200);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.demo-btn-outline:hover {
  background-color: var(--color-50);
  border-color: var(--color-300);
}

.demo-main {
  flex: 1;
}

.demo-hero {
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(to bottom, var(--color-50), white);
}

.demo-hero h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--color-900);
  line-height: 1.2;
}

.demo-hero p {
  font-size: 1.1rem;
  color: var(--color-600);
  max-width: 600px;
  margin: 0 auto 2rem;
}

.demo-hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.demo-btn-primary.large {
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
}

.demo-btn-text {
  background: none;
  border: none;
  color: var(--color-600);
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
}

.demo-btn-text:hover {
  color: var(--color-800);
  text-decoration: underline;
}

.demo-features {
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.demo-card {
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--color-100);
  background-color: white;
  transition: transform 0.2s, box-shadow 0.2s;
}

.demo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px -10px var(--color-200);
  border-color: var(--color-200);
}

.demo-card-icon {
  width: 48px;
  height: 48px;
  background-color: var(--color-100);
  border-radius: 12px;
  margin-bottom: 1.5rem;
  color: var(--color-600);
}

.demo-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--color-900);
}

.demo-card p {
  color: var(--color-500);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.demo-link {
  color: var(--color-600);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
}

.demo-link:hover {
  color: var(--color-800);
}

.demo-footer {
  background-color: var(--color-50);
  padding: 4rem 2rem 2rem;
  border-top: 1px solid var(--color-100);
}

.demo-footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto 3rem;
}

.demo-footer-col {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.demo-footer-col h4 {
  font-weight: 700;
  color: var(--color-900);
  margin-bottom: 0.5rem;
}

.demo-footer-col a {
  color: var(--color-500);
  text-decoration: none;
  font-size: 0.9rem;
}

.demo-footer-col a:hover {
  color: var(--color-700);
}

.demo-copyright {
  text-align: center;
  color: var(--color-400);
  font-size: 0.875rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-200);
}
</style>
