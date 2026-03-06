<template>
  <div class="issue-proposal__form issue-proposal__form--spaced">
    <!-- Issue Info Section -->
    <IssueProposalInfo :issue="issue" />

    <!-- Context & Stock Table & Outlook -->
    <IssueProposalContext :issue="issue" :form-data.sync="localFormData" :issue-stocks="issue ? issue.relatedStocks : []" />

    <!-- Client Selection -->
    <IssueProposalClients
      :clients="clients"
      :selected-client-ids.sync="localSelectedClients"
    />

    <!-- Send & Download Section -->
    <div class="issue-proposal-section">
      <div class="issue-proposal-section__header">
        <h3 class="issue-proposal-section__title">전송 및 다운로드</h3>
      </div>
      <div class="issue-proposal-action-grid">
        <button
          class="issue-proposal-action-btn issue-proposal-action-btn--email"
          :disabled="localSelectedClients.length === 0"
          @click="$emit('send', { method: 'email', clients: localSelectedClients })"
        >
          <mail-icon class="issue-proposal-action-icon" />
          <span class="issue-proposal-action-text">선택한 고객에게 이메일 전송</span>
        </button>
        <button
          class="issue-proposal-action-btn issue-proposal-action-btn--download"
          @click="$emit('download')"
        >
          <download-icon class="issue-proposal-action-icon" />
          <span class="issue-proposal-action-text">PDF 다운로드</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 제안서 작성 입력 및 설정 폼 영역
 */
import { MailIcon, DownloadIcon } from "vue-feather-icons";
import IssueProposalInfo from "~/components/issues/IssueProposalInfo.vue";
import IssueProposalContext from "~/components/issues/IssueProposalContext.vue";
import IssueProposalClients from "~/components/issues/IssueProposalClients.vue";
import "~/assets/css/pages/issues/IssueProposalForm/IssueProposalForm.css";

export default {
  name: "IssueProposalForm",
  components: {
    IssueProposalInfo,
    IssueProposalContext,
    IssueProposalClients,
    MailIcon,
    DownloadIcon,
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
