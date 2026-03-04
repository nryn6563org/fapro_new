<template>
  <modal-vanilla
    :is-open="isOpen"
    custom-dialog-class="discovery-modal__dialog"
    @close="$emit('close')"
  >
    <!-- Header Component -->
    <template #header>
      <div class="discovery-modal__header">
        <div class="discovery-modal__header-content">
          <div class="discovery-modal__header-icon">
            <star-icon class="w-6 h-6 text-amber-500" />
          </div>
          <div class="discovery-modal__header-text">
            <h2 class="discovery-modal__title">AI 생성 리포트</h2>
            <p class="discovery-modal__subtitle">AI가 분석한 종목 리포트를 확인하세요</p>
          </div>
        </div>
        <button type="button" class="discovery-modal__close-btn" @click="$emit('close')">
          <x-icon size="24" />
        </button>
      </div>
    </template>

    <!-- Body Component -->
    <div v-if="report" class="discovery-modal__body">
      <!-- Header Info Card -->
      <div class="discovery-modal__info-card">
        <div class="discovery-modal__info-header">
          <h3 class="discovery-modal__stock-name">{{ report.stockName }}</h3>
          <p class="discovery-modal__report-title">{{ report.title }}</p>
        </div>

        <div class="discovery-modal__stats-grid">
          <div class="discovery-modal__stat-col">
            <span class="discovery-modal__stat-label">투자의견</span>
            <div :class="['discovery-modal__badge', getInvestmentColor(report.investment)]">
              {{ report.investment }}
            </div>
          </div>
          <div class="discovery-modal__stat-col">
            <span class="discovery-modal__stat-label">목표가</span>
            <div class="discovery-modal__stat-value">{{ report.targetPrice }}</div>
          </div>
          <div class="discovery-modal__stat-col">
            <span class="discovery-modal__stat-label">현재가</span>
            <div class="discovery-modal__stat-value--muted">{{ report.currentPrice }}</div>
          </div>
          <div class="discovery-modal__stat-col">
            <span class="discovery-modal__stat-label">상승여력</span>
            <div class="discovery-modal__stat-value--highlight">
              <trending-up-icon class="w-4 h-4 mr-1" />
              {{ report.upside }}
            </div>
          </div>
        </div>
      </div>

      <!-- 생성 사유 -->
      <div class="discovery-modal__section">
        <h4 class="discovery-modal__section-title">
          <star-icon class="w-5 h-5 text-amber-500" />
          AI 리포트 생성 사유
        </h4>
        <div class="discovery-modal__reason-box">
          <p class="discovery-modal__reason-text">{{ report.reason }}</p>
        </div>
      </div>

      <!-- 상세 리포트 (Markdown) -->
      <div class="discovery-modal__section">
        <h4 class="discovery-modal__section-title">
          <file-text-icon class="w-5 h-5 text-teal-500" />
          상세 리포트
        </h4>
        <div class="discovery-modal__markdown-box">
          <pre class="discovery-modal__markdown-text">{{ report.fullReport }}</pre>
        </div>
      </div>

      <!-- Actions -->
      <div class="discovery-modal__actions">
        <button class="discovery-modal__btn-primary">
          <download-icon class="w-4 h-4 mr-2" />
          리포트 다운로드
        </button>
        <button class="discovery-modal__btn-outline">
          <mail-icon class="w-4 h-4 mr-2" />
          고객에게 전송
        </button>
      </div>
    </div>
  </modal-vanilla>
</template>

<script>
/**
 * 기능: AI 종목발굴 페이지의 상세 리포트 모달 (ModalVanilla 활용)
 */
import {
  StarIcon,
  XIcon,
  TrendingUpIcon,
  FileTextIcon,
  DownloadIcon,
  MailIcon
} from 'vue-feather-icons'
import ModalVanilla from '~/components/modal/ModalVanilla.vue'
import '~/assets/css/pages/discovery/AIReportDetailModal/AIReportDetailModal.css'

export default {
  name: 'AIReportDetailModal',
  components: {
    StarIcon,
    XIcon,
    TrendingUpIcon,
    FileTextIcon,
    DownloadIcon,
    MailIcon,
    ModalVanilla
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    report: {
      type: Object,
      default: null
    }
  },
  methods: {
    getInvestmentColor(investment) {
      if (investment === '매수' || investment === 'Buy') return 'discovery-modal__badge--buy'
      if (investment === 'Hold' || investment === '중립') return 'discovery-modal__badge--hold'
      return 'discovery-modal__badge--sell'
    }
  }
}
</script>
