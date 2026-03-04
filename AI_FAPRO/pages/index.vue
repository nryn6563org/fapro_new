<template>
  <div class="index-page">
    <div class="index-page__header">
      <div class="index-page__title-box">
        <h1 class="index-page__title">AI 컨택 제안</h1>
        <p class="index-page__subtitle">오늘 AI가 추천하는 타겟 고객과 종목을 빠르게 제안해 보세요.</p>
      </div>
      <div class="index-page__action-box">
        <div class="index-page__time-info">
          <p class="index-page__time-text">{{ formattedTime }}</p>
          <p class="index-page__time-label">최종 업데이트</p>
        </div>
        <button class="index-page__refresh-btn" @click="refreshData">
          <refresh-cw-icon size="16" class="index-page__refresh-icon" />
          <span class="index-page__refresh-text">새로고침</span>
        </button>
      </div>
    </div>

    <today-proposal-card :current-date="currentDate" @propose="openProposalModal" @refresh="refreshData" />

    <customer-intelligence-card @propose="openProposalModal" />

    <!-- Placeholder for Modals (Modal-Vanilla integrated) -->
  </div>
</template>

<script>
import { RefreshCwIcon } from 'vue-feather-icons'
import TodayProposalCard from '~/components/dashboard/TodayProposalCard.vue'
import CustomerIntelligenceCard from '~/components/dashboard/CustomerIntelligenceCard.vue'

export default {
  name: 'IndexPage',
  components: {
    RefreshCwIcon,
    TodayProposalCard,
    CustomerIntelligenceCard
  },
  data() {
    return {
      currentDate: new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' }),
      currentTime: new Date(),
      timer: null
    }
  },
  computed: {
    formattedTime() {
      const d = this.currentTime
      return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(
        d.getDate()
      ).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(
        d.getMinutes()
      ).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.currentTime = new Date()
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer)
  },
  methods: {
    refreshData() {
      this.currentTime = new Date()
      // Trigger API refresh
      console.log('Refreshing data...')
    },
    openProposalModal(type, item) {
      // Temporary proxy to trigger Modal-Vanilla logic later
      console.log('Propose:', type, item)
      alert(`${item.name}에게 ${type} 제안 모달 구동 예정 (Modal-Vanilla)`)
    }
  }
}
</script>

<style src="~/assets/css/pages/index/IndexPage/IndexPage.css" />
