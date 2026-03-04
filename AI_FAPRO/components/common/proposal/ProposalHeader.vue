<template>
  <header class="proposal-header">
    <div class="proposal-header__title-row">
      <component 
        :is="iconComponent" 
        :class="['proposal-header__icon', iconClass]" 
      />
      <h2 class="proposal-header__title">{{ title }}</h2>
    </div>
    <p v-if="description" class="proposal-header__desc">
      {{ description }}
    </p>
    <button class="proposal-header__close" @click="$emit('close')">
      <x-icon size="20" class="text-slate-400" />
    </button>
  </header>
</template>

<script>
/**
 * ProposalHeader
 * 설명: 제안 모달의 상단 헤더 컴포넌트
 */
import { SendIcon, XIcon, TargetIcon, TrendingUpIcon } from 'vue-feather-icons'

export default {
  name: 'ProposalHeader',
  components: {
    SendIcon,
    XIcon,
    TargetIcon,
    TrendingUpIcon
  },
  props: {
    title: {
      type: String,
      default: '투자 제안'
    },
    description: {
      type: String,
      default: '타겟 고객에게 문자, 카카오톡 또는 이메일로 제안 합니다.'
    },
    iconType: {
      type: String,
      default: 'send' // 'send', 'target', 'trending'
    },
    theme: {
      type: String,
      default: 'teal' // 'teal', 'orange', 'violet'
    }
  },
  computed: {
    iconComponent() {
      const mapping = {
        send: 'send-icon',
        target: 'target-icon',
        trending: 'trending-up-icon'
      }
      return mapping[this.iconType] || 'send-icon'
    },
    iconClass() {
      return `proposal-header__icon--${this.theme}`
    }
  }
}
</script>
