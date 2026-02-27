<template>
  <div class="customer-ai-search">
    <div class="customer-ai-search__card">
      <!-- Header -->
      <div class="customer-ai-search__header">
        <div class="flex items-center gap-3">
          <div class="customer-ai-search__icon-box">
            <zap-icon class="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 class="customer-ai-search__title">AI 고객 검색</h2>
            <p class="customer-ai-search__subtitle">자연어로 고객을 실시간 검색</p>
          </div>
        </div>
        <button class="customer-ai-search__main-btn" @click="handleSearch">
          <zap-icon class="w-4 h-4 mr-2" />
          AI 검색
        </button>
      </div>

      <!-- Input Area -->
      <div class="customer-ai-search__input-wrapper">
        <div class="relative">
          <search-icon class="customer-ai-search__input-icon" />
          <input
            ref="searchInput"
            type="text"
            class="customer-ai-search__input"
            placeholder="예: 업종별 고객 중 자산 5억 이상 고수 등급 찾아줘"
            v-model="internalQuery"
            @keydown.enter="handleSearch"
          />
          <button class="customer-ai-search__search-btn" @click="handleSearch">검색</button>
        </div>
      </div>

      <!-- Hint -->
      <div class="customer-ai-search__hint">
        <zap-icon class="w-4 h-4 text-[#14B8A6]" />
        <span class="font-medium"
          >자연어 검색 예시 : 공격투자형 고객 중 2차전지 관심 있는 고객 찾아줘</span
        >
      </div>

      <!-- Recommendations -->
      <div class="customer-ai-search__recommends">
        <div class="flex items-start gap-2 text-sm mb-3">
          <zap-icon class="w-4 h-4 text-[#14B8A6] mt-0.5 flex-shrink-0" />
          <span class="text-slate-700 dark:text-slate-300 font-medium"
            >추천 검색어 (클릭하여 바로 검색)</span
          >
        </div>
        <div class="customer-ai-search__recommend-list">
          <div
            v-for="(search, index) in recentSearches"
            :key="index"
            class="customer-ai-search__recommend-item"
            @click="handleQuickSearch(search)"
          >
            {{ search }}
          </div>
        </div>
      </div>

      <!-- Filter Types -->
      <div class="customer-ai-search__filters">
        <span class="text-sm font-medium text-slate-700 dark:text-slate-400 mr-2">
          ▼ 투자유형 필터:
        </span>
        <div class="flex items-center gap-2 flex-wrap">
          <button
            v-for="category in filterCategories"
            :key="category"
            @click="$emit('update:selectedFilter', category)"
            :class="[
              'customer-ai-search__filter-btn',
              { 'customer-ai-search__filter-btn--active': selectedFilter === category }
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 고객 검색 및 추천 검색어
 */
import { SearchIcon, ZapIcon } from 'vue-feather-icons'
import '~/assets/css/pages/customers/CustomerAiSearch.css'

export default {
  name: 'CustomerAiSearch',
  components: {
    SearchIcon,
    ZapIcon
  },
  props: {
    searchQuery: { type: String, default: '' },
    recentSearches: { type: Array, default: () => [] },
    selectedFilter: { type: String, default: '전체' },
    filterCategories: { type: Array, default: () => [] }
  },
  data() {
    return {
      internalQuery: this.searchQuery
    }
  },
  watch: {
    searchQuery(newVal) {
      this.internalQuery = newVal
    }
  },
  mounted() {
    this.$autocomplete(this.$refs.searchInput, {
      fetch: (text, update) => {
        text = text.toLowerCase()
        const suggestions = this.recentSearches
          .filter((s) => s.toLowerCase().includes(text))
          .map((s) => ({ label: s, value: s }))
        update(suggestions)
      },
      onSelect: (item) => {
        this.internalQuery = item.value
        this.handleSearch()
      }
    })
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.internalQuery)
    },
    handleQuickSearch(text) {
      this.internalQuery = text
      this.handleSearch()
    }
  }
}
</script>
