<template>
  <div class="issue-proposal__form">
    <!-- AI Summary -->
    <div class="issue-proposal__form-group">
      <label class="issue-proposal__label">
        <zap-icon class="w-4 h-4 text-amber-500 mr-2" />
        AI 이슈 요약 (수정 가능)
      </label>
      <textarea
        v-model="localFormData.aiReason"
        class="issue-proposal__textarea"
        placeholder="이슈 요약을 입력하세요..."
      ></textarea>
    </div>

    <!-- Market Background -->
    <div class="issue-proposal__form-group">
      <label class="issue-proposal__label">시장 배경 설명</label>
      <textarea
        v-model="localFormData.marketBackground"
        class="issue-proposal__textarea"
        placeholder="이슈가 발생한 시장 배경과 맥락을 설명하세요..."
      ></textarea>
    </div>

    <!-- Stock Logic -->
    <div class="issue-proposal__form-group">
      <label class="issue-proposal__label">해당 종목 투자 논리</label>
      <textarea
        v-model="localFormData.stockLogic"
        class="issue-proposal__textarea"
        placeholder="관련 종목들의 투자 논리와 이유를 설명하세요..."
      ></textarea>
    </div>

    <!-- Expected Scenario -->
    <div class="issue-proposal__form-group">
      <label class="issue-proposal__label">기대 시나리오</label>
      <textarea
        v-model="localFormData.expectedScenario"
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
        v-model="localFormData.riskFactors"
        class="issue-proposal__textarea"
        placeholder="투자 시 고려해야 할 리스크 요인을 설명하세요..."
      ></textarea>
    </div>

    <!-- FA Opinion -->
    <div class="issue-proposal__form-group">
      <label class="issue-proposal__label">FA 개인 의견 추가</label>
      <textarea
        v-model="localFormData.faOpinion"
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
            :id="'client-' + client.id"
            v-model="localSelectedClients"
            type="checkbox"
            :value="client.id"
            class="issue-proposal__checkbox"
          />
          <label :for="'client-' + client.id" class="issue-proposal__client-info">
            <span class="issue-proposal__client-name">{{ client.name }}</span>
            <span class="issue-proposal__client-email">{{ client.email }}</span>
          </label>
        </div>
      </div>
      <p class="issue-proposal__count">총 {{ localSelectedClients.length }}명의 고객 선택됨</p>
    </div>

    <!-- Send Method -->
    <div class="issue-proposal__form-group">
      <label class="issue-proposal__label">전송 방법 선택</label>
      <div class="issue-proposal__method-grid">
        <button
          :class="[
            'issue-proposal__method-btn',
            { 'issue-proposal__method-btn--active-email': localSendMethod === 'email' }
          ]"
          @click="localSendMethod = 'email'"
        >
          <mail-icon class="w-6 h-6 mb-2" />
          <span class="font-bold">이메일</span>
          <check-icon v-if="localSendMethod === 'email'" class="issue-proposal__check-icon" />
        </button>
        <button
          :class="[
            'issue-proposal__method-btn',
            { 'issue-proposal__method-btn--active-kakao': localSendMethod === 'kakao' }
          ]"
          @click="localSendMethod = 'kakao'"
        >
          <message-square-icon class="w-6 h-6 mb-2" />
          <span class="font-bold">카카오톡</span>
          <check-icon v-if="localSendMethod === 'kakao'" class="issue-proposal__check-icon" />
        </button>
        <button
          :class="[
            'issue-proposal__method-btn',
            { 'issue-proposal__method-btn--active-sms': localSendMethod === 'sms' }
          ]"
          @click="localSendMethod = 'sms'"
        >
          <smartphone-icon class="w-6 h-6 mb-2" />
          <span class="font-bold">문자 (SMS)</span>
          <check-icon v-if="localSendMethod === 'sms'" class="issue-proposal__check-icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 제안서 작성 입력 및 설정 폼 영역
 */
import {
  ZapIcon,
  AlertCircleIcon,
  MailIcon,
  MessageSquareIcon,
  SmartphoneIcon,
  CheckIcon
} from 'vue-feather-icons'
import '~/assets/css/pages/issues/IssueProposalForm/IssueProposalForm.css'

export default {
  name: 'IssueProposalForm',
  components: {
    ZapIcon,
    AlertCircleIcon,
    MailIcon,
    MessageSquareIcon,
    SmartphoneIcon,
    CheckIcon
  },
  props: {
    formData: {
      type: Object,
      required: true
    },
    clients: {
      type: Array,
      default: () => []
    },
    selectedClientIds: {
      type: Array,
      default: () => []
    },
    sendMethod: {
      type: String,
      default: 'email'
    }
  },
  data() {
    return {
      localFormData: { ...this.formData }
    }
  },
  computed: {
    localSelectedClients: {
      get() {
        return this.selectedClientIds
      },
      set(val) {
        this.$emit('update:selectedClientIds', val)
      }
    },
    localSendMethod: {
      get() {
        return this.sendMethod
      },
      set(val) {
        this.$emit('update:sendMethod', val)
      }
    }
  },
  watch: {
    formData: {
      handler(newVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(this.localFormData)) {
          this.localFormData = { ...newVal }
        }
      },
      deep: true,
      immediate: true
    },
    localFormData: {
      handler(newVal) {
        this.$emit('update:formData', newVal)
      },
      deep: true
    }
  }
}
</script>
