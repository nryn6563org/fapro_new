<template>
  <header class="proposal-header">
    <div class="proposal-header__title-row">
      <div v-if="iconComponent" class="proposal-header__icon-wrapper">
        <component
          :is="iconComponent"
          :class="iconClass"
        />
      </div>
      <div class="proposal-header__title-content">
        <h2 class="proposal-header__title">{{ title }}</h2>
        <p v-if="description" class="proposal-header__desc">
          {{ description }}
        </p>
      </div>
    </div>
    <button class="proposal-header__close" @click="$emit('close')">
      <x-icon size="20" class="proposal-header__close-icon" />
    </button>
  </header>
</template>

<script>
/**
 * ProposalHeader
 * 기능: 제안 모달의 상단 헤더 컴포넌트
 */
import { SendIcon, XIcon, TargetIcon, TrendingUpIcon, StarIcon } from "vue-feather-icons";
import "~/assets/css/common/proposal/ProposalHeader/ProposalHeader.css";

export default {
  name: "ProposalHeader",
  components: {
    SendIcon,
    XIcon,
    TargetIcon,
    TrendingUpIcon,
    StarIcon,
  },
  props: {
    title: {
      type: String,
      default: "투자 제안",
    },
    description: {
      type: String,
      default: "타겟 고객에게 문자, 카카오톡 또는 이메일로 제안 합니다.",
    },
    iconType: {
      type: String,
      default: "send", // 'send', 'target', 'trending', 'star'
    },
    theme: {
      type: String,
      default: "teal", // 'teal', 'orange', 'violet', 'green'
    },
  },
  computed: {
    iconComponent() {
      const mapping = {
        send: "send-icon",
        target: "target-icon",
        trending: "trending-up-icon",
        star: "star-icon",
      };
      return mapping[this.iconType] || "send-icon";
    },
    iconClass() {
      return `proposal-header__icon--${this.theme}`;
    },
  },
};
</script>
