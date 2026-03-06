<template>
  <modal-vanilla
    v-if="isOpen"
    :is-open="isOpen"
    custom-dialog-class="proposal-modal-dialog"
    @close="$emit('close')"
  >
    <template #header>
      <ProposalHeader
        :title="config.title"
        :description="config.description"
        :icon-type="config.iconType"
        :theme="config.theme"
        @close="$emit('close')"
      />
    </template>

    <div class="proposal-container">
      <div class="proposal-body--spaced">
        <!-- Customer Section -->
        <ProposalCustomerSection
          v-if="showCustomerSection"
          :mode="config.customerMode"
          :context-mode="mode"
          :customers="customers"
          :selected-ids.sync="internalSelectedCustomerIds"
          :single-customer="singleCustomer"
          :badge-text="config.badgeText"
          :badge-type="config.badgeType"
        />

        <!-- Stock Section -->
        <ProposalStockSection
          v-if="showStockSection"
          :mode="config.stockMode"
          :title="config.stockTitle"
          :description="config.stockDescription"
          :stocks="stocks"
          :selected-tickers.sync="internalSelectedTickers"
          :single-stock="singleStock"
        />

        <!-- Strategic Card (Design 5) -->
        <ProposalStockDetailCard
          v-if="showStrategicCard"
          :stock="singleStock"
        />

        <!-- Delivery Method -->
        <ProposalDeliveryMethod
          :selected-method.sync="internalDeliveryMethod"
        />

        <!-- Message Editor -->
        <ProposalMessageEditor
          v-model="internalMessage"
          :delivery-method="internalDeliveryMethod"
          @copy="handleCopy"
        />
      </div>
    </div>
  </modal-vanilla>
</template>

<script>
/**
 * ContactProposalModal
 * 기능: 5가지 제안 디자인을 모두 지원하는 통합 기획/제안 모달
 */
import ProposalHeader from "~/components/common/proposal/ProposalHeader.vue";
import ProposalCustomerSection from "~/components/common/proposal/ProposalCustomerSection.vue";
import ProposalStockSection from "~/components/common/proposal/ProposalStockSection.vue";
import ProposalStockDetailCard from "~/components/common/proposal/ProposalStockDetailCard.vue";
import ProposalDeliveryMethod from "~/components/common/proposal/ProposalDeliveryMethod.vue";
import ProposalMessageEditor from "~/components/common/proposal/ProposalMessageEditor.vue";
import ModalVanilla from "~/components/modal/ModalVanilla.vue";

import "~/assets/css/common/proposal/ContactProposalModal/ContactProposalModal.css";

