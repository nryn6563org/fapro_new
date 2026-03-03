<template>
  <div class="signals-page">
    <div class="signals-page__header">
      <div class="signals-page__title-box">
        <h1 class="signals-page__title">AI매매신호</h1>
        <p class="signals-page__subtitle">
          오늘 발생한 AI매매신호 입니다. 신호 발생 사유와 매매내역을 확인해 보세요
        </p>
      </div>
      <div class="signals-page__action-box">
        <div class="signals-page__time-info">
          <p class="signals-page__time-text">{{ formattedTime }}</p>
          <p class="signals-page__time-label">최종 업데이트</p>
        </div>
        <button class="signals-page__refresh-btn" @click="refreshData">
          <refresh-cw-icon size="16" class="signals-page__refresh-icon" />
          <span class="signals-page__refresh-text">새로고침</span>
        </button>
      </div>
    </div>

    <div class="signals-page__grid">
      <!-- 매수 신호 -->
      <div class="signals-page__column signals-page__column--buy">
        <div class="signals-page__column-header signals-page__column-header--buy">
          <div class="signals-page__column-title-box">
            <div class="signals-page__column-icon-bg signals-page__column-icon-bg--buy">
              <arrow-up-icon class="signals-page__column-icon" />
            </div>
            <h2 class="signals-page__column-title">매수 신호</h2>
          </div>
          <span class="signals-page__column-badge signals-page__column-badge--buy"
            >{{ buySignals.length }}건</span
          >
        </div>
        <div class="signals-page__column-content">
          <trading-signal-card
            v-for="signal in buySignals"
            :key="signal.id"
            :signal="signal"
            type="buy"
            :is-detail-open="openKeys.includes(signal.id)"
            @toggle-detail="toggleDetail(signal.id)"
            @open-report="openReport(signal)"
          />
        </div>
      </div>

      <!-- 매도 신호 -->
      <div class="signals-page__column signals-page__column--sell">
        <div class="signals-page__column-header signals-page__column-header--sell">
          <div class="signals-page__column-title-box">
            <div class="signals-page__column-icon-bg signals-page__column-icon-bg--sell">
              <arrow-down-icon class="signals-page__column-icon" />
            </div>
            <h2 class="signals-page__column-title">매도 신호</h2>
          </div>
          <span class="signals-page__column-badge signals-page__column-badge--sell"
            >{{ sellSignals.length }}건</span
          >
        </div>
        <div class="signals-page__column-content">
          <trading-signal-card
            v-for="signal in sellSignals"
            :key="signal.id"
            :signal="signal"
            type="sell"
            :is-detail-open="openKeys.includes(signal.id)"
            @toggle-detail="toggleDetail(signal.id)"
            @open-report="openReport(signal)"
          />
        </div>
      </div>
    </div>

    <!-- AI Report Modal Wrapper -->
    <modal-vanilla
      v-if="activeReportSignal"
      :is-open="isReportModalOpen"
      custom-dialog-class="ai-report-modal__dialog"
      @close="closeReport"
    >
      <template #header>
        <div class="ai-report-modal__header">
          <div class="ai-report-modal__header-content">
            <div class="ai-report-modal__icon-box">
              <activity-icon size="28" class="text-primary dark:text-primary-light" />
            </div>
            <div class="ai-report-modal__title-wrapper">
              <div class="ai-report-modal__badges">
                <span class="ai-report-modal__badge ai-report-modal__badge--cyan">신작출시</span>
                <span class="ai-report-modal__badge ai-report-modal__badge--amber">거래량급증</span>
                <span class="ai-report-modal__badge ai-report-modal__badge--purple">외국인매수</span>
              </div>
              <h2 class="ai-report-modal__title">
                {{ activeReportSignal.name }}
                <span class="ai-report-modal__ticker">{{ activeReportSignal.ticker }}</span>
              </h2>
            </div>
          </div>
          <button type="button" class="ai-report-modal__close-btn" @click="closeReport">
            <x-icon size="24" />
          </button>
        </div>
      </template>
      <div class="ai-report-modal__content">
        <!-- 150 line limit compliance: simplified modal content via generic placeholder or actual content -->
        <a-i-report-content :signal="activeReportSignal" />
      </div>
    </modal-vanilla>
  </div>
</template>

<script>
/**
 * 기능: AI매매신호 메인 페이지
 */
import { RefreshCwIcon, ArrowUpIcon, ArrowDownIcon, XIcon, ActivityIcon } from 'vue-feather-icons'
import TradingSignalCard from '~/components/signals/TradingSignalCard.vue'
import AIReportContent from '~/components/signals/AIReportContent.vue'
import ModalVanilla from '~/components/modal/ModalVanilla.vue'
import { buySignals, sellSignals } from '~/utils/signalsMockData.js'
import '~/assets/css/pages/signals/SignalsPage.css'

export default {
  name: 'SignalsPage',
  components: {
    RefreshCwIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    XIcon,
    ActivityIcon,
    TradingSignalCard,
    AIReportContent,
    ModalVanilla
  },
  data() {
    return {
      buySignals,
      sellSignals,
      openKeys: [],
      currentTime: new Date(),
      timer: null,
      isReportModalOpen: false,
      activeReportSignal: null
    }
  },
  computed: {
    formattedTime() {
      const d = this.currentTime
      return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(
        d.getDate()
      ).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(
        d.getMinutes()
      ).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.currentTime = new Date()
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer)
  },
  methods: {
    refreshData() {
      this.currentTime = new Date()
    },
    toggleDetail(id) {
      const idx = this.openKeys.indexOf(id)
      if (idx > -1) {
        this.openKeys.splice(idx, 1)
      } else {
        this.openKeys.push(id)
      }
    },
    openReport(signal) {
      this.activeReportSignal = signal
      this.isReportModalOpen = true
    },
    closeReport() {
      this.isReportModalOpen = false
      // Let modal animation finish before removing data
      setTimeout(() => {
        this.activeReportSignal = null
      }, 300)
    }
  }
}
</script>
