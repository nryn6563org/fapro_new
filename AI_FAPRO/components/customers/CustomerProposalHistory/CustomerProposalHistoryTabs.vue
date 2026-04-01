<template>
  <div class="proposal-history-tabs">
    <button
      v-for="tab in tabs"
      :key="tab"
      class="proposal-history-tabs__btn"
      :class="{ 'proposal-history-tabs__btn--active': tab === activeTab }"
      @click="$emit('update:activeTab', tab)"
    >
      {{ tab }}
    </button>
  </div>
</template>

<script>
/**
 * 기능: 제안 히스토리 탭 필터 버튼
 */
import "~/assets/css/pages/customers/CustomerProposalHistory/CustomerProposalHistoryTabs.css";

export default {
  name: "CustomerProposalHistoryTabs",
  props: {
    activeTab: { type: String, required: true },
    tabs: { type: Array, required: true },
  },
};
</script>
