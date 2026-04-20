<template>
  <div class="strategic-card">
    <!-- Header Section -->
    <div class="strategic-card__header">
      <div class="strategic-card__info-group">
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
      <button 
        class="strategic-card__btn-toggle" 
        :class="{ 'strategic-card__btn-toggle--collapsed': !isOpen }"
        @click="isOpen = !isOpen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 16L12 9L19 16" stroke="#5368FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <!-- Analysis Sections with Animation Wrapper -->
    <div class="strategic-card__analysis-wrapper" :class="{ 'strategic-card__analysis-wrapper--open': isOpen }">
      <div class="strategic-card__analysis">
        <!-- Upside Drivers -->
        <div class="strategic-card__section strategic-card__section--upside">
          <div class="strategic-card__section-header">
            <div class="strategic-card__icon-wrapper strategic-card__icon-wrapper--upside">
              <trending-up-icon size="14" />
            </div>
            <p class="strategic-card__section-title">
              상승이유 <span class="strategic-card__section-subtitle">(Upside Drivers)</span>
            </p>
          </div>
          <ul class="strategic-card__list">
            <li v-for="(item, idx) in stock.upside" :key="idx" class="strategic-card__item">
              {{ item }}
            </li>
          </ul>
        </div>
  
        <!-- Downside Risks -->
        <div class="strategic-card__section strategic-card__section--downside">
          <div class="strategic-card__section-header">
            <div class="strategic-card__icon-wrapper strategic-card__icon-wrapper--downside">
              <info-icon size="14" />
            </div>
            <p class="strategic-card__section-title">
              하락 위험 요소 <span class="strategic-card__section-subtitle">(Downside Risks)</span>
            </p>
          </div>
          <ul class="strategic-card__list">
            <li v-for="(item, idx) in stock.downside" :key="idx" class="strategic-card__item">
              {{ item }}
            </li>
          </ul>
        </div>
  
        <!-- Rationale -->
        <div class="strategic-card__section strategic-card__section--rationale">
          <div class="strategic-card__section-header">
            <div class="strategic-card__icon-wrapper strategic-card__icon-wrapper--rationale">
              <check-icon size="14" />
            </div>
            <p class="strategic-card__section-title">
              투자근거 <span class="strategic-card__section-subtitle">(Rationale)</span>
            </p>
          </div>
          <ul class="strategic-card__list">
            <li v-for="(item, idx) in stock.rationale" :key="idx" class="strategic-card__item">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 중장기 유망주 카드 컴포넌트 (Figma 259:5820 정적 디자인)
 */
import {
  TrendingUpIcon,
  InfoIcon,
  CheckIcon,
} from "vue-feather-icons";
import "~/assets/css/pages/strategic-stocks/StrategicStockCard/StrategicStockCard.css";

export default {
  name: "StrategicStockCard",
  components: {
    TrendingUpIcon,
    InfoIcon,
    CheckIcon,
  },
  props: {
    // 종목 데이터
    stock: { type: Object, required: true },
  },
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>
