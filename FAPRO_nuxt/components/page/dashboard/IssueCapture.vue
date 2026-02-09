<template>
  <div class="c-issue-capture">
    <div class="c-issue-capture__tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        class="c-issue-capture__tab"
        :class="{'c-issue-capture__tab--active': activeTab === tab.id}"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="c-issue-capture__content">
      <div v-if="activeTab === 'ai'" class="c-issue-capture__ai">
        <div class="c-issue-capture__keyword-cloud">
          <button 
            v-for="keyword in keywords" 
            :key="keyword.text"
            class="c-issue-capture__keyword"
            :style="{ fontSize: keyword.size + 'px', opacity: keyword.opacity }"
          >
            {{ keyword.text }}
          </button>
        </div>
      </div>
      
      <div v-else-if="activeTab === 'market'" class="c-issue-capture__market">
        <div v-for="item in marketIssues" :key="item.title" class="c-market-item">
          <span class="c-market-item__rank">{{ item.rank }}</span>
          <span class="c-market-item__title">{{ item.title }}</span>
          <span class="c-market-item__change" :class="item.change >= 0 ? 'text-red-500' : 'text-blue-500'">
            {{ item.change >= 0 ? '+' : '' }}{{ item.change }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageDashboardIssueCapture',
  data() {
    return {
      activeTab: 'ai',
      tabs: [
        { id: 'ai', label: 'AI 키워드' },
        { id: 'market', label: '시장 핵심 이슈' },
        { id: 'intensity', label: '이슈 강도' }
      ],
      keywords: [
        { text: '반도체', size: 24, opacity: 1 },
        { text: 'AI칩', size: 20, opacity: 0.9 },
        { text: '전기차', size: 18, opacity: 0.8 },
        { text: '금리인하', size: 16, opacity: 0.7 },
        { text: '배터리', size: 14, opacity: 0.6 },
        { text: 'HBM', size: 22, opacity: 0.95 },
        { text: '엔비디아', size: 19, opacity: 0.85 }
      ],
      marketIssues: [
        { rank: 1, title: 'AI 반도체 수요 폭증', change: 12.5 },
        { rank: 2, title: '연준 금리 동결 시사', change: -2.3 },
        { rank: 3, title: '2차전지 반등 성공', change: 5.8 },
        { rank: 4, title: 'K-뷰티 북미 매출 확대', change: 8.2 }
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/dashboard.css';
</style>
