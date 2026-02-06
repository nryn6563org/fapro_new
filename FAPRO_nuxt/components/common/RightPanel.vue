<template>
  <aside class="right-panel-container">
    <!-- 일정관리 섹션 -->
    <div class="right-panel-section">
      <div class="section-header">
        <h3 class="section-title">일정관리</h3>
        <button class="action-btn-circle" @click="addSchedule">
          <svg xmlns="http://www.w3.org/2000/svg" class="action-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <!-- 달력 컴포넌트 -->
      <ScheduleCalendar
        :selected-date="selectedDate"
        :dates-with-schedules="datesWithSchedules"
        @select-date="onDateSelect"
      />
    </div>

    <!-- 실시간 이슈/이벤트 섹션 -->
    <div class="right-panel-section right-panel-section--fill">
      <div class="section-header">
        <h3 class="section-title">실시간 이슈/이벤트</h3>
        <button class="refresh-btn" @click="refreshEvents">
          <svg xmlns="http://www.w3.org/2000/svg" class="refresh-btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <div class="context-info">
        <p class="context-description">상위 10개 종목 및 관심 종목의 이벤트를 보여줍니다.</p>
        <p class="context-timestamp">{{ currentTime }}</p>
      </div>

      <!-- 이벤트 피드 (스크롤 가능) -->
      <div class="event-feed">
        <div v-for="(event, index) in events" :key="index" class="event-card">
          <div class="event-card-header">
            <span :class="['badge', getBadgeClass(event.type)]">{{ event.typeLabel }}</span>
            <div class="stock-info">
              <span class="stock-name">{{ event.stockName }}</span>
              <span class="stock-code">{{ event.stockCode }}</span>
            </div>
          </div>
          <h4 class="event-headline">{{ event.headline }}</h4>
          <p class="event-description">{{ event.description }}</p>
          <div class="event-footer">
            <span class="event-time">{{ event.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import ScheduleCalendar from '~/components/common/ScheduleCalendar.vue'

export default {
  name: 'RightPanel',
  components: {
    ScheduleCalendar
  },
  data() {
    return {
      selectedDate: new Date(),
      datesWithSchedules: new Set(['2026-02-04', '2026-02-06', '2026-02-11']),
      currentTime: '2026.02.05 14:51:15',
      events: [
        {
          type: 'signal',
          typeLabel: '신호',
          stockName: '삼성전자',
          stockCode: '005930',
          headline: '매수 시그널 발생',
          description: '라씨시그널 분석 결과 단기 강한 매수 시그널이 발생했습니다.',
          time: '5분 전'
        },
        {
          type: 'news',
          typeLabel: '뉴스',
          stockName: 'SK하이닉스',
          stockCode: '000660',
          headline: 'HBM4 기술 협력 발표',
          description: '엔비디아와 차세대 HBM4 공동 개발 협의를 완료했다는 소식입니다.',
          time: '20분 전'
        },
        {
          type: 'disclosure',
          typeLabel: '공시',
          stockName: '현대차',
          stockCode: '005380',
          headline: '자사주 매입 결정',
          description: '총 3,000억원 규모의 자사주 취득 공시가 올라왔습니다.',
          time: '45분 전'
        },
        {
          type: 'issue',
          typeLabel: '이슈',
          stockName: '에코프로',
          stockCode: '086520',
          headline: '원자재 가격 변동 주의',
          description: '리튬 가격 하락세가 지속됨에 따라 수익성 악화 우려 이슈가 있습니다.',
          time: '1시간 전'
        },
        {
          type: 'report',
          typeLabel: '리포트',
          stockName: 'LG에너지솔루션',
          stockCode: '373220',
          headline: '목표주가 상향 리포트',
          description: '미국 IRA 보조금 확대 수혜가 기대된다는 증권가 리포트가 발간되었습니다.',
          time: '2시간 전'
        }
      ]
    }
  },
  methods: {
    addSchedule() {
      alert('일정 추가 기능은 준비 중입니다.')
    },
    onDateSelect(date) {
      this.selectedDate = date
    },
    refreshEvents() {
      this.currentTime = new Date().toLocaleString()
      // In a real app, this would trigger an API call
    },
    getBadgeClass(type) {
      return `badge-${type}`
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/common/right-panel-style.css';
</style>