export default {
  name: "ContactProposalModal",
  components: {
    ModalVanilla,
    ProposalHeader,
    ProposalCustomerSection,
    ProposalStockSection,
    ProposalStockDetailCard,
    ProposalDeliveryMethod,
    ProposalMessageEditor,
  },
  props: {
    isOpen: { type: Boolean, default: false },
    // Mode options: 'today-customer', 'smart-client', 'today-buy', 'today-sell', 'strategic'
    mode: { type: String, default: "today-customer" },
    customers: { type: Array, default: () => [] },
    stocks: { type: Array, default: () => [] },
    singleCustomer: { type: Object, default: () => ({}) },
    singleStock: { type: Object, default: () => ({}) },
    initialMessage: { type: String, default: "" },
    initialDeliveryMethod: { type: String, default: "kakao" },
    selectedCustomerIds: { type: Array, default: () => [] },
    selectedTickers: { type: Array, default: () => [] },
  },
  data() {
    return {
      internalMessage: this.initialMessage,
      internalDeliveryMethod: this.initialDeliveryMethod,
      internalSelectedCustomerIds: [...this.selectedCustomerIds],
      internalSelectedTickers: [...this.selectedTickers],
    };
  },
  computed: {
    config() {
      const modeConfigs = {
        "today-customer": {
          title: "투자 제안",
          description:
            "타겟 고객에게 문자, 카카오톡 또는 이메일로 제안 합니다.",
          iconType: "send",
          theme: "teal",
          customerMode: "display",
          stockMode: "select",
          stockTitle: "제안 종목",
          stockDescription: "이 고객에게 제안할 추천 종목입니다.",
          badgeText: "매수 제안",
          badgeType: "red",
        },
        "smart-client": {
          title: "투자 제안",
          description:
            "타겟 고객에게 문자, 카카오톡 또는 이메일로 제안 합니다.",
          iconType: "send",
          theme: "teal",
          customerMode: "display",
          stockMode: "select",
          stockTitle: "제안 종목",
          badgeText: "매수 제안",
          badgeType: "red",
        },
        "today-buy": {
          title: "투자 제안",
          description:
            "타겟 고객에게 문자, 카카오톡 또는 이메일로 제안 합니다.",
          iconType: "send",
          theme: "teal",
          customerMode: "select",
          stockMode: "display",
          stockTitle: "제안 종목",
          badgeText: "매수 제안",
          badgeType: "red",
        },
        "today-sell": {
          title: "투자 제안",
          description:
            "타겟 고객에게 문자, 카카오톡 또는 이메일로 제안 합니다.",
          iconType: "send",
          theme: "teal",
          customerMode: "select",
          stockMode: "display",
          stockTitle: "제안 종목",
          badgeText: "매도 제안",
          badgeType: "blue",
        },
        strategic: {
          title: "제안하기",
          description: "리노공업 종목을 제안해 보세요.",
          iconType: "send",
          theme: "teal",
          customerMode: "select",
          stockMode: "none", // Managed by showStrategicCard
          stockTitle: "제안 종목",
        },
      };
      return modeConfigs[this.mode] || modeConfigs["today-customer"];
    },
    showCustomerSection() {
      return this.mode !== "none";
    },
    showStockSection() {
      return this.config.stockMode !== "none";
    },
    showStrategicCard() {
      return this.mode === "strategic";
    },
  },
  watch: {
    mode: {
      handler() {
        this.generateMessage();
      },
      immediate: true,
    },
    internalDeliveryMethod() {
      this.generateMessage();
    },
    selectedCustomerIds() {
      this.generateMessage();
    },
    selectedTickers() {
      this.generateMessage();
    },
    initialMessage(newVal) {
      this.internalMessage = newVal;
    },
    internalSelectedCustomerIds(newVal) {
      this.$emit("update:selectedCustomerIds", newVal);
    },
    internalSelectedTickers(newVal) {
      this.$emit("update:selectedTickers", newVal);
    },
  },
  methods: {
    generateMessage() {
      // 1. Basic Info
      const customerName = this.singleCustomer?.name || "고객";
      const stocksText =
        this.internalSelectedTickers.length > 0
          ? this.stocks
              .filter((s) => this.internalSelectedTickers.includes(s.ticker))
              .map((s) => s.name)
              .join(", ")
          : this.singleStock?.name || "추천 종목";

      const type = this.mode === "today-sell" ? "매도" : "매수";

      // 2. Delivery Method Templates (Based on sketches #4)
      let content = "";

      if (this.internalDeliveryMethod === "sms") {
        content = `${customerName}님, 안녕하세요!\n오늘 고객님께 제안 드릴 {${type}}종목 알려 드립니다.\n\n`;
        content += `제안 종목 : {${stocksText}}\n투자 방향 : {${type}}\n제안 사유 : {${type}에 적합 합니다.}`;
      } else if (this.internalDeliveryMethod === "kakao") {
        content = `${customerName}님, 안녕하세요!\n오늘 고객님께 제안 드릴 {${type}}종목 알려 드립니다.\n\n`;
        content += `제안 종목 : {${stocksText}}\n투자 방향 : {${type}}\n제안 사유 : {${type}에 적합 합니다.}\n\n`;
        content += `메시지를 수정하여 개인화된 내용을 추가할 수 있습니다.`;
      } else if (this.internalDeliveryMethod === "email") {
        content = `${customerName}님, 안녕하세요!\nFA 김승원 입니다.\n\n`;
        content += `고객님의 투자성향과 포트폴리오를 분석한 결과, 다음과 같은 투자 기회를 발견하여 제안 드립니다.\n\n`;
        content += `제안 종목 : {${stocksText}}\n투자 방향 : {${type}}\n제안 사유 : {${type}에 적합 합니다.}\n\n`;
        content += `제안 드린 종목에 대한 궁금하신 점이 있으시면 언제든지 연락 주시기 바랍니다.\n\n감사합니다.\n\nFA 김승원\n010-1111-1111`;
      }

      this.internalMessage = content;
    },
    handleCopy(content) {
      this.$emit("copy", content);
    },
    handlePropose() {
      this.$emit("propose", {
        customerIds: this.internalSelectedCustomerIds,
        tickers: this.internalSelectedTickers,
        message: this.internalMessage,
        deliveryMethod: this.internalDeliveryMethod,
      });
      alert("투자 제안이 전송되었습니다.");
      this.$emit("close");
    },
  },
};
</script>
