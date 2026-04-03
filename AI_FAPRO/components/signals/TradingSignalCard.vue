<template>
  <div class="trading-signal-card" :class="`trading-signal-card--${type}`">
    <!-- Top badge -->
    <div class="trading-signal-card__badge-row">
      <div class="trading-signal-card__top-badge">
        <p class="trading-signal-card__top-badge-text">{{ signal.time }} {{ type === 'buy' ? '매수' : '매도' }} 신호 발생</p>
      </div>
    </div>
    
    <!-- Title & Price row -->
    <div class="trading-signal-card__info-row">
      <p class="trading-signal-card__name">{{ signal.name }}</p>
      <div class="trading-signal-card__price-box">
        <p class="trading-signal-card__price-label">{{ type === "buy" ? "매수 신호가" : "매도 신호가" }}</p>
        <p class="trading-signal-card__price">{{ signal.price }}</p>
      </div>
    </div>

    <!-- Actions row -->
    <div class="trading-signal-card__actions-row">
      <div class="trading-signal-card__btn-detail" @click="$emit('toggle-detail')">
        <p class="trading-signal-card__btn-detail-text">{{ isDetailOpen ? "매매내역 접기" : "매매내역 보기" }}</p>
      </div>
      <div class="trading-signal-card__btn-report" @click="$emit('open-report', signal)">
        <p class="trading-signal-card__btn-report-text">AI 리포트</p>
      </div>
    </div>

    <!-- Reason box -->
    <div class="trading-signal-card__reason-box">
      <div class="trading-signal-card__reason-header">
        <p class="trading-signal-card__reason-title">시그널 발생 사유</p>
      </div>
      <div v-if="signal.reason" class="trading-signal-card__reason-content">
        <p class="trading-signal-card__reason-text">{{ signal.reason }}</p>
        <p class="trading-signal-card__reason-more" @click="$emit('open-analysis', signal)">[내용 자세히 보기]</p>
      </div>
      <div v-else class="trading-signal-card__reason-empty">
        <span class="trading-signal-card__reason-empty-text">발생 사유 생성중</span>
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
import TradingSignalHistory from "~/components/signals/TradingSignalHistory.vue";
import "~/assets/css/pages/signals/TradingSignalCard/TradingSignalCard.css";

export default {
  name: "TradingSignalCard",
  components: {
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
