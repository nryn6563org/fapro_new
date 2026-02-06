<template>
  <Card class="dashboard-card dashboard-card--customer-return">
    <div class="dashboard-card__header">
      <div class="dashboard-card__header-main">
        <div class="dashboard-card__title-group">
          <svg xmlns="http://www.w3.org/2000/svg" class="dashboard-card__title-icon dashboard-card__title-icon--orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span class="dashboard-card__title-text">고객 수익률 분포</span>
        </div>
      </div>
    </div>

    <div class="dashboard-card__content">
      <!-- 수익률 분포 바 -->
      <div class="dashboard-card__distribution-list">
        <div v-for="item in distribution" :key="item.range" class="dashboard-card__distribution-item">
          <div class="dashboard-card__distribution-info">
            <span class="dashboard-card__distribution-label">{{ item.range }}</span>
            <span class="dashboard-card__distribution-meta">{{ item.count }}명 ({{ item.percentage }}%)</span>
          </div>
          <div class="dashboard-card__progress-track">
            <div
              class="dashboard-card__progress-fill"
              :class="item.percentage >= 30 ? 'dashboard-card__progress-fill--high' : item.percentage >= 15 ? 'dashboard-card__progress-fill--medium' : 'dashboard-card__progress-fill--low'"
              :style="{ width: item.percentage + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <!-- 상/하위 3인 -->
      <div class="dashboard-card__return-sections">
        <div class="dashboard-card__return-section">
          <div class="dashboard-card__return-section-header">
            <span class="dashboard-card__return-section-title">수익률 상위 3인</span>
          </div>
          <div class="dashboard-card__return-list">
            <div v-for="(customer, idx) in top3" :key="customer.name" class="dashboard-card__return-item dashboard-card__return-item--top">
              <span class="dashboard-card__return-user">{{ idx + 1 }}위 {{ customer.name }}</span>
              <span class="dashboard-card__return-value dashboard-card__return-value--profit">+{{ customer.return }}%</span>
            </div>
          </div>
        </div>

        <div class="dashboard-card__return-section">
          <div class="dashboard-card__return-section-header">
            <span class="dashboard-card__return-section-title">수익률 하위 3인</span>
          </div>
          <div class="dashboard-card__return-list">
            <div v-for="(customer, idx) in bottom3" :key="customer.name" class="dashboard-card__return-item dashboard-card__return-item--bottom">
              <span class="dashboard-card__return-user">{{ idx + 1 }}위 {{ customer.name }}</span>
              <span class="dashboard-card__return-value dashboard-card__return-value--loss">{{ customer.return }}%</span>
            </div>
          </div>
        </div>
      </div>

      <nuxt-link
        to="/customer/ranking?tab=return"
        class="dashboard-card__view-more dashboard-card__view-more--orange dashboard-card__view-more--margin-top"
      >
        더보기
      </nuxt-link>
    </div>
  </Card>
</template>

<script>
import { customerReturnData } from '~/assets/data/dashboard-data'

export default {
  name: 'CustomerReturnCard',
  data() {
    return {
      distribution: customerReturnData.distribution,
      top3: customerReturnData.top3,
      bottom3: customerReturnData.bottom3
    }
  }
}
</script>
