<template>
  <div v-if="issue" class="issue-detail">
    <div class="issue-detail__card">
      <!-- Title Section -->
      <div class="issue-detail__header">
        <div class="issue-detail__title-info">
          <div
            :class="[
              'issue-detail__icon-box',
              'issue-detail__icon-box--' + issue.type,
            ]"
          >
            <trending-up-icon
              v-if="issue.type === 'up'"
              class="issue-detail__icon"
            />
            <trending-down-icon
              v-else-if="issue.type === 'down'"
              class="issue-detail__icon"
            />
            <minus-icon v-else class="issue-detail__icon" />
          </div>
          <div>
            <h3 class="issue-detail__title">{{ issue.name }} 관련 이슈 분석</h3>
            <p class="issue-detail__subtitle">AI 기반 심층 분석 리포트</p>
          </div>
        </div>
      </div>

      <!-- Main Layout: 2 Columns -->
      <div class="issue-detail__body-grid">
        <!-- Column Left: Stats, Segments & Full Stock Table -->
        <div class="issue-detail__col-left">
          <IssueDetailStats
            :issue="issue"
            :intensity-level="intensityLevel"
            :intensity-text="intensityText"
          />

          <!-- Segment Details (Small/Large Cap) -->
          <div class="issue-detail__segment">
            <div class="issue-detail__section-label">
              <percent-icon class="issue-detail__section-icon" />
              <h5 class="issue-detail__section-title">시가총액 규모별 구성</h5>
            </div>
            <div class="issue-detail__segment-box">
              <div class="issue-detail__segment-grid">
                <div class="issue-detail__segment-item">
                  <p class="issue-detail__segment-label">5000억 이하</p>
                  <p class="issue-detail__segment-value">
                    {{ issue.marketCapRatio?.under500B || 25 }}%
                  </p>
                </div>
                <div class="issue-detail__segment-item">
                  <p class="issue-detail__segment-label">1조 이하</p>
                  <p class="issue-detail__segment-value">
                    {{ issue.marketCapRatio?.under1T || 25 }}%
                  </p>
                </div>
                <div class="issue-detail__segment-item">
                  <p class="issue-detail__segment-label">5조 이하</p>
                  <p class="issue-detail__segment-value">
                    {{ issue.marketCapRatio?.under5T || 25 }}%
                  </p>
                </div>
                <div class="issue-detail__segment-item">
                  <p class="issue-detail__segment-label">5조 초과</p>
                  <p class="issue-detail__segment-value-muted">
                    {{ issue.marketCapRatio?.over5T || 25 }}%
                  </p>
                </div>
              </div>
              <div class="issue-detail__progress-bar">
                <div
                  class="issue-detail__progress-bar-segment--teal-500"
                  :style="{
                    width: (issue.marketCapRatio?.under500B || 25) + '%',
                  }"
                ></div>
                <div
                  class="issue-detail__progress-bar-segment--teal-400"
                  :style="{ width: (issue.marketCapRatio?.under1T || 25) + '%' }"
                ></div>
                <div
                  class="issue-detail__progress-bar-segment--teal-300"
                  :style="{ width: (issue.marketCapRatio?.under5T || 25) + '%' }"
                ></div>
                <div
                  class="issue-detail__progress-bar-segment--slate-300"
                  :style="{ width: (issue.marketCapRatio?.over5T || 25) + '%' }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Full Stock Table Moved Here -->
          <IssueDetailStockTable :stocks="sortedStocks" />
        </div>

        <!-- Column Right: Analysis, News & Action -->
        <div class="issue-detail__col-right">
          <!-- Text Analysis -->
          <IssueDetailAnalysis :issue="issue" />

          <!-- News Report -->
          <IssueDetailNews :issue="issue" />

          <!-- Propose Action -->
          <div class="issue-detail__footer">
            <button
              class="issue-detail__btn-propose"
              @click="$emit('propose', issue)"
            >
              <zap-icon class="issue-detail__btn-icon" />
              <span>이 이슈로 제안서 만들기</span>
              <div class="issue-detail__btn-badge">13</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 이슈 심층 분석 섹션 (하단)
 */
import {
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
  PercentIcon,
  ZapIcon,
} from "vue-feather-icons";
import { featuredStocks } from "~/utils/issueDetectionMockData.js";
import "~/assets/css/pages/issues/IssueDetailSection/IssueDetailSection.css";
import IssueDetailStats from "~/components/issues/IssueDetailStats.vue";
import IssueDetailStockTable from "~/components/issues/IssueDetailStockTable.vue";
import IssueDetailAnalysis from "~/components/issues/IssueDetailAnalysis.vue";
import IssueDetailNews from "~/components/issues/IssueDetailNews.vue";

export default {
  name: "IssueDetailSection",
  components: {
    TrendingUpIcon,
    TrendingDownIcon,
    MinusIcon,
    PercentIcon,
    ZapIcon,
    IssueDetailStats,
    IssueDetailStockTable,
    IssueDetailAnalysis,
    IssueDetailNews,
  },
  props: {
    issue: {
      type: Object,
      default: null,
    },
  },
  computed: {
    intensityLevel() {
      if (!this.issue) return 0;
      const abs = Math.abs(this.issue.changePercent);
      if (abs > 5) return 3;
      if (abs > 3) return 2;
      return 1;
    },
    intensityText() {
      if (this.intensityLevel === 3) return "매우 강함";
      if (this.intensityLevel === 2) return "강함";
      return "보통";
    },
    sortedStocks() {
      if (!this.issue) return [];
      return featuredStocks
        .filter((stock) => this.issue.relatedStocks.includes(stock.ticker))
        .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
        .slice(0, 10);
    },
  },
};
</script>
