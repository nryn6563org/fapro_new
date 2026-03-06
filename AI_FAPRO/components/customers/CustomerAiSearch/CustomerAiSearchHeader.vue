<template>
  <div class="customer-ai-search__header">
    <div class="customer-ai-search__header-inner">
      <div class="customer-ai-search__icon-box">
        <zap-icon class="customer-ai-search__header-icon" />
      </div>
      <div>
        <h2 class="customer-ai-search__title">AI 고객 검색</h2>
        <p class="customer-ai-search__subtitle">
          문장으로 쉽고 편리하게 고객을 검색해 보세요.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 고객 검색 - 헤더 영역
 */
import { ZapIcon } from "vue-feather-icons";

export default {
  name: "CustomerAiSearchHeader",
  components: {
    ZapIcon,
  },
};
</script>
