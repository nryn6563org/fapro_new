<template>
  <div v-if="client" class="holdings-modal">
    <div class="holdings-modal__overlay" @click="$emit('close')"></div>
    <div class="holdings-modal__container animate__animated animate__zoomIn">
      <!-- Header -->
      <div class="holdings-modal__header">
        <div class="flex items-center gap-3">
          <div class="holdings-modal__icon-box">
            <eye-icon class="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 class="holdings-modal__title">{{ client.name }}님의 보유종목</h2>
            <p class="holdings-modal__subtitle">종목별 보유 현황 및 수익률 분석</p>
          </div>
        </div>
        <button class="holdings-modal__close" @click="$emit('close')">
          <x-icon class="w-6 h-6" />
        </button>
      </div>

      <!-- Table Section -->
      <div class="holdings-modal__content">
        <div class="holdings-modal__table-wrapper">
          <table class="holdings-modal__table">
            <thead>
              <tr>
                <th class="holdings-modal__th">종목명</th>
                <th class="holdings-modal__th text-right">보유주수</th>
                <th class="holdings-modal__th text-right">평균 매수가</th>
                <template v-if="calculated">
                  <th class="holdings-modal__th text-right">현재가</th>
                  <th class="holdings-modal__th text-right">평가금액</th>
                  <th class="holdings-modal__th text-right">손익률</th>
                </template>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(holding, idx) in client.holdingsDetail" :key="idx">
                <td class="holdings-modal__td font-bold">{{ holding.name }}</td>
                <td class="holdings-modal__td text-right">{{ holding.quantity.toLocaleString() }}주</td>
                <td class="holdings-modal__td text-right">{{ holding.avgPrice.toLocaleString() }}원</td>
                <template v-if="calculated">
                  <td class="holdings-modal__td text-right font-bold">
                    {{ getCurrentPrice(holding.name).toLocaleString() }}원
                  </td>
                  <td class="holdings-modal__td text-right font-bold">
                    {{ (getCurrentPrice(holding.name) * holding.quantity).toLocaleString() }}원
                  </td>
                  <td class="holdings-modal__td text-right">
                    <div
                      class="flex items-center justify-end gap-1"
                      :class="getReturnColor(holding)"
                    >
                      <trending-up-icon v-if="getReturnRate(holding) >= 0" class="w-3 h-3" />
                      <trending-down-icon v-else class="w-3 h-3" />
                      <span class="font-black">{{ getReturnRate(holding).toFixed(2) }}%</span>
                    </div>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Summary Cards -->
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

        <!-- AI Analysis -->
        <div v-if="!calculated" class="flex justify-center mt-8">
          <button class="holdings-modal__calc-btn" @click="handleCalculate">
            <activity-icon class="w-6 h-6 mr-2" />
            AI 수익률 계산 및 분석하기
          </button>
        </div>

        <transition name="fade-in">
          <div v-if="calculated" class="holdings-modal__analysis animate__animated animate__fadeIn">
            <div class="holdings-modal__ai-tag">
              <zap-icon class="w-5 h-5 text-amber-500" />
              <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-black text-slate-900 dark:text-white">AI 분석 완료</span>
                  <span class="text-[10px] text-pink-500 font-bold">{{ analysisTime }} 기준</span>
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  현재 시세를 기준으로 분석한 결과,
                  <span
                    :class="totalReturn >= 0 ? 'text-red-500' : 'text-blue-500'"
                    class="font-bold"
                  >
                    {{ totalReturn.toFixed(2) }}% </span
                  >의 손익을 기록 중입니다.
                  {{ aiComment }}
                </p>

                <!-- Suggestions -->
                <div class="holdings-modal__suggestions">
                  <div class="flex items-center gap-2 mb-3">
                    <zap-icon class="w-4 h-4 text-teal-500" />
                    <span class="text-sm font-black dark:text-white">AI 제안 종목</span>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="stock in suggestedStocks"
                      :key="stock"
                      class="holdings-modal__suggest-tag"
                    >
                      {{ stock }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 보유종목 및 수익률 분석 모달
 */
import {
  EyeIcon,
  XIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ActivityIcon,
  ZapIcon
} from 'vue-feather-icons'
import {
  calculateTotalInvestment,
  calculateCurrentValue,
  calculateTotalReturn
} from '~/utils/clientUtils.js'
import { currentPrices } from '~/utils/clientMockData.js'
import '~/assets/css/pages/clients/ClientHoldingsModal.css'

export default {
  name: 'ClientHoldingsModal',
  components: {
    EyeIcon,
    XIcon,
    TrendingUpIcon,
    TrendingDownIcon,
    ActivityIcon,
    ZapIcon
  },
  props: {
    client: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      calculated: false,
      analysisTime: '',
      currentPrices
    }
  },
  computed: {
    totalInvestment() {
      return calculateTotalInvestment(this.client.holdingsDetail)
    },
    totalValue() {
      return calculateCurrentValue(this.client.holdingsDetail, this.currentPrices)
    },
    totalReturn() {
      return calculateTotalReturn(this.client.holdingsDetail, this.currentPrices)
    },
    aiComment() {
      if (this.totalReturn >= 0) {
        return '안정적인 수익 흐름을 유지하고 있으며, 현재 투자 전략을 지속 유지하는 것을 권장합니다.'
      }
      return '일시적인 조정 국면으로 보이며, 시장 회복 시 반등 가능성을 고려하여 관망하는 것을 권장합니다.'
    },
    suggestedStocks() {
      if (this.client.investmentType === '공격형')
        return ['리노공업', '한화에어로스페이스', '원익IPS']
      if (this.client.investmentType === '안정형') return ['KT&G', '맥쿼리인프라', '한국가스공사']
      return ['삼양식품', '하림지주', '한온시스템']
    }
  },
  watch: {
    client() {
      this.calculated = false
    }
  },
  methods: {
    handleCalculate() {
      this.calculated = true
      this.analysisTime = new Date().toLocaleString()
      this.$emit('calculate')
    },
    getCurrentPrice(name) {
      return this.currentPrices[name] || 0
    },
    getReturnRate(holding) {
      const current = this.getCurrentPrice(holding.name)
      if (!current) return 0
      return ((current - holding.avgPrice) / holding.avgPrice) * 100
    },
    getReturnColor(holding) {
      return this.getReturnRate(holding) >= 0 ? 'text-red-500' : 'text-blue-500'
    }
  }
}
</script>
