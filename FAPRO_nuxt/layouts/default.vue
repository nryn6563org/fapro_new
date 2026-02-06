<template>
  <div class="l-default" :class="{'l-default--minimized': isSidebarMinimized}">
    <Sidebar 
      class="l-default__sidebar" 
      :is-minimized="isSidebarMinimized"
      @toggle="isSidebarMinimized = !isSidebarMinimized"
    />
    <main class="l-default__main">
      <Header class="l-default__header" />
      <div class="l-default__inner">
        <Nuxt class="l-default__content" />
        <RightPanel class="l-default__right-panel" />
      </div>
    </main>
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
