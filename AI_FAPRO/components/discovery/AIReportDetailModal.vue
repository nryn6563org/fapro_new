<template>
  <modal-vanilla
    v-if="isOpen"
    :is-open="isOpen"
    modal-id="ai-report-detail-modal"
    custom-dialog-class="ai-report-modal__dialog"
    @close="$emit('close')"
  >
    <template #header>
      <div v-if="report" class="ai-report-modal__header">
        <div class="ai-report-modal__header-content">
          <div class="ai-report-modal__icon-box">
            <activity-icon size="28" class="text-primary dark:text-primary-light" />
          </div>
          <div class="ai-report-modal__title-wrapper">
            <h2 class="ai-report-modal__title">
              {{ report.stockName || report.title }}
              <span class="ai-report-modal__ticker">{{ report.ticker }}</span>
            </h2>
            <div class="ai-report-modal__badges">
              <span class="ai-report-modal__badge ai-report-modal__badge--blue">{{ report.signalBadge || '매수포착' }}</span>
              <span class="ai-report-modal__badge ai-report-modal__badge--orange">{{ report.category || '실적발표' }}</span>
              <span class="ai-report-modal__badge ai-report-modal__badge--indigo">AI스코어 {{ report.aiScore }}</span>
            </div>
          </div>
        </div>
        <button type="button" class="ai-report-modal__close-btn" @click="$emit('close')">
          <x-icon size="24" />
        </button>
      </div>
    </template>
    <div class="ai-report-modal__content">
      <template v-if="report">
        <a-i-report-content :signal="report" />
      </template>
    </div>
  </modal-vanilla>
</template>

<script>
/**
 * 기능: AI 종목발굴 페이지의 상세 리포트 모달 (SignalsPageReportModal과 디자인 통일)
 */
import { XIcon, ActivityIcon } from "vue-feather-icons";
import ModalVanilla from "~/components/modal/ModalVanilla.vue";
import AIReportContent from "~/components/signals/AIReportContent.vue";
import "~/assets/css/pages/signals/SignalsPage/SignalsPage.css";

export default {
  name: "AIReportDetailModal",
  components: {
    XIcon,
    ActivityIcon,
    ModalVanilla,
    AIReportContent,
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
};
</script>
