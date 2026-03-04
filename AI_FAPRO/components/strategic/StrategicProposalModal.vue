<template>
  <modal-vanilla
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
    <div v-if="stock" class="strategic-modal__body">
      <!-- Stock Info -->
      <div class="strategic-modal__info-card">
        <div class="strategic-modal__info-header">
          <div class="strategic-modal__info-left">
            <h3 class="strategic-modal__stock-name">{{ stock.name }}</h3>
            <span class="strategic-modal__badge">{{ stock.sector }}</span>
          </div>
          <span class="strategic-modal__stock-code">{{ stock.code }}</span>
        </div>
        <div class="strategic-modal__stats-grid">
          <div class="strategic-modal__stat-col">
            <span class="strategic-modal__stat-label">현재가</span>
            <span class="strategic-modal__stat-value">{{ stock.currentPrice }}</span>
          </div>
          <div class="strategic-modal__stat-col">
            <span class="strategic-modal__stat-label">등락률</span>
            <span
              :class="[
                'strategic-modal__stat-change',
                stock.isPositive
                  ? 'strategic-modal__stat-change--up'
                  : 'strategic-modal__stat-change--down'
              ]"
            >
              {{ stock.changePercent }}
            </span>
          </div>
          <div class="strategic-modal__stat-col">
            <span class="strategic-modal__stat-label">시가총액</span>
            <span class="strategic-modal__stat-value">{{ stock.marketCap }}</span>
          </div>
        </div>
      </div>

      <!-- Upside Driver -->
      <div class="strategic-modal__section strategic-modal__section--upside">
        <div class="strategic-modal__section-header">
          <trending-up-icon class="strategic-modal__section-icon text-teal-600" />
          <h3 class="strategic-modal__section-title">업사이드 드라이버</h3>
        </div>
        <div class="strategic-modal__point-list">
          <div
            v-for="(insight, idx) in stock.insights"
            :key="idx"
            class="strategic-modal__point-item"
          >
            <div class="strategic-modal__point-bullet bg-teal-500"></div>
            <p class="strategic-modal__point-text">{{ insight }}</p>
          </div>
        </div>
      </div>

      <!-- FA Opinion -->
      <div class="strategic-modal__form-group">
        <label class="strategic-modal__form-label">FA 의견 (선택사항)</label>
        <textarea
          v-model="faOpinion"
          class="strategic-modal__textarea"
          placeholder="고객에게 전달할 추가 의견을 입력하세요..."
        ></textarea>
      </div>

      <!-- File Attachment Section -->
      <div class="strategic-modal__form-group">
        <div class="strategic-modal__form-header">
          <label class="strategic-modal__form-label">첨부파일</label>
          <button type="button" class="strategic-modal__btn-preview">
            <file-text-icon class="w-3 h-3 mr-1" />
            제안서 미리보기
          </button>
        </div>

        <div class="strategic-modal__upload-box group">
          <input id="file-upload" type="file" multiple class="hidden" @change="handleFileUpload" />
          <label for="file-upload" class="strategic-modal__upload-label">
            <upload-icon class="strategic-modal__upload-icon" />
            <p class="strategic-modal__upload-text">
              파일을 여기에 드래그하거나
              <span class="strategic-modal__upload-text--highlight">클릭</span>하여 업로드
            </p>
            <p class="strategic-modal__upload-subtext">PDF, DOCX, XLSX 파일 지원 (최대 10MB)</p>
          </label>
        </div>

        <!-- Attached Files List -->
        <div v-if="attachedFiles.length > 0" class="strategic-modal__file-list">
          <div v-for="(file, idx) in attachedFiles" :key="idx" class="strategic-modal__file-item">
            <div class="strategic-modal__file-info">
              <file-text-icon class="w-4 h-4 text-slate-500" />
              <span class="strategic-modal__file-name">{{ file.name }}</span>
              <span class="strategic-modal__file-size"
                >({{ (file.size / 1024).toFixed(1) }}KB)</span
              >
            </div>
            <button class="strategic-modal__file-remove" @click="removeFile(idx)">
              <x-icon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Client Selection -->
      <div class="strategic-modal__form-group">
        <label class="strategic-modal__form-label">고객 선택</label>
        <div class="strategic-modal__client-list">
          <div
            v-for="(client, idx) in clientsList"
            :key="client.id"
            :class="[
              'strategic-modal__client-item',
              { 'strategic-modal__client-item--border': idx !== clientsList.length - 1 }
            ]"
          >
            <input
              :id="'client-' + client.id"
              v-model="selectedClients"
              type="checkbox"
              :value="client.id"
              class="strategic-modal__client-checkbox"
            />
            <label :for="'client-' + client.id" class="strategic-modal__client-label">
              <div class="strategic-modal__client-info">
                <div>
                  <p class="strategic-modal__client-name">{{ client.name }}</p>
                  <p class="strategic-modal__client-email">{{ client.email }}</p>
                </div>
                <div class="strategic-modal__client-portfolio">
                  <p class="strategic-modal__client-portfolio-label">포트폴리오</p>
                  <p class="strategic-modal__client-portfolio-value">{{ client.portfolio }}</p>
                </div>
              </div>
            </label>
          </div>
        </div>
        <div class="strategic-modal__client-summary">
          <span class="strategic-modal__client-summary-count">{{ selectedClients.length }}명</span
          >의 고객이 선택됨
        </div>
      </div>

      <!-- Send Actions -->
      <div class="strategic-modal__actions">
        <button type="button" class="strategic-modal__btn-outline" @click="closeModal">취소</button>
        <button
          type="button"
          class="strategic-modal__btn-primary"
          :disabled="selectedClients.length === 0"
          @click="sendEmail"
        >
          <mail-icon class="w-4 h-4 mr-2" />
          이메일 전송
        </button>
        <button
          type="button"
          class="strategic-modal__btn-secondary"
          :disabled="selectedClients.length === 0"
          @click="sendKakao"
        >
          <message-circle-icon class="w-4 h-4 mr-2" />
          카카오톡 전송
        </button>
      </div>
    </div>
  </modal-vanilla>
