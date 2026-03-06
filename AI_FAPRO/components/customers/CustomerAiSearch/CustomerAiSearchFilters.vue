<template>
  <div class="customer-ai-search__filters">
    <span class="customer-ai-search__filters-label"> ▼ 투자유형 필터: </span>
    <div class="customer-ai-search__filters-group">
      <button
        v-for="category in categories"
        :key="category"
        :class="[
          'customer-ai-search__filter-btn',
          {
            'customer-ai-search__filter-btn--active': selected === category,
          },
        ]"
        @click="$emit('update:selected', category)"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 고객 검색 - 필터 영역
 */
export default {
  name: "CustomerAiSearchFilters",
  props: {
    selected: { type: String, default: "전체" },
    categories: { type: Array, default: () => [] },
  },
};
</script>
