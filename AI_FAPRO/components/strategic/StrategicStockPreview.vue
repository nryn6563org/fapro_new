<template>
  <div class="strategic-modal__preview-container">
    <h3 class="strategic-modal__preview-main-title">제안 종목</h3>
    <div class="strategic-modal__preview-card">
      <!-- Header Row (Simplified) -->
      <div class="strategic-modal__card-header">
        <div class="strategic-modal__header-left">
          <h4 class="strategic-modal__header-name">{{ stock.name }}</h4>
          <span class="strategic-modal__header-code">({{ stock.code }})</span>
        </div>
        <div class="strategic-modal__header-item-divider"></div>
        <div class="strategic-modal__header-mid">
          <span class="strategic-modal__header-price">{{ stock.currentPrice }}원</span>
          <span :class="['strategic-modal__header-change', stock.isPositive ? 'text-red-500' : 'text-primary']">
            ({{ stock.changePercent }})
          </span>
        </div>
        <div class="strategic-modal__header-item-divider"></div>
        <div class="strategic-modal__header-info flex-1">
          <span class="strategic-modal__header-char">{{ stock.characteristic }}</span>
        </div>
        <div class="strategic-modal__header-right">
          <chevron-up-icon size="20" class="text-slate-400" />
        </div>
      </div>

      <!-- Content Sections -->
      <div class="strategic-modal__card-content">
        <!-- Upside Driver -->
        <div class="strategic-modal__content-section strategic-modal__content-section--upside">
          <div class="strategic-modal__section-label-row">
            <trending-up-icon size="16" class="text-emerald-500 mr-2" />
            <span class="strategic-modal__section-label">상승 동력</span>
          </div>
          <ul class="strategic-modal__content-list">
            <li v-for="(insight, idx) in stock.upside" :key="idx" class="strategic-modal__content-item">
              <span class="strategic-modal__content-bullet bg-emerald-500"></span>
              {{ insight }}
            </li>
          </ul>
        </div>

        <!-- Risk -->
        <div class="strategic-modal__content-section strategic-modal__content-section--risk">
          <div class="strategic-modal__section-label-row">
            <alert-triangle-icon size="16" class="text-red-500 mr-2" />
            <span class="strategic-modal__section-label">하락 위험</span>
          </div>
          <ul class="strategic-modal__content-list">
            <li v-for="(risk, idx) in stock.downside" :key="idx" class="strategic-modal__content-item">
              <span class="strategic-modal__content-bullet bg-red-500"></span>
              {{ risk }}
            </li>
          </ul>
        </div>

        <!-- Rationale -->
        <div class="strategic-modal__content-section strategic-modal__content-section--rationale">
          <div class="strategic-modal__section-label-row">
            <info-icon size="16" class="text-slate-500 mr-2" />
            <span class="strategic-modal__section-label">투자 근거</span>
          </div>
          <ul class="strategic-modal__content-list">
            <li v-for="(item, idx) in stock.rationale" :key="idx" class="strategic-modal__content-item">
              <span class="strategic-modal__content-bullet bg-slate-400"></span>
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
 * 기능: AI 중장기 유망주 종목 상세 프리뷰
 */
import {
  TrendingUpIcon,
  AlertTriangleIcon,
  InfoIcon,
  ChevronUpIcon,
} from "vue-feather-icons";
import "~/assets/css/pages/strategic-stocks/StrategicStockPreview/StrategicStockPreview.css";

export default {
  name: "StrategicStockPreview",
  components: {
    TrendingUpIcon,
    AlertTriangleIcon,
    InfoIcon,
    ChevronUpIcon,
  },
  props: {
    stock: {
      type: Object,
      required: true,
    },
  },
};
</script>
