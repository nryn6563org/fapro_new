<template>
  <aside class="c-right-panel border-l border-gray-100 bg-white">
    <div class="c-right-panel__inner p-4 space-y-6">
      <!-- Schedule Section -->
      <section class="c-right-panel__section">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xs font-bold text-gray-800">상담 일정</h2>
          <button class="text-gray-400 hover:text-gray-600">
            <Plus :size="16" />
          </button>
        </div>
        <div class="c-calendar-widget bg-gray-50 rounded-xl p-3">
          <div class="flex items-center justify-between mb-3">
            <button class="p-1"><ChevronLeft :size="14" /></button>
            <span class="text-[10px] font-bold text-gray-700">2026.02</span>
            <button class="p-1"><ChevronRight :size="14" /></button>
          </div>
          <div class="grid grid-cols-7 gap-1 text-center">
            <div v-for="i in 28" :key="i" class="text-[9px] p-1 rounded-full cursor-pointer hover:bg-white transition-all" :class="{
              'bg-blue-500 text-white font-bold': i === 9,
              'font-bold text-gray-800': [10, 15, 20].includes(i),
              'text-gray-400': ![9, 10, 15, 20].includes(i)
            }">
              {{ i }}
            </div>
          </div>
        </div>
      </section>

      <!-- Real-time Feed Section -->
      <section class="c-right-panel__section">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-xs font-bold text-gray-800">실시간 피드</h2>
          <button class="text-gray-400 hover:text-gray-600">
            <RefreshCw :size="14" />
          </button>
        </div>
        
        <div class="space-y-4 no-scrollbar max-h-[600px] overflow-y-auto">
          <div v-for="event in timelineEvents" :key="event.id" class="c-feed-item relative pl-4 border-l border-gray-100">
            <div class="absolute w-2 h-2 rounded-full -left-[4.5px] top-1" :class="event.dotColor"></div>
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center gap-1.5">
                <span class="px-1.5 py-0.5 rounded text-[8px] font-bold text-white" :class="event.badgeColor">{{ event.typeLabel }}</span>
                <span class="text-[10px] font-bold text-gray-900">{{ event.stockName }}</span>
                <span class="text-[9px] text-gray-400">({{ event.stockCode }})</span>
              </div>
              <span class="text-[9px] text-gray-400">{{ event.holders }}명 보유</span>
            </div>
            <h4 class="text-[11px] font-bold text-gray-800 mb-1 leading-tight">{{ event.title }}</h4>
            <div class="text-[9px] text-gray-400">{{ event.time }}</div>
          </div>
        </div>
      </section>
    </div>
  </aside>
</template>

<script>
import { Plus, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-vue'

export default {
  name: 'RightPanelComponent',
  components: {
    Plus,
    ChevronLeft,
    ChevronRight,
    RefreshCw
  },
  data() {
    return {
      timelineEvents: [
        { id: 1, type: 'issue', typeLabel: '이슈', badgeColor: 'bg-red-500', dotColor: 'bg-red-500', stockName: 'SK하이닉스', stockCode: '000660', title: '반도체 업황 호전 기대', time: '12분 전', holders: 52 },
        { id: 2, type: 'issue', typeLabel: '이슈', badgeColor: 'bg-red-500', dotColor: 'bg-red-500', stockName: '현대차', stockCode: '005380', title: '급등 이슈 발생', time: '23분 전', holders: 63 },
        { id: 3, type: 'disclosure', typeLabel: '공시', badgeColor: 'bg-indigo-500', dotColor: 'bg-indigo-500', stockName: 'NAVER', stockCode: '035420', title: '자사주 매입 공시', time: '35분 전', holders: 41 },
        { id: 4, type: 'report', typeLabel: '리포트', badgeColor: 'bg-blue-500', dotColor: 'bg-blue-500', stockName: '카카오', stockCode: '035720', title: '투자의견 상향', time: '47분 전', holders: 38 },
        { id: 5, type: 'social', typeLabel: '소셜', badgeColor: 'bg-pink-500', dotColor: 'bg-pink-500', stockName: 'LG에너지솔루션', stockCode: '373220', title: '소셜 언급량 급증', time: '1시간 전', holders: 45 },
        { id: 6, type: 'supply', typeLabel: '수급', badgeColor: 'bg-orange-500', dotColor: 'bg-orange-500', stockName: '삼성바이오로직스', stockCode: '207940', title: '외국인 순매수 지속', time: '1시간 15분 전', holders: 29 }
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/area/right-panel.css';
</style>
