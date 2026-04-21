<template>
  <div class="strategic-card">
    <!-- Header Section -->
    <div class="strategic-card__header">
      <div class="strategic-card__info-group" @click="$emit('open-analysis', stock)">
        <div class="strategic-card__name-box">
          <h3 class="strategic-card__name">{{ stock.name }}</h3>
          <span class="strategic-card__code">{{ stock.code }}</span>
        </div>
        <div class="strategic-card__price-trait-box">
          <div class="strategic-card__price-box">
            <span class="strategic-card__price">{{ stock.currentPrice }}</span>
            <span :class="['strategic-card__change', stock.isPositive ? 'strategic-card__change--up' : 'strategic-card__change--down']">
              {{ stock.changePercent }}
            </span>
          </div>
          <p class="strategic-card__trait">{{ stock.characteristic }}</p>
        </div>
      </div>
      <button class="strategic-card__btn-propose" @click.stop="$emit('propose', stock)">
        제안하기
      </button>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 중장기 유망주 카드 컴포넌트 (Figma 259:5820 정적 디자인)
 */
import "~/assets/css/pages/strategic-stocks/StrategicStockCard/StrategicStockCard.css";

export default {
  name: "StrategicStockCard",
  props: {
    // 종목 데이터
    stock: { type: Object, required: true },
  },
};
</script>
