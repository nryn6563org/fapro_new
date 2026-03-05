<template>
  <div class="strategic-modal__preview">
    <div class="strategic-modal__preview-header">
      <div class="strategic-modal__preview-title-row">
        <span class="strategic-modal__stock-code">{{ stock.code }}</span>
        <h3 class="strategic-modal__stock-name">{{ stock.name }}</h3>
      </div>
      <div class="strategic-modal__preview-price-row">
        <span class="strategic-modal__stat-value">{{
          stock.currentPrice
        }}</span>
        <span
          :class="[
            'strategic-modal__stat-change',
            stock.isPositive
              ? 'strategic-modal__stat-change--up'
              : 'strategic-modal__stat-change--down',
          ]"
        >
          {{ stock.changePercent }}
        </span>
      </div>
    </div>

    <!-- Extracted Box Detail From Card -->
    <div class="strategic-modal__detail-grid">
      <!-- Upside Driver -->
      <div
        class="strategic-modal__detail-section strategic-modal__detail-section--upside"
      >
        <div class="strategic-modal__section-header text-emerald-600">
          <trending-up-icon class="strategic-modal__section-icon" />
          <h4 class="strategic-modal__section-title">상승 이유</h4>
        </div>
        <ul class="strategic-modal__point-list text-emerald-700">
          <li
            v-for="(insight, idx) in stock.upside"
            :key="idx"
            class="strategic-modal__point-item"
          >
            <span class="strategic-modal__point-bullet bg-emerald-500"></span>
            {{ insight }}
          </li>
        </ul>
      </div>

      <!-- Risk -->
      <div
        class="strategic-modal__detail-section strategic-modal__detail-section--risk"
      >
        <div class="strategic-modal__section-header text-red-500">
          <alert-triangle-icon class="strategic-modal__section-icon" />
          <h4 class="strategic-modal__section-title">하락 위험 요소</h4>
        </div>
        <ul class="strategic-modal__point-list text-red-600">
          <li
            v-for="(risk, idx) in stock.downside"
            :key="idx"
            class="strategic-modal__point-item"
          >
            <span class="strategic-modal__point-bullet bg-red-500"></span>
            {{ risk }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 중장기 유망주 종목 상세 프리뷰
 */
import { TrendingUpIcon, AlertTriangleIcon } from "vue-feather-icons";
import "~/assets/css/pages/strategic-stocks/StrategicStockPreview/StrategicStockPreview.css";

export default {
  name: "StrategicStockPreview",
  components: {
    TrendingUpIcon,
    AlertTriangleIcon,
  },
  props: {
    stock: {
      type: Object,
      required: true,
    },
  },
};
</script>
