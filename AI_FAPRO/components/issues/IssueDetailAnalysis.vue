<template>
  <div class="issue-detail__extra-info">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Analysis Reason -->
      <div>
        <div class="issue-detail__section-label">
          <zap-icon class="issue-detail__section-icon text-amber-500" />
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
          <div class="issue-detail__outlook-grid">
            <div class="issue-detail__outlook-item">
              <div class="flex items-center gap-2 mb-1">
                <div class="w-2 h-2 rounded-full bg-green-500"></div>
                <span class="text-xs font-bold dark:text-slate-300">긍정 요인</span>
              </div>
              <p class="text-[11px] text-slate-500">정부 정책 지원 강화, 수출 실적 증가</p>
            </div>
            <div class="issue-detail__outlook-item">
              <div class="flex items-center gap-2 mb-1">
                <div class="w-2 h-2 rounded-full bg-red-500"></div>
                <span class="text-xs font-bold dark:text-slate-300">리스크 요인</span>
              </div>
              <p class="text-[11px] text-slate-500">글로벌 정세 불확실성, 환율 변동성</p>
            </div>
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
import { ZapIcon, TrendingUpIcon } from 'vue-feather-icons'
import '~/assets/css/pages/issues/IssueDetailAnalysis/IssueDetailAnalysis.css'

export default {
  name: 'IssueDetailAnalysis',
  components: {
    ZapIcon,
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
