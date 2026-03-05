<template>
  <div class="trading-signal-card" :class="`trading-signal-card--${type}`">
    <div class="trading-signal-card__header-box">
      <div class="trading-signal-card__info-row">
        <div class="trading-signal-card__info-left">
          <div class="trading-signal-card__time-badge">
            <span
              :class="[
                'trading-signal-card__time-text',
                type === 'buy'
                  ? 'trading-signal-card__time-text--buy'
                  : 'trading-signal-card__time-text--sell',
              ]"
              >{{ signal.time }} {{ type === "buy" ? "매수" : "매도" }} 신호 발생</span
            >
          </div>
          <h3 class="trading-signal-card__name">{{ signal.name }}</h3>
          <div class="trading-signal-card__price-row">
            <span
              :class="[
                'trading-signal-card__price',
                type === 'buy'
                  ? 'trading-signal-card__price--buy'
                  : 'trading-signal-card__price--sell',
              ]"
            >
              {{ type === "buy" ? "매수가" : "매도가" }} {{ signal.price }}
            </span>
            <span v-if="type === 'sell'" class="trading-signal-card__change">수익률 {{
              signal.change
            }}</span>
          </div>
        </div>
      </div>

      <div class="trading-signal-card__actions">
        <button
          class="trading-signal-card__btn-detail"
          @click="$emit('toggle-detail')"
        >
          <trending-up-icon size="14" class="trading-signal-card__btn-icon" />
          {{ isDetailOpen ? "매매내역 접기" : "매매내역 보기" }}
        </button>
        <button
          class="trading-signal-card__btn-report"
          @click="$emit('open-report', signal)"
        >
          <star-icon size="14" class="trading-signal-card__btn-icon" />
          AI 리포트
        </button>
      </div>
    </div>

    <!-- Move reason-box directly under the header-box inside trading-signal-card -->
    <div class="trading-signal-card__reason-box">
      <h4 class="trading-signal-card__reason-title">시그널 발생 사유</h4>
      <p v-if="signal.reason" class="trading-signal-card__reason-text">
        {{ signal.reason }}
        <span class="trading-signal-card__reason-more" @click="$emit('open-report', signal)">[내용 자세히 보기]</span>
      </p>
      <div v-else class="trading-signal-card__reason-empty">
        <span class="trading-signal-card__reason-empty-text"
          >발생 사유 생성중</span
        >
      </div>
    </div>

    <!-- Detail component extracted from origin code -->
    <trading-signal-history v-if="isDetailOpen" :signal="signal" :type="type" />
  </div>
</template>

<script>
/**
 * 기능: AI 매매 신호 (매수/매도) 개별 카드 렌더링
 */
import { TrendingUpIcon, StarIcon } from "vue-feather-icons";
import TradingSignalHistory from "~/components/signals/TradingSignalHistory.vue";
import "~/assets/css/pages/signals/TradingSignalCard/TradingSignalCard.css";

export default {
  name: "TradingSignalCard",
  components: {
    TrendingUpIcon,
    StarIcon,
    TradingSignalHistory,
  },
  props: {
    signal: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: "buy", // 'buy' or 'sell'
      validator: (value) => ["buy", "sell"].includes(value),
    },
    isDetailOpen: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
