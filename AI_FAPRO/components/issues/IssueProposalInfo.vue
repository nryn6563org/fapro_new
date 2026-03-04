<template>
  <div v-if="issue" class="issue-proposal__info-card">
    <div class="flex items-center justify-between mb-4">
      <div>
        <p class="issue-proposal__info-label">이슈명</p>
        <h3 class="issue-proposal__info-name">{{ issue.name }}</h3>
      </div>
      <div class="text-right">
        <p class="issue-proposal__info-label">등락률</p>
        <p
          :class="[
            'issue-proposal__info-change',
            issue.changePercent >= 0 ? 'text-red-600' : 'text-blue-600'
          ]"
        >
          {{ issue.changePercent > 0 ? '+' : '' }}{{ issue.changePercent }}%
        </p>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <span class="issue-proposal__badge">관련 종목 {{ issue.relatedStocks.length }}개</span>
      <span class="issue-proposal__badge issue-proposal__badge--outline">
        {{ issue.type === 'up' ? '상승' : issue.type === 'down' ? '하락' : '중립' }}
      </span>
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
