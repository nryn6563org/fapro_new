<template>
  <modal-vanilla v-if="isOpen" :is-open="isOpen" modal-id="strategic-analysis-modal"
    custom-dialog-class="strategic-analysis-modal__dialog" @close="closeModal">
    <!-- Header Component -->
    <template #header>
      <div class="strategic-analysis-modal__header">
        <div class="strategic-analysis-modal__header-info">
          <h2 class="strategic-analysis-modal__title">{{ stock?.name }}</h2>
          <span class="strategic-analysis-modal__code">{{ stock?.code }}</span>
        </div>
        <button type="button" class="strategic-analysis-modal__close-btn" @click="closeModal">
          <x-icon size="20" />
        </button>
      </div>
    </template>

    <!-- Body Component -->
    <div class="strategic-analysis-modal__body">
      <template v-if="stock">
        <!-- Upside Drivers -->
        <div class="strategic-analysis-modal__section strategic-analysis-modal__section--upside">
          <div class="strategic-analysis-modal__section-header">
            <div class="strategic-analysis-modal__icon-wrapper strategic-analysis-modal__icon-wrapper--upside">
              <trending-up-icon size="14" />
            </div>
            <p class="strategic-analysis-modal__section-title">
              상승이유 <span class="strategic-analysis-modal__section-subtitle">(Upside Drivers)</span>
            </p>
          </div>
          <ul class="strategic-analysis-modal__list">
            <li v-for="(item, idx) in stock.upside" :key="idx" class="strategic-analysis-modal__item">
              {{ item }}
            </li>
          </ul>
        </div>
  
        <!-- Downside Risks -->
        <div class="strategic-analysis-modal__section strategic-analysis-modal__section--downside">
          <div class="strategic-analysis-modal__section-header">
            <div class="strategic-analysis-modal__icon-wrapper strategic-analysis-modal__icon-wrapper--downside">
              <info-icon size="14" />
            </div>
            <p class="strategic-analysis-modal__section-title">
              하락 위험 요소 <span class="strategic-analysis-modal__section-subtitle">(Downside Risks)</span>
            </p>
          </div>
          <ul class="strategic-analysis-modal__list">
            <li v-for="(item, idx) in stock.downside" :key="idx" class="strategic-analysis-modal__item">
              {{ item }}
            </li>
          </ul>
        </div>
  
        <!-- Rationale -->
        <div class="strategic-analysis-modal__section strategic-analysis-modal__section--rationale">
          <div class="strategic-analysis-modal__section-header">
            <div class="strategic-analysis-modal__icon-wrapper strategic-analysis-modal__icon-wrapper--rationale">
              <check-icon size="14" />
            </div>
            <p class="strategic-analysis-modal__section-title">
              투자근거 <span class="strategic-analysis-modal__section-subtitle">(Rationale)</span>
            </p>
          </div>
          <ul class="strategic-analysis-modal__list">
            <li v-for="(item, idx) in stock.rationale" :key="idx" class="strategic-analysis-modal__item">
              {{ item }}
            </li>
          </ul>
        </div>
      </template>
    </div>
  </modal-vanilla>
</template>

<script>
/**
 * 기능: AI 중장기 유망주 상세 분석 모달 컴포넌트
 */
import { XIcon, TrendingUpIcon, InfoIcon, CheckIcon } from "vue-feather-icons";
import ModalVanilla from "~/components/modal/ModalVanilla.vue";
import "~/assets/css/pages/strategic-stocks/StrategicAnalysisModal/StrategicAnalysisModal.css";

export default {
  name: "StrategicAnalysisModal",
  components: {
    ModalVanilla,
    XIcon,
    TrendingUpIcon,
    InfoIcon,
    CheckIcon,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    stock: {
      type: Object,
      default: null
    }
  },
  methods: {
    closeModal() {
      this.$emit("close");
    }
  }
};
</script>
