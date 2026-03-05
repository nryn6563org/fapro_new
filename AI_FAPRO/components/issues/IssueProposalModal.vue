<template>
  <modal-vanilla
    v-if="isOpen"
    :is-open="isOpen"
    custom-dialog-class="proposal-modal-dialog"
    @close="$emit('close')"
  >
    <template #header>
      <ProposalHeader
        title="이슈 기반 제안서 작성"
        description="선택한 이슈를 바탕으로 고객에게 전송할 제안서를 작성하고 전송 방법을 선택하세요."
        icon-type="send"
        theme="teal"
        @close="$emit('close')"
      />
    </template>

    <div class="proposal-container">
      <div class="proposal-body !p-6">
        <!-- Issue Info Card -->
        <IssueProposalInfo :issue="issue" />

        <!-- Form Sections -->
        <IssueProposalForm
          :issue="issue"
          :form-data.sync="formData"
          :clients="clients"
          :selected-client-ids.sync="selectedClientIds"
          :send-method.sync="sendMethod"
        />
      </div>

      <!-- Footer Buttons -->
      <div class="issue-proposal__footer p-6 border-t border-slate-200 dark:border-slate-800">
        <button class="issue-proposal__btn-cancel fapro-btn-outline flex-1" @click="$emit('close')">
          취소
        </button>
        <button
          class="issue-proposal__btn-send fapro-btn-primary flex-[2]"
          :disabled="!sendMethod || selectedClientIds.length === 0"
          @click="handleSend"
        >
          <send-icon class="w-4 h-4 mr-2" />
          {{ sendMethodName }}로 전송하기
        </button>
      </div>
    </div>
  </modal-vanilla>
</template>

<script>
/**
 * 기능: 이슈 기반 제안서 작성 모달
 */
import { SendIcon } from "vue-feather-icons";
import { sampleClients } from "~/utils/issueDetectionMockData.js";
import "~/assets/css/pages/issues/IssueProposalModal/IssueProposalModal.css";
import "~/assets/css/common/proposal/ContactProposalModal/ContactProposalModal.css";import IssueProposalInfo from "~/components/issues/IssueProposalInfo.vue";
import IssueProposalForm from "~/components/issues/IssueProposalForm.vue";
import ProposalHeader from "~/components/common/proposal/ProposalHeader.vue";
import ModalVanilla from "~/components/modal/ModalVanilla.vue";

export default {
  name: "IssueProposalModal",
  components: {
    SendIcon,
    ProposalHeader,
    ModalVanilla,
    IssueProposalInfo,
    IssueProposalForm,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    issue: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formData: {
        aiReason: "",
        marketBackground: "",
        stockLogic: "",
        expectedScenario: "",
        riskFactors: "",
        faOpinion: "",
      },
      selectedClientIds: [],
      sendMethod: "email",
      clients: sampleClients,
    };
  },
  computed: {
    sendMethodName() {
      const names = { email: "이메일", kakao: "카카오톡", sms: "문자" };
      return names[this.sendMethod] || "";
    },
  },
  watch: {
    issue: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.formData.aiReason = newVal.aiReason || "";
          this.formData.marketBackground = `현재 ${newVal.name} 이슈는 시장에서 큰 주목을 받고 있습니다.`;
          this.formData.stockLogic = `관련 종목들은 ${newVal.name} 기술력과 시장 지배력을 바탕으로 수혜가 예상됩니다.`;
          this.formData.expectedScenario =
            "향후 분기별 실적 발표와 함께 주가 재평가가 가시화될 전망입니다.";
          this.formData.riskFactors =
            "다만, 글로벌 매크로 환경 변화에 따른 변동성 리스크가 존재합니다.";
          this.formData.faOpinion = "";
        }
      },
    },
  },
  methods: {
    handleSend() {
      // 실제 프로젝트에서는 여기서 API 호출
      this.$emit("send", {
        issue: this.issue,
        formData: this.formData,
        clientIds: this.selectedClientIds,
        method: this.sendMethod,
      });
      alert(`${this.sendMethodName}로 제안서가 성공적으로 전송되었습니다.`);
      this.$emit("close");
    },
  },
};
</script>
