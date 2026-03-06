<template>
  <section class="proposal-section">
    <div class="proposal-section__header">
      <div class="proposal-section__title-row">
        <trending-up-icon class="proposal-section__icon--emerald" />
        <h3 class="proposal-section__title">{{ title }}</h3>
      </div>
      <span v-if="mode === 'select'" class="proposal-section__badge"> {{ selectedTickers.length }}개 선택 </span>
    </div>
    <p v-if="description" class="proposal-section__desc">
      {{ description }}
    </p>

    <!-- Mode: Selection List (Multi-stock) -->
    <div v-if="mode === 'select'" :class="selectionBoxClass">
      <div class="proposal-list">
        <label
          v-for="stock in stocks"
          :key="stock.ticker"
          :class="getStockItemClass(stock)"
        >
          <div class="proposal-item__content">
            <div class="proposal-item__top-row">
              <div class="proposal-item__checkbox">
                <input :id="`stock-${stock.ticker}`" type="checkbox" :value="stock.ticker" :checked="isSelected(stock.ticker)" @change="toggleSelection(stock.ticker)" />
              </div>
              <div class="proposal-item__name-row">
                <strong class="proposal-item__name">{{ stock.name }}</strong>
                <span class="proposal-item__ticker">({{ stock.ticker }})</span>
              </div>
            </div>
            <div class="proposal-item__meta text-[11px]">
              현재가: <span class="text-slate-600">{{ stock.price }}원</span> | 등락률:
              <span v-if="stock.change" :class="stock.change.startsWith('+') ? 'proposal-item__change--up' : 'proposal-item__change--down'">{{ stock.change }}</span>
              <span v-else class="text-slate-400">-%</span>
            </div>
            <div v-if="stock.reason" :class="stockReasonClass(stock)">
              <span class="proposal-item__stock-reason-label">💡 제안 사유 :</span>
              {{ stock.reason }}
            </div>
          </div>
        </label>
      </div>
    </div>

    <!-- Mode: Single Display -->
    <div v-else :class="getStockStatusClass(singleStock)">
      <div class="proposal-item__content">
        <div class="proposal-item__top-row">
          <div class="proposal-item__name-row">
            <strong class="proposal-item__name">{{ singleStock.name }}</strong>
            <span class="proposal-item__ticker">({{ singleStock.ticker }})</span>
          </div>
        </div>
        <div class="proposal-item__meta text-[11px]">
          현재가: <span class="text-slate-600">{{ singleStock.price }}원</span> | 등락률:
          <span v-if="singleStock && singleStock.change" :class="singleStock.change.startsWith('+') ? 'proposal-item__change--up' : 'proposal-item__change--down'">{{ singleStock.change }}</span>
          <span v-else class="text-slate-400">-%</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/**
 * ProposalStockSection
 * 기능: 제안 종목 표시 및 선택 섹션
 */
import { TrendingUpIcon } from "vue-feather-icons";
import "~/assets/css/common/proposal/ProposalStockSection/ProposalStockSection.css";

export default {
  name: "ProposalStockSection",
  components: {
    TrendingUpIcon
  },
  props: {
    mode: {
      type: String,
      default: "select" // 'select', 'display'
    },
    title: {
      type: String,
      default: "제안 종목"
    },
    description: {
      type: String,
      default: "이 고객에게 제안할 추천 종목입니다."
    },
    stocks: {
      type: Array,
      default: () => []
    },
    selectedTickers: {
      type: Array,
      default: () => []
    },
    singleStock: {
      type: Object,
      default: () => ({
        name: "종목명",
        ticker: "000000",
        price: "0",
        change: "0%"
      })
    }
  },
  computed: {
    selectionBoxClass() {
      if (this.title.includes("매도")) return "proposal-selection-box--sell";
      return "proposal-selection-box--stock";
    }
  },
  methods: {
    isSelected(ticker) {
      return this.selectedTickers.includes(ticker);
    },
    toggleSelection(ticker) {
      const newTickers = [...this.selectedTickers];
      const index = newTickers.indexOf(ticker);
      if (index > -1) {
        newTickers.splice(index, 1);
      } else {
        newTickers.push(ticker);
      }
      this.$emit("update:selectedTickers", newTickers);
    },
    getStockItemClass(stock) {
      if (this.isSelected(stock.ticker)) return "proposal-item--selected";
      if (!stock || !stock.change) return "proposal-item";
      if (stock.change.startsWith("+")) return "proposal-item--up";
      if (stock.change.startsWith("-")) return "proposal-item--down";
      return "proposal-item";
    },
    getStockStatusClass(stock) {
      if (!stock || !stock.change) return "";
      if (stock.change.startsWith("+")) return "proposal-item--up";
      if (stock.change.startsWith("-")) return "proposal-item--down";
      return "";
    },
    stockReasonClass(stock) {
      if (!stock.change) return "proposal-item__stock-reason--neutral";
      if (stock.change.startsWith("+")) return "proposal-item__stock-reason--buy";
      if (stock.change.startsWith("-")) return "proposal-item__stock-reason--sell";
      return "proposal-item__stock-reason--neutral";
    }
  }
};
</script>
