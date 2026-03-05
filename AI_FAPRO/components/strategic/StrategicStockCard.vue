<template>
  <div class="strategic-card">
    <!-- Collapsed Row -->
    <div class="strategic-card__header" @click="$emit('toggle')">
      <div class="strategic-card__row">
        <!-- Stock Info Area -->
        <div class="strategic-card__col-info">
          <span class="strategic-card__code">{{ stock.code }}</span>
          <h3 class="strategic-card__name">{{ stock.name }}</h3>
        </div>

        <!-- Price Area -->
        <div class="strategic-card__col-price">
          <span class="strategic-card__price-value">{{
            stock.currentPrice
          }}</span>
        </div>

        <!-- Change Area -->
        <div class="strategic-card__col-change">
          <span
            :class="[
              'strategic-card__change-value',
              stock.isPositive
                ? 'strategic-card__change-value--up'
                : 'strategic-card__change-value--down',
            ]"
          >
            {{ stock.changePercent }}
          </span>
        </div>

        <!-- Trait Area -->
        <div class="strategic-card__col-trait">
          <trending-up-icon
            v-if="stock.isPositive"
            class="strategic-card__trait-icon"
          />
          <trending-down-icon v-else class="strategic-card__trait-icon" />
          <span class="strategic-card__trait-text">{{
            stock.characteristic
          }}</span>
        </div>

        <!-- Actions Area -->
        <div class="strategic-card__col-actions">
          <button
            class="strategic-card__btn-propose"
            @click.stop="$emit('propose', stock)"
          >
            <navigation-icon class="strategic-card__btn-icon" />
            제안하기
          </button>
          <div class="strategic-card__arrow-box">
            <chevron-down-icon
              :class="[
                'strategic-card__arrow-icon',
                { 'strategic-card__arrow-icon--expanded': isExpanded },
              ]"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Expanded Content -->
    <div v-if="isExpanded" class="strategic-card__expanded">
      <div class="strategic-card__expanded-inner">
        <!-- Upside Driver -->
        <div
          class="strategic-card__detail-section strategic-card__detail-section--upside"
        >
          <div class="strategic-card__section-header text-emerald-600">
            <trending-up-icon class="strategic-card__section-icon" />
            <h3 class="strategic-card__section-title">
              상승 이유 (Upside Drivers)
            </h3>
          </div>
          <ul class="strategic-card__point-list text-emerald-700">
            <li
              v-for="(insight, idx) in stock.upside"
              :key="idx"
              class="strategic-card__point-item"
            >
              <span class="strategic-card__point-bullet bg-emerald-500"></span>
              {{ insight }}
            </li>
          </ul>
        </div>

        <!-- Risk -->
        <div
          class="strategic-card__detail-section strategic-card__detail-section--risk"
        >
          <div class="strategic-card__section-header text-red-500">
            <alert-triangle-icon class="strategic-card__section-icon" />
            <h3 class="strategic-card__section-title">
              하락 위험 요소 (Downside Risks)
            </h3>
          </div>
          <ul class="strategic-card__point-list text-red-600">
            <li
              v-for="(risk, idx) in stock.downside"
              :key="idx"
              class="strategic-card__point-item"
            >
              <span class="strategic-card__point-bullet bg-red-500"></span>
              {{ risk }}
            </li>
          </ul>
        </div>

        <!-- Evidence (Rationale) -->
        <div
          class="strategic-card__detail-section strategic-card__detail-section--evidence"
        >
          <div class="strategic-card__section-header text-blue-600">
            <info-icon class="strategic-card__section-icon" />
            <h3 class="strategic-card__section-title">투자 근거 (Rationale)</h3>
          </div>
          <ul class="strategic-card__point-list text-blue-700">
            <li
              v-for="(evidence, idx) in stock.rationale"
              :key="idx"
              class="strategic-card__point-item"
            >
              <span class="strategic-card__point-bullet bg-blue-500"></span>
              {{ evidence }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 중장기 유망주 카드 컴포넌트
 */
import {
  TrendingUpIcon,
  TrendingDownIcon,
  ChevronDownIcon,
  AlertTriangleIcon,
  InfoIcon,
  NavigationIcon,
} from "vue-feather-icons";
import "~/assets/css/pages/strategic-stocks/StrategicStockCard/StrategicStockCard.css";

export default {
  name: "StrategicStockCard",
  components: {
    TrendingUpIcon,
    TrendingDownIcon,
    ChevronDownIcon,
    AlertTriangleIcon,
    InfoIcon,
    NavigationIcon,
  },
  props: {
    stock: {
      type: Object,
      required: true,
    },
    isExpanded: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
