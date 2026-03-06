<template>
  <modal-vanilla
    v-if="isOpen"
    :is-open="isOpen"
    custom-dialog-class="proposal-modal-dialog"
    @close="$emit('close')"
  >
    <template #header>
      <ProposalHeader
        :title="issue ? issue.name + ' 이슈 제안서' : '이슈 제안서'"
        description="선택한 이슈를 바탕으로 고객에게 전송할 제안서를 작성해보세요."
        icon-type="star"
        theme="green"
        @close="$emit('close')"
      />
    </template>

    <div class="proposal-container">
      <div class="proposal-body">
        <!-- Main Form Sections -->
        <IssueProposalForm
          :issue="issue"
          :form-data.sync="formData"
          :clients="clients"
          :selected-client-ids.sync="selectedClientIds"
          @send="handleSend"
          @download="handleDownload"
        />
      </div>
    </div>
  </modal-vanilla>
</template>

<script>
/**
 * 기능: 이슈 기반 제안서 작성 모달
 */
import "~/assets/css/pages/issues/IssueProposalModal/IssueProposalModal.css";
import "~/assets/css/common/proposal/ContactProposalModal/ContactProposalModal.css";
import IssueProposalForm from "~/components/issues/IssueProposalForm.vue";
import ProposalHeader from "~/components/common/proposal/ProposalHeader.vue";
import ModalVanilla from "~/components/modal/ModalVanilla.vue";

export default {
  name: "IssueProposalModal",
  components: {
    ProposalHeader,
    ModalVanilla,
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
    clients: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      formData: {
        aiReason: (this.issue && this.issue.aiReason) ? this.issue.aiReason : "해당 이슈는 최근 글로벌 공급망 재편과 맞물려 국내 부품주들의 실적 반등 모멘텀이 강력하게 형성되고 있습니다.",
        reasonOpinion: "AI가 포착한 수급 패턴 외에도, 최근 주요 기관들의 매집 흔적이 뚜렷하며 기술적으로도 바닥권을 탈출하는 골든크로스가 발생했습니다.",
        outlook: (this.issue && this.issue.outlook) ? this.issue.outlook : "단기적으로는 변동성이 있을 수 있으나, 차세대 칩 양산 계획에 따른 수혜가 가시화되는 하반기부터는 본격적인 주가 재평가가 기대됩니다.",
        outlookOpinion: "고객님의 포트폴리오 비중을 고려했을 때, 해당 이슈 관련 종목을 약 10~15% 내외로 편입하여 적극적인 수익을 추구해볼 만한 시점입니다.",
        newsTitle: (this.issue && this.issue.news && this.issue.news.length > 0) ? this.issue.news[0].title : "엔비디아 차세대 AI칩 생산 30% 증산 발표",
        newsSummary: (this.issue && this.issue.news && this.issue.news.length > 0) ? this.issue.news[0].summary : "글로벌 AI 수요 폭증으로 인한 생산 라인 풀가동 및 협력사 오더 증량 소식입니다.",
      },
      selectedClientIds: [1, 2],
    };
  },
  methods: {
    handleSend({ method, clients }) {
      this.$emit("send", {
        issue: this.issue,
        formData: this.formData,
        clients,
        method,
      });
      alert("준비중입니다.");
      this.$emit("close");
    },
    handleDownload() {
      this.$emit("download", {
        issue: this.issue,
        formData: this.formData,
      });
    },
  },
};
</script>
