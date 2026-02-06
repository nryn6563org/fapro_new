<template>
  <Card class="dashboard-card dashboard-card--customer-ranking">
    <div class="dashboard-card__header">
      <div class="dashboard-card__header-main">
        <div class="dashboard-card__title-group">
          <svg xmlns="http://www.w3.org/2000/svg" class="dashboard-card__title-icon dashboard-card__title-icon--purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span class="dashboard-card__title-text">고객랭킹</span>
        </div>
      </div>

      <!-- 랭킹 탭 -->
      <div class="dashboard-card__tab-group-wrapper">
        <div class="dashboard-card__tab-group">
          <button
            v-for="tab in ['return', 'asset', 'consultation']"
            :key="tab"
            @click="activeTab = tab"
            :class="['dashboard-card__tab-item',
                     activeTab === tab ? 'dashboard-card__tab-item--active dashboard-card__tab-item--purple' : '']"
          >
            {{ tab === 'return' ? '수익률' : tab === 'asset' ? '자산' : '상담건수' }}
          </button>
        </div>
      </div>
    </div>

    <div class="dashboard-card__content dashboard-card__content--scrollable">
      <div class="dashboard-card__rank-list">
        <div
          v-for="customer in currentRanking"
          :key="customer.name"
          class="dashboard-card__rank-item dashboard-card__rank-item--hover"
        >
          <div class="dashboard-card__rank-left">
            <span
              :class="['dashboard-card__rank-badge',
                       customer.rank <= 3 ? 'dashboard-card__rank-badge--purple' : 'dashboard-card__rank-badge--normal']"
            >
              {{ customer.rank }}
            </span>
            <span class="dashboard-card__rank-name">{{ customer.name }}</span>
          </div>

          <div class="dashboard-card__rank-right">
            <p v-if="activeTab === 'return'" class="dashboard-card__rank-value dashboard-card__rank-value--profit">+{{ customer.return }}%</p>
            <p v-else-if="activeTab === 'asset'" class="dashboard-card__rank-value dashboard-card__rank-value--purple">{{ formatAsset(customer.asset) }}</p>
            <p v-else-if="activeTab === 'consultation'" class="dashboard-card__rank-value dashboard-card__rank-value--purple">{{ customer.count }}건</p>
          </div>
        </div>
      </div>

      <nuxt-link
        :to="`/customer/ranking?tab=${activeTab === 'return' ? 'return' : activeTab === 'asset' ? 'investment' : 'consultation'}`"
        class="dashboard-card__view-more dashboard-card__view-more--purple"
      >
        더보기
      </nuxt-link>
    </div>
  </Card>
</template>

<script>
import { customerRankingData } from '~/assets/data/dashboard-data'

export default {
  name: 'CustomerRankingCard',
  data() {
    return {
      activeTab: 'return',
      customerRankingData
    }
  },
  computed: {
    currentRanking() {
      return this.customerRankingData[this.activeTab]
    }
  },
  methods: {
    formatAsset(val) {
      if (val >= 100000000) {
        return (val / 100000000).toFixed(1) + '억'
      }
      return val.toLocaleString() + '원'
    }
  }
}
</script>
