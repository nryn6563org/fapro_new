<template>
  <ContactProposalModal
    :is-open="true"
    :mode="computedMode"
    :customers="internalCustomers"
    :stocks="internalStocks"
    :single-customer="proposalData.customer || (['target-customer', 'smart-client'].includes(proposalType) ? proposalData : {})"
    :single-stock="proposalData.stock || (proposalType === 'target-stock' ? proposalData : {})"
    :selected-customer-ids.sync="checkedCustomerIds"
    :selected-tickers.sync="checkedTickers"
    @close="$emit('close-modal')"
    @copy="handleCopy"
  />
</template>

<script>
/**
 * TodayProposalModal
 * 기능: 대시보드의 다양한 제안 버튼(오늘 타켓 고객, 매수/매도 종목, 스마트 고객관리)에 대응.
 * 리팩토링: 모든 디자인 케이스(#1~#4)를 ContactProposalModal로 매핑.
 */
import ContactProposalModal from "~/components/common/proposal/ContactProposalModal.vue";
import "~/assets/css/pages/index/TodayProposalModal/TodayProposalModal.css";

export default {
  name: "TodayProposalModal",
  components: {
    ContactProposalModal,
  },
  props: {
    // proposalType: 'target-customer', 'target-stock', 'smart-client'
    proposalType: { type: String, default: "target-customer" },
    // proposalData: { customer?, stock?, action?, list? }
    proposalData: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      checkedCustomerIds: [],
      checkedTickers: [],
      internalCustomers: [],
      internalStocks: [],
    };
  },
  computed: {
    computedMode() {
      if (this.proposalType === "target-customer") return "today-customer";
      if (this.proposalType === "smart-client") return "smart-client";
      if (this.proposalType === "target-stock") {
        return this.proposalData.action === "sell" ? "today-sell" : "today-buy";
      }
      return "today-customer";
    },
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      // 1. Data Setup based on proposalType
      if (this.proposalType === "target-customer") {
        this.internalStocks = [
          {
            name: "펄어비스",
            ticker: "263750",
            price: "42,500",
            change: "+7.19%",
            reason: "매수 타이밍입니다.",
          },
          {
            name: "카카오게임즈",
            ticker: "293490",
            price: "34,850",
            change: "-2.3%",
            reason: "성장성이 기대됩니다.",
          },
        ];
        this.checkedTickers = this.internalStocks.map((s) => s.ticker);
      } else if (this.proposalType === "target-stock") {
        this.internalCustomers = [
          {
            id: 1,
            name: "김철수",
            email: "chulsoo@example.com",
            portfolio: "15억",
            investmentStyle: "공격투자형",
            reason: "최근 반도체 섹터의 강한 수급과 함께 공격적인 포트폴리오 확장이 필요한 시점입니다.",
          },
          {
            id: 2,
            name: "이영희",
            email: "younghee@example.com",
            portfolio: "8억",
            investmentStyle: "안정추구형",
            reason: "변동성이 적은 우량주 위주의 안정적인 수익 확보를 위해 매수를 제안합니다.",
          },
        ];
        this.checkedCustomerIds = this.internalCustomers.map((c) => c.id);
      } else if (this.proposalType === "smart-client") {
        // Design #2/3 Smart Client (By Customer, Multi-stock)
        this.internalStocks = [
          {
            name: "알테오젠",
            ticker: "196170",
            price: "285,000",
            change: "+6.65%",
            reason: "추종 매수가 유효합니다.",
          },
        ];
        this.checkedTickers = this.internalStocks.map((s) => s.ticker);
      }
    },
    handleCopy(content) {
      alert("준비중입니다.");
    },
  },
};
</script>