</template>

<script>
/**
 * 기능: AI 전략 유망주 제안 모달 컴포넌트
 */
import {
  XIcon,
  TrendingUpIcon,
  FileTextIcon,
  UploadIcon,
  MailIcon,
  MessageCircleIcon
} from 'vue-feather-icons'
import ModalVanilla from '~/components/modal/ModalVanilla.vue'
import { clients } from '~/utils/strategicStocksMockData.js'
import '~/assets/css/pages/strategic-stocks/StrategicProposalModal/StrategicProposalModal.css'

export default {
  name: 'StrategicProposalModal',
  components: {
    ModalVanilla,
    XIcon,
    TrendingUpIcon,
    FileTextIcon,
    UploadIcon,
    MailIcon,
    MessageCircleIcon
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
      faOpinion: '',
      attachedFiles: [],
      selectedClients: [],
      clientsList: clients
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
      // Reset form after animation
      setTimeout(() => {
        this.faOpinion = ''
        this.attachedFiles = []
        this.selectedClients = []
      }, 300)
    },
    handleFileUpload(e) {
      if (e.target.files) {
        // Convert FileList to Array and append
        const filesArray = Array.from(e.target.files)
        this.attachedFiles = [...this.attachedFiles, ...filesArray]
      }
    },
    removeFile(index) {
      this.attachedFiles.splice(index, 1)
    },
    sendEmail() {
      console.log(`이메일 전송: ${this.stock.name}`)
      console.log(`선택된 고객: ${this.selectedClients.length}명`)
      this.closeModal()
    },
    sendKakao() {
      console.log(`카카오톡 전송: ${this.stock.name}`)
      console.log(`선택된 고객: ${this.selectedClients.length}명`)
      this.closeModal()
    }
  }
}
</script>
