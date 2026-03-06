<template>
  <div class="strategic-card">
    <!-- Collapsed Row -->
    <div class="strategic-card__header" @click="$emit('toggle')">
      <div class="strategic-card__row">
        <!-- Stock Info Area -->
        <div class="strategic-card__col-info">
          <h3 class="strategic-card__name">{{ stock.name }}</h3>
          <span class="strategic-card__code">{{ stock.code }}</span>
        </div>

        <!-- Price Area -->
        <div class="strategic-card__col-price">
          <span class="strategic-card__price-value">{{ stock.currentPrice }}</span>
        </div>

        <!-- Change Area -->
        <div class="strategic-card__col-change">
          <span
            :class="[
              'strategic-card__change-value',
              stock.isPositive ? 'strategic-card__change-value--up' : 'strategic-card__change-value--down',
            ]"
          >
            {{ stock.changePercent }}
          </span>
        </div>

        <!-- Trait Area -->
        <div class="strategic-card__col-trait">
          <trending-up-icon v-if="stock.isPositive" class="strategic-card__trait-icon" />
          <trending-down-icon v-else class="strategic-card__trait-icon" />
          <span class="strategic-card__trait-text">{{ stock.characteristic }}</span>
        </div>

        <!-- Actions Area -->
        <div class="strategic-card__col-actions">
          <button class="strategic-card__btn-propose" @click.stop="$emit('propose', stock)">
            <navigation-icon class="strategic-card__btn-icon" />
            제안하기
          </button>
        </div>
      </div>
    </div>

    <!-- Expanded Content -->
    <StrategicStockCardExpanded v-if="isExpanded" :stock="stock" />
  </div>
</template>

<script>
/**
 * 기능: AI 중장기 유망주 카드 컴포넌트 (Modularized)
 */
import {
  TrendingUpIcon,
  TrendingDownIcon,
  NavigationIcon,
} from "vue-feather-icons";
import StrategicStockCardExpanded from "./StrategicStockCard/StrategicStockCardExpanded.vue";
import "~/assets/css/pages/strategic-stocks/StrategicStockCard/StrategicStockCard.css";

export default {
  name: "StrategicStockCard",
  components: {
    TrendingUpIcon,
    TrendingDownIcon,
    NavigationIcon,
    StrategicStockCardExpanded,
  },
  props: {
    // 종목 데이터
    stock: { type: Object, required: true },
    // 확장 상태 여부
    isExpanded: { type: Boolean, default: false },
  },
};
</script>

