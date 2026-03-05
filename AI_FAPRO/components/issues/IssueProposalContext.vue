<template>
  <div class="issue-proposal-context flex flex-col gap-8">
    <!-- AI Reason Section -->
    <div class="issue-proposal-section">
      <div class="issue-proposal-section__header">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" class="text-amber-500">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
        </svg>
        <span class="issue-proposal-section__title">이슈 생성 사유</span>
      </div>
      <div class="issue-proposal-section__box issue-proposal-section__box--amber mb-3">
        <p class="issue-proposal-section__text">
          {{ formData.aiReason }}
        </p>
      </div>
      <div class="issue-proposal-section__input-box">
        <textarea
          v-model="localFormData.reasonOpinion"
          class="issue-proposal-section__textarea"
          placeholder="AI가 포착한 이슈 외 추가 설명이 필요한 경우 작성하세요..."
        ></textarea>
      </div>
    </div>

    <!-- Issue Outlook Section -->
    <div class="issue-proposal-section">
      <div class="issue-proposal-section__header">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-sky-500">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
        <span class="issue-proposal-section__title">이슈 전망</span>
      </div>
      <div class="issue-proposal-section__box issue-proposal-section__box--sky mb-3">
        <div v-if="issue" class="issue-proposal-section__text">
          <div v-if="issue.positiveProspects" class="mb-2">
            <strong>단기 전망:</strong> {{ issue.positiveProspects }}
          </div>
          <div v-if="issue.negativeProspects">
            <strong>중장기 전망:</strong> {{ issue.negativeProspects }}
          </div>
          <div v-if="!issue.positiveProspects && !issue.negativeProspects">
            {{ issue.outlook }}
          </div>
        </div>
      </div>
      <div class="issue-proposal-section__input-box">
        <textarea
          v-model="localFormData.outlookOpinion"
          class="issue-proposal-section__textarea"
          placeholder="FA 관점의 추가 전망이나 조언을 작성하세요..."
        ></textarea>
      </div>
    </div>

    <!-- Related News Section -->
    <div class="issue-proposal-section">
      <div class="issue-proposal-section__header">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-600">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        <span class="issue-proposal-section__title">관련 뉴스</span>
      </div>
      <div class="issue-proposal-section__box issue-proposal-section__box--news">
        <p class="issue-proposal-section__news-title">
          {{ formData.newsTitle || '엔비디아 차세대 AI칩 생산 30% 증산 발표, 국내 협력사 수혜 전망' }}
        </p>
        <p class="issue-proposal-section__news-desc">
          {{ formData.newsSummary }}
        </p>
        <div class="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
          <span>한국경제</span>
          <span>•</span>
          <span>26/03/02 14:30</span>
        </div>
      </div>
    </div>

    <!-- Related Stocks Table Section -->
    <div class="issue-proposal-section mt-4">
      <div class="issue-proposal-section__header lg:mt-[-20px] mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-900">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
          <polyline points="16 7 22 7 22 13"></polyline>
        </svg>
        <span class="issue-proposal-section__title">등락률 상위 5개 연관종목</span>
      </div>
      <IssueProposalStockTable :stocks="issueStocks" />
    </div>
  </div>
</template>

<script>
/**
 * 기능: 이슈 제안서 컨텍스트 및 의견 입력영역
 */
import IssueProposalStockTable from "~/components/issues/IssueProposalStockTable.vue";
import "~/assets/css/pages/issues/IssueProposalContext/IssueProposalContext.css";

export default {
  name: "IssueProposalContext",
  components: {
    IssueProposalStockTable,
  },
  props: {
    issue: {
      type: Object,
      default: null,
    },
    issueStocks: {
      type: Array,
      default: () => [],
    },
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localFormData: { ...this.formData },
    };
  },
  watch: {
    formData: {
      handler(newVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(this.localFormData)) {
          this.localFormData = { ...newVal };
        }
      },
      deep: true,
    },
    localFormData: {
      handler(newVal) {
        this.$emit("update:formData", newVal);
      },
      deep: true,
    },
  },
};
</script>
