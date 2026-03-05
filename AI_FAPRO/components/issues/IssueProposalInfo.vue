<template>
  <div v-if="issue" class="proposal-section">
    <!-- Header: Title & Subtitle -->
    <div class="mb-6">
      <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-1">
        {{ issue.name }} 이슈 제안서
      </h3>
      <p class="text-sm text-slate-500">
        선택한 이슈를 바탕으로 고객에게 전송할 제안서를 작성해보세요.
      </p>
    </div>

    <!-- Stats Row: 3 Columns -->
    <div class="grid grid-cols-3 gap-4 mb-2">
      <!-- Intensity -->
      <div class="fapro-section !p-4 !shadow-none bg-slate-50/50 dark:bg-slate-800/30">
        <p class="text-[11px] text-slate-500 font-bold mb-2 uppercase">이슈 강도 상세</p>
        <div class="flex items-center gap-3">
          <div class="flex-1">
            <p class="text-lg font-bold text-rose-500">
              {{ issue.changePercent > 0 ? '+' : '' }}{{ issue.changePercent }}%
            </p>
            <span class="fapro-badge fapro-badge--red fapro-badge--xs">고강도</span>
          </div>
          <div class="flex gap-1">
            <div v-for="i in 3" :key="i" :class="['w-1.5 h-6 rounded-sm', i <= 2 ? 'bg-rose-500' : 'bg-slate-200 dark:bg-slate-800']"></div>
          </div>
        </div>
      </div>

      <!-- Related Count -->
      <div class="fapro-section !p-4 !shadow-none bg-slate-50/50 dark:bg-slate-800/30 text-center">
        <p class="text-[11px] text-slate-500 font-bold mb-2 uppercase">연관 종목수</p>
        <p class="text-2xl font-bold text-teal-500">
          {{ issue.relatedStocks?.length || 0 }}개
        </p>
        <p class="text-[10px] text-slate-400 mt-1">중소형주 중심</p>
      </div>

      <!-- Frequency -->
      <div class="fapro-section !p-4 !shadow-none bg-slate-50/50 dark:bg-slate-800/30">
        <p class="text-[11px] text-slate-500 font-bold mb-2 uppercase">이슈발생 / 2월</p>
        <p class="text-2xl font-bold text-slate-900 dark:text-white whitespace-nowrap">
          {{ issue.monthlyOccurrences || 0 }}번
        </p>
        <div class="flex items-center gap-2 mt-1 text-[10px]">
          <span class="text-red-500">↑ {{ issue.occurrenceStats?.up || 0 }}번</span>
          <span class="text-blue-500">↓ {{ issue.occurrenceStats?.down || 0 }}번</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 제안서 상단 이슈 요약 정보 카드
 */
import "~/assets/css/pages/issues/IssueProposalInfo/IssueProposalInfo.css";

export default {
  name: "IssueProposalInfo",
  props: {
    issue: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
