<template>
  <div class="p-cust-list">
    <header class="p-cust-list__header">
      <h2 class="p-cust-list__title">고객 목록</h2>
      <p class="p-cust-list__desc">관리 중인 고객 리스트를 조회하고 관리합니다.</p>
    </header>

    <div class="p-cust-list__controls">
      <div class="p-cust-list__ai-search">
        <div class="p-cust-list__ai-icon-wrapper">
          <Sparkles class="p-cust-list__ai-icon" :size="18" />
        </div>
        <input type="text" placeholder="AI에게 물어보세요 (예: 10억 이상 보유한 적극투자형 고객 찾아줘)" class="p-cust-list__ai-input" />
      </div>
      <div class="p-cust-list__actions">
        <button class="c-btn c-btn--outline c-btn--sm">
          <Upload :size="16" class="mr-2" />
          Excel 업로드
        </button>
        <button class="c-btn c-btn--outline c-btn--sm">
          <Download :size="16" class="mr-2" />
          Excel 다운로드
        </button>
        <button class="c-btn c-btn--primary">
          <UserPlus :size="16" class="mr-2" />
          고객 등록
        </button>
      </div>
    </div>

    <div class="p-cust-list__content">
      <table class="p-cust-list__table">
        <thead>
          <tr>
            <th class="p-cust-list__th">고객명</th>
            <th class="p-cust-list__th">연령/성별</th>
            <th class="p-cust-list__th">투자성향</th>
            <th class="p-cust-list__th">총 자산</th>
            <th class="p-cust-list__th">수익률</th>
            <th class="p-cust-list__th">최근 상담일</th>
            <th class="p-cust-list__th">관리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.id" class="p-cust-list__tr">
            <td class="p-cust-list__td">
              <div class="p-cust-list__user">
                <div class="p-cust-list__avatar">{{ customer.name[0] }}</div>
                <div class="p-cust-list__info">
                  <span class="p-cust-list__name">{{ customer.name }}</span>
                  <span class="p-cust-list__grade">{{ customer.grade }}</span>
                </div>
              </div>
            </td>
            <td class="p-cust-list__td">{{ customer.age }}세 / {{ customer.gender }}</td>
            <td class="p-cust-list__td">
              <span class="p-cust-list__badge" :class="`p-cust-list__badge--${customer.propensityCode}`">{{ customer.propensity }}</span>
            </td>
            <td class="p-cust-list__td font-medium">{{ customer.assets.toLocaleString() }}원</td>
            <td class="p-cust-list__td" :class="customer.return >= 0 ? 'text-red-500' : 'text-blue-500'">
              {{ customer.return > 0 ? '+' : '' }}{{ customer.return }}%
            </td>
            <td class="p-cust-list__td text-gray-500">{{ customer.lastConsultation }}</td>
            <td class="p-cust-list__td">
              <button class="c-btn c-btn--ghost c-btn--xs">상세</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerListPage',
  data() {
    return {
      customers: [
        { id: 1, name: '김철수', grade: 'VIP', age: 45, gender: '남', propensity: '공격투자형', propensityCode: 'aggressive', assets: 154000000, return: 12.5, lastConsultation: '2024.02.05' },
        { id: 2, name: '이영희', grade: 'Gold', age: 38, gender: '여', propensity: '안정추구형', propensityCode: 'stable', assets: 85000000, return: 4.2, lastConsultation: '2024.01.28' },
        { id: 3, name: '박민수', grade: 'Silver', age: 52, gender: '남', propensity: '중립형', propensityCode: 'neutral', assets: 42000000, return: -1.5, lastConsultation: '2024.02.01' },
        { id: 4, name: '최지은', grade: 'VIP', age: 29, gender: '여', propensity: '적극투자형', propensityCode: 'active', assets: 210000000, return: 18.9, lastConsultation: '2024.02.06' },
        { id: 5, name: '정우성', grade: 'Gold', age: 41, gender: '남', propensity: '안정형', propensityCode: 'safe', assets: 120000000, return: 2.1, lastConsultation: '2024.01.15' }
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/customer/list.css';
</style>
