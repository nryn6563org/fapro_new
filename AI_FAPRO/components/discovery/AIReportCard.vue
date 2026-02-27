<template>
  <div class="ai-report-card">
    <div class="ai-report-card__header">
      <div class="ai-report-card__header-info">
        <h3 class="ai-report-card__title">{{ report.title }}</h3>
        <div class="ai-report-card__meta">
          <span class="ai-report-card__meta-item">
            <calendar-icon class="ai-report-card__meta-icon" />
            {{ report.generatedDate }}
          </span>
          <span class="ai-report-card__meta-item">
            <clock-icon class="ai-report-card__meta-icon" />
            {{ report.generatedTime }}
          </span>
        </div>
      </div>
      <!-- Right actions could be added here -->
    </div>

    <!-- 리포트 요약 -->
    <div class="ai-report-card__reason-box">
      <div class="ai-report-card__reason-header">
        <star-icon class="ai-report-card__reason-icon" />
        <span class="ai-report-card__reason-title">리포트 요약</span>
      </div>
      <p class="ai-report-card__reason-text">{{ report.reason }}</p>
    </div>

    <!-- 핵심 포인트 -->
    <div class="ai-report-card__points-grid">
      <div v-for="(point, idx) in report.keyPoints" :key="idx" class="ai-report-card__point-item">
        <chevron-right-icon class="ai-report-card__point-icon" />
        <span class="ai-report-card__point-text">{{ point }}</span>
      </div>
    </div>

    <!-- 모달 오픈 액션 -->
    <div class="ai-report-card__actions">
      <button class="ai-report-card__btn-view" @click="$emit('open-report', report)">
        <eye-icon class="ai-report-card__btn-icon" />
        리포트 보기
      </button>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 종목발굴 페이지의 리포트 카드 (150라인 준수를 위한 분리)
 */
import { CalendarIcon, ClockIcon, StarIcon, ChevronRightIcon, EyeIcon } from 'vue-feather-icons'
import '~/assets/css/pages/discovery/AIReportCard.css'

export default {
  name: 'AIReportCard',
  components: {
    CalendarIcon,
    ClockIcon,
    StarIcon,
    ChevronRightIcon,
    EyeIcon
  },
  props: {
    report: {
      type: Object,
      required: true
    }
  }
}
</script>
