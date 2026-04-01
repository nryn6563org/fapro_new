<template>
  <div class="customer-proposal-history">
    <h3 class="customer-proposal-history__title">고객 제안 히스토리 (최근 1개월)</h3>

    <!-- 탭 필터 -->
    <customer-proposal-history-tabs
      :active-tab.sync="activeTab"
      :tabs="tabs"
    />

    <!-- 카드 -->
    <div class="customer-proposal-history__card">
      <!-- 리스트 -->
      <div v-if="filteredHistory.length > 0" class="customer-proposal-history__list">
        <div
          v-for="(item, idx) in pagedItems"
          :key="idx"
          class="customer-proposal-history__item"
        >
          <span class="customer-proposal-history__date">{{ item.date }}.</span>
          <div class="customer-proposal-history__content">
            <p class="customer-proposal-history__text">
              <strong>{{ item.customerName }}</strong>
              {{ item.description }} ({{ item.channel }})
            </p>
          </div>
        </div>
      </div>

      <!-- 빈 상태 -->
      <div v-else class="customer-proposal-history__empty">
        해당 조건의 제안 히스토리가 없습니다.
      </div>

      <!-- 페이징 -->
      <div v-if="totalPages > 1" class="customer-proposal-history__pagination">
        <button
          class="customer-proposal-history__page-btn"
          :class="{ 'customer-proposal-history__page-btn--disabled': currentPage === 1 }"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          <chevron-left-icon class="w-3.5 h-3.5" />
        </button>
        <button
          v-for="page in visiblePages"
          :key="page"
          class="customer-proposal-history__page-btn"
          :class="{ 'customer-proposal-history__page-btn--active': page === currentPage }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
        <button
          class="customer-proposal-history__page-btn"
          :class="{ 'customer-proposal-history__page-btn--disabled': currentPage === totalPages }"
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
 * 기능: 전체 고객 제안 히스토리 (탭 필터 + 페이징)
 */
import { ChevronLeftIcon, ChevronRightIcon } from "vue-feather-icons";
import CustomerProposalHistoryTabs from "~/components/customers/CustomerProposalHistory/CustomerProposalHistoryTabs.vue";
import "~/assets/css/pages/customers/CustomerProposalHistory/CustomerProposalHistory.css";

const PAGE_SIZE = 10;
const VISIBLE_PAGE_COUNT = 10;
const PROPOSAL_TABS = [
  "전체",
  "AI리포트 제안",
  "오늘 타겟 제안",
  "매수 타겟 제안",
  "매도 타겟 제안",
  "매수 대기 제안",
  "수익률 상/하위",
  "AI이슈 제안",
  "AI매매신호 제안",
  "AI중장기 유망주 제안",
];

export default {
  name: "CustomerProposalHistory",
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    CustomerProposalHistoryTabs,
  },
  props: {
    customers: { type: Array, required: true },
  },
  data() {
    return {
      activeTab: "전체",
      currentPage: 1,
      tabs: PROPOSAL_TABS,
    };
  },
  computed: {
    /* 전체 고객의 제안 히스토리를 하나로 합침 */
    allProposalHistory() {
      return this.customers
        .flatMap((c) =>
          (c.proposalHistory || []).map((p) => ({ ...p, customerName: c.name }))
        )
        .sort((a, b) => b.date.localeCompare(a.date));
    },
    /* 탭 필터 적용 */
    filteredHistory() {
      if (this.activeTab === "전체") return this.allProposalHistory;
      if (this.activeTab === "수익률 상/하위") {
        return this.allProposalHistory.filter(
          (item) =>
            item.description.includes("수익률 상위") ||
            item.description.includes("수익률 하위")
        );
      }
      const keyword = this.activeTab.replace(" 제안", "");
      return this.allProposalHistory.filter((item) =>
        item.description.includes(keyword)
      );
    },
    totalPages() {
      return Math.ceil(this.filteredHistory.length / PAGE_SIZE);
    },
    /* 10페이지 단위로 표시 */
    visiblePages() {
      const start = Math.floor((this.currentPage - 1) / VISIBLE_PAGE_COUNT) * VISIBLE_PAGE_COUNT + 1;
      const end = Math.min(start + VISIBLE_PAGE_COUNT - 1, this.totalPages);
      const pages = [];
      for (let i = start; i <= end; i++) pages.push(i);
      return pages;
    },
    pagedItems() {
      const start = (this.currentPage - 1) * PAGE_SIZE;
      return this.filteredHistory.slice(start, start + PAGE_SIZE);
    },
  },
  watch: {
    activeTab() {
      this.currentPage = 1;
    },
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
};
</script>
