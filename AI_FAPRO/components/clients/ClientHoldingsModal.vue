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
        <!-- Table Section -->
        <ClientHoldingsTable :holdings-detail="client.holdingsDetail" :calculated="calculated" />

        <!-- Summary Cards -->
        <ClientHoldingsSummary
          :calculated="calculated"
          :total-investment="totalInvestment"
          :total-value="totalValue"
          :total-return="totalReturn"
        />

        <!-- AI Analysis -->
        <ClientHoldingsAnalysis
          :calculated="calculated"
          :analysis-time="analysisTime"
          :total-return="totalReturn"
          :ai-comment="aiComment"
          :suggested-stocks="suggestedStocks"
          @calculate="handleCalculate"
        />
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
  XIcon
} from 'vue-feather-icons'
import {
  calculateTotalInvestment,
  calculateCurrentValue,
  calculateTotalReturn
} from '~/utils/clientUtils.js'
import { currentPrices } from '~/utils/clientMockData.js'
import '~/assets/css/pages/clients/ClientHoldingsModal/ClientHoldingsModal.css'
import ClientHoldingsTable from '~/components/clients/ClientHoldingsTable.vue'
import ClientHoldingsSummary from '~/components/clients/ClientHoldingsSummary.vue'
import ClientHoldingsAnalysis from '~/components/clients/ClientHoldingsAnalysis.vue'

export default {
  name: 'ClientHoldingsModal',
  components: {
    EyeIcon,
    XIcon,
    ClientHoldingsTable,
    ClientHoldingsSummary,
    ClientHoldingsAnalysis
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
    }
  }
}
</script>
