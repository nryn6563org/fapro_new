<template>
  <div class="analysis-side">
    <div v-if="issue" class="analysis-side__card">
      <div class="analysis-side__header">
        <div class="analysis-side__title-info">
          <div
            :class="'analysis-side__icon-box--' + issue.type"
          >
            <trending-up-icon
              v-if="issue.type === 'up'"
              class="analysis-side__icon"
            />
            <trending-down-icon
              v-else-if="issue.type === 'down'"
              class="analysis-side__icon"
            />
            <minus-icon v-else class="analysis-side__icon" />
          </div>
          <div>
            <h4 class="analysis-side__title">{{ issue.name }}</h4>
            <p class="analysis-side__subtitle">
              등락률:
              <span
                  :class="'analysis-side__change-text--' + issue.type"
              >
                {{ issue.changePercent > 0 ? "+" : ""
                }}{{ issue.changePercent }}%
              </span>
            </p>
          </div>
        </div>
        <div class="analysis-side__intensity">
          <span class="analysis-side__intensity-label">강도</span>
          <div class="analysis-side__intensity-bars">
            <div
                :class="Math.abs(issue.changePercent) > 5 ? 'analysis-side__bar--high' : 'analysis-side__bar--empty'"
            ></div>
            <div
                :class="Math.abs(issue.changePercent) > 3 ? 'analysis-side__bar--mid' : 'analysis-side__bar--empty'"
            ></div>
            <div
                :class="Math.abs(issue.changePercent) > 0 ? 'analysis-side__bar--low' : 'analysis-side__bar--empty'"
            ></div>
          </div>
        </div>
      </div>

      <div class="analysis-side__divider"></div>

      <!-- Tabs -->
      <div class="analysis-side__tabs">
        <div class="analysis-side__tabs-list">
          <button
            :class="activeTab === 'reason' ? 'analysis-side__tab-btn--active' : 'analysis-side__tab-btn'"
            @click="activeTab = 'reason'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" class="analysis-side__tab-icon">
              <g clip-path="url(#clip0_181_362)">
                <path d="M6.6243 10.3333C6.56478 10.1026 6.44453 9.89203 6.27605 9.72355C6.10757 9.55507 5.89702 9.43481 5.6663 9.3753L1.5763 8.32063C1.50652 8.30082 1.44511 8.2588 1.40138 8.20093C1.35765 8.14306 1.33398 8.0725 1.33398 7.99996C1.33398 7.92743 1.35765 7.85687 1.40138 7.799C1.44511 7.74113 1.50652 7.6991 1.5763 7.6793L5.6663 6.62396C5.89693 6.5645 6.10743 6.44435 6.2759 6.27599C6.44438 6.10763 6.56468 5.89722 6.6243 5.66663L7.67897 1.57663C7.69857 1.50657 7.74056 1.44486 7.79851 1.40089C7.85647 1.35693 7.92722 1.33313 7.99997 1.33313C8.07271 1.33313 8.14346 1.35693 8.20142 1.40089C8.25938 1.44486 8.30136 1.50657 8.32097 1.57663L9.37497 5.66663C9.43449 5.89734 9.55474 6.10789 9.72322 6.27637C9.8917 6.44486 10.1023 6.56511 10.333 6.62463L14.423 7.67863C14.4933 7.69803 14.5553 7.73997 14.5995 7.79801C14.6437 7.85606 14.6677 7.927 14.6677 7.99996C14.6677 8.07292 14.6437 8.14387 14.5995 8.20191C14.5553 8.25996 14.4933 8.3019 14.423 8.3213L10.333 9.3753C10.1023 9.43481 9.8917 9.55507 9.72322 9.72355C9.55474 9.89203 9.43449 10.1026 9.37497 10.3333L8.3203 14.4233C8.3007 14.4934 8.25871 14.5551 8.20075 14.599C8.1428 14.643 8.07205 14.6668 7.9993 14.6668C7.92656 14.6668 7.85581 14.643 7.79785 14.599C7.73989 14.5551 7.69791 14.4934 7.6783 14.4233L6.6243 10.3333Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.333 2V4.66667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.6667 3.33337H12" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.66699 11.3334V12.6667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3.33333 12H2" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_181_362">
                  <rect width="16" height="16" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            AI 이슈 생성 사유
          </button>
          <button
            :class="activeTab === 'outlook' ? 'analysis-side__tab-btn--active' : 'analysis-side__tab-btn'"
            @click="activeTab = 'outlook'"
          >
            <trending-up-icon class="analysis-side__tab-icon" />
            이슈 전망
          </button>
        </div>

      </div>

      <!-- 스크롤 가능한 콘텐츠 영역: 탭 콘텐츠 + 종목 + 뉴스 -->
      <div class="analysis-side__scrollable">
        <div class="analysis-side__tab-content">
          <div
            v-if="activeTab === 'reason'"
            class="analysis-side__content-box--reason"
          >
            <p class="analysis-side__text">{{ issue.aiReason }}</p>
          </div>
          <div
            v-else
            class="analysis-side__content-box--outlook"
          >
            <p class="analysis-side__text">{{ issue.outlook }}</p>
          </div>
        </div>

        <!-- Related Stocks -->
        <div class="analysis-side__stocks-section">
          <div class="analysis-side__section-label">
            <target-icon class="analysis-side__section-icon" />
            <h5 class="analysis-side__section-title">관련 종목 (등락률 상위)</h5>
          </div>
          <div class="analysis-side__stocks-grid">
            <div
              v-for="(stock, idx) in sortedStocks"
              :key="idx"
              class="analysis-side__stock-tag"
            >
              <span class="analysis-side__stock-name">{{ stock.name }}</span>
              <div
                  :class="stock.changePercent >= 0 ? 'analysis-side__stock-change--up' : 'analysis-side__stock-change--down'"
                >
                <arrow-up-icon v-if="stock.changePercent >= 0" class="analysis-side__stock-icon" />
                <arrow-down-icon v-else class="analysis-side__stock-icon" />
                {{ stock.changePercent > 0 ? "+" : "" }}{{ stock.changePercent }}%
              </div>
            </div>
          </div>
        </div>

        <!-- Related News Section -->
        <div v-if="issue.newsSummary" class="analysis-side__news-section">
          <div class="analysis-side__section-label">
            <file-text-icon class="analysis-side__section-icon--teal" />
            <h5 class="analysis-side__section-title">관련 뉴스</h5>
          </div>
          <div class="analysis-side__news-box">
            <p class="analysis-side__news-text">{{ issue.newsSummary }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="analysis-side__empty">
      <target-icon class="analysis-side__empty-icon" />
      <p class="analysis-side__empty-title">이슈를 선택해주세요</p>
      <p class="analysis-side__empty-desc">
        왼쪽 버블 차트에서 이슈를 클릭하면<br />상세 정보가 표시됩니다
      </p>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 이슈 상세 분석 사이드 패널
 */
import {
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
  // HashIcon,
  TargetIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  FileTextIcon,
} from "vue-feather-icons";
import { featuredStocks } from "~/utils/issueDetectionMockData.js";
import "~/assets/css/pages/issues/IssueAnalysisSide/IssueAnalysisSide.css";

export default {
  name: "IssueAnalysisSide",
  components: {
    TrendingUpIcon,
    TrendingDownIcon,
    MinusIcon,
    // HashIcon,
    TargetIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    FileTextIcon,
  },
  props: {
    issue: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      activeTab: "reason",
    };
  },
  computed: {
    sortedStocks() {
      if (!this.issue) return [];
      return featuredStocks
        .filter((stock) => this.issue.relatedStocks.includes(stock.ticker))
        .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
        .slice(0, 5);
    },
  },
  watch: {
    issue() {
      // Reset tab when issue changes
      this.activeTab = "reason";
    },
  },
};
</script>
