<template>
  <div class="broker-report animate__animated animate__fadeIn">
    <div class="broker-report__card">
      <div class="broker-report__header">
        <div class="flex-1">
          <div class="broker-report__badges">
            <span class="broker-report__broker-badge">{{ report.broker }}</span>
            <span class="broker-report__date">{{ report.date }} 발표</span>
          </div>
          <h5 class="broker-report__title">{{ report.title.split(':')[0] }}</h5>
          <p class="broker-report__desc">{{ report.title.split(':')[1]?.trim() }}</p>

          <div class="broker-report__stats">
            <div class="broker-report__stat-item">
              <span class="broker-report__stat-label">목표가</span>
              <div class="flex items-center gap-1">
                <span class="broker-report__stat-value">{{ report.targetPrice }}</span>
                <span
                  v-if="report.priceChange"
                  :class="['broker-report__change-badge', changeClass]"
                >
                  {{ report.priceChange }}
                </span>
              </div>
            </div>
            <div class="broker-report__stat-item">
              <span class="broker-report__stat-label">투자의견</span>
              <span class="broker-report__stat-value text-green-600">{{ report.opinion }}</span>
            </div>
            <div class="broker-report__stat-item">
              <span class="broker-report__stat-label">애널리스트</span>
              <span class="broker-report__stat-value text-slate-700">{{ report.analyst }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="broker-report__footer">
        <button class="broker-report__btn broker-report__btn--primary">
          <eye-icon class="w-4 h-4" />
          리포트 보기
        </button>
        <button class="broker-report__btn broker-report__btn--outline">
          <download-icon class="w-4 h-4" />
          다운로드
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 증권사 리포트 개별 카드 컴포넌트
 */
import { EyeIcon, DownloadIcon } from 'vue-feather-icons'
import '~/assets/css/pages/investment/BrokerReportCard.css'

export default {
  name: 'BrokerReportCard',
  components: {
    EyeIcon,
    DownloadIcon
  },
  props: {
    report: {
      type: Object,
      required: true
    }
  },
  computed: {
    changeClass() {
      if (this.report.priceChange === '상향') return 'broker-report__change-badge--up'
      if (this.report.priceChange === '하향') return 'broker-report__change-badge--down'
      return 'broker-report__change-badge--neutral'
    }
  }
}
</script>
