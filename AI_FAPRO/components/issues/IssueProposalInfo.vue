<template>
  <div v-if="issue" class="issue-proposal__info-card">
    <div class="flex items-start justify-between mb-4">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="issue-proposal__badge issue-proposal__badge--outline">
            {{ issue.type === 'up' ? '상승' : issue.type === 'down' ? '하락' : '중립' }} 이슈
          </span>
          <span v-if="issue.strengthSummary?.level >= 3" class="issue-proposal__badge issue-proposal__badge--red">
            강함
          </span>
        </div>
        <h3 class="issue-proposal__info-name">{{ issue.name }}</h3>
      </div>
      <div class="text-right">
        <p class="issue-proposal__info-label">관련 종목 등락률</p>
        <p
          :class="[
            'issue-proposal__info-change',
            issue.changePercent >= 0 ? 'text-red-500' : 'text-blue-500'
          ]"
        >
          {{ issue.changePercent > 0 ? '+' : '' }}{{ issue.changePercent }}%
        </p>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <span class="issue-proposal__desc text-slate-500 text-xs">관련 종목 {{ issue.relatedStocks?.length || 0 }}개 포착</span>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 제안서 상단 이슈 요약 정보 카드
 */
import '~/assets/css/pages/issues/IssueProposalInfo/IssueProposalInfo.css'

export default {
  name: 'IssueProposalInfo',
  props: {
    issue: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
