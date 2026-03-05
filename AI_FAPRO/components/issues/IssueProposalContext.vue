<template>
  <div class="proposal-section flex flex-col gap-8">
    <!-- 17 & 18: Issue Generation Reason -->
    <div>
      <div class="issue-proposal__label mb-3">
        <div class="fapro-badge fapro-badge--amber fapro-badge--sm mr-2">17</div>
        이슈 생성 사유
      </div>
      <div class="fapro-section !p-5 bg-slate-50/50 dark:bg-slate-800/30 !shadow-none mb-3">
        <p class="text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          {{ formData.aiReason }}
        </p>
      </div>
      <div class="issue-proposal__form-group">
        <label class="issue-proposal__label">
          <div class="fapro-badge fapro-badge--blue fapro-badge--sm mr-2">18</div>
          입력필드 (선택 입력사항)
        </label>
        <textarea
          v-model="localFormData.reasonOpinion"
          class="issue-proposal__textarea"
          placeholder="AI가 포착한 이슈 외 추가 설명이 필요한 경우 작성하세요..."
        ></textarea>
      </div>
    </div>

    <!-- 16: Top 5 Stocks Table -->
    <div class="mb-4">
      <div class="issue-proposal__label mb-3">
        <div class="fapro-badge fapro-badge--slate fapro-badge--sm mr-2">16</div>
        등락률 상순 5개 연관종목
      </div>
      <IssueProposalStockTable :stocks="issueStocks" />
    </div>

    <!-- 19 & 20: Issue Outlook -->
    <div>
      <div class="issue-proposal__label mb-3">
        <div class="fapro-badge fapro-badge--blue fapro-badge--sm mr-2">19</div>
        이슈 전망
      </div>
      <div class="fapro-section !p-5 bg-slate-50/50 dark:bg-slate-800/30 !shadow-none mb-3">
        <p class="text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          {{ formData.outlook }}
        </p>
      </div>
      <div class="issue-proposal__form-group">
        <label class="issue-proposal__label">
          <div class="fapro-badge fapro-badge--teal fapro-badge--sm mr-2">20</div>
          입력필드 (선택 입력사항)
        </label>
        <textarea
          v-model="localFormData.outlookOpinion"
          class="issue-proposal__textarea"
          placeholder="FA 관점의 추가 전망이나 조언을 작성하세요..."
        ></textarea>
      </div>
    </div>

    <!-- 21: Related News -->
    <div>
      <div class="issue-proposal__label mb-3">
        <div class="fapro-badge fapro-badge--teal fapro-badge--sm mr-2">21</div>
        관련 뉴스
      </div>
      <div class="fapro-section !p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 !shadow-none">
        <p class="text-[13px] font-bold text-slate-900 dark:text-white mb-2">
          {{ formData.newsTitle || '엔비디아 차세대 AI칩 생산 30% 증산 발표, 국내 협력사 수혜 전망' }}
        </p>
        <p class="text-xs text-slate-500 leading-relaxed">
          {{ formData.newsSummary }}
        </p>
      </div>
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
