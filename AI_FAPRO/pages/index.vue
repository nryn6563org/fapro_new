<template>
  <div class="index-page">
    <div class="index-page__header">
      <div class="index-page__title-wrapper">
        <h3 class="index-page__title">{{ currentDate }} AI컨택 제안</h3>
        <p class="index-page__desc">오늘 AI가 생성한 종목 컨텐츠와 시그널 정보를 제안해 보세요.</p>
      </div>
    </div>

    <today-proposal-card @propose="openProposalModal" />

    <customer-intelligence-card @propose="openProposalModal" />

    <!-- Placeholder for Modals (Modal-Vanilla integrated) -->
  </div>
</template>

<script>
import TodayProposalCard from '~/components/dashboard/TodayProposalCard.vue'
import CustomerIntelligenceCard from '~/components/dashboard/CustomerIntelligenceCard.vue'

export default {
  name: 'IndexPage',
  components: {
    TodayProposalCard,
    CustomerIntelligenceCard
  },
  data() {
    return {
      currentDate: new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })
    }
  },
  methods: {
    openProposalModal(type, item) {
      // Temporary proxy to trigger Modal-Vanilla logic later
      console.log('Propose:', type, item)
      alert(`${item.name}에게 ${type} 제안 모달 구동 예정 (Modal-Vanilla)`)
    }
  }
}
</script>

<style src="~/assets/css/pages/index/IndexPage.css" />
