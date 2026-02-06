<template>
  <div class="p-consultation">
    <header class="p-consultation__header">
      <h2 class="p-consultation__title">상담 관리</h2>
      <p class="p-consultation__desc">고객과의 상담 기록을 관리하고 일정을 확인합니다.</p>
    </header>

    <div class="p-consultation__grid">
      <!-- Sidebar / Filter -->
      <aside class="p-consultation__sidebar">
        <button class="c-btn c-btn--primary c-btn--full mb-6">
          <Plus :size="16" class="mr-2" />
          상담 일정 등록
        </button>
        
        <div class="p-consultation__status-list">
          <div class="p-consultation__status-item p-consultation__status-item--active">
            <span class="p-consultation__status-label">전체</span>
            <span class="p-consultation__status-count">12</span>
          </div>
          <div class="p-consultation__status-item">
            <span class="p-consultation__status-label">예정</span>
            <span class="p-consultation__status-count text-blue-500">4</span>
          </div>
          <div class="p-consultation__status-item">
            <span class="p-consultation__status-label">완료</span>
            <span class="p-consultation__status-count text-green-500">8</span>
          </div>
        </div>
      </aside>

      <!-- Main Timeline -->
      <main class="p-consultation__main">
        <div class="p-consultation__timeline">
          <div v-for="log in logs" :key="log.id" class="p-consultation__card">
            <div class="p-consultation__card-left">
              <span class="p-consultation__time">{{ log.time }}</span>
              <div class="p-consultation__line"></div>
            </div>
            <div class="p-consultation__card-content">
              <div class="p-consultation__card-header">
                <span class="p-consultation__customer">{{ log.customer }} 고객님</span>
                <span class="p-consultation__type" :class="`p-consultation__type--${log.type}`">{{ log.typeName }}</span>
              </div>
              <h3 class="p-consultation__subject">{{ log.subject }}</h3>
              <p class="p-consultation__note">{{ log.note }}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerConsultationPage',
  data() {
    return {
      logs: [
        { id: 1, time: '14:00', customer: '김철수', type: 'visit', typeName: '대면 상담', subject: '자산 포트폴리오 리밸런싱 제안', note: '기존 반도체 비중 축소 및 2차전지 섹터 비중 확대 제안. 긍정적 반응 보임.' },
        { id: 2, time: '11:30', customer: '이영희', type: 'call', typeName: '유선 상담', subject: '해외 주식 양도세 문의', note: '미국 주식 매도 시 발생하는 세금 관련 문의. 절세 방안 안내 완료.' },
        { id: 3, time: '10:00', customer: '박민수', type: 'message', typeName: '메시지', subject: '정기 수익률 보고서 발송', note: '1월 월간 수익률 보고서 카카오톡 발송 완료.' }
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/customer/consultation.css';
</style>
