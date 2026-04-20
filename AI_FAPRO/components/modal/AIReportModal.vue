<template>
  <modal-vanilla v-if="isOpen" :is-open="isOpen" custom-dialog-class="ai-report-modal__dialog" @close="$emit('close')">
    <template #header>
      <div v-if="data" class="ai-report-modal__header">
        <div class="ai-report-modal__header-content">
          <div class="ai-report-modal__icon-box">
            <activity-icon size="28" class="text-primary dark:text-primary-light" />
          </div>
          <div class="ai-report-modal__title-wrapper">
            <h2 class="ai-report-modal__title">
              {{ data.name || data.stockName || data.title }}
              <span class="ai-report-modal__ticker">{{ data.ticker }}</span>
            </h2>
            <div class="ai-report-modal__badges">
              <span class="ai-report-modal__badge ai-report-modal__badge--indigo">
                {{ data.signalBadge || '매수포착' }}
              </span>
              <span class="ai-report-modal__badge ai-report-modal__badge--indigo">
                {{ data.category || '실적발표' }}
              </span>
              <span class="ai-report-modal__badge ai-report-modal__badge--indigo">
                AI스코어 {{ data.aiScore || 90 }}
              </span>
            </div>
          </div>
        </div>
        <button type="button" class="ai-report-modal__close-btn" @click="$emit('close')">
          <x-icon size="24" />
        </button>
      </div>
    </template>
    <div class="ai-report-modal__content">
      <template v-if="data">
        <a-i-report-content :signal="data" @send="handleSendRequest" />
      </template>
    </div>
  </modal-vanilla>
</template>

<script>
/**
 * 기능: 공통 AI 리포트 상세 모달
 * AI매매신호 포착 및 종목발굴 페이지에서 공통으로 사용됩니다.
 */
import { XIcon, ActivityIcon } from "vue-feather-icons";
import ModalVanilla from "~/components/modal/ModalVanilla.vue";
import AIReportContent from "~/components/signals/AIReportContent.vue";
import "~/assets/css/pages/signals/SignalsPage/SignalsPage.css";

export default {
  name: "AIReportModal",
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
    // 상위에서 전달받는 신호 또는 리포트 데이터
    data: {
      type: Object,
      default: null,
    },
  },
  methods: {
    handleSendRequest(eventData) {
      // 1. Close the current modal
      this.$emit("close");

      // 2. Open global guidance modal
      this.$bus.$emit("open-proposal-guidance", {
        onConfirm: () => {
          alert("투자 제안이 전송되었습니다.");
          console.log("Send request with data:", eventData);
        },
      });
    },
  },
};
</script>
