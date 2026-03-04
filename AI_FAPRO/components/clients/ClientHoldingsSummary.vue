<template>
  <transition name="fade-up">
    <div v-if="calculated" class="holdings-modal__summary">
      <div class="holdings-modal__sum-card">
        <span class="holdings-modal__sum-label">총 투자금액</span>
        <span class="holdings-modal__sum-value"
          >{{ totalInvestment.toLocaleString() }}원</span
        >
      </div>
      <div class="holdings-modal__sum-card">
        <span class="holdings-modal__sum-label">현재 평가금액</span>
        <span class="holdings-modal__sum-value">{{ totalValue.toLocaleString() }}원</span>
      </div>
      <div
        :class="[
          'holdings-modal__sum-card',
          totalReturn >= 0 ? 'holdings-modal__sum-card--up' : 'holdings-modal__sum-card--down'
        ]"
      >
        <span class="holdings-modal__sum-label">총 수익률</span>
        <div class="flex items-center gap-2">
          <trending-up-icon v-if="totalReturn >= 0" class="w-5 h-5" />
          <trending-down-icon v-else class="w-5 h-5" />
          <span
            :class="[
              'holdings-modal__sum-value',
              totalReturn >= 0
                ? 'holdings-modal__sum-value--up'
                : 'holdings-modal__sum-value--down'
            ]"
            >{{ totalReturn >= 0 ? '+' : '' }}{{ totalReturn.toFixed(2) }}%</span
          >
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/**
 * 기능: 보유종목 수익률 요약 카드
 */
import { TrendingUpIcon, TrendingDownIcon } from 'vue-feather-icons'
import '~/assets/css/pages/clients/ClientHoldingsSummary/ClientHoldingsSummary.css'

export default {
  name: 'ClientHoldingsSummary',
  components: {
    TrendingUpIcon,
    TrendingDownIcon
  },
  props: {
    calculated: {
      type: Boolean,
      default: false
    },
    totalInvestment: {
      type: Number,
      required: true
    },
    totalValue: {
      type: Number,
      required: true
    },
    totalReturn: {
      type: Number,
      required: true
    }
  }
}
</script>
