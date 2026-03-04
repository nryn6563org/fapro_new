<template>
  <div class="customer-analysis">
    <div class="customer-analysis__card">
      <div class="customer-analysis__header">
        <div class="customer-analysis__icon-wrapper">
          <zap-icon class="w-5 h-5 text-teal-600 dark:text-teal-400" />
        </div>
        <div>
          <h3 class="customer-analysis__title">✨ AI 고객 분석</h3>
          <p class="customer-analysis__subtitle">포트폴리오 및 투자 성향 분석</p>
        </div>
      </div>
      
      <div class="customer-analysis__content">
        <ul class="customer-analysis__list">
          <!-- Investment Tendency -->
          <li class="customer-analysis__item">
            <span class="customer-analysis__bullet"></span>
            <p class="customer-analysis__text">
              <span class="customer-analysis__label">투자 성향:</span>
              {{ analysisData.investmentTendency || '데이터 수집 중입니다.' }}
            </p>
          </li>
          <!-- Return Analysis -->
          <li class="customer-analysis__item">
            <span class="customer-analysis__bullet"></span>
            <p class="customer-analysis__text">
              <span class="customer-analysis__label">수익률 분석:</span>
              {{ analysisData.returnAnalysis || '데이터 수집 중입니다.' }}
            </p>
          </li>
          <!-- Risk Diagnosis -->
          <li class="customer-analysis__item">
            <span class="customer-analysis__bullet"></span>
            <p class="customer-analysis__text">
              <span class="customer-analysis__label">리스크 진단:</span>
              {{ analysisData.riskDiagnosis || '데이터 수집 중입니다.' }}
            </p>
          </li>
          <!-- Recommended Action -->
          <li class="customer-analysis__item customer-analysis__item--action mt-4">
            <span class="customer-analysis__bullet customer-analysis__bullet--amber"></span>
            <p class="customer-analysis__text text-slate-800 dark:text-slate-200">
              <span class="customer-analysis__label customer-analysis__label--amber">추천 액션:</span>
              {{ analysisData.recommendedAction || '데이터 수집 중입니다.' }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 상세 정보 내 AI 분석 결과 리포트 블록 (Design #26)
 */
import { ZapIcon } from 'vue-feather-icons'
import '~/assets/css/pages/customers/CustomerDetailModal/CustomerDetailAnalysis.css'

export default {
  name: 'CustomerDetailAnalysis',
  components: {
    ZapIcon
  },
  props: {
    analysisData: { 
      type: Object, 
      default: () => ({})
    }
  }
}
</script>
