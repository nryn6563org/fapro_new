<template>
  <div class="proposal-history">
    <span class="proposal-history__title">고객 제안 히스토리 (최근 1개월)</span>
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
            <p class="proposal-history__text">{{ item.description }}</p>
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
 * 기능: 고객 제안 히스토리 (최근 1개월) - 페이징 포함
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
    };
  },
  computed: {
    totalItems() {
      return this.proposalHistory.length;
    },
    totalPages() {
      return Math.ceil(this.totalItems / PAGE_SIZE);
    },
    pagedItems() {
      const start = (this.currentPage - 1) * PAGE_SIZE;
      return this.proposalHistory.slice(start, start + PAGE_SIZE);
    },
  },
  watch: {
    proposalHistory() {
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
