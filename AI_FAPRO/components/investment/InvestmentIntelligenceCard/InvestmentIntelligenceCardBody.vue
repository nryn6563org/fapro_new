<template>
  <div class="intelligence-card__content">
    <transition name="fade-slide-right" mode="out-in">
      <div :key="index" class="intelligence-card__body">
        <!-- Type: Issue -->
        <div v-if="summary.type === 'issue'" class="intelligence-card__issues">
          <div
            v-for="(issue, idx) in summary.issues"
            :key="idx"
            class="intelligence-card__issue-tag"
          >
            {{ issue.name }}
          </div>
        </div>

        <!-- Type: Stock -->
        <div v-else-if="summary.type === 'stock'" class="intelligence-card__stocks">
          <div v-for="(stock, idx) in summary.stocks" :key="idx" class="intelligence-card__stock-tag">
            <span class="intelligence-card__stock-name">{{ stock.name }}</span>
            <span
              :class="[
                'intelligence-card__stock-change',
                stock.change.startsWith('+') ? 'text-red-600' : 'text-blue-600',
              ]"
            >
              {{ stock.change }}
            </span>
          </div>
        </div>

        <!-- Type: News or US Issue -->
        <div
          v-else-if="['news', 'usIssue'].includes(summary.type)"
          class="intelligence-card__news-list"
        >
          <div
            v-for="(item, idx) in summary.newsItems"
            :key="idx"
            class="intelligence-card__news-item"
          >
            <div class="flex-1">
              <p class="intelligence-card__news-title">{{ item.title }}</p>
              <div class="flex items-center gap-2 mt-1">
                <span v-if="item.source" class="intelligence-card__news-source">{{
                  item.source
                }}</span>
                <span class="intelligence-card__news-time">{{ item.time }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary Text -->
        <div :class="['intelligence-card__summary-box', summaryClass]">
          <p>{{ summary.summary }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
/**
 * 기능: 인텔리전스 카드 바디
 */
export default {
  name: "InvestmentIntelligenceCardBody",
  props: {
    summary: { type: Object, required: true },
    index: { type: Number, required: true },
    summaryClass: { type: String, required: true },
  },
};
</script>
