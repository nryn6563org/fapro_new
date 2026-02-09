<template>
  <transition name="zoom">
    <div v-if="isOpen" class="c-modal-overlay" @click.self="$emit('close')">
      <div class="c-issue-modal">
        <header class="c-issue-modal__header">
          <div class="c-issue-modal__stock-info">
            <span class="c-tag" :class="issue.badgeColor">{{ issue.typeLabel }}</span>
            <h3 class="c-issue-modal__title">{{ issue.stockName }}</h3>
            <span class="c-issue-modal__code">({{ issue.stockCode }})</span>
          </div>
          <button class="c-issue-modal__close" @click="$emit('close')">
            <X :size="20" />
          </button>
        </header>
        
        <div class="c-issue-modal__content">
          <div class="c-issue-detail-card">
            <div class="c-issue-detail-card__header">
              <h4 class="c-issue-detail-card__title">{{ issue.title }}</h4>
              <span class="c-issue-detail-card__time">{{ issue.time }}</span>
            </div>
            <p class="c-issue-detail-card__desc">{{ issue.desc }}</p>
            
            <hr class="c-issue-modal__divider">
            
            <div class="c-issue-meta-grid">
              <div v-if="issue.type === 'signal'" class="c-issue-meta-item">
                <span class="c-issue-meta-item__label">신호 유형</span>
                <span class="c-issue-meta-item__value">라씨 AI 매매신호</span>
              </div>
              <div v-if="issue.type === 'signal'" class="c-issue-meta-item">
                <span class="c-issue-meta-item__label">신뢰도</span>
                <span class="c-issue-meta-item__value c-issue-meta-item__value--highlight">92%</span>
              </div>
              <div class="c-issue-meta-item">
                <span class="c-issue-meta-item__label">보유 현황</span>
                <span class="c-issue-meta-item__value">{{ issue.holders }}명 보유 중</span>
              </div>
            </div>
          </div>
        </div>
        
        <footer class="c-issue-modal__footer">
          <button class="c-issue-modal__btn" @click="$emit('close')">종목 상세 보기</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { X } from 'lucide-vue'

export default {
  name: 'IssueDetailModal',
  components: { X },
  props: {
    isOpen: Boolean,
    issue: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>
.c-modal-overlay {
  @apply fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm;
}

.c-issue-modal {
  @apply bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden;
}

.c-issue-modal__header {
  @apply flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800;
}

.c-issue-modal__stock-info {
  @apply flex items-center gap-2;
}

.c-issue-modal__title {
  @apply text-lg font-bold text-gray-900 dark:text-gray-100;
}

.c-issue-modal__code {
  @apply text-sm text-gray-400 font-medium;
}

.c-issue-modal__close {
  @apply text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors;
}

.c-issue-modal__content {
  @apply p-5;
}

.c-issue-detail-card {
  @apply bg-gray-50 dark:bg-gray-800 p-5 rounded-2xl;
}

.c-issue-detail-card__header {
  @apply flex items-center justify-between mb-3;
}

.c-issue-detail-card__title {
  @apply text-base font-bold text-gray-900 dark:text-gray-100;
}

.c-issue-detail-card__time {
  @apply text-xs text-gray-400;
}

.c-issue-detail-card__desc {
  @apply text-sm text-gray-600 dark:text-gray-300 leading-relaxed;
}

.c-issue-modal__divider {
  @apply my-5 border-gray-200 dark:border-gray-700;
}

.c-issue-meta-grid {
  @apply grid grid-cols-2 gap-4;
}

.c-issue-meta-item {
  @apply flex flex-col gap-1;
}

.c-issue-meta-item__label {
  @apply text-[11px] text-gray-400 font-medium;
}

.c-issue-meta-item__value {
  @apply text-sm font-bold text-gray-800 dark:text-gray-200;
}

.c-issue-meta-item__value--highlight {
  @apply text-blue-500;
}

.c-issue-modal__footer {
  @apply p-5 bg-gray-50 dark:bg-gray-800/50 flex justify-center;
}

.c-issue-modal__btn {
  @apply w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 text-sm;
}

.c-tag {
  @apply text-[10px] font-bold px-2 py-0.5 rounded-md;
}
.c-tag--signal { @apply bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 px-1.5 py-0.5 rounded-md; }
.c-tag--news { @apply bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400 px-1.5 py-0.5 rounded-md; }
.c-tag--issue { @apply bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-1.5 py-0.5 rounded-md; }
.c-tag--disclosure { @apply bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 px-1.5 py-0.5 rounded-md; }
.c-tag--report { @apply bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 px-1.5 py-0.5 rounded-md; }
.c-tag--social { @apply bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400 px-1.5 py-0.5 rounded-md; }

/* Zoom Transition */
.zoom-enter-active, .zoom-leave-active {
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.zoom-enter-active .c-modal-overlay, .zoom-leave-active .c-modal-overlay {
  transition: opacity 0.25s ease;
}

.zoom-enter, .zoom-leave-to {
  opacity: 0;
}

.zoom-enter .c-issue-modal, .zoom-leave-to .c-issue-modal {
  transform: scale(0.9) translateY(10px);
  opacity: 0;
}
</style>
