<template>
  <div v-if="issue" class="issue-detail">
    <div class="issue-detail__card">
      <!-- Title Section -->
      <div class="issue-detail__header">
        <div class="issue-detail__title-info">
          <div :class="['issue-detail__icon-box', 'issue-detail__icon-box--' + issue.type]">
            <trending-up-icon v-if="issue.type === 'up'" class="issue-detail__icon" />
            <trending-down-icon v-else-if="issue.type === 'down'" class="issue-detail__icon" />
            <minus-icon v-else class="issue-detail__icon" />
          </div>
          <div>
            <h3 class="issue-detail__title">{{ issue.name }} 관련 이슈 분석</h3>
            <p class="issue-detail__subtitle">AI 기반 심층 분석 리포트</p>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <IssueDetailStats
        :issue="issue"
        :intensity-level="intensityLevel"
        :intensity-text="intensityText"
      />

      <!-- Segment Details (Small/Large Cap) -->
      <div class="issue-detail__segment">
        <div class="issue-detail__section-label">
          <percent-icon class="issue-detail__section-icon" />
          <h5 class="issue-detail__section-title">중소형주 비중 상세</h5>
        </div>
        <div class="issue-detail__segment-box">
          <div class="issue-detail__segment-grid">
            <div class="text-center">
              <p class="issue-detail__segment-label">시가총액 1000억 이하</p>
              <p class="issue-detail__segment-value">45%</p>
            </div>
            <div class="text-center">
              <p class="issue-detail__segment-label">1000억 - 5000억</p>
              <p class="issue-detail__segment-value">38%</p>
            </div>
            <div class="text-center">
              <p class="issue-detail__segment-label">5000억 - 1조</p>
              <p class="issue-detail__segment-value issue-detail__segment-value--teal">12%</p>
            </div>
            <div class="text-center">
              <p class="issue-detail__segment-label">1조 초과</p>
              <p class="issue-detail__segment-value issue-detail__segment-value--muted">5%</p>
            </div>
          </div>
          <div class="issue-detail__progress-bar">
            <div class="bg-teal-500 h-full" style="width: 45%"></div>
            <div class="bg-teal-500/80 h-full" style="width: 38%"></div>
            <div class="bg-teal-600 h-full" style="width: 12%"></div>
            <div class="bg-slate-400 h-full" style="width: 5%"></div>
          </div>
          <p class="issue-detail__segment-desc">
            해당 이슈는 <span class="text-teal-500 font-bold">중소형주 중심</span>으로 구성되어
            있으며, 시가총액 5000억 이하 종목이 <span class="font-bold">83%</span>를 차지합니다.
          </p>
        </div>
      </div>

      <!-- Full Stock Table -->
      <IssueDetailStockTable :stocks="sortedStocks" />

      <!-- Detailed Analysis -->
      <IssueDetailAnalysis :issue="issue" />

      <!-- News Detail -->
      <IssueDetailNews :issue="issue" />

      <!-- Action Button -->
      <div class="issue-detail__footer">
        <button class="issue-detail__btn-propose" @click="$emit('propose', issue)">
          <zap-icon class="w-5 h-5 mr-2" />
          이 이슈로 제안서 만들기
        </button>
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
  ZapIcon
} from 'vue-feather-icons'
import { featuredStocks } from '~/utils/issueDetectionMockData.js'
import '~/assets/css/pages/issues/IssueDetailSection/IssueDetailSection.css'
import IssueDetailStats from '~/components/issues/IssueDetailStats.vue'
import IssueDetailStockTable from '~/components/issues/IssueDetailStockTable.vue'
import IssueDetailAnalysis from '~/components/issues/IssueDetailAnalysis.vue'
import IssueDetailNews from '~/components/issues/IssueDetailNews.vue'

export default {
  name: 'IssueDetailSection',
  components: {
    TrendingUpIcon,
    TrendingDownIcon,
    MinusIcon,
    PercentIcon,
    ZapIcon,
    IssueDetailStats,
    IssueDetailStockTable,
    IssueDetailAnalysis,
    IssueDetailNews
  },
  props: {
    issue: {
      type: Object,
      default: null
    }
  },
  computed: {
    intensityLevel() {
      if (!this.issue) return 0
      const abs = Math.abs(this.issue.changePercent)
      if (abs > 5) return 3
      if (abs > 3) return 2
      return 1
    },
    intensityText() {
      if (this.intensityLevel === 3) return '매우 강함'
      if (this.intensityLevel === 2) return '강함'
      return '보통'
    },
    sortedStocks() {
      if (!this.issue) return []
      return featuredStocks
        .filter((stock) => this.issue.relatedStocks.includes(stock.ticker))
        .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
        .slice(0, 10)
    }
  }
}
</script>
