<template>
  <div class="customer-ai-search">
    <div class="customer-ai-search__card">
      <!-- Header -->
      <div class="customer-ai-search__header">
        <div class="customer-ai-search__header-inner">
          <div class="customer-ai-search__icon-box">
            <zap-icon class="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 class="customer-ai-search__title">AI 고객 검색</h2>
            <p class="customer-ai-search__subtitle">
              문장으로 쉽고 편리하게 고객을 검색해 보세요.
            </p>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="customer-ai-search__input-wrapper">
        <div class="relative">
          <search-icon class="customer-ai-search__input-icon" />
          <input
            ref="searchInput"
            v-model="internalQuery"
            type="text"
            class="customer-ai-search__input"
            placeholder="예: 업종별 고객 중 자산 5억 이상 고수 등급 찾아줘"
            @keydown.enter="handleSearch"
          />
          <button class="customer-ai-search__search-btn" @click="handleSearch">
            검색
          </button>
        </div>
      </div>

      <!-- Hint -->
      <div class="customer-ai-search__hint">
        <zap-icon class="w-4 h-4 text-teal-500" />
        <span class="font-medium"
          >자연어 검색 예시 : 공격투자형 고객 중 2차전지 관심 있는 고객
          찾아줘</span
        >
      </div>

      <!-- Recommendations -->
      <div class="customer-ai-search__recommends">
        <div class="customer-ai-search__recommends-title">
          <zap-icon class="customer-ai-search__recommends-icon" />
          <span class="customer-ai-search__recommends-label"
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
        <span class="customer-ai-search__filters-label">
          ▼ 투자유형 필터:
        </span>
        <div class="customer-ai-search__filters-group">
          <button
            v-for="category in filterCategories"
            :key="category"
            :class="[
              'customer-ai-search__filter-btn',
              {
                'customer-ai-search__filter-btn--active':
                  selectedFilter === category,
              },
            ]"
            @click="$emit('update:selectedFilter', category)"
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
import { SearchIcon, ZapIcon } from "vue-feather-icons";
import "~/assets/css/pages/customers/CustomerAiSearch/CustomerAiSearch.css";

export default {
  name: "CustomerAiSearch",
  components: {
    SearchIcon,
    ZapIcon,
  },
  props: {
    searchQuery: { type: String, default: "" },
    recentSearches: { type: Array, default: () => [] },
    selectedFilter: { type: String, default: "전체" },
    filterCategories: { type: Array, default: () => [] },
  },
  data() {
    return {
      internalQuery: this.searchQuery,
    };
  },
  watch: {
    searchQuery(newVal) {
      this.internalQuery = newVal;
    },
  },
  mounted() {
    this.$autocomplete(this.$refs.searchInput, {
      fetch: (text, update) => {
        text = text.toLowerCase();
        const suggestions = this.recentSearches
          .filter((s) => s.toLowerCase().includes(text))
          .map((s) => ({ label: s, value: s }));
        update(suggestions);
      },
      onSelect: (item) => {
        this.internalQuery = item.value;
        this.handleSearch();
      },
    });
  },
  methods: {
    handleSearch() {
      this.$emit("search", this.internalQuery);
    },
    handleQuickSearch(text) {
      this.internalQuery = text;
      this.handleSearch();
    },
  },
};
</script>
