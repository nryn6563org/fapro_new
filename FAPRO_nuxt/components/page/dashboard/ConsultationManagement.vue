<template>
  <div class="c-consultation-management">
    <div class="c-consultation-management__header">
      <div class="c-consultation-management__title-group">
        <MessageSquare class="c-consultation-management__icon" :size="18" />
        <h3 class="c-consultation-management__title">상담 관리</h3>
      </div>
      <div class="c-consultation-management__info">
        <span class="c-consultation-management__time">09:41</span>
        <button class="c-consultation-management__refresh">
          <RefreshCw :size="14" />
        </button>
      </div>
    </div>

    <div class="c-consultation-management__body">
      <div class="c-consult-calendar-nav">
        <button @click="prevMonth" class="c-consult-calendar-btn">
          <ChevronLeft :size="16" />
        </button>
        <span class="c-consult-calendar-title">2026년 2월</span>
        <button @click="nextMonth" class="c-consult-calendar-btn">
          <ChevronRight :size="16" />
        </button>
      </div>

      <div class="c-consult-list">
        <div 
          v-for="(item, index) in consultations" 
          :key="index"
          class="c-consult-item"
          :class="`c-consult-item--${item.statusType}`"
        >
          <div class="c-consult-item__header">
            <div class="c-consult-item__user">
              <span class="c-consult-item__name">{{ item.customer }}</span>
              <span class="c-consult-item__status" :class="`c-consult-item__status--${item.statusType}`">{{ item.status }}</span>
            </div>
            <span class="c-consult-item__time">{{ item.time }}</span>
          </div>
          <p class="c-consult-item__memo">{{ item.memo }}</p>
          <p class="c-consult-item__date">{{ item.date }}</p>
        </div>
      </div>
    </div>

    <div class="c-consultation-management__footer">
      <button class="c-consultation-management__more-btn">전체보기</button>
    </div>
  </div>
</template>

<script>
import { MessageSquare, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-vue'

export default {
  name: 'PageDashboardConsultationManagement',
  components: { MessageSquare, RefreshCw, ChevronLeft, ChevronRight },
  data() {
    return {
      consultations: [
        { customer: "강민지", memo: "퀀트 전략 설명 및 가입 상담", date: "2026-02-05", time: "14:00", status: "예정", statusType: "pending" },
        { customer: "홍길동", memo: "세금 우대 상품 안내 및 가입", date: "2026-02-10", time: "11:00", status: "당일", statusType: "today" },
        { customer: "윤서연", memo: "월간 수익률 리포트 공유", date: "2026-02-15", time: "16:00", status: "예정", statusType: "pending" },
        { customer: "김나영", memo: "포트폴리오 비중 확대 논의", date: "2026-02-18", time: "10:30", status: "예정", statusType: "pending" }
      ]
    }
  },
  methods: {
    prevMonth() { console.log('prevMonth') },
    nextMonth() { console.log('nextMonth') }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/dashboard/consultation-management.css';
</style>
