<template>
  <div class="c-customer-events">
    <div class="c-customer-events__header">
      <div class="c-customer-events__title-group">
        <Bell class="c-customer-events__icon" :size="18" />
        <h3 class="c-customer-events__title">고객 이벤트 발생</h3>
      </div>
      <div class="c-customer-events__info">
        <span class="c-customer-events__time">08:45</span>
        <button class="c-customer-events__refresh">
          <RefreshCw :size="14" />
        </button>
      </div>
    </div>

    <div class="c-customer-events__body">
      <div class="c-event-list">
        <div 
          v-for="event in events" 
          :key="event.id"
          class="c-event-item"
          :class="`c-event-item--${event.type}`"
        >
          <div class="c-event-item__time">{{ event.time }}</div>
          <div class="c-event-item__customer">
            <span class="c-event-item__name">{{ event.customerName }}</span>
            <span class="c-event-item__label">고객</span>
          </div>
          <div class="c-event-item__content">
            <p class="c-event-item__text">
              {{ event.eventText }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="c-customer-events__footer">
      <button class="c-customer-events__more-btn">더보기</button>
    </div>
  </div>
</template>

<script>
import { Bell, RefreshCw } from 'lucide-vue'

export default {
  name: 'DashboardCustomerEvents',
  components: { Bell, RefreshCw },
  data() {
    return {
      events: [
        { id: 1, customerName: "김철수", eventText: "포트 5%이상 수익중", time: "15분 전", type: "profit" },
        { id: 2, customerName: "이영희", eventText: "포트 -5%이상 하락중", time: "23분 전", type: "loss" },
        { id: 3, customerName: "박민수", eventText: "보유 종목[삼성전자] AI리포트 발생", time: "35분 전", type: "report" },
        { id: 4, customerName: "정수진", eventText: "보유 종목[삼성전자] 5%이상 상승중", time: "48분 전", type: "up" },
        { id: 5, customerName: "최현우", eventText: "보유 종목[삼성전자] 공시 발생", time: "1시간 전", type: "disclosure" },
        { id: 6, customerName: "강민지", eventText: "보유 종목[삼성전자] 이슈 발생", time: "2시간 전", type: "issue" }
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/dashboard/customer-events.css';
</style>
