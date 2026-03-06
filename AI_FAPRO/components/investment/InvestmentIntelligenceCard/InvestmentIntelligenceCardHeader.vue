<template>
  <div class="intelligence-card__header">
    <div class="intelligence-card__header-left">
      <div :class="['intelligence-card__icon-box', color]">
        <component :is="iconComponent" class="intelligence-card__icon" />
      </div>
      <div class="intelligence-card__title-area">
        <transition name="fade-slide-up" mode="out-in">
          <h4 :key="index" class="intelligence-card__title">
            {{ title }}
          </h4>
        </transition>
        <p class="intelligence-card__subtitle">
          FA를 위한 실시간 인텔리전스 · 업데이트 {{ currentTime }}
        </p>
      </div>
    </div>

    <!-- Controls -->
    <div class="intelligence-card__controls">
      <div class="intelligence-card__dots">
        <button
          v-for="(_, idx) in summariesLength"
          :key="idx"
          :class="[
            'intelligence-card__dot',
            { 'intelligence-card__dot--active': idx === index },
          ]"
          @click="$emit('update:index', idx)"
        ></button>
      </div>
      <button class="intelligence-card__refresh" @click="$emit('next')">
        <refresh-cw-icon class="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 인텔리전스 카드 헤더
 */
import {
  AlertCircleIcon,
  ActivityIcon,
  TrendingUpIcon,
  ZapIcon,
  RefreshCwIcon,
} from "vue-feather-icons";

export default {
  name: "InvestmentIntelligenceCardHeader",
  components: {
    AlertCircleIcon,
    ActivityIcon,
    TrendingUpIcon,
    ZapIcon,
    RefreshCwIcon,
  },
  props: {
    title: { type: String, required: true },
    color: { type: String, required: true },
    iconComponent: { type: String, required: true },
    index: { type: Number, required: true },
    summariesLength: { type: Number, required: true },
    currentTime: { type: String, default: "" },
  },
};
</script>
