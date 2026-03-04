<template>
  <modal-vanilla
    v-if="isOpen"
    :is-open="isOpen"
    custom-dialog-class="strategic-modal__dialog"
    @close="closeModal"
  >
    <!-- Header Component -->
    <template #header>
      <div class="strategic-modal__header">
        <h2 class="strategic-modal__title">고객에게 종목 제안</h2>
        <p class="strategic-modal__subtitle">선택한 종목 정보를 고객에게 전송합니다.</p>
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
        <StrategicClientList 
          :clients="clientsList" 
          :selected-clients.sync="selectedClients" 
        />

        <!-- Transmission Method Tabs -->
        <div class="strategic-modal__form-group">
          <label class="strategic-modal__form-label">전송 방식</label>
          <div class="strategic-modal__tabs">
            <button 
               :class="['strategic-modal__tab', transmissionMethod === 'sms' ? 'strategic-modal__tab--active-sms' : '']"
               @click="transmissionMethod = 'sms'"
            >
              <message-square-icon class="w-4 h-4 mr-2" />
              문자
            </button>
            <button 
               :class="['strategic-modal__tab', transmissionMethod === 'kakao' ? 'strategic-modal__tab--active-kakao' : '']"
               @click="transmissionMethod = 'kakao'"
            >
              <message-circle-icon class="w-4 h-4 mr-2" />
              카카오톡
            </button>
             <button 
               :class="['strategic-modal__tab', transmissionMethod === 'email' ? 'strategic-modal__tab--active-email' : '']"
               @click="transmissionMethod = 'email'"
            >
              <mail-icon class="w-4 h-4 mr-2" />
              이메일
            </button>
          </div>
        </div>
        
         <!-- Message Sample -->
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

        <!-- Send Actions -->
        <div class="strategic-modal__actions">
          <button type="button" class="strategic-modal__btn-outline" @click="closeModal">취소</button>
          <button
            type="button"
            class="strategic-modal__btn-primary"
            :disabled="selectedClients.length === 0"
            @click="copyContent"
          >
            <copy-icon class="w-4 h-4 mr-2" />
            내용복사
          </button>
        </div>
      </template>
    </div>
  </modal-vanilla>
</template>

<script>
/**
 * 기능: AI 전략 유망주 제안 모달 컴포넌트
 */
import {
  XIcon,
  MailIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  CopyIcon
} from 'vue-feather-icons'
import StrategicStockPreview from '~/components/strategic/StrategicStockPreview.vue'
import StrategicClientList from '~/components/strategic/StrategicClientList.vue'
import ModalVanilla from '~/components/modal/ModalVanilla.vue'
import { clients } from '~/utils/strategicStocksMockData.js'
import '~/assets/css/pages/strategic-stocks/StrategicProposalModal/StrategicProposalModal.css'

export default {
  name: 'StrategicProposalModal',
  components: {
    ModalVanilla,
    StrategicStockPreview,
    StrategicClientList,
    XIcon,
    MailIcon,
    MessageCircleIcon,
    MessageSquareIcon,
    CopyIcon
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
      transmissionMethod: 'kakao', // 'sms', 'kakao', 'email'
      selectedClients: [],
      clientsList: clients,
      messageSample: ''
    }
  },
  watch: {
     stock: {
        immediate: true,
        handler(newStock) {
           if (newStock) {
              this.generateMessageSample()
           }
        }
     }
  },
  methods: {
    closeModal() {
      this.$emit('close')
      // Reset form after animation
      setTimeout(() => {
        this.selectedClients = []
        this.transmissionMethod = 'kakao'
      }, 300)
    },
    generateMessageSample() {
       this.messageSample = `[AI 추천 전략 유망주]\n${this.stock.name} (${this.stock.code})\n\n고객님께 새로운 투자 기회를 안내해 드립니다.\n현재가: ${this.stock.currentPrice}원.\n\nAI 기반 상승 예측 내용과 상세 분석 리포트는 다음 링크에서 확인하실 수 있습니다.`
    },
    copyContent() {
      console.log(`내용 복사됨:\n${this.messageSample}`)
      console.log(`선택된 고객: ${this.selectedClients.length}명`)
      console.log(`전송 방식: ${this.transmissionMethod}`)
      this.closeModal()
    }
  }
}
</script>
