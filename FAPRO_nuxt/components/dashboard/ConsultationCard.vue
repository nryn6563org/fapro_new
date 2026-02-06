<template>
  <Card class="dashboard-card dashboard-card--consultation">
    <div class="dashboard-card__header">
      <div class="dashboard-card__header-main">
        <div class="dashboard-card__title-row">
          <div class="dashboard-card__title-group">
            <svg xmlns="http://www.w3.org/2000/svg" class="dashboard-card__title-icon dashboard-card__title-icon--indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span class="dashboard-card__title-text">상담 관리</span>
          </div>
          <div class="dashboard-card__header-meta">
            <select v-model="selectedMonth" class="dashboard-card__header-select">
              <option v-for="m in 12" :key="m" :value="m">{{ m }}월</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="dashboard-card__content dashboard-card__content--scrollable">
      <!-- 상담 목록 -->
      <div class="dashboard-card__consultation-list">
        <div
          v-for="item in consultationData"
          :key="item.id"
          class="dashboard-card__consultation-item dashboard-card__consultation-item--hover"
        >
          <div class="dashboard-card__consultation-row">
            <div class="dashboard-card__consultation-user">
              <span class="dashboard-card__consultation-name">{{ item.userName }}</span>
              <span :class="['dashboard-card__consultation-status', item.badge ? `dashboard-card__consultation-status--${item.status.replace(/ /g, '-').toLowerCase()}` : '']">{{ item.status }}</span>
            </div>
            <span class="dashboard-card__consultation-date">{{ item.date }} {{ item.time }}</span>
          </div>
          <div class="dashboard-card__consultation-row">
            <span class="dashboard-card__consultation-preview">상담 요청 내용이 이곳에 표시됩니다...</span>
            <button class="dashboard-card__consultation-detail-btn">상세보기</button>
          </div>
        </div>
      </div>

      <nuxt-link
        to="/customer/consultation"
        class="dashboard-card__view-more dashboard-card__view-more--blue"
      >
        더보기
      </nuxt-link>
    </div>
  </Card>
</template>

<script>
import { consultationData } from '~/assets/data/dashboard-data'

export default {
  name: 'ConsultationCard',
  data() {
    return {
      selectedMonth: 2,
      consultationData
    }
  }
}
</script>
