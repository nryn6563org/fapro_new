<template>
  <div v-if="issue" class="issue-detail">
    <div class="issue-detail__card">
      <!-- Title Section -->
      <div class="issue-detail__header">
        <div class="issue-detail__title-info">
          <div :class="'issue-detail__icon-box--' + issue.type">
            <trending-up-icon v-if="issue.type === 'up'" class="issue-detail__icon" />
            <trending-down-icon v-else-if="issue.type === 'down'" class="issue-detail__icon" />
            <minus-icon v-else class="issue-detail__icon" />
          </div>
          <div>
            <h3 class="issue-detail__title">{{ issue.name }} 관련 이슈 분석</h3>
            <p class="issue-detail__subtitle">이슈 관련 상세 분석</p>
          </div>
        </div>
      </div>

      <!-- Main Layout: 2 Columns -->
      <div class="issue-detail__body-grid">
        <!-- Column Left: Stats, Segments & Full Stock Table -->
        <div class="issue-detail__col-left">
          <IssueDetailStats :issue="issue" :intensity-level="intensityLevel" :intensity-text="intensityText" />

          <!-- Segment Details (Small/Large Cap) -->
          <div class="issue-detail__segment">
            <div class="issue-detail__section-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15.8337 4.16675L4.16699 15.8334" stroke="#14B8A6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5.41634 7.49992C6.56693 7.49992 7.49967 6.56718 7.49967 5.41659C7.49967 4.26599 6.56693 3.33325 5.41634 3.33325C4.26575 3.33325 3.33301 4.26599 3.33301 5.41659C3.33301 6.56718 4.26575 7.49992 5.41634 7.49992Z" stroke="#14B8A6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.5833 16.6667C15.7339 16.6667 16.6667 15.7339 16.6667 14.5833C16.6667 13.4327 15.7339 12.5 14.5833 12.5C13.4327 12.5 12.5 13.4327 12.5 14.5833C12.5 15.7339 13.4327 16.6667 14.5833 16.6667Z" stroke="#14B8A6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <h5 class="issue-detail__section-title">시가 총액 규모별 구성</h5>
            </div>
            <div class="issue-detail__segment-box">
              <div class="issue-detail__segment-grid">
                <div class="issue-detail__segment-item">
                  <p class="issue-detail__segment-label">5000억 이하</p>
                  <p class="issue-detail__segment-value">{{ issue.marketCapRatio?.under500B || 25 }}%</p>
                </div>
                <div class="issue-detail__segment-item">
                  <p class="issue-detail__segment-label">1조 이하</p>
                  <p class="issue-detail__segment-value">{{ issue.marketCapRatio?.under1T || 25 }}%</p>
                </div>
                <div class="issue-detail__segment-item">
                  <p class="issue-detail__segment-label">5조 이하</p>
                  <p class="issue-detail__segment-value">{{ issue.marketCapRatio?.under5T || 25 }}%</p>
                </div>
                <div class="issue-detail__segment-item">
                  <p class="issue-detail__segment-label">5조 초과</p>
                  <p class="issue-detail__segment-value-muted">{{ issue.marketCapRatio?.over5T || 25 }}%</p>
                </div>
              </div>
              <div class="issue-detail__progress-bar">
                <div
                  class="issue-detail__progress-bar-segment--teal-500"
                  :style="{
                    width: (issue.marketCapRatio?.under500B || 25) + '%'
                  }"
                ></div>
                <div class="issue-detail__progress-bar-segment--teal-400" :style="{ width: (issue.marketCapRatio?.under1T || 25) + '%' }"></div>
                <div class="issue-detail__progress-bar-segment--teal-300" :style="{ width: (issue.marketCapRatio?.under5T || 25) + '%' }"></div>
                <div class="issue-detail__progress-bar-segment--slate-300" :style="{ width: (issue.marketCapRatio?.over5T || 25) + '%' }"></div>
              </div>
            </div>
          </div>

          <!-- Full Stock Table Moved Here -->
          <IssueDetailStockTable :stocks="sortedStocks" />
        </div>

        <!-- Column Right: Analysis -->
        <div class="issue-detail__col-right">
          <!-- Text Analysis -->
          <IssueDetailAnalysis :issue="issue" />
        </div>
      </div>

      <!-- Propose Action -->
      <div class="issue-detail__footer">
        <button class="issue-detail__btn-propose" @click="$emit('propose', issue)">
          <zap-icon class="issue-detail__btn-icon" />
          <span>이 이슈로 제안서 만들기</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 이슈 심층 분석 섹션 (하단)
 */
import { TrendingUpIcon, TrendingDownIcon, MinusIcon, ZapIcon } from "vue-feather-icons";
import { featuredStocks } from "~/utils/issueDetectionMockData.js";
import "~/assets/css/pages/issues/IssueDetailSection/IssueDetailSection.css";
import IssueDetailStats from "~/components/issues/IssueDetailStats.vue";
import IssueDetailStockTable from "~/components/issues/IssueDetailStockTable.vue";
import IssueDetailAnalysis from "~/components/issues/IssueDetailAnalysis.vue";

export default {
  name: "IssueDetailSection",
  components: {
    TrendingUpIcon,
    TrendingDownIcon,
    MinusIcon,
    ZapIcon,
    IssueDetailStats,
    IssueDetailStockTable,
    IssueDetailAnalysis
  },
  props: {
    issue: {
      type: Object,
      default: null
    }
  },
  computed: {
    intensityLevel() {
      if (!this.issue) return 0;
      const abs = Math.abs(this.issue.changePercent);
      if (abs > 7) return 4;
      if (abs > 4) return 3;
      if (abs > 1) return 2;
      return 1;
    },
    intensityText() {
      const levels = {
        4: "매우 강함",
        3: "강함",
        2: "보통",
        1: "최저",
      };
      return levels[this.intensityLevel] || "";
    },
    sortedStocks() {
      if (!this.issue) return [];
      return featuredStocks
        .filter((stock) => this.issue.relatedStocks.includes(stock.ticker))
        .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
        .slice(0, 10);
    }
  }
};
</script>
