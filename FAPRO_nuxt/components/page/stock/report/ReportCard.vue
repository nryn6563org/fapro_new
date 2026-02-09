<template>
  <div class="c-report-card" :class="{'c-report-card--new': isToday}">
    <div class="c-report-card__inner">
      <!-- Meta info -->
      <div class="c-report-card__meta">
        <div v-if="isToday" class="c-report-card__badge-new">
          <Sparkles :size="10" />
          <span>NEW</span>
        </div>
        <span>{{ time }}</span>
      </div>

      <!-- Header -->
      <div class="c-report-card__header">
        <div class="c-report-card__stock">
          <nuxt-link :to="`/stock/detail/${report.code}`" class="c-report-card__name">
            {{ report.name }}
          </nuxt-link>
          <span class="c-report-card__code">({{ report.code }})</span>
          <span 
            class="c-report-card__change" 
            :class="report.change >= 0 ? 'c-report-card__change--positive' : 'c-report-card__change--negative'"
          >
            {{ report.change >= 0 ? '▲' : '▼' }} {{ Math.abs(report.change) }}%
          </span>
        </div>
        <button class="c-btn c-btn--ghost c-btn--xs px-2 border border-success/30 text-success bg-success/5" @click="$emit('show-customers', report.code)">
          <UserCheck :size="14" class="mr-1" />
          보유 고객 ({{ report.relatedCustomers.length }})
        </button>
      </div>

      <!-- Content -->
      <div class="c-report-card__content">
        <div class="c-report-card__row">
          <span class="c-report-card__row-label c-report-card__row-label--summary">리포트 요약</span>
          <p class="c-report-card__row-text">{{ report.fullReport.summary }}</p>
        </div>
        <div class="c-report-card__row">
          <span class="c-report-card__row-label c-report-card__row-label--reason">리포트 생성 사유</span>
          <p class="c-report-card__row-text">{{ report.reason }}</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="c-report-card__actions">
        <div class="c-report-card__main-actions">
          <button 
            class="c-btn c-btn--ghost c-btn--sm px-4 bg-purple-50 text-purple-600 border border-purple-100 flex-1"
            @click="$emit('show-report', report.code)"
          >
            <FileText :size="16" class="mr-1.5" />
            AI리포트
          </button>
          <button 
            class="c-btn c-btn--ghost c-btn--sm px-4 bg-indigo-50 text-indigo-600 border border-indigo-100 flex-1"
            @click="$emit('show-script', report.code)"
          >
            <DocumentIcon :size="16" class="mr-1.5" />
            요약
          </button>
        </div>
        <button 
          class="c-report-card__history-toggle"
          @click="isExpanded = !isExpanded"
        >
          <History :size="14" />
          <span>최근 리포트 히스토리 ({{ report.history?.length || 0 }}개)</span>
          <ChevronDown :size="14" :class="{'rotate-180': isExpanded}" class="transition-transform ml-1" />
        </button>
      </div>
    </div>

    <!-- History Dropdown -->
    <transition name="t-fade">
      <div v-if="isExpanded && report.history" class="c-report-history">
        <div v-for="(h, idx) in report.history.slice(0, 3)" :key="idx" class="c-report-history__item">
          <div class="c-report-history__header">
            <div class="c-report-history__meta">
              <span class="c-report-history__date">{{ h.datetime }}</span>
              <span class="c-badge" :class="h.change >= 0 ? 'c-badge--danger' : 'c-badge--primary'">
                {{ h.change >= 0 ? '▲' : '▼' }} {{ Math.abs(h.change) }}%
              </span>
              <span class="c-badge" :class="h.opinion === 'Buy' ? 'c-badge--success' : 'c-badge--warning'">
                {{ h.opinion }}
              </span>
            </div>
          </div>
          <p class="c-report-history__text">{{ h.summary }}</p>
          <button class="c-btn c-btn--ghost c-btn--full py-1 text-[10px] mt-2 border border-gray-100" @click="$emit('show-report', report.code)">
            상세 리포트 보기
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'StockReportCard',
  props: {
    report: {
      type: Object,
      required: true
    },
    isToday: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isExpanded: false
    }
  },
  computed: {
    time() {
      return this.report.datetime.split(' ')[1];
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/stock/report.css';
</style>
