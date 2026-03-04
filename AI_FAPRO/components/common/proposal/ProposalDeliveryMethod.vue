<template>
  <section class="proposal-section proposal-section--transparent">
    <div class="proposal-section__header mb-2 relative">
      <div class="proposal-section__title-row">
        <message-square-icon class="proposal-section__icon text-amber-500" />
        <h3 class="proposal-section__title">전송 방법</h3>
      </div>
    </div>
    <div class="delivery-tabs">
      <button 
        v-for="method in methods"
        :key="method.id"
        class="delivery-tab"
        :class="[
          selectedMethod === method.id ? `delivery-tab--active-${method.id}` : ''
        ]"
        @click="$emit('update:selectedMethod', method.id)"
      >
        <component :is="method.icon" class="w-4 h-4 mr-1.5" />
        {{ method.label }}
      </button>
    </div>
  </section>
</template>

<script>
/**
 * ProposalDeliveryMethod
 * 설명: 전송 방법(문자, 카카오톡, 이메일) 선택 탭 컴포넌트
 */
import { MessageSquareIcon, PhoneIcon, MailIcon, MessageCircleIcon } from 'vue-feather-icons'

export default {
  name: 'ProposalDeliveryMethod',
  components: {
    MessageSquareIcon,
    PhoneIcon,
    MailIcon,
    MessageCircleIcon
  },
  props: {
    selectedMethod: {
      type: String,
      default: 'kakao'
    }
  },
  data() {
    return {
      methods: [
        { id: 'sms', label: '문자', icon: 'phone-icon' },
        { id: 'kakao', label: '카카오톡', icon: 'message-circle-icon' },
        { id: 'email', label: '이메일', icon: 'mail-icon' }
      ]
    }
  }
}
</script>
