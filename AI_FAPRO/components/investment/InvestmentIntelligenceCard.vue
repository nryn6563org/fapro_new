<template>
  <div
    class="intelligence-card"
    :class="[currentSummary.borderColor, currentSummary.bgColor]"
    @mouseenter="$emit('pause', true)"
    @mouseleave="$emit('pause', false)"
  >
    <!-- Header -->
    <div class="intelligence-card__header">
      <div class="intelligence-card__header-left">
        <div :class="['intelligence-card__icon-box', currentSummary.color]">
          <component :is="iconComponent" class="intelligence-card__icon" />
        </div>
        <div class="intelligence-card__title-area">
          <transition name="fade-slide-up" mode="out-in">
            <h4 :key="index" class="intelligence-card__title">{{ currentSummary.title }}</h4>
          </transition>
          <p class="intelligence-card__subtitle">
            FA를 위한 실시간 인텔리전스 · 업데이트 {{ currentTime }}
          </p>
        </div>
      </div>

      <!-- Controls -->
      <div class="intelligence-card__controls">
        <div class="intelligence-card__dots">
          <button
            v-for="(_, idx) in summaries"
            :key="idx"
            @click="$emit('update:index', idx)"
            :class="['intelligence-card__dot', { 'intelligence-card__dot--active': idx === index }]"
          ></button>
        </div>
        <button class="intelligence-card__refresh" @click="$emit('next')">
          <refresh-cw-icon class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- Content Area -->
    <div class="intelligence-card__content">
      <transition name="fade-slide-right" mode="out-in">
        <div :key="index" class="intelligence-card__body">
          <!-- Type: Issue -->
          <div v-if="currentSummary.type === 'issue'" class="intelligence-card__issues">
            <div
              v-for="(issue, idx) in currentSummary.issues"
              :key="idx"
              class="intelligence-card__issue-tag"
            >
              {{ issue.name }}
            </div>
          </div>

          <!-- Type: Stock -->
          <div v-else-if="currentSummary.type === 'stock'" class="intelligence-card__stocks">
            <div
              v-for="(stock, idx) in currentSummary.stocks"
              :key="idx"
              class="intelligence-card__stock-tag"
            >
              <span class="intelligence-card__stock-name">{{ stock.name }}</span>
              <span
                :class="[
                  'intelligence-card__stock-change',
                  stock.change.startsWith('+') ? 'text-red-600' : 'text-blue-600'
                ]"
              >
                {{ stock.change }}
              </span>
            </div>
          </div>

          <!-- Type: News or US Issue -->
          <div
            v-else-if="['news', 'usIssue'].includes(currentSummary.type)"
            class="intelligence-card__news-list"
          >
            <div
              v-for="(item, idx) in currentSummary.newsItems"
              :key="idx"
              class="intelligence-card__news-item"
            >
              <div class="flex-1">
                <p class="intelligence-card__news-title">{{ item.title }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <span v-if="item.source" class="intelligence-card__news-source">{{
                    item.source
                  }}</span>
                  <span class="intelligence-card__news-time">{{ item.time }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Summary Text -->
          <div :class="['intelligence-card__summary-box', summaryClass]">
            <p>{{ currentSummary.summary }}</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 투자 정보pro 인텔리전스 요약 카드 (로테이션)
 */
import {
  AlertCircleIcon,
  ActivityIcon,
  TrendingUpIcon,
  ZapIcon,
  RefreshCwIcon
} from 'vue-feather-icons'
import '~/assets/css/pages/investment/InvestmentIntelligenceCard/InvestmentIntelligenceCard.css'

export default {
  name: 'InvestmentIntelligenceCard',
  components: {
    AlertCircleIcon,
    ActivityIcon,
    TrendingUpIcon,
    ZapIcon,
    RefreshCwIcon
  },
  props: {
    summaries: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      default: 0
    },
    currentTime: {
      type: String,
      default: ''
    }
  },
  computed: {
    currentSummary() {
      return this.summaries[this.index]
    },
    iconComponent() {
      const icons = {
        issue: 'AlertCircleIcon',
        news: 'ActivityIcon',
        usIssue: 'TrendingUpIcon',
        stock: 'ZapIcon'
      }
      return icons[this.currentSummary.type] || 'AlertCircleIcon'
    },
    summaryClass() {
      const classes = {
        issue: 'intelligence-card__summary-box--orange',
        news: 'intelligence-card__summary-box--teal',
        usIssue: 'intelligence-card__summary-box--blue',
        stock: 'intelligence-card__summary-box--purple'
      }
      return classes[this.currentSummary.type] || ''
    }
  }
}
</script>
