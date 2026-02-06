<template>
  <!-- Project Guide Page: 개발자용 가이드 대시보드 -->
  <div class="guide-container">
    <h1 class="guide-title">Project Migration Guide</h1>
    <section class="guide-section">
      <h2 class="section-title">1. Project Tree Structure</h2>
      <pre class="tree-viewer">
/FAPRO_nuxt
├── assets/
│   └── css/ (External CSS files)
├── components/ (Modular Vue components)
├── layouts/ (Page layouts)
├── pages/ (Application routes)
├── plugins/ (ECharts, Swiper registration)
└── tailwind.config.js (Theme configuration)
      </pre>
    </section>

    <section class="guide-section">
      <h2 class="section-title">2. Styled Components (Rules)</h2>
      <ul class="rule-list">
        <li>✔ No inline Tailwind classes in templates.</li>
        <li>✔ External CSS files for each component.</li>
        <li>✔ Use Tailwind <code>@apply</code> for styling.</li>
        <li>✔ Semantic class naming convention.</li>
      </ul>
    </section>

    <section class="guide-section">
      <h2 class="section-title">3. UI Components List</h2>
      <div class="component-grid">
        <div class="component-item">Header</div>
        <div class="component-item">Sidebar</div>
        <div class="component-item">Footer</div>
        <div class="component-item">Dashboard (index.vue)</div>
      </div>
    </section>
  </div>
</template>

<script>
/**
 * Project Guide 페이지: 개발 현황 및 아키텍처 가이드.
 * Project Guide Page: Development status and architecture guide.
 */
export default {
  name: 'GuidePage',
  layout: 'default'
}
</script>

<style scoped>
.guide-container {
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
.guide-title {
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #2563eb;
}
.guide-section {
  margin-bottom: 2.5rem;
}
.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
  padding-bottom: 0.5rem;
}
.tree-viewer {
  background-color: #111827;
  color: #4ade80;
  padding: 1rem;
  border-radius: 0.375rem;
  font-family: monospace;
  font-size: 0.875rem;
}
.rule-list {
  list-style-type: disc;
  margin-left: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #374151;
}
.component-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
@media (min-width: 768px) {
  .component-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
.component-item {
  padding: 1rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  text-align: center;
  font-weight: 500;
  transition: all 0.2s;
}
.component-item:hover {
  background-color: #eff6ff;
  border-color: #bfdbfe;
}
</style>
