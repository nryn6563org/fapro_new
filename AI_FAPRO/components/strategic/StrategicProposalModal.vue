<template>
  <modal-vanilla v-if="isOpen" :is-open="isOpen" modal-id="strategic-proposal-modal" custom-dialog-class="strategic-modal__dialog" @close="closeModal">
    <!-- Header Component -->
    <template #header>
      <div class="strategic-modal__header">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M14.5358 21.6861C14.5738 21.7807 14.6398 21.8615 14.7251 21.9176C14.8103 21.9737 14.9107 22.0023 15.0126 21.9997C15.1146 21.9971 15.2134 21.9633 15.2956 21.903C15.3779 21.8426 15.4397 21.7586 15.4728 21.6621L21.9728 2.66206C22.0048 2.57345 22.0109 2.47756 21.9904 2.38561C21.9699 2.29366 21.9236 2.20945 21.857 2.14283C21.7904 2.07622 21.7062 2.02995 21.6143 2.00945C21.5223 1.98894 21.4264 1.99505 21.3378 2.02706L2.33781 8.52706C2.2413 8.56015 2.15723 8.62197 2.09688 8.70423C2.03652 8.78648 2.00278 8.88523 2.00016 8.98722C1.99755 9.0892 2.0262 9.18955 2.08226 9.27478C2.13833 9.36002 2.21912 9.42606 2.31381 9.46406L10.2438 12.6441C10.4945 12.7444 10.7223 12.8945 10.9134 13.0853C11.1045 13.2761 11.255 13.5036 11.3558 13.7541L14.5358 21.6861Z"
            stroke="#999"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M21.8541 2.14697L10.9141 13.086" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="strategic-modal__header-title">
          <h2 class="strategic-modal__title">제안하기</h2>
          <p class="strategic-modal__subtitle">[종목명] 종목을 제안해 보세요.</p>
        </div>
        <button type="button" class="strategic-modal__close-btn" @click="closeModal">
          <x-icon size="24" />
        </button>
      </div>
    </template>

    <!-- Body Component -->
    <div class="strategic-modal__body">
      <template v-if="stock">
        <!-- Stock Details Preview -->
        <StrategicStockPreview :stock="stock" />

        <!-- Client Selection -->
        <StrategicClientList :clients="clientsList" :selected-clients.sync="selectedClients" />

        <!-- Transmission & Message Section -->
        <div class="strategic-modal__form-section">
          <!-- Transmission Method -->
          <div class="strategic-modal__form-group-item">
            <label class="strategic-modal__form-label">전송방법 선택</label>
            <div class="strategic-modal__delivery-tabs">
              <button :class="['strategic-modal__delivery-tab', transmissionMethod === 'sms' ? 'strategic-modal__delivery-tab--active-sms' : '']" @click="transmissionMethod = 'sms'">
                <phone-icon class="strategic-modal__tab-icon" />
                문자
              </button>
              <button :class="['strategic-modal__delivery-tab', transmissionMethod === 'kakao' ? 'strategic-modal__delivery-tab--active-kakao' : '']" @click="transmissionMethod = 'kakao'">
                <message-circle-icon class="strategic-modal__tab-icon" />
                카카오톡
              </button>
              <button :class="['strategic-modal__delivery-tab', transmissionMethod === 'email' ? 'strategic-modal__delivery-tab--active-email' : '']" @click="transmissionMethod = 'email'">
                <mail-icon class="strategic-modal__tab-icon" />
                이메일
              </button>
            </div>
          </div>

          <!-- Message Sample (Themed Preview) -->
          <div class="strategic-modal__form-group-item">
            <label class="strategic-modal__form-label">메시지 내용 샘플</label>
            <div :class="['strategic-modal__message-preview-container', `strategic-modal__message-preview-container--${transmissionMethod}`]">
              <div class="strategic-modal__message-preview-card">
                <textarea v-model="messageSample" class="strategic-modal__textarea-message" placeholder="전송될 메시지 내용입니다."></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Send Actions -->
        <div class="strategic-modal__actions">
          <button class="strategic-modal__btn-outline" @click="$emit('close')">취소</button>
          <button class="strategic-modal__btn-primary" :disabled="!selectedClients.length" @click="handleSend">
            <send-icon class="w-4 h-4 mr-2" />
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
import { XIcon, MailIcon, MessageCircleIcon, PhoneIcon, SendIcon } from "vue-feather-icons";
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
    PhoneIcon,
    SendIcon
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    stock: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      transmissionMethod: "kakao", // 'sms', 'kakao', 'email'
      selectedClients: [],
      clientsList: clients,
      messageSample: ""
    };
  },
  watch: {
    stock: {
      immediate: true,
      handler(newStock) {
        if (newStock) {
          this.generateMessageSample();
        }
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("close");
      // Reset form after animation
      setTimeout(() => {
        this.selectedClients = [];
        this.transmissionMethod = "kakao";
      }, 300);
    },
    generateMessageSample() {
      this.messageSample = `[AI 추천 전략 유망주]\n${this.stock.name} (${this.stock.code})\n\n안녕하세요. 고객님을 위한 AI 분석 중장기 유망주 정보를 안내해 드립니다.\n\n▶ 종목명: ${this.stock.name}\n▶ 현재가: ${this.stock.currentPrice}원 (${this.stock.changePercent})\n▶ 의견: ${this.stock.characteristic}\n\n■ 투자 전략 및 분석\n${this.stock.rationale.map((r) => `- ${r}`).join("\n")}\n\n상세 분석 리포트는 아래 링크에서 확인하실 수 있습니다.\n[상세보기 링크]\n\n감사합니다.`;
    },
    handleSend() {
      alert("준비중 입니다");
      console.log(`전송 시도:\n${this.messageSample}`);
      console.log(`선택된 고객: ${this.selectedClients.length}명`);
      console.log(`전송 방식: ${this.transmissionMethod}`);
      this.closeModal();
    }
  }
};
</script>
