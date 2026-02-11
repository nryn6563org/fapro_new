<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="c-modal-overlay" @click.self="$emit('close')">
      <div class="c-report-modal">
        <header class="c-report-modal__header">
          <div class="c-report-modal__title-group">
            <Users :size="20" class="text-primary" />
            <h3 class="c-report-modal__title">보유 고객 목록</h3>
            <span class="c-report-modal__subtitle">{{ stockName }} ({{ stockCode }})</span>
          </div>
          <button class="c-report-modal__close" @click="$emit('close')">
            <X :size="20" />
          </button>
        </header>
        
        <div class="c-report-modal__content">
          <div v-if="customers.length > 0" class="c-customer-list">
            <div v-for="(customer, idx) in customers" :key="idx" class="c-customer-item">
              <div class="c-customer-item__avatar">
                <User :size="16" />
              </div>
              <div class="c-customer-item__info">
                <div class="c-customer-item__name-row">
                  <span class="c-customer-item__name">{{ customer.name || '김철수' }}</span>
                  <span class="c-customer-item__age">{{ customer.age || '40' }}세</span>
                </div>
                <div class="c-customer-item__tags">
                  <span class="c-tag c-tag--tendency">{{ customer.tendency || '공격투자형' }}</span>
                  <span class="c-tag c-tag--asset">{{ customer.assetClass || 'VIP' }}</span>
                </div>
              </div>
              <div class="c-customer-item__holding">
                <span class="c-customer-item__holding-label">보유수량</span>
                <span class="c-customer-item__holding-value">{{ customer.holding || '120' }}주</span>
              </div>
            </div>
          </div>
          <div v-else class="py-10 text-center text-gray-400 text-sm">
            보유 고객 데이터가 없습니다.
          </div>
        </div>
        
        <footer class="c-report-modal__footer">
          <button class="c-btn c-btn--primary c-btn--full" @click="$emit('close')">확인</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { X, Users, User } from 'lucide-vue'

export default {
  name: 'RelatedCustomersModal',
  components: { X, Users, User },
  props: {
    isOpen: Boolean,
    stockName: String,
    stockCode: String,
    customers: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
/* Reuse or adapt styles from IssueDetailModal/report.css */
.c-modal-overlay {
  @apply fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm;
}

.c-report-modal {
  @apply bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl flex flex-col max-h-[80vh];
}

.c-report-modal__header {
  @apply flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 rounded-t-2xl;
}

.c-report-modal__title-group {
  @apply flex items-center gap-2;
}

.c-report-modal__title {
  @apply text-lg font-bold text-gray-900 dark:text-gray-100;
}

.c-report-modal__subtitle {
  @apply text-sm text-gray-400 font-medium;
}

.c-report-modal__close {
  @apply text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors;
}

.c-report-modal__content {
  @apply p-0 overflow-y-auto flex-1;
}

.c-customer-list {
  @apply divide-y divide-gray-50 dark:divide-gray-800;
}

.c-customer-item {
  @apply flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer;
}

.c-customer-item__avatar {
  @apply w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400;
}

.c-customer-item__info {
  @apply flex-1 min-w-0;
}

.c-customer-item__name-row {
  @apply flex items-end gap-1 mb-1;
}

.c-customer-item__name {
  @apply text-sm font-bold text-gray-900 dark:text-gray-100;
}

.c-customer-item__age {
  @apply text-xs text-gray-400;
}

.c-customer-item__tags {
  @apply flex items-center gap-1;
}

.c-tag {
  @apply text-[9px] px-1.5 py-0.5 rounded border;
}

.c-tag--tendency { @apply bg-blue-50 text-blue-600 border-blue-100; }
.c-tag--asset { @apply bg-purple-50 text-purple-600 border-purple-100; }

.c-customer-item__holding {
  @apply text-right;
}

.c-customer-item__holding-label {
  @apply block text-[10px] text-gray-400 mb-0.5;
}

.c-customer-item__holding-value {
  @apply block text-sm font-bold text-gray-900 dark:text-gray-100;
}

.c-report-modal__footer {
  @apply p-5 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-b-2xl;
}

</style>
