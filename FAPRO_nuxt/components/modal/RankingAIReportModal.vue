<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="c-modal-overlay" @click.self="$emit('close')">
      <div class="c-ranking-modal c-ranking-modal--lg">
        <header class="c-ranking-modal__header">
          <div class="c-ranking-modal__title-group">
            <FileText :size="20" class="text-white" />
            <div>
              <h3 class="c-ranking-modal__title">AI 상세 리포트</h3>
              <p class="c-ranking-modal__subtitle">{{ stockName }} ({{ stockCode }})</p>
            </div>
          </div>
          <button class="c-ranking-modal__close" @click="$emit('close')">
            <X :size="20" />
          </button>
        </header>

        <div class="c-ranking-modal__body">
          <div class="space-y-8">
            <!-- Opinion Summary -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-red-50 dark:bg-red-900/10 p-5 rounded-2xl border border-red-100 dark:border-red-900/20 text-center">
                <span class="block text-xs text-red-400 mb-1 font-bold">투자의견</span>
                <span class="block text-2xl font-black text-red-500">매수 (BUY)</span>
              </div>
              <div class="bg-gray-50 dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 text-center">
                <span class="block text-xs text-gray-400 mb-1 font-bold">목표주가</span>
                <span class="block text-2xl font-black text-gray-900 dark:text-white">92,000원</span>
              </div>
              <div class="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/20 text-center">
                <span class="block text-xs text-blue-400 mb-1 font-bold">AI 신뢰도</span>
                <span class="block text-2xl font-black text-blue-500">94%</span>
              </div>
            </div>

            <!-- Analysis Points -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <h4 class="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  긍정적 요인
                </h4>
                <ul class="space-y-3">
                  <li v-for="(item, idx) in positiveFactors" :key="idx" class="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle :size="16" class="text-green-500 flex-shrink-0 mt-0.5" />
                    {{ item }}
                  </li>
                </ul>
              </div>
              <div class="space-y-4">
                <h4 class="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span class="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  주의 요인
                </h4>
                <ul class="space-y-3">
                  <li v-for="(item, idx) in riskFactors" :key="idx" class="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <AlertTriangle :size="16" class="text-amber-500 flex-shrink-0 mt-0.5" />
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Executive Summary -->
            <section>
              <h4 class="text-base font-bold text-gray-900 dark:text-gray-100 mb-4">AI 종합 분석 결과</h4>
              <div class="prose dark:prose-invert max-w-none text-sm leading-relaxed text-gray-600 dark:text-gray-400 space-y-4">
                <p>
                  동사는 고대역폭 메모리(HBM) 시장에서의 선도적인 기술력을 바탕으로 AI 서버 수요 확산의 최대 수혜를 입을 것으로 전망됩니다. 최근 발표된 분기 실적에서도 메모리 부문의 턴어라운드가 확인되었으며, 고부가가치 제품 비중 확대로 이익률 개선세가 뚜렷합니다.
                </p>
                <p>
                  파운드리 부문에서도 미세 공정 경쟁력 강화와 신규 고객사 확보를 통해 중장기적인 성장 동력을 확보하고 있습니다. 다만, 글로벌 거시 경제의 불확실성과 반도체 장비 반입 지연 가능성 등은 리스크 요인으로 상존합니다.
                </p>
              </div>
            </section>
          </div>
        </div>

        <footer class="c-ranking-modal__footer">
          <button class="c-btn c-btn--ghost c-btn--sm" @click="$emit('close')">닫기</button>
          <button class="c-btn c-btn--primary c-btn--sm px-8">리포트 공유</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { X, FileText, CheckCircle, AlertTriangle } from 'lucide-vue'

export default {
  name: 'RankingAIReportModal',
  components: { X, FileText, CheckCircle, AlertTriangle },
  props: {
    isOpen: Boolean,
    stockName: String,
    stockCode: String
  },
  data() {
    return {
      positiveFactors: [
        'HBM3E 수율 안정화 및 글로벌 빅테크 공급 확대',
        '생성형 AI 시장 성장에 따른 선단 공정 수요 폭증',
        '메모리 판가 상승에 따른 영업이익 레버리지 효과'
      ],
      riskFactors: [
        '미중 무역 갈등에 따른 반도체 수출 규제 영향',
        '차세대 공정 전환 속도 지연에 따른 경쟁력 약화 우려',
        '글로벌 금리 인하 지연 시 IT 하드웨어 소비 둔화'
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/modal/ranking-ai-report-modal.css';
</style>
