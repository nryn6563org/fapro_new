<template>
  <div :class="['signals-page__column', `signals-page__column--${type}`]">
    <div :class="['signals-page__column-header', `signals-page__column-header--${type}`]">
      <div class="signals-page__column-title-box">
        <div :class="['signals-page__column-icon-bg', `signals-page__column-icon-bg--${type}`]">
          <component :is="iconComponent" class="signals-page__column-icon" />
        </div>
        <h2 class="signals-page__column-title">
          {{ type === "buy" ? "매수 신호 발생" : "매도 신호 발생" }}
        </h2>
      </div>
      <span :class="['signals-page__column-badge', `signals-page__column-badge--${type}`]">
        {{ signals.length }}건
      </span>
    </div>
    <div class="signals-page__column-content">
      <trading-signal-card
        v-for="signal in signals"
        :key="signal.id"
        :signal="signal"
        :type="type"
        :is-detail-open="openKeys.includes(signal.id)"
        @toggle-detail="$emit('toggle-detail', signal.id)"
        @open-report="$emit('open-report', signal)"
        @open-analysis="$emit('open-analysis', signal)"
      />
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI매매신호 페이지의 매수/매도 신호 컬럼
 * 특정 유형(Buy/Sell)의 신호 카드 목록을 렌더링합니다.
 */
import { ArrowUpIcon, ArrowDownIcon } from "vue-feather-icons";
import TradingSignalCard from "~/components/signals/TradingSignalCard.vue";

export default {
  name: "SignalsPageSignalColumn",
  components: {
    ArrowUpIcon,
    ArrowDownIcon,
    TradingSignalCard,
  },
  props: {
    // 컬럼 유형 ('buy' 또는 'sell')
    type: {
      type: String,
      required: true,
      validator: (val) => ["buy", "sell"].includes(val),
    },
    // 표시할 신호 데이터 목록
    signals: {
      type: Array,
      default: () => [],
    },
    // 현재 상세 정보가 열려있는 카드의 ID 목록
    openKeys: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    // 유형에 따른 아이콘 컴포넌트 반환
    iconComponent() {
      return this.type === "buy" ? "ArrowUpIcon" : "ArrowDownIcon";
    },
  },
};
</script>
