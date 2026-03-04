<template>
  <div v-if="issue && issue.newsSummary" class="issue-detail__news-detail flex flex-col gap-6">
    <div class="issue-detail__section-label">
      <book-open-icon class="issue-detail__section-icon text-teal-500" />
      <h5 class="issue-detail__section-title">관련 뉴스 상세</h5>
    </div>
    <div class="issue-detail__news-content">
      <div class="issue-detail__news-summary-box">
        <div class="flex items-center gap-2 mb-2">
          <zap-icon class="w-4 h-4 text-teal-500" />
          <p class="text-xs font-bold text-teal-600">AI 뉴스 요약</p>
        </div>
        <p class="text-[13px] font-medium text-slate-700 dark:text-slate-300 leading-relaxed">{{ issue.newsSummary }}</p>
      </div>
      <div class="issue-detail__news-list">
        <div
          v-for="(source, idx) in issue.newsSources"
          :key="idx"
          class="issue-detail__news-item"
        >
          <img
            :src="source.favicon"
            :alt="source.name"
            class="issue-detail__news-fav"
            @error="$event.target.style.display = 'none'"
          />
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-sm font-bold text-slate-900 dark:text-white">{{
                source.name
              }}</span>
              <span class="issue-detail__news-time">{{
                idx === 0 ? '최신' : idx + 1 + '시간 전'
              }}</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400">
              관련 산업 수주 확대 및 기술 개발 성공 소식 전해져...
            </p>
          </div>
          <chevron-right-icon class="w-4 h-4 text-slate-300" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 이슈 관련 뉴스 상세
 */
import { BookOpenIcon, ZapIcon, ChevronRightIcon } from 'vue-feather-icons'
import '~/assets/css/pages/issues/IssueDetailNews/IssueDetailNews.css'

export default {
  name: 'IssueDetailNews',
  components: {
    BookOpenIcon,
    ZapIcon,
    ChevronRightIcon
  },
  props: {
    issue: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
