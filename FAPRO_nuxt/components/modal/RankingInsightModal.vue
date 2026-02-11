<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="c-modal-overlay" @click.self="$emit('close')">
      <div class="c-ranking-modal">
        <header class="c-ranking-modal__header">
          <div class="c-ranking-modal__title-group">
            <TrendingUp :size="20" class="text-white" />
            <div>
              <h3 class="c-ranking-modal__title">투자 인사이트</h3>
              <p class="c-ranking-modal__subtitle">{{ stockName }} ({{ stockCode }})</p>
            </div>
          </div>
          <button class="c-ranking-modal__close" @click="$emit('close')">
            <X :size="20" />
          </button>
        </header>

        <div class="c-ranking-modal__body">
          <div class="space-y-6">
            <!-- 요약 섹션 -->
            <section>
              <h4 class="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <span class="w-1 h-4 bg-orange-500 rounded-full"></span>
                투자 핵심 요약
              </h4>
              <div class="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-100 dark:border-orange-800/50">
                <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  최근 외국인 매수세가 유입되며 주가 하방 경직성을 확보하고 있습니다. 특히 반도체 업황 회복에 따른 실적 개선 기대감이 높아지고 있으며, 주요 고객사의 신규 주문 확대가 예상됩니다. 기술적으로는 주요 이평선을 상향 돌파하며 정배열 초기 국면에 진입했습니다.
                </p>
              </div>
            </section>

            <!-- 키워드 섹션 -->
            <section>
              <h4 class="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <span class="w-1 h-4 bg-blue-500 rounded-full"></span>
                주요 투자 키워드
              </h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in ['실적개선', '외국인순매수', '지배구조개선', '배당확대', '업황회복']" :key="tag" 
                      class="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium">
                  #{{ tag }}
                </span>
              </div>
            </section>

            <!-- 상세 링크/다운로드 섹션 -->
            <section class="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-700/50">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700">
                    <FileText :size="20" class="text-blue-500" />
                  </div>
                  <div>
                    <h5 class="text-sm font-bold text-gray-900 dark:text-gray-100">투자 인사이트 심층 분석 파일</h5>
                    <p class="text-[10px] text-gray-400">PDF Document • 2.4 MB</p>
                  </div>
                </div>
                <a 
                  :href="pdfUrl" 
                  download
                  class="flex items-center gap-1.5 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-blue-500/20"
                >
                  <Download :size="14" />
                  PDF 다운로드
                </a>
              </div>
            </section>
          </div>
        </div>

        <footer class="c-ranking-modal__footer">
          <button class="c-btn c-btn--ghost c-btn--sm" @click="$emit('close')">닫기</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { X, TrendingUp, Download, FileText } from 'lucide-vue'

export default {
  name: 'RankingInsightModal',
  components: { X, TrendingUp, Download, FileText },
  props: {
    isOpen: Boolean,
    stockName: String,
    stockCode: String
  },
  computed: {
    pdfUrl() {
      // Direct link to static asset
      // Nuxt static directory files are available at root
      return `/fapro_new/file/${encodeURIComponent(this.stockName)}_투자인사이트_2026-02-10.pdf`;
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/modal/ranking-insight-modal.css';
</style>
