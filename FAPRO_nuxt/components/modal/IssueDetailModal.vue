<template>
  <transition name="modal-fade">
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
@import '@/assets/css/modal/issue-detail-modal.css';
</style>
