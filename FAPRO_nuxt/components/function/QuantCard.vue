<template>
  <div class="c-quant-card">
    <div class="c-quant-card__header">
      <div class="c-quant-card__icon-wrapper" :class="`c-quant-card__icon-wrapper--${type}`">
        <TrendingUp v-if="type === 'aggressive'" :size="20" class="c-quant-card__icon" />
        <Shield v-if="type === 'neutral'" :size="20" class="c-quant-card__icon" />
        <Zap v-if="type === 'active'" :size="20" class="c-quant-card__icon" />
      </div>
      <span class="c-quant-card__algo">{{ algorithm }}</span>
    </div>
    
    <div class="c-quant-card__content">
      <div class="c-quant-card__stat">
        <span class="c-quant-card__label">월간 수익률</span>
        <span class="c-quant-card__value" :class="returnClass">{{ monthlyReturn }}%</span>
      </div>
      <div class="c-quant-card__stat">
        <span class="c-quant-card__label">누적 수익률</span>
        <span class="c-quant-card__value c-quant-card__value--total">{{ totalReturn }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuantCard',
  props: {
    type: { type: String, default: 'neutral' }, // aggressive, neutral, active
    algorithm: { type: String, required: true },
    monthlyReturn: { type: Number, required: true },
    totalReturn: { type: Number, required: true }
  },
  computed: {
    returnClass() {
      return this.monthlyReturn >= 0 ? 'c-quant-card__value--positive' : 'c-quant-card__value--negative'
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/function/quant-card.css';
</style>
