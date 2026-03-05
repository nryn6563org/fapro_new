<template>
  <modal-vanilla
    v-if="isOpen"
    :is-open="isOpen"
    modal-id="ai-report-detail-modal"
    custom-dialog-class="ai-report-modal__dialog"
    @close="$emit('close')"
  >
    <!-- Header Component -->
    <template #header>
      <template v-if="report">
        <div class="ai-report-modal__header">
          <div class="ai-report-modal__header-content">
            <div class="ai-report-modal__icon-box">
              <activity-icon
                size="28"
                class="text-primary dark:text-primary-light"
              />
            </div>
            <div class="ai-report-modal__title-wrapper">
              <h2 class="ai-report-modal__title">
                {{ report.stockName }}
                <span class="ai-report-modal__ticker">({{ report.stockCode || 'A000000' }})</span>
              </h2>
              <div class="ai-report-modal__badges">
                <span class="ai-report-modal__badge ai-report-modal__badge--blue">
                  {{ report.investment }}
                </span>
                <span class="ai-report-modal__badge ai-report-modal__badge--orange">
                  목표가 {{ report.targetPrice }}
                </span>
                <span class="ai-report-modal__badge ai-report-modal__badge--indigo">
                  {{ report.upside }} 상승여력
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="ai-report-modal__close-btn"
            @click="$emit('close')"
          >
            <x-icon size="24" />
          </button>
        </div>
      </template>
    </template>

    <!-- Body Component -->
    <div class="ai-report-modal__content">
      <template v-if="report">

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
            <pre class="discovery-modal__markdown-text">{{
              report.fullReport
            }}</pre>
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
      </template>
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
  MailIcon,
  ActivityIcon,
} from "vue-feather-icons";
import ModalVanilla from "~/components/modal/ModalVanilla.vue";
import "~/assets/css/pages/discovery/AIReportDetailModal/AIReportDetailModal.css";
import "~/assets/css/pages/signals/SignalsPage/SignalsPage.css";

export default {
  name: "AIReportDetailModal",
  components: {
    StarIcon,
    XIcon,
    TrendingUpIcon,
    FileTextIcon,
    DownloadIcon,
    MailIcon,
    ActivityIcon,
    ModalVanilla,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    report: {
      type: Object,
      default: null,
    },
  },
  methods: {
    getInvestmentColor(investment) {
      if (investment === "매수" || investment === "Buy")
        return "discovery-modal__badge--buy";
      if (investment === "Hold" || investment === "중립")
        return "discovery-modal__badge--hold";
      return "discovery-modal__badge--sell";
    },
  },
};
</script>
