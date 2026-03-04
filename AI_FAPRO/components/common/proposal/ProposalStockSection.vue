<template>
  <section class="proposal-section">
    <div class="proposal-section__header">
      <div class="proposal-section__title-row">
        <trending-up-icon class="proposal-section__icon text-emerald-500" />
        <h3 class="proposal-section__title">{{ title }}</h3>
      </div>
      <span v-if="mode === 'select'" class="proposal-section__badge">
        {{ selectedTickers.length }}개 선택
      </span>
    </div>
    <p v-if="description" class="proposal-section__desc">
      {{ description }}
    </p>

    <!-- Mode: Selection List (Multi-stock) -->
    <div v-if="mode === 'select'" class="proposal-list">
      <label 
        v-for="stock in stocks" 
        :key="stock.ticker"
        class="proposal-item"
        :class="{ 'proposal-item--selected': isSelected(stock.ticker) }"
      >
        <div class="proposal-item__checkbox">
          <input 
            type="checkbox" 
            :value="stock.ticker" 
            :checked="isSelected(stock.ticker)"
            @change="toggleSelection(stock.ticker)"
          />
        </div>
        <div class="proposal-item__content">
          <div class="proposal-item__name-row">
            <strong class="proposal-item__name">{{ stock.name }}</strong>
            <span class="proposal-item__ticker">{{ stock.ticker }}</span>
          </div>
          <div class="proposal-item__meta">
            현재가: <span class="text-slate-600">{{ stock.price }}원</span> | 
            등락률: <span :class="stock.change.startsWith('+') ? 'text-red-500 font-semibold' : 'text-blue-500 font-semibold'">{{ stock.change }}</span>
          </div>
          <div v-if="stock.reason" class="proposal-item__reason">
            💡 <span class="font-bold">제안 사유 :</span> {{ stock.reason }}
          </div>
        </div>
      </label>
    </div>

    <!-- Mode: Single Display -->
    <div v-else class="proposal-item proposal-item--selected cursor-default">
      <div class="proposal-item__content">
        <div class="proposal-item__name-row">
          <strong class="proposal-item__name">{{ singleStock.name }}</strong>
          <span class="proposal-item__ticker">{{ singleStock.ticker }}</span>
        </div>
        <div class="proposal-item__meta">
          현재가: <span class="text-slate-600">{{ singleStock.price }}원</span> | 
          등락률: <span :class="singleStock.change.startsWith('+') ? 'text-red-500 font-semibold' : 'text-blue-500 font-semibold'">{{ singleStock.change }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/**
 * ProposalStockSection
 * 설명: 제안 종목 표시 및 선택 섹션
 */
import { TrendingUpIcon } from 'vue-feather-icons'

export default {
  name: 'ProposalStockSection',
  components: {
    TrendingUpIcon
  },
  props: {
    mode: {
      type: String,
      default: 'select' // 'select', 'display'
    },
    title: {
      type: String,
      default: '제안 종목'
    },
    description: {
      type: String,
      default: '이 고객에게 제안할 추천 종목입니다.'
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
      default: () => ({ name: '종목명', ticker: '000000', price: '0', change: '0%' })
    }
  },
  methods: {
    isSelected(ticker) {
      return this.selectedTickers.includes(ticker)
    },
    toggleSelection(ticker) {
      const newTickers = [...this.selectedTickers]
      const index = newTickers.indexOf(ticker)
      if (index > -1) {
        newTickers.splice(index, 1)
      } else {
        newTickers.push(ticker)
      }
      this.$emit('update:selectedTickers', newTickers)
    }
  }
}
</script>
