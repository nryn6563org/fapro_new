<template>
  <div class="l-default" :class="{'l-default--minimized': isSidebarMinimized}">
    <Header @toggle="isSidebarMinimized = !isSidebarMinimized" />
    <AIBanner />
    <div class="l-default__body">
      <Sidebar 
        class="l-default__sidebar" 
        :is-minimized="isSidebarMinimized"
      />
      <main class="l-default__main">
        <div class="l-default__inner">
          <Nuxt class="l-default__content" />
          <RightPanel class="l-default__right-panel" />
        </div>
      </main>
  </div>
</div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      isSidebarMinimized: false
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/layouts/default.css';
</style>
