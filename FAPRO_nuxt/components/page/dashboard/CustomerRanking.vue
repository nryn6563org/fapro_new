<template>
  <div class="c-customer-ranking">
    <div class="c-customer-ranking__header">
      <div class="c-customer-ranking__title-group">
        <Trophy class="c-customer-ranking__icon" :size="18" />
        <h3 class="c-customer-ranking__title">고객랭킹</h3>
      </div>
      <div class="c-customer-ranking__info">
        <span class="c-customer-ranking__time">10:48</span>
        <button class="c-customer-ranking__refresh">
          <RefreshCw :size="14" />
        </button>
      </div>
    </div>

    <div class="c-customer-ranking__body">
      <div class="c-ranking-tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="c-ranking-tab"
          :class="{ 'c-ranking-tab--active': activeTab === tab.id }"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="c-person-ranking-list">
        <div v-for="(item, index) in rankings[activeTab]" :key="index" class="c-person-ranking-item">
          <span class="c-person-ranking-item__rank" :class="`c-person-ranking-item__rank--${index+1}`">{{ index + 1 }}</span>
          <span class="c-person-ranking-item__name">{{ item.name }}</span>
          <span class="c-person-ranking-item__value">{{ item.value }}</span>
        </div>
      </div>
    </div>

    <div class="c-customer-ranking__footer">
      <button class="c-customer-ranking__more-btn">더보기</button>
    </div>
  </div>
</template>

<script>
import { Trophy, RefreshCw } from 'lucide-vue'

export default {
  name: 'DashboardCustomerRanking',
  components: { Trophy, RefreshCw },
  data() {
    return {
      activeTab: 'return',
      tabs: [
        { id: 'return', label: '수익률TOP' },
        { id: 'amount', label: '투자금액TOP' },
        { id: 'count', label: '상담횟수TOP' }
      ],
      rankings: {
        return: [
          { name: '김철수', value: '+18.5%' },
          { name: '이영희', value: '+15.2%' },
          { name: '박민수', value: '+14.8%' },
          { name: '정수진', value: '+13.2%' },
          { name: '최현우', value: '+12.7%' },
          { name: '강민지', value: '+11.9%' },
          { name: '윤서연', value: '+11.3%' }
        ],
        amount: [
           { name: '이민호', value: '12.5억' },
           { name: '박서준', value: '8.2억' },
           { name: '송혜교', value: '7.5억' },
           { name: '현빈', value: '6.8억' },
           { name: '손예진', value: '5.4억' }
        ],
        count: [
           { name: '유재석', value: '15회' },
           { name: '강호동', value: '12회' },
           { name: '신동엽', value: '10회' },
           { name: '이경규', value: '8회' },
           { name: '박명수', value: '7회' }
        ]
      }
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/dashboard/customer-ranking.css';
</style>
