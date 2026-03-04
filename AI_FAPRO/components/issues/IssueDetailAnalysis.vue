<template>
  <div class="issue-detail__extra-info flex flex-col gap-6">
    <!-- Analysis Reason -->
    <div>
      <div class="issue-detail__section-label">
        <hash-icon class="issue-detail__section-icon text-amber-500" />
        <h5 class="issue-detail__section-title">AI 이슈 생성 사유 상세</h5>
      </div>
      <div class="issue-detail__info-box issue-detail__info-box--orange">
        <p class="issue-detail__text">{{ issue.aiReason }}</p>
      </div>
    </div>
    <!-- Outlook -->
    <div>
      <div class="issue-detail__section-label">
        <trending-up-icon class="issue-detail__section-icon text-blue-500" />
        <h5 class="issue-detail__section-title">이슈 전망 상세</h5>
      </div>
      <div class="issue-detail__info-box issue-detail__info-box--blue">
        <p class="issue-detail__text">{{ issue.outlook }}</p>
        <div v-if="issue.positiveProspects || issue.negativeProspects" class="issue-detail__outlook-grid">
          <div class="issue-detail__outlook-item">
            <div class="flex items-center gap-2 mb-1">
              <div class="w-2 h-2 rounded-full bg-teal-500"></div>
              <span class="text-xs font-bold text-slate-700 dark:text-slate-300">긍정 요인</span>
            </div>
            <p class="text-[13px] text-slate-500">{{ issue.positiveProspects || '데이터가 없습니다.' }}</p>
          </div>
          <div class="issue-detail__outlook-item">
            <div class="flex items-center gap-2 mb-1">
              <div class="w-2 h-2 rounded-full bg-rose-500"></div>
              <span class="text-xs font-bold text-slate-700 dark:text-slate-300">리스크 요인</span>
            </div>
            <p class="text-[13px] text-slate-500">{{ issue.negativeProspects || '데이터가 없습니다.' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 이슈 관련 상세 분석 요약
 */
import { HashIcon, TrendingUpIcon } from 'vue-feather-icons'
import '~/assets/css/pages/issues/IssueDetailAnalysis/IssueDetailAnalysis.css'

export default {
  name: 'IssueDetailAnalysis',
  components: {
    HashIcon,
    TrendingUpIcon
  },
  props: {
    issue: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
