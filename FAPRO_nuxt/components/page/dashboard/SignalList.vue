<template>
  <div class="p-dashboard__signal-list">
    <div v-for="(signal, index) in signals" :key="index" class="p-signal-item">
      <div class="p-signal-item__main">
        <span class="p-signal-item__badge" :class="`p-signal-item__badge--${signal.type}`">{{ signal.typeName }}</span>
        <span class="p-signal-item__name">{{ signal.name }}</span>
      </div>
      <div class="p-signal-item__price" :class="signal.change >= 0 ? 'p-signal-item__price--positive' : 'p-signal-item__price--negative'">
        {{ signal.price.toLocaleString() }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardSignalList',
  props: {
    signals: { type: Array, required: true }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/dashboard.css';
</style>
