<template>
  <div class="strategic-card">
    <!-- Collapsed View / Header -->
    <div class="strategic-card__header" @click="$emit('toggle')">
      <div class="strategic-card__header-content">
        <div class="strategic-card__info-main">
          <div class="strategic-card__code">{{ stock.code }}</div>
          <div class="strategic-card__title-row">
            <h3 class="strategic-card__name">{{ stock.name }}</h3>
            <span class="strategic-card__badge">{{ stock.sector }}</span>
          </div>
          <div class="strategic-card__stats-row">
            <div class="strategic-card__stat-item">
              <span class="strategic-card__stat-label">현재가</span>
              <span class="strategic-card__stat-value">{{ stock.currentPrice }}</span>
            </div>
            <div class="strategic-card__stat-item">
              <span class="strategic-card__stat-label">등락률</span>
              <span
                :class="[
                  'strategic-card__stat-change',
                  stock.isPositive
                    ? 'strategic-card__stat-change--up'
                    : 'strategic-card__stat-change--down'
                ]"
              >
                {{ stock.changePercent }}
              </span>
            </div>
            <div class="strategic-card__stat-item">
              <span class="strategic-card__stat-label">시가총액</span>
              <span class="strategic-card__stat-value--muted">{{ stock.marketCap }}</span>
            </div>
          </div>
          <div class="strategic-card__reason-box">
            <star-icon class="strategic-card__reason-icon" />
            <span class="strategic-card__reason-text">
              <span class="strategic-card__reason-label">AI발굴사유</span> {{ stock.aiReason }}
            </span>
          </div>
        </div>
        <div class="strategic-card__arrow-box">
          <chevron-right-icon
            :class="[
              'strategic-card__arrow-icon',
              { 'strategic-card__arrow-icon--expanded': isExpanded }
            ]"
          />
        </div>
      </div>
    </div>

    <!-- Expanded Content -->
    <div v-if="isExpanded" class="strategic-card__expanded">
      <div class="strategic-card__expanded-inner">
        <!-- Upside Driver -->
        <div class="strategic-card__detail-section strategic-card__detail-section--upside">
          <div class="strategic-card__section-header">
            <trending-up-icon class="strategic-card__section-icon text-teal-500" />
            <h3 class="strategic-card__section-title">업사이드 드라이버</h3>
          </div>
          <div class="strategic-card__point-list">
            <div
              v-for="(insight, idx) in stock.insights"
              :key="idx"
              class="strategic-card__point-item"
            >
              <div class="strategic-card__point-bullet bg-teal-500"></div>
              <p class="strategic-card__point-text">{{ insight }}</p>
            </div>
          </div>
        </div>

        <!-- Risk -->
        <div class="strategic-card__detail-section strategic-card__detail-section--risk">
          <div class="strategic-card__section-header">
            <alert-triangle-icon class="strategic-card__section-icon text-red-600" />
            <h3 class="strategic-card__section-title text-red-900 dark:text-red-400">하락 위험</h3>
          </div>
          <div class="strategic-card__point-list">
            <div v-for="(risk, idx) in stock.risks" :key="idx" class="strategic-card__point-item">
              <div class="strategic-card__point-bullet bg-red-500"></div>
              <p class="strategic-card__point-text text-red-800 dark:text-red-300">{{ risk }}</p>
            </div>
          </div>
        </div>

        <!-- Evidence -->
        <div class="strategic-card__detail-section strategic-card__detail-section--evidence">
          <div class="strategic-card__section-header">
            <info-icon class="strategic-card__section-icon text-slate-600 dark:text-slate-400" />
            <h3 class="strategic-card__section-title">근거</h3>
          </div>
          <div class="strategic-card__point-list">
            <div
              v-for="(evidence, idx) in stock.evidence"
              :key="idx"
              class="strategic-card__point-item"
            >
              <div class="strategic-card__point-bullet bg-slate-500"></div>
              <p class="strategic-card__point-text">{{ evidence }}</p>
            </div>
          </div>
        </div>

        <!-- Action Button -->
        <div class="strategic-card__action-row">
          <button class="strategic-card__btn-propose" @click.stop="$emit('propose', stock)">
            <users-icon class="w-4 h-4 mr-2" />
            이 종목 제안하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 전략 유망주 카드 컴포넌트
 */
import {
  StarIcon,
  ChevronRightIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  InfoIcon,
  UsersIcon
} from 'vue-feather-icons'
import '~/assets/css/pages/strategic-stocks/StrategicStockCard/StrategicStockCard.css'

export default {
  name: 'StrategicStockCard',
  components: {
    StarIcon,
    ChevronRightIcon,
    TrendingUpIcon,
    AlertTriangleIcon,
    InfoIcon,
    UsersIcon
  },
  props: {
    stock: {
      type: Object,
      required: true
    },
    isExpanded: {
      type: Boolean,
      default: false
    }
  }
}
</script>
