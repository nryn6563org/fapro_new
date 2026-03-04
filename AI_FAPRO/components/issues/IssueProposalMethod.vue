<template>
  <div class="issue-proposal__form-group">
    <label class="issue-proposal__label">전송 방법 선택</label>
    <div class="issue-proposal__method-grid">
      <button
        :class="[
          'issue-proposal__method-btn',
          { 'issue-proposal__method-btn--active-email': internalSendMethod === 'email' }
        ]"
        @click="internalSendMethod = 'email'"
      >
        <mail-icon class="w-6 h-6 mb-2" />
        <span class="font-bold">이메일</span>
        <check-icon v-if="internalSendMethod === 'email'" class="issue-proposal__check-icon" />
      </button>
      <button
        :class="[
          'issue-proposal__method-btn',
          { 'issue-proposal__method-btn--active-kakao': internalSendMethod === 'kakao' }
        ]"
        @click="internalSendMethod = 'kakao'"
      >
        <message-square-icon class="w-6 h-6 mb-2" />
        <span class="font-bold">카카오톡</span>
        <check-icon v-if="internalSendMethod === 'kakao'" class="issue-proposal__check-icon" />
      </button>
      <button
        :class="[
          'issue-proposal__method-btn',
          { 'issue-proposal__method-btn--active-sms': internalSendMethod === 'sms' }
        ]"
        @click="internalSendMethod = 'sms'"
      >
        <smartphone-icon class="w-6 h-6 mb-2" />
        <span class="font-bold">문자 (SMS)</span>
        <check-icon v-if="internalSendMethod === 'sms'" class="issue-proposal__check-icon" />
      </button>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 이슈 제안 전송 방법 선택 컴포넌트
 */
import {
  MailIcon,
  MessageSquareIcon,
  SmartphoneIcon,
  CheckIcon
} from 'vue-feather-icons'

export default {
  name: 'IssueProposalMethod',
  components: {
    MailIcon,
    MessageSquareIcon,
    SmartphoneIcon,
    CheckIcon
  },
  props: {
    sendMethod: {
      type: String,
      default: 'email'
    }
  },
  computed: {
    internalSendMethod: {
      get() {
        return this.sendMethod
      },
      set(val) {
        this.$emit('update:sendMethod', val)
      }
    }
  }
}
</script>
