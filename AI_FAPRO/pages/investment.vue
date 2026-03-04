<template>
  <div class="investment-page">
    <!-- Page Header -->
    <header class="investment-page__header">
      <h1 class="investment-page__h1">투자정보pro</h1>
      <p class="investment-page__h1-desc">AI가 분석한 실시간 투자 인사이트 및 시장 정보</p>
    </header>

    <!-- Main Content -->
    <div class="investment-page__content">
      <!-- Rotating Intelligence Card -->
      <section class="investment-page__section">
        <investment-intelligence-card
          :summaries="faSummaries"
          :index.sync="summaryIndex"
          :current-time="formattedTime"
          @pause="isSummaryPaused = $event"
          @next="nextSummary"
        />
      </section>

      <!-- Broker Reports Section -->
      <section class="investment-page__section mt-8">
        <div class="investment-page__card-outer">
          <div class="investment-page__card-header">
          <div class="investment-page__card-header-inner">
              <div class="investment-page__header-icon-box">
                <file-text-icon class="w-5 h-5 text-white" />
              </div>
              <h2 class="investment-page__card-title">증권사 리포트</h2>
              <span class="investment-page__badge">최신순</span>
            </div>
          </div>
          <div class="investment-page__card-content">
            <div class="investment-page__reports-grid">
              <broker-report-card
                v-for="(report, idx) in brokerReports"
                :key="idx"
                :report="report"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 투자 정보pro 메인 페이지
 */
import InvestmentIntelligenceCard from '~/components/investment/InvestmentIntelligenceCard.vue'
import BrokerReportCard from '~/components/investment/BrokerReportCard.vue'
import { faSummaries, brokerReports } from '~/utils/investmentMockData.js'
import { FileTextIcon } from 'vue-feather-icons'
import '~/assets/css/pages/investment/InvestmentPage/InvestmentPage.css'

export default {
  name: 'InvestmentPage',
  components: {
    InvestmentIntelligenceCard,
    BrokerReportCard,
    FileTextIcon
  },
  layout: 'default',
  data() {
    return {
      summaryIndex: 0,
      isSummaryPaused: false,
      currentTime: new Date(),
      faSummaries,
      brokerReports,
      rotationTimer: null
    }
  },
  computed: {
    formattedTime() {
      return this.currentTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    }
  },
  mounted() {
    this.startRotation()
    // Update clock every minute
    this.clockTimer = setInterval(() => {
      this.currentTime = new Date()
    }, 60000)
  },
  beforeDestroy() {
    clearInterval(this.rotationTimer)
    clearInterval(this.clockTimer)
  },
  methods: {
    startRotation() {
      this.rotationTimer = setInterval(() => {
        if (!this.isSummaryPaused) {
          this.nextSummary()
        }
      }, 5000)
    },
    nextSummary() {
      this.summaryIndex = (this.summaryIndex + 1) % this.faSummaries.length
    }
  }
}
</script>
