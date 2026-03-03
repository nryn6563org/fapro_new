<template>
  <div class="strategic-page">
    <!-- Header -->
    <div class="strategic-page__header">
      <div>
        <h1 class="strategic-page__title">AI 전략 유망주</h1>
        <p class="strategic-page__subtitle">AI가 발굴한 중소형 성장 유망 종목</p>
      </div>
      <div class="strategic-page__actions">
        <div class="strategic-page__info">
          <div class="strategic-page__info-text">
            오늘 현재 <span class="strategic-page__info-highlight">{{ stocks.length }}개</span> 종목
            발굴
          </div>
          <div class="strategic-page__info-time">
            {{ formatDateTime(lastUpdated) }}
          </div>
        </div>
        <button class="strategic-page__refresh-btn" @click="handleRefresh">
          <refresh-cw-icon class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Stock Cards -->
    <div class="strategic-page__card-list">
      <strategic-stock-card
        v-for="stock in stocks"
        :key="stock.id"
        :stock="stock"
        :is-expanded="expandedCards.includes(stock.id)"
        @toggle="toggleCard(stock.id)"
        @propose="openProposalModal"
      />
    </div>

    <strategic-proposal-modal
      :is-open="isProposalModalOpen"
      :stock="selectedStock"
      @close="closeProposalModal"
    />
  </div>
</template>

<script>
/**
 * 기능: AI 전략 유망주 페이지 컴포넌트
 */
import { RefreshCwIcon } from 'vue-feather-icons'
import StrategicStockCard from '~/components/strategic/StrategicStockCard.vue'
import StrategicProposalModal from '~/components/strategic/StrategicProposalModal.vue'
import { stocks } from '~/utils/strategicStocksMockData.js'
import '~/assets/css/pages/strategic-stocks/StrategicStocksPage.css'

export default {
  name: 'StrategicStocksPage',
  components: {
    RefreshCwIcon,
    StrategicStockCard,
    StrategicProposalModal
  },
  data() {
    return {
      stocks,
      expandedCards: [1], // Expand first card by default
      lastUpdated: new Date(),
      isProposalModalOpen: false,
      selectedStock: null
    }
  },
  methods: {
    toggleCard(id) {
      if (this.expandedCards.includes(id)) {
        this.expandedCards = this.expandedCards.filter((cardId) => cardId !== id)
      } else {
        this.expandedCards.push(id)
      }
    },
    handleRefresh() {
      this.lastUpdated = new Date()
    },
    formatDateTime(date) {
      if (!date) return ''
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      return `${year}.${month}.${day} ${hours}:${minutes}`
    },
    openProposalModal(stock) {
      this.selectedStock = stock
      this.isProposalModalOpen = true
    },
    closeProposalModal() {
      this.isProposalModalOpen = false
      setTimeout(() => {
        this.selectedStock = null
      }, 300) // Clear after animation
    }
  }
}
</script>
