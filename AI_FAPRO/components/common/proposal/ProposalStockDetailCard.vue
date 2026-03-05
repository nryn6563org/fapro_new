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
          class="flex items-center gap-1.5 text-emerald-600 font-bold text-sm mb-2"
        >
          <trending-up-icon size="16" />
          상승 동력
        </div>
        <ul class="point-list">
          <li
            v-for="(point, idx) in stock.bullishPoints"
            :key="idx"
            class="point-item text-emerald-700"
          >
            <span class="point-bullet bg-emerald-500"></span>
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
          class="flex items-center gap-1.5 text-rose-500 font-bold text-sm mb-2"
        >
          <alert-triangle-icon size="16" />
          하락 위험 요소
        </div>
        <ul class="point-list">
          <li
            v-for="(point, idx) in stock.bearishPoints"
            :key="idx"
            class="point-item text-rose-600"
          >
            <span class="point-bullet bg-rose-500"></span>
            {{ point }}
          </li>
        </ul>
      </div>

      <!-- Rationale (투자 근거) -->
      <div v-if="stock.rationale" class="point-box point-box--rationale">
        <div
          class="flex items-center gap-1.5 text-slate-700 font-bold text-sm mb-2"
        >
          <info-icon size="16" />
          투자 근거
        </div>
        <p class="text-[13px] text-slate-600 leading-relaxed">
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
