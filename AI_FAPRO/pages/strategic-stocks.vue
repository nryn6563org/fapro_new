<template>
  <div class="strategic-page">
    <!-- Header -->
    <div class="strategic-page__header">
      <div class="strategic-page__title-box">
        <h1 class="strategic-page__title">AI 중장기 유망주</h1>
        <p class="strategic-page__subtitle">
          AI가 발굴한 오늘의 유망주 입니다.
        </p>
      </div>
      <div class="strategic-page__action-box">
        <div class="strategic-page__time-info">
          <p class="strategic-page__time-text">{{ formattedDateOnly }}</p>
        </div>
        <button class="strategic-page__refresh-btn" @click="refreshData">
          <refresh-cw-icon size="16" class="strategic-page__refresh-icon" />
          <span class="strategic-page__refresh-text">새로고침</span>
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
      v-if="selectedStock"
      :is-open="isProposalModalOpen"
      :stock="selectedStock"
      @close="closeProposalModal"
    />
  </div>
</template>

<script>
/**
 * 기능: AI 중장기 유망주 페이지 컴포넌트
 */
import { RefreshCwIcon } from "vue-feather-icons";
import StrategicStockCard from "~/components/strategic/StrategicStockCard.vue";
import StrategicProposalModal from "~/components/strategic/StrategicProposalModal.vue";
import { stocks } from "~/utils/strategicStocksMockData.js";
import "~/assets/css/pages/strategic-stocks/StrategicStocksPage/StrategicStocksPage.css";

export default {
  name: "StrategicStocksPage",
  components: {
    RefreshCwIcon,
    StrategicStockCard,
    StrategicProposalModal,
  },
  data() {
    return {
      stocks,
      lastUpdated: new Date(),
      currentTime: new Date(),
      timer: null,
      isProposalModalOpen: false,
      selectedStock: null,
      expandedCards: [],
    };
  },
  computed: {
    formattedDateOnly() {
      const d = this.currentTime;
      return `${String(d.getMonth() + 1).padStart(2, "0")}.${String(
        d.getDate()
      ).padStart(2, "0")}`;
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);

    // Initialize the first card as expanded by default
    if (this.stocks && this.stocks.length > 0) {
      this.expandedCards.push(this.stocks[0].id);
    }
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    toggleCard(id) {
      if (this.expandedCards.includes(id)) {
        this.expandedCards = this.expandedCards.filter(
          (cardId) => cardId !== id
        );
      } else {
        this.expandedCards.push(id);
      }
    },
    refreshData() {
      this.currentTime = new Date();
    },
    openProposalModal(stock) {
      this.selectedStock = stock;
      this.isProposalModalOpen = true;
    },
    closeProposalModal() {
      this.isProposalModalOpen = false;
      setTimeout(() => {
        this.selectedStock = null;
      }, 300);
    },
  },
};
</script>
