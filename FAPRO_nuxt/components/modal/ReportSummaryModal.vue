<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="c-modal-overlay" @click.self="$emit('close')">
      <div class="c-report-modal">
        <header class="c-report-modal__header">
          <div class="c-report-modal__title-group">
            <File :size="20" class="text-primary" />
            <h3 class="c-report-modal__title">AI 요약 스크립트</h3>
            <span class="c-report-modal__subtitle">{{ stockName }} ({{ stockCode }})</span>
          </div>
          <button class="c-report-modal__close" @click="$emit('close')">
            <X :size="20" />
          </button>
        </header>

        <div class="c-report-modal__content">
            <div class="p-6">
                <div class="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
                    <h4 class="font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                        <Sparkles :size="16" class="text-primary" />
                        AI 한줄 요약
                    </h4>
                    <p class="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                        {{ summary || '요약 내용이 없습니다.' }}
                    </p>
                </div>
                
                <div class="mt-6">
                    <h4 class="font-bold mb-3 text-sm text-gray-500">리포트 생성 사유</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        {{ reason || '사유가 기재되지 않았습니다.' }}
                    </p>
                </div>
            </div>
        </div>

        <footer class="c-report-modal__footer">
          <button class="c-btn c-btn--primary c-btn--full" @click="$emit('close')">닫기</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { X, File, Sparkles } from 'lucide-vue'

export default {
  name: 'ReportSummaryModal',
  components: { X, File, Sparkles },
  props: {
    isOpen: Boolean,
    stockName: String,
    stockCode: String,
    summary: String,
    reason: String
  }
}
</script>

<style scoped>
/* Reuse or adapt styles from IssueDetailModal/report.css */
.c-modal-overlay {
  @apply fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm;
}

.c-report-modal {
  @apply bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh];
}

.c-report-modal__header {
  @apply flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50;
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

.c-report-modal__footer {
  @apply p-5 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900;
}

</style>
