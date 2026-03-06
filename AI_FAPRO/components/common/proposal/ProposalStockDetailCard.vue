<template>
  <div class="strategic-card">
    <div class="strategic-card__header">
      <div class="strategic-card__title-row">
        <div class="strategic-card__stock-info">
          <span class="strategic-card__ticker">{{ stock.ticker }}</span>
          <h3 class="strategic-card__name">{{ stock.name }}</h3>
        </div>
        <div class="strategic-card__price-info">
          <span>{{ stock.price }}원</span>
          <span
            :class="
              stock.change.startsWith('+')
                ? 'strategic-card__change--up'
                : 'strategic-card__change--down'
            "
          >
            {{ stock.change }}
          </span>
        </div>
      </div>
    </div>

    <div class="strategic-card__content">
      <!-- Bullish (상승 이유) -->
      <div
        v-if="stock.bullishPoints && stock.bullishPoints.length"
        class="point-box point-box--bullish"
      >
        <div
          class="point-box__header--bullish"
        >
          <trending-up-icon size="16" />
          상승 동력
        </div>
        <ul class="point-list">
          <li
            v-for="(point, idx) in stock.bullishPoints"
            :key="idx"
            class="point-item--bullish"
          >
            <span class="point-bullet--bullish"></span>
            {{ point }}
          </li>
        </ul>
      </div>

      <!-- Bearish (하락 위험) -->
      <div
        v-if="stock.bearishPoints && stock.bearishPoints.length"
        class="point-box point-box--bearish"
      >
        <div
          class="point-box__header--bearish"
        >
          <alert-triangle-icon size="16" />
          하락 위험 요소
        </div>
        <ul class="point-list">
          <li
            v-for="(point, idx) in stock.bearishPoints"
            :key="idx"
            class="point-item--bearish"
          >
            <span class="point-bullet--bearish"></span>
            {{ point }}
          </li>
        </ul>
      </div>

      <!-- Rationale (투자 근거) -->
      <div v-if="stock.rationale" class="point-box point-box--rationale">
        <div
          class="point-box__header--rationale"
        >
          <info-icon size="16" />
          투자 근거
        </div>
        <p class="point-box__text">
          {{ stock.rationale }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * ProposalStockDetailCard
 * 기능: 전략 유망주 제안을 위한 상세 종목 카드 (Design 5)
 */
import { TrendingUpIcon, AlertTriangleIcon, InfoIcon } from "vue-feather-icons";
import "~/assets/css/common/proposal/ProposalStockDetailCard/ProposalStockDetailCard.css";

export default {
  name: "ProposalStockDetailCard",
  components: {
    TrendingUpIcon,
    AlertTriangleIcon,
    InfoIcon,
  },
  props: {
    stock: {
      type: Object,
      required: true,
      default: () => ({
        name: "종목명",
        ticker: "000000",
        price: "0",
        change: "0%",
        bullishPoints: [],
        bearishPoints: [],
        rationale: "",
      }),
    },
  },
};
</script>
