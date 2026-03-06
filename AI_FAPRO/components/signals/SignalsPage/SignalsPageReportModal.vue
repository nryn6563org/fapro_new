<template>
  <modal-vanilla
    v-if="isOpen"
    :is-open="isOpen"
    custom-dialog-class="ai-report-modal__dialog"
    @close="$emit('close')"
  >
    <template #header>
      <div v-if="signal" class="ai-report-modal__header">
        <div class="ai-report-modal__header-content">
          <div class="ai-report-modal__icon-box">
            <activity-icon size="28" class="text-primary dark:text-primary-light" />
          </div>
          <div class="ai-report-modal__title-wrapper">
            <h2 class="ai-report-modal__title">
              {{ signal.name }}
              <span class="ai-report-modal__ticker">{{ signal.ticker }}</span>
            </h2>
            <div class="ai-report-modal__badges">
              <span class="ai-report-modal__badge ai-report-modal__badge--blue">신작출시</span>
              <span class="ai-report-modal__badge ai-report-modal__badge--orange">거래량급증</span>
              <span class="ai-report-modal__badge ai-report-modal__badge--indigo">외국인매수</span>
            </div>
          </div>
        </div>
        <button type="button" class="ai-report-modal__close-btn" @click="$emit('close')">
          <x-icon size="24" />
        </button>
      </div>
    </template>
    <div class="ai-report-modal__content">
      <template v-if="signal">
        <a-i-report-content :signal="signal" />
      </template>
    </div>
  </modal-vanilla>
</template>

<script>
/**
 * 기능: AI매매신호 리포트 모달
 * 선택된 종목의 상세 분석 리포트를 Modal-Vanilla를 사용하여 표시합니다.
 */
import { XIcon, ActivityIcon } from "vue-feather-icons";
import ModalVanilla from "~/components/modal/ModalVanilla.vue";
import AIReportContent from "~/components/signals/AIReportContent.vue";

export default {
  name: "SignalsPageReportModal",
  components: {
    XIcon,
    ActivityIcon,
    ModalVanilla,
    AIReportContent,
  },
  props: {
    // 모달 표시 여부
    isOpen: {
      type: Boolean,
      default: false,
    },
    // 표시할 신호 데이터 객체
    signal: {
      type: Object,
      default: null,
    },
  },
};
</script>
