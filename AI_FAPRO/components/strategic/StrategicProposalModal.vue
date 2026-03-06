<template>
  <modal-vanilla
    v-if="isOpen"
    :is-open="isOpen"
    modal-id="strategic-proposal-modal"
    custom-dialog-class="strategic-modal__dialog"
    @close="closeModal"
  >
    <!-- 헤더 컴포넌트 -->
    <template #header>
      <div class="strategic-modal__header">
        <h2 class="strategic-modal__title">AI 추천 전략 유망주 제안</h2>
        <p class="strategic-modal__subtitle">
          AI가 분석한 중장기 유망주 정보를 고객님께 전송합니다.
        </p>
        <button
          type="button"
          class="strategic-modal__close-btn"
          @click="closeModal"
        >
          <x-icon size="24" />
        </button>
      </div>
    </template>

    <!-- 본문 컴포넌트 -->
    <div class="strategic-modal__body">
      <template v-if="stock">
        <!-- 종목 상세 미리보기 -->
        <StrategicStockPreview :stock="stock" />

        <!-- 고객 선택 -->
        <StrategicClientList
          :clients="clientsList"
          :selected-clients.sync="selectedClients"
        />

        <!-- 전송 방식 탭 -->
        <div class="strategic-modal__form-group">
          <label class="strategic-modal__form-label">전송 방식</label>
          <div class="strategic-modal__tabs">
            <button
              :class="[
                'strategic-modal__tab',
                transmissionMethod === 'sms'
                  ? 'strategic-modal__tab--active-sms'
                  : '',
              ]"
              @click="transmissionMethod = 'sms'"
            >
              <message-square-icon class="w-4 h-4 mr-2" />
              문자
            </button>
            <button
              :class="[
                'strategic-modal__tab',
                transmissionMethod === 'kakao'
                  ? 'strategic-modal__tab--active-kakao'
                  : '',
              ]"
              @click="transmissionMethod = 'kakao'"
            >
              <message-circle-icon class="w-4 h-4 mr-2" />
              카카오톡
            </button>
            <button
              :class="[
                'strategic-modal__tab',
                transmissionMethod === 'email'
                  ? 'strategic-modal__tab--active-email'
                  : '',
              ]"
              @click="transmissionMethod = 'email'"
            >
              <mail-icon class="w-4 h-4 mr-2" />
              이메일
            </button>
          </div>
        </div>

        <!-- 메시지 샘플 -->
        <div class="strategic-modal__form-group">
          <div class="strategic-modal__form-header">
            <label class="strategic-modal__form-label">메시지 내용</label>
          </div>
          <textarea
            v-model="messageSample"
            class="strategic-modal__textarea-message"
            placeholder="전송될 메시지 내용입니다."
          ></textarea>
        </div>

        <!-- 전송 액션 -->
        <div class="strategic-modal__actions">
          <button
            type="button"
            class="strategic-modal__btn-outline"
            @click="closeModal"
          >
            취소
          </button>
          <button
            type="button"
            class="strategic-modal__btn-primary"
            :disabled="selectedClients.length === 0"
            @click="handleSend"
          >
            <navigation-icon class="w-4 h-4 mr-2" />
            전송하기
          </button>
        </div>
      </template>
    </div>
  </modal-vanilla>
</template>

<script>
/**
 * 기능: AI 중장기 유망주 제안 모달 컴포넌트
 */
import {
  XIcon,
  MailIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  NavigationIcon,
} from "vue-feather-icons";
import StrategicStockPreview from "~/components/strategic/StrategicStockPreview.vue";
import StrategicClientList from "~/components/strategic/StrategicClientList.vue";
import ModalVanilla from "~/components/modal/ModalVanilla.vue";
import { clients } from "~/utils/strategicStocksMockData.js";
import "~/assets/css/pages/strategic-stocks/StrategicProposalModal/StrategicProposalModal.css";

export default {
  name: "StrategicProposalModal",
  components: {
    ModalVanilla,
    StrategicStockPreview,
    StrategicClientList,
    XIcon,
    MailIcon,
    MessageCircleIcon,
    MessageSquareIcon,
    NavigationIcon,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      transmissionMethod: "kakao", // 'sms', 'kakao', 'email' 중 하나
      selectedClients: [],
      clientsList: clients,
      messageSample: "",
    };
  },
  watch: {
    stock: {
      immediate: true,
      handler(newStock) {
        if (newStock) {
          this.generateMessageSample();
        }
      },
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
      // 애니메이션 후 폼 초기화
      setTimeout(() => {
        this.selectedClients = [];
        this.transmissionMethod = "kakao";
      }, 300);
    },
    generateMessageSample() {
      this.messageSample = `[AI 추천 전략 유망주]\n${this.stock.name} (${this.stock.code})\n\n안녕하세요. 고객님을 위한 AI 분석 중장기 유망주 정보를 안내해 드립니다.\n\n▶ 종목명: ${this.stock.name}\n▶ 현재가: ${this.stock.currentPrice}원 (${this.stock.changePercent})\n▶ 의견: ${this.stock.characteristic}\n\n■ 투자 전략 및 분석\n${this.stock.rationale.map(r => `- ${r}`).join('\n')}\n\n상세 분석 리포트는 아래 링크에서 확인하실 수 있습니다.\n[상세보기 링크]\n\n감사합니다.`;
    },
    handleSend() {
      alert("준비중 입니다");
      this.closeModal();
    },
  },
};
</script>
