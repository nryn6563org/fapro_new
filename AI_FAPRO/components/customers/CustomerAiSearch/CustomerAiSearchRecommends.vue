<template>
  <div class="customer-ai-search__recommends">
    <div class="customer-ai-search__recommends-title">
      <zap-icon class="customer-ai-search__recommends-icon" />
      <span class="customer-ai-search__recommends-label">
        추천 검색어 (클릭하여 바로 검색)
      </span>
    </div>
    <div class="customer-ai-search__recommend-list">
      <div
        v-for="(search, index) in recentSearches"
        :key="index"
        class="customer-ai-search__recommend-item"
        @click="$emit('select', search)"
      >
        {{ search }}
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 고객 검색 - 추천 검색어 영역
 */
import { ZapIcon } from "vue-feather-icons";

export default {
  name: "CustomerAiSearchRecommends",
  components: {
    ZapIcon,
  },
  props: {
    recentSearches: { type: Array, default: () => [] },
  },
};
</script>
