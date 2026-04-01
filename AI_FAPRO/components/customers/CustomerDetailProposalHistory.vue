<template>
  <div class="proposal-history">
    <span class="proposal-history__title">고객 제안 히스토리 (최근 1개월)</span>

    <!-- 탭 필터 -->
    <div class="proposal-history__tabs">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="proposal-history__tab"
        :class="{ 'proposal-history__tab--active': activeTab === tab.value }"
        @click="setTab(tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="proposal-history__card">
      <!-- 리스트 -->
      <div v-if="totalItems > 0" class="proposal-history__list">
        <div
          v-for="(item, idx) in pagedItems"
          :key="idx"
          class="proposal-history__item"
        >
          <span class="proposal-history__date">{{ item.date }}</span>
          <div class="proposal-history__content">
            <p class="proposal-history__text">
              <strong class="proposal-history__customer-name">{{ item.customerName }}</strong>
              {{ item.description }}
            </p>
            <span class="proposal-history__channel">{{ item.channel }}</span>
          </div>
        </div>
      </div>

      <!-- 빈 상태 -->
      <div v-else class="proposal-history__empty">
        최근 1개월 내 제안 히스토리가 없습니다.
      </div>

      <!-- 페이징 -->
      <div v-if="totalPages > 1" class="proposal-history__pagination">
        <button
          class="proposal-history__page-btn"
          :class="{ 'proposal-history__page-btn--disabled': currentPage === 1 }"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          <chevron-left-icon class="w-3.5 h-3.5" />
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          class="proposal-history__page-btn"
          :class="{ 'proposal-history__page-btn--active': page === currentPage }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
        <button
          class="proposal-history__page-btn"
          :class="{ 'proposal-history__page-btn--disabled': currentPage === totalPages }"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          <chevron-right-icon class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 제안 히스토리 (최근 1개월) - 탭 필터 + 페이징
 */
import { ChevronLeftIcon, ChevronRightIcon } from "vue-feather-icons";
import "~/assets/css/pages/customers/CustomerDetailModal/CustomerDetailProposalHistory.css";

const PAGE_SIZE = 10;

export default {
  name: "CustomerDetailProposalHistory",
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  props: {
    proposalHistory: { type: Array, default: () => [] },
  },
  data() {
    return {
      currentPage: 1,
      activeTab: "전체",
      tabs: [
        { label: "전체", value: "전체" },
        { label: "AI리포트 제안", value: "AI리포트" },
        { label: "오늘 타겟 제안", value: "오늘 타겟" },
        { label: "매수 타겟 제안", value: "매수 타겟" },
        { label: "매도 타겟 제안", value: "매도 타겟" },
        { label: "매수 대기 제안", value: "매수 대기" },
        { label: "수익률 상/하위", value: "수익률" },
        { label: "AI이슈 제안", value: "AI이슈포착" },
        { label: "AI매매신호 제안", value: "AI매매신호" },
        { label: "AI중장기 유망주 제안", value: "AI중장기" },
      ],
    };
  },
  computed: {
    filteredItems() {
      if (this.activeTab === "전체") return this.proposalHistory;
      return this.proposalHistory.filter((item) =>
        item.type === this.activeTab
      );
    },
    totalItems() {
      return this.filteredItems.length;
    },
    totalPages() {
      return Math.ceil(this.totalItems / PAGE_SIZE);
    },
    pagedItems() {
      const start = (this.currentPage - 1) * PAGE_SIZE;
      return this.filteredItems.slice(start, start + PAGE_SIZE);
    },
  },
  watch: {
    proposalHistory() {
      this.currentPage = 1;
      this.activeTab = "전체";
    },
  },
  methods: {
    setTab(tab) {
      this.activeTab = tab;
      this.currentPage = 1;
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
};
</script>
