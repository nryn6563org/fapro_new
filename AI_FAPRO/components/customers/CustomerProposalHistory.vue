<template>
  <div class="customer-proposal-history">
    <div class="customer-proposal-history__card fapro-card">
      <div class="customer-proposal-history__card-header fapro-card-header">
        <div class="customer-proposal-history__header-title">
          <activity-icon size="20" class="text-primary" />
          <span>고객 제안 히스토리 (최근 1개월)</span>
        </div>
        
        <!-- 탭 필터 (헤더 통합) -->
        <customer-proposal-history-tabs
          :active-tab.sync="activeTab"
          :tabs="tabs"
        />
      </div>

      <div class="customer-proposal-history__card-body">
        <!-- 리스트 -->
        <div v-if="filteredHistory.length > 0" class="customer-proposal-history__list">
          <div
            v-for="(item, idx) in pagedItems"
            :key="idx"
            class="customer-proposal-history__item"
          >
            <!-- 타임라인 라인/점 -->
            <div class="customer-proposal-history__timeline">
              <div class="customer-proposal-history__line"></div>
              <div :class="['customer-proposal-history__dot', getProposalColorClass(item)]"></div>
            </div>

            <div class="customer-proposal-history__item-content">
              <div class="customer-proposal-history__item-header">
                <div class="customer-proposal-history__item-type-box">
                  <component 
                    :is="getProposalIcon(item)" 
                    size="14" 
                    :class="['customer-proposal-history__type-icon', getProposalColorClass(item)]" 
                  />
                  <span class="customer-proposal-history__date">{{ item.date }}</span>
                </div>
                <span class="customer-proposal-history__channel">{{ item.channel }}</span>
              </div>

              <div class="customer-proposal-history__item-body">
                <p class="customer-proposal-history__text">
                  <span class="customer-proposal-history__name">{{ item.customerName }}</span>
                  <span class="customer-proposal-history__desc">{{ parseDescription(item.description) }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 빈 상태 -->
        <div v-else class="customer-proposal-history__empty">
          <div class="customer-proposal-history__empty-box">
            <info-icon size="32" class="text-slate-300 mb-2" />
            <p>해당 조건의 제안 히스토리가 없습니다.</p>
          </div>
        </div>
      </div>

      <!-- 페이징 -->
      <div v-if="totalPages > 1" class="customer-proposal-history__pagination">
        <button
          class="customer-proposal-history__page-btn"
          :class="{ 'customer-proposal-history__page-btn--disabled': currentPage === 1 }"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          <chevron-left-icon size="14" />
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
          <chevron-right-icon size="14" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 전체 고객 제안 히스토리 (탭 필터 + 페이징) - 프리미엄 리뉴얼 버전
 */
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  ActivityIcon,
  FileTextIcon,
  ZapIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ClockIcon,
  InfoIcon,
  AlertCircleIcon,
  BarChart2Icon,
  StarIcon
} from "vue-feather-icons";
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
    ActivityIcon,
    FileTextIcon,
    ZapIcon,
    TrendingUpIcon,
    TrendingDownIcon,
    ClockIcon,
    InfoIcon,
    AlertCircleIcon,
    BarChart2Icon,
    StarIcon,
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
    allProposalHistory() {
      return this.customers
        .flatMap((c) =>
          (c.proposalHistory || []).map((p) => ({ ...p, customerName: c.name }))
        )
        .sort((a, b) => b.date.localeCompare(a.date));
    },
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
    getProposalIcon(item) {
      const desc = item.description;
      if (desc.includes("AI리포트")) return "FileTextIcon";
      if (desc.includes("오늘 타겟")) return "ZapIcon";
      if (desc.includes("매수 타겟")) return "TrendingUpIcon";
      if (desc.includes("매도 타겟")) return "TrendingDownIcon";
      if (desc.includes("매수 대기")) return "ClockIcon";
      if (desc.includes("이슈포착")) return "AlertCircleIcon";
      if (desc.includes("매매신호")) return "BarChart2Icon";
      if (desc.includes("중장기")) return "StarIcon";
      return "InfoIcon";
    },
    getProposalColorClass(item) {
      const desc = item.description;
      if (desc.includes("AI리포트")) return "text-indigo-500 bg-indigo-500";
      if (desc.includes("오늘 타겟")) return "text-amber-500 bg-amber-500";
      if (desc.includes("매수 타겟")) return "text-rose-500 bg-rose-500";
      if (desc.includes("매도 타겟")) return "text-blue-500 bg-blue-500";
      if (desc.includes("매수 대기")) return "text-slate-500 bg-slate-500";
      if (desc.includes("이슈포착")) return "text-violet-500 bg-violet-500";
      if (desc.includes("매매신호")) return "text-pink-500 bg-pink-500";
      if (desc.includes("중장기")) return "text-emerald-500 bg-emerald-500";
      return "text-slate-400 bg-slate-400";
    },
    parseDescription(desc) {
      return desc;
    }
  },
};
</script>
