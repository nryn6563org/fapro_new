<template>
  <div class="customer-ai-search">
    <div class="customer-ai-search__card">
      <CustomerAiSearchHeader />

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
            @mousedown="handleFocus"
          />
          <button class="customer-ai-search__search-btn" @click="handleSearch">
            검색
          </button>
        </div>
      </div>

      <!-- Hint -->
      <div class="customer-ai-search__hint">
        <zap-icon size="16" />
        <span>자연어 검색 예시 : 공격투자형 고객 중 2차전지 관심 있는 고객 찾아줘</span>
      </div>

      <CustomerAiSearchRecommends
        :recent-searches="recentSearches"
        @select="handleQuickSearch"
      />

      <CustomerAiSearchFilters
        :selected="selectedFilter"
        :categories="filterCategories"
        @update:selected="$emit('update:selectedFilter', $event)"
      />
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 고객 검색 컴포넌트 (Rule 6 & Rule 9 준수)
 */
import { SearchIcon, ZapIcon } from "vue-feather-icons";
import CustomerAiSearchHeader from "~/components/customers/CustomerAiSearch/CustomerAiSearchHeader.vue";
import CustomerAiSearchRecommends from "~/components/customers/CustomerAiSearch/CustomerAiSearchRecommends.vue";
import CustomerAiSearchFilters from "~/components/customers/CustomerAiSearch/CustomerAiSearchFilters.vue";
import "~/assets/css/pages/customers/CustomerAiSearch/CustomerAiSearch.css";

export default {
  name: "CustomerAiSearch",
  components: {
    SearchIcon,
    ZapIcon,
    CustomerAiSearchHeader,
    CustomerAiSearchRecommends,
    CustomerAiSearchFilters,
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
    handleFocus() {
      alert("준비중 입니다");
    },
    handleQuickSearch(text) {
      this.internalQuery = text;
      this.handleSearch();
    },
  },
};
</script>
