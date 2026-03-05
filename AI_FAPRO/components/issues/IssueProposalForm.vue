<template>
  <div class="issue-proposal__form flex flex-col gap-6">
    <!-- Context & Stock Table & Outlook -->
    <IssueProposalContext :form-data.sync="localFormData" :issue-stocks="issue ? issue.relatedStocks : []" />

    <!-- Attachment Section (#22) -->
    <div class="proposal-section">
      <div class="issue-proposal__label mb-3">
        <div class="fapro-badge fapro-badge--slate fapro-badge--sm mr-2">22</div>
        첨부파일 추가
      </div>
      <div class="fapro-section !p-4 bg-slate-50/50 dark:bg-slate-800/30 !shadow-none border-dashed border-2 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all text-slate-400">
        <paperclip-icon class="w-6 h-6 mb-2" />
        <p class="text-xs">클릭하여 첨부파일 다이얼로그 노출하여 파일 업로드 가능하게 구현(이미지, 문서 등)</p>
      </div>
    </div>

    <!-- Client Selection (#23) -->
    <IssueProposalClients
      :clients="clients"
      :selected-client-ids.sync="localSelectedClients"
    />

    <!-- Send Method -->
    <IssueProposalMethod :send-method.sync="localSendMethod" />
  </div>
</template>

<script>
/**
 * 기능: 제안서 작성 입력 및 설정 폼 영역
 */
import { PaperclipIcon } from "vue-feather-icons";
import IssueProposalContext from "~/components/issues/IssueProposalContext.vue";
import IssueProposalClients from "~/components/issues/IssueProposalClients.vue";
import IssueProposalMethod from "~/components/issues/IssueProposalMethod.vue";
import "~/assets/css/pages/issues/IssueProposalForm/IssueProposalForm.css";

export default {
  name: "IssueProposalForm",
  components: {
    IssueProposalContext,
    IssueProposalClients,
    IssueProposalMethod,
    PaperclipIcon,
  },
  props: {
    issue: {
      type: Object,
      default: null,
    },
    formData: {
      type: Object,
      required: true,
    },
    clients: {
      type: Array,
      default: () => [],
    },
    selectedClientIds: {
      type: Array,
      default: () => [],
    },
    sendMethod: {
      type: String,
      default: "email",
    },
  },
  data() {
    return {
      localFormData: { ...this.formData },
    };
  },
  computed: {
    localSelectedClients: {
      get() {
        return this.selectedClientIds;
      },
      set(val) {
        this.$emit("update:selectedClientIds", val);
      },
    },
    localSendMethod: {
      get() {
        return this.sendMethod;
      },
      set(val) {
        this.$emit("update:sendMethod", val);
      },
    },
  },
  watch: {
    formData: {
      handler(newVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(this.localFormData)) {
          this.localFormData = { ...newVal };
        }
      },
      deep: true,
      immediate: true,
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
