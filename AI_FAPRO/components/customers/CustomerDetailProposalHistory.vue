<template>
  <div class="customer-proposal-history !mt-4">
    <div class="customer-proposal-history__card fapro-card !shadow-none !border-slate-200 dark:border-slate-700 dark:!border-slate-800">
      <div class="customer-proposal-history__card-header fapro-card-header !p-4 !pb-3 bg-slate-50/50 dark:bg-slate-900/30">
        <div class="customer-proposal-history__header-title text-[15px]">
          <activity-icon size="16" class="text-primary" />
          <span>고객 제안 히스토리 (최근 1개월)</span>
        </div>
      </div>

      <div class="customer-proposal-history__card-body !p-0">
        <!-- 리스트 -->
        <div v-if="totalItems > 0" class="customer-proposal-history__list !p-5">
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
                    :class="['customer-proposal-history__type-icon', getProposalColorClass(item).split(' ')[0]]" 
                  />
                  <span class="customer-proposal-history__date">{{ item.date }}</span>
                </div>
                <span class="customer-proposal-history__channel px-2 py-[2px] rounded-md border text-[11px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500">{{ item.channel }}</span>
              </div>

              <div class="customer-proposal-history__item-body !p-3">
                <p class="customer-proposal-history__text !text-[13px]">
                  <span class="customer-proposal-history__desc">{{ item.description }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 빈 상태 -->
        <div v-else class="customer-proposal-history__empty !py-12">
          <div class="customer-proposal-history__empty-box">
            <info-icon size="24" class="text-slate-300 mb-2" />
            <p class="text-sm">최근 1개월 내 제안 히스토리가 없습니다.</p>
          </div>
        </div>
      </div>

      <!-- 페이징 -->
      <div v-if="totalPages > 1" class="customer-proposal-history__pagination !px-4 !py-3">
        <button
          class="customer-proposal-history__page-btn"
          :class="{ 'customer-proposal-history__page-btn--disabled': currentPage === 1 }"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          <chevron-left-icon size="14" />
        </button>
        <button
          v-for="page in totalPages"
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
 * 기능: 고객 제안 히스토리 (최근 1개월) - 페이징 포함 (리뉴얼 디자인 반영)
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
import "~/assets/css/pages/customers/CustomerProposalHistory/CustomerProposalHistory.css";

const PAGE_SIZE = 10;

export default {
  name: "CustomerDetailProposalHistory",
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
    StarIcon
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
    getProposalIcon(item) {
      const desc = item.description || "";
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
      const desc = item.description || "";
      if (desc.includes("AI리포트")) return "text-indigo-500 bg-indigo-500";
      if (desc.includes("오늘 타겟")) return "text-amber-500 bg-amber-500";
      if (desc.includes("매수 타겟")) return "text-rose-500 bg-rose-500";
      if (desc.includes("매도 타겟")) return "text-blue-500 bg-blue-500";
      if (desc.includes("매수 대기")) return "text-slate-500 bg-slate-500";
      if (desc.includes("이슈포착")) return "text-violet-500 bg-violet-500";
      if (desc.includes("매매신호")) return "text-pink-500 bg-pink-500";
      if (desc.includes("중장기")) return "text-emerald-500 bg-emerald-500";
      return "text-slate-400 bg-slate-400";
    }
  },
};
</script>
