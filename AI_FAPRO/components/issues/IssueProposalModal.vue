<template>
  <div v-if="isOpen" class="issue-proposal">
    <div class="issue-proposal__overlay" @click="$emit('close')"></div>
    <div class="issue-proposal__modal animate__animated animate__fadeInUp animate__faster">
      <!-- Header -->
      <div class="issue-proposal__header">
        <h2 class="issue-proposal__title">
          <send-icon class="issue-proposal__title-icon" />
          이슈 기반 제안서 작성
        </h2>
        <button class="issue-proposal__close-btn" @click="$emit('close')">
          <x-icon class="w-6 h-6" />
        </button>
      </div>

      <div class="issue-proposal__content">
        <p class="issue-proposal__description">
          선택한 이슈를 바탕으로 고객에게 전송할 제안서를 작성하고 전송 방법을 선택하세요.
        </p>

        <!-- Issue Info Card -->
        <div v-if="issue" class="issue-proposal__info-card">
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="issue-proposal__info-label">이슈명</p>
              <h3 class="issue-proposal__info-name">{{ issue.name }}</h3>
            </div>
            <div class="text-right">
              <p class="issue-proposal__info-label">등락률</p>
              <p
                :class="[
                  'issue-proposal__info-change',
                  issue.changePercent >= 0 ? 'text-red-600' : 'text-blue-600'
                ]"
              >
                {{ issue.changePercent > 0 ? '+' : '' }}{{ issue.changePercent }}%
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="issue-proposal__badge">관련 종목 {{ issue.relatedStocks.length }}개</span>
            <span class="issue-proposal__badge issue-proposal__badge--outline">
              {{ issue.type === 'up' ? '상승' : issue.type === 'down' ? '하락' : '중립' }}
            </span>
          </div>
        </div>

        <!-- Form Sections -->
        <div class="issue-proposal__form">
          <!-- AI Summary -->
          <div class="issue-proposal__form-group">
            <label class="issue-proposal__label">
              <zap-icon class="w-4 h-4 text-amber-500 mr-2" />
              AI 이슈 요약 (수정 가능)
            </label>
            <textarea
              v-model="formData.aiReason"
              class="issue-proposal__textarea"
              placeholder="이슈 요약을 입력하세요..."
            ></textarea>
          </div>

          <!-- Market Background -->
          <div class="issue-proposal__form-group">
            <label class="issue-proposal__label">시장 배경 설명</label>
            <textarea
              v-model="formData.marketBackground"
              class="issue-proposal__textarea"
              placeholder="이슈가 발생한 시장 배경과 맥락을 설명하세요..."
            ></textarea>
          </div>

          <!-- Stock Logic -->
          <div class="issue-proposal__form-group">
            <label class="issue-proposal__label">해당 종목 투자 논리</label>
            <textarea
              v-model="formData.stockLogic"
              class="issue-proposal__textarea"
              placeholder="관련 종목들의 투자 논리와 이유를 설명하세요..."
            ></textarea>
          </div>

          <!-- Expected Scenario -->
          <div class="issue-proposal__form-group">
            <label class="issue-proposal__label">기대 시나리오</label>
            <textarea
              v-model="formData.expectedScenario"
              class="issue-proposal__textarea"
              placeholder="향후 전개될 시나리오와 기대 효과를 설명하세요..."
            ></textarea>
          </div>

          <!-- Risk Factors -->
          <div class="issue-proposal__form-group">
            <label class="issue-proposal__label text-amber-600">
              <alert-circle-icon class="w-4 h-4 mr-2" />
              리스크 요인
            </label>
            <textarea
              v-model="formData.riskFactors"
              class="issue-proposal__textarea"
              placeholder="투자 시 고려해야 할 리스크 요인을 설명하세요..."
            ></textarea>
          </div>

          <!-- FA Opinion -->
          <div class="issue-proposal__form-group">
            <label class="issue-proposal__label">FA 개인 의견 추가</label>
            <textarea
              v-model="formData.faOpinion"
              class="issue-proposal__textarea"
              placeholder="고객에게 전달할 개인적인 의견과 조언을 작성하세요..."
            ></textarea>
          </div>

          <!-- Client Selection -->
          <div class="issue-proposal__form-group">
            <label class="issue-proposal__label">고객 선택</label>
            <div class="issue-proposal__client-list">
              <div v-for="client in clients" :key="client.id" class="issue-proposal__client-item">
                <input
                  type="checkbox"
                  :id="'client-' + client.id"
                  :value="client.id"
                  v-model="selectedClientIds"
                  class="issue-proposal__checkbox"
                />
                <label :for="'client-' + client.id" class="issue-proposal__client-info">
                  <span class="issue-proposal__client-name">{{ client.name }}</span>
                  <span class="issue-proposal__client-email">{{ client.email }}</span>
                </label>
              </div>
            </div>
            <p class="issue-proposal__count">총 {{ selectedClientIds.length }}명의 고객 선택됨</p>
          </div>

          <!-- Send Method -->
          <div class="issue-proposal__form-group">
            <label class="issue-proposal__label">전송 방법 선택</label>
            <div class="issue-proposal__method-grid">
              <button
                @click="sendMethod = 'email'"
                :class="[
                  'issue-proposal__method-btn',
                  { 'issue-proposal__method-btn--active-email': sendMethod === 'email' }
                ]"
              >
                <mail-icon class="w-6 h-6 mb-2" />
                <span class="font-bold">이메일</span>
                <check-icon v-if="sendMethod === 'email'" class="issue-proposal__check-icon" />
              </button>
              <button
                @click="sendMethod = 'kakao'"
                :class="[
                  'issue-proposal__method-btn',
                  { 'issue-proposal__method-btn--active-kakao': sendMethod === 'kakao' }
                ]"
              >
                <message-square-icon class="w-6 h-6 mb-2" />
                <span class="font-bold">카카오톡</span>
                <check-icon v-if="sendMethod === 'kakao'" class="issue-proposal__check-icon" />
              </button>
              <button
                @click="sendMethod = 'sms'"
                :class="[
                  'issue-proposal__method-btn',
                  { 'issue-proposal__method-btn--active-sms': sendMethod === 'sms' }
                ]"
              >
                <smartphone-icon class="w-6 h-6 mb-2" />
                <span class="font-bold">문자 (SMS)</span>
                <check-icon v-if="sendMethod === 'sms'" class="issue-proposal__check-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="issue-proposal__footer">
        <button class="issue-proposal__btn-cancel" @click="$emit('close')">취소</button>
        <button
          class="issue-proposal__btn-send"
          :disabled="!sendMethod || selectedClientIds.length === 0"
          @click="handleSend"
        >
          <send-icon class="w-4 h-4 mr-2" />
          {{ sendMethodName }}로 전송하기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 이슈 기반 제안서 작성 모달
 */
