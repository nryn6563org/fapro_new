<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="c-modal-overlay" @click.self="$emit('close')">
      <div class="c-ranking-modal">
        <header class="c-ranking-modal__header">
          <div class="c-ranking-modal__title-group">
            <Users :size="20" class="text-white" />
            <div>
              <h3 class="c-ranking-modal__title">보유 고객 현황</h3>
              <p class="c-ranking-modal__subtitle">{{ stockName }} ({{ stockCode }})</p>
            </div>
          </div>
          <button class="c-ranking-modal__close" @click="$emit('close')">
            <X :size="20" />
          </button>
        </header>

        <div class="c-ranking-modal__body">
          <div class="space-y-4">
            <div v-for="(customer, idx) in customerList" :key="idx" class="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl hover:border-gray-200 dark:hover:border-gray-600 transition-all">
              <!-- Avatar -->
              <div class="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                <User :size="20" />
              </div>
              
              <!-- Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-baseline gap-2 mb-1">
                  <span class="text-sm font-bold text-gray-900 dark:text-gray-100">{{ customer.name }}</span>
                  <span class="text-[10px] text-gray-400">{{ customer.age }}세 • {{ customer.gender }}</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span :class="`px-1.5 py-0.5 rounded text-[9px] font-bold ${getTendencyClass(customer.tendency)}`">
                    {{ customer.tendency }}
                  </span>
                  <span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-50 dark:bg-purple-900/20 text-purple-500 border border-purple-100 dark:border-purple-800/30">
                    {{ customer.assetClass }}
                  </span>
                </div>
              </div>

              <!-- Holding -->
              <div class="text-right">
                <span class="block text-[10px] text-gray-400 mb-0.5">보유량</span>
                <span class="block text-sm font-black text-gray-900 dark:text-gray-100">{{ customer.holding }}주</span>
              </div>
            </div>
          </div>
        </div>

        <footer class="c-ranking-modal__footer">
          <div class="flex-1 text-xs text-gray-400">
            총 {{ customerList.length }}명의 고객이 이 종목을 보유하고 있습니다.
          </div>
          <button class="c-btn c-btn--ghost c-btn--sm" @click="$emit('close')">닫기</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { X, Users, User } from 'lucide-vue'

export default {
  name: 'RankingCustomerModal',
  components: { X, Users, User },
  props: {
    isOpen: Boolean,
    stockName: String,
    stockCode: String
  },
  data() {
    return {
      customerList: [
        { name: '김철수', age: 48, gender: '남', tendency: '공격투자형', assetClass: 'VIP', holding: 1540 },
        { name: '이영희', age: 35, gender: '여', tendency: '적극투자형', assetClass: 'GOLD', holding: 820 },
        { name: '박지민', age: 52, gender: '남', tendency: '안정추구형', assetClass: 'VVIP', holding: 2100 },
        { name: '최다솜', age: 29, gender: '여', tendency: '공격투자형', assetClass: 'SILVER', holding: 350 },
        { name: '정우성', age: 41, gender: '남', tendency: '위험중립형', assetClass: 'GOLD', holding: 680 }
      ]
    }
  },
  methods: {
    getTendencyClass(tendency) {
      if (tendency.includes('공격')) return 'bg-red-50 dark:bg-red-900/20 text-red-500 border border-red-100 dark:border-red-800/30';
      if (tendency.includes('적극')) return 'bg-orange-50 dark:bg-orange-900/20 text-orange-500 border border-orange-100 dark:border-orange-800/30';
      if (tendency.includes('위험')) return 'bg-blue-50 dark:bg-blue-900/20 text-blue-500 border border-blue-100 dark:border-blue-800/30';
      return 'bg-green-50 dark:bg-green-900/20 text-green-500 border border-green-100 dark:border-green-800/30';
    }
  }
}
</script>

<style scoped>
.c-modal-overlay {
  @apply fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm;
}

.c-ranking-modal {
  @apply bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden;
}

.c-ranking-modal__header {
  @apply flex items-center justify-between p-6 bg-gradient-to-r from-gray-700 to-gray-500 text-white;
}

.c-ranking-modal__title-group {
  @apply flex items-center gap-3;
}

.c-ranking-modal__title {
  @apply text-lg font-bold;
}

.c-ranking-modal__subtitle {
  @apply text-xs opacity-90;
}

.c-ranking-modal__close {
  @apply text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full;
}

.c-ranking-modal__body {
  @apply p-6 overflow-y-auto flex-1 bg-gray-50/30 dark:bg-gray-800/20;
}

.c-ranking-modal__footer {
  @apply p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between;
}

</style>
