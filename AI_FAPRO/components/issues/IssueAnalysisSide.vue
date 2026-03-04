<template>
  <div class="analysis-side">
    <div v-if="issue" class="analysis-side__card">
      <div class="analysis-side__header">
        <div class="analysis-side__title-info">
          <div :class="['analysis-side__icon-box', 'analysis-side__icon-box--' + issue.type]">
            <trending-up-icon v-if="issue.type === 'up'" class="analysis-side__icon" />
            <trending-down-icon v-else-if="issue.type === 'down'" class="analysis-side__icon" />
            <minus-icon v-else class="analysis-side__icon" />
          </div>
          <div>
            <h4 class="analysis-side__title">{{ issue.name }}</h4>
            <p class="analysis-side__subtitle">
              등락률:
              <span
                :class="['analysis-side__change-text', 'analysis-side__change-text--' + issue.type]"
              >
                {{ issue.changePercent > 0 ? '+' : '' }}{{ issue.changePercent }}%
              </span>
            </p>
          </div>
        </div>
        <div class="analysis-side__intensity">
          <span class="analysis-side__intensity-label">강도</span>
          <div class="analysis-side__intensity-bars">
            <div
              :class="[
                'analysis-side__bar',
                Math.abs(issue.changePercent) > 5
                  ? 'analysis-side__bar--high'
                  : 'analysis-side__bar--empty'
              ]"
            ></div>
            <div
              :class="[
                'analysis-side__bar',
                Math.abs(issue.changePercent) > 3
                  ? 'analysis-side__bar--mid'
                  : 'analysis-side__bar--empty'
              ]"
            ></div>
            <div
              :class="[
                'analysis-side__bar',
                Math.abs(issue.changePercent) > 0
                  ? 'analysis-side__bar--low'
                  : 'analysis-side__bar--empty'
              ]"
            ></div>
          </div>
        </div>
      </div>

      <div class="analysis-side__divider"></div>

      <!-- Tabs -->
      <div class="analysis-side__tabs">
        <div class="analysis-side__tabs-list">
          <button
            @click="activeTab = 'reason'"
            :class="[
              'analysis-side__tab-btn',
              { 'analysis-side__tab-btn--active': activeTab === 'reason' }
            ]"
          >
            <zap-icon class="w-3.5 h-3.5 mr-1.5" />
            AI 이슈 생성 사유
          </button>
          <button
            @click="activeTab = 'outlook'"
            :class="[
              'analysis-side__tab-btn',
              { 'analysis-side__tab-btn--active': activeTab === 'outlook' }
            ]"
          >
            <trending-up-icon class="w-3.5 h-3.5 mr-1.5" />
            이슈 전망
          </button>
        </div>

        <div class="analysis-side__tab-content">
          <div
            v-if="activeTab === 'reason'"
            class="analysis-side__content-box analysis-side__content-box--reason"
          >
            <p class="analysis-side__text">{{ issue.aiReason }}</p>
          </div>
          <div v-else class="analysis-side__content-box analysis-side__content-box--outlook">
            <p class="analysis-side__text">{{ issue.outlook }}</p>
          </div>
        </div>
      </div>

      <!-- Related Stocks -->
      <div class="analysis-side__stocks-section">
        <div class="analysis-side__section-label">
          <target-icon class="analysis-side__section-icon" />
          <h5 class="analysis-side__section-title">관련 종목 (등락률 상위)</h5>
        </div>
        <div class="analysis-side__stocks-grid">
          <div v-for="(stock, idx) in sortedStocks" :key="idx" class="analysis-side__stock-tag">
            <span class="analysis-side__stock-name">{{ stock.name }}</span>
            <div
              :class="[
                'analysis-side__stock-change',
                stock.changePercent >= 0 ? 'text-red-600' : 'text-blue-600'
              ]"
            >
              <arrow-up-icon v-if="stock.changePercent >= 0" class="w-3 h-3" />
              <arrow-down-icon v-else class="w-3 h-3" />
              {{ stock.changePercent > 0 ? '+' : '' }}{{ stock.changePercent }}%
            </div>
          </div>
        </div>
      </div>

      <!-- News Summary -->
      <div v-if="issue.newsSummary" class="analysis-side__news-section">
        <div class="analysis-side__section-label">
          <file-text-icon class="analysis-side__section-icon" />
          <h5 class="analysis-side__section-title">관련 뉴스 AI요약</h5>
        </div>
        <div class="analysis-side__news-box">
          <p class="analysis-side__news-text">{{ issue.newsSummary }}</p>
          <div
            v-if="issue.newsSources && issue.newsSources.length > 0"
            class="analysis-side__sources"
          >
            <span class="analysis-side__sources-label">출처:</span>
            <div class="analysis-side__sources-list">
              <div
                v-for="(source, idx) in issue.newsSources"
                :key="idx"
                class="analysis-side__source-item"
              >
                <img
                  :src="source.favicon"
                  :alt="source.name"
                  class="analysis-side__source-fav"
                  @error="$event.target.style.display = 'none'"
                />
                <span class="analysis-side__source-name">{{ source.name }}</span>
              </div>
            </div>
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
  ZapIcon,
  TargetIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  FileTextIcon
} from 'vue-feather-icons'
import { featuredStocks } from '~/utils/issueDetectionMockData.js'
import '~/assets/css/pages/issues/IssueAnalysisSide/IssueAnalysisSide.css'

export default {
  name: 'IssueAnalysisSide',
  components: {
    TrendingUpIcon,
    TrendingDownIcon,
    MinusIcon,
    ZapIcon,
    TargetIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    FileTextIcon
  },
  props: {
    issue: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      activeTab: 'reason'
    }
  },
  computed: {
    sortedStocks() {
      if (!this.issue) return []
      return featuredStocks
        .filter((stock) => this.issue.relatedStocks.includes(stock.ticker))
        .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
        .slice(0, 5)
    }
  },
  watch: {
    issue() {
      // Reset tab when issue changes
      this.activeTab = 'reason'
    }
  }
}
</script>