import {
  SendIcon,
  XIcon,
  ZapIcon,
  AlertCircleIcon,
  MailIcon,
  MessageSquareIcon,
  SmartphoneIcon,
  CheckIcon
} from 'vue-feather-icons'
import { sampleClients } from '~/utils/issueDetectionMockData.js'
import '~/assets/css/pages/issues/IssueProposalModal.css'

export default {
  name: 'IssueProposalModal',
  components: {
    SendIcon,
    XIcon,
    ZapIcon,
    AlertCircleIcon,
    MailIcon,
    MessageSquareIcon,
    SmartphoneIcon,
    CheckIcon
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    issue: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formData: {
        aiReason: '',
        marketBackground: '',
        stockLogic: '',
        expectedScenario: '',
        riskFactors: '',
        faOpinion: ''
      },
      selectedClientIds: [],
      sendMethod: 'email',
      clients: sampleClients
    }
  },
  computed: {
    sendMethodName() {
      const names = { email: '이메일', kakao: '카카오톡', sms: '문자' }
      return names[this.sendMethod] || ''
    }
  },
  watch: {
    issue: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.formData.aiReason = newVal.aiReason || ''
          this.formData.marketBackground = `현재 ${newVal.name} 이슈는 시장에서 큰 주목을 받고 있습니다.`
          this.formData.stockLogic = `관련 종목들은 ${newVal.name} 기술력과 시장 지배력을 바탕으로 수혜가 예상됩니다.`
          this.formData.expectedScenario =
            '향후 분기별 실적 발표와 함께 주가 재평가가 가시화될 전망입니다.'
          this.formData.riskFactors =
            '다만, 글로벌 매크로 환경 변화에 따른 변동성 리스크가 존재합니다.'
          this.formData.faOpinion = ''
        }
      }
    }
  },
  methods: {
    handleSend() {
      // 실제 프로젝트에서는 여기서 API 호출
      this.$emit('send', {
        issue: this.issue,
        formData: this.formData,
        clientIds: this.selectedClientIds,
        method: this.sendMethod
      })
      alert(`${this.sendMethodName}로 제안서가 성공적으로 전송되었습니다.`)
      this.$emit('close')
    }
  }
}
</script>
