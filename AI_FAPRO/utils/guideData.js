// utils/guideData.js
// 기능: 가이드 페이지의 시각 트리와 패키지 정보를 위한 데이터 파일 (Rule 11)

// 주요 패키지 버전 목록
export const packages = [
  { name: "nuxt", version: "^2.15.8", desc: "프레임워크 (SSR/SPA)" },
  { name: "vue", version: "^2.7.10", desc: "뷰 레이어" },
  { name: "tailwindcss", version: "^3.3.7", desc: "유틸리티 CSS" },
  { name: "d3", version: "^7.9.0", desc: "데이터 시각화" },
  { name: "modal-vanilla", version: "^0.13.0", desc: "모달 라이브러리" },
  { name: "swiper", version: "^12.1.2", desc: "슬라이더" },
  { name: "autocompleter", version: "^9.3.2", desc: "검색 자동완성" },
  { name: "vue-feather-icons", version: "^5.1.0", desc: "SVG 아이콘" },
];

// 페이지-컴포넌트 시각 트리 구조
export const structure = [
  {
    name: "기본 레이아웃",
    file: "../layouts/default.vue",
    components: [
      {
        name: "AppSidebar",
        file: "layout/AppSidebar.vue",
        css: "layout/AppSidebar/AppSidebar.css",
        children: [
          {
            name: "AppSidebarNav",
            file: "layout/AppSidebarNav.vue",
            css: "layout/AppSidebarNav/AppSidebarNav.css",
          },
          {
            name: "AppSidebarUser",
            file: "layout/AppSidebarUser.vue",
            css: "layout/AppSidebarUser/AppSidebarUser.css",
          },
        ],
      },
      {
        name: "GlobalModalManager",
        file: "modal/GlobalModalManager.vue",
        css: "modal/GlobalModalManager/GlobalModalManager.css",
        logic: "modal-vanilla 이벤트버스 통합",
      },
      {
        name: "ModalVanilla",
        file: "modal/ModalVanilla.vue",
        css: "modal/ModalVanilla/ModalVanilla.css",
        logic: "modal-vanilla Vue 래퍼",
      },
    ],
  },
  {
    name: "AI 컨텍 제안 (대시보드)",
    file: "index.vue",
    components: [
      {
        name: "TodayProposalCard",
        file: "dashboard/TodayProposalCard.vue",
        css: "pages/index/TodayProposalCard/TodayProposalCard.css",
        api: "utils/mockData.js",
        children: [
          {
            name: "TodayProposalModal",
            file: "dashboard/TodayProposalModal.vue",
            css: "pages/index/TodayProposalModal/TodayProposalModal.css",
          },
        ],
      },
      {
        name: "CustomerIntelligenceCard",
        file: "dashboard/CustomerIntelligenceCard.vue",
        css: "pages/index/CustomerIntelligenceCard/CustomerIntelligenceCard.css",
        api: "utils/mockData.js (customerIntelligence)",
      },
      {
        name: "ContactProposalModal",
        file: "common/proposal/ContactProposalModal.vue",
        css: "common/proposal/ContactProposalModal/ContactProposalModal.css",
        children: [
          {
            name: "ProposalHeader",
            file: "common/proposal/ProposalHeader.vue",
            css: "common/proposal/ProposalHeader/ProposalHeader.css",
          },
          {
            name: "ProposalCustomerSection",
            file: "common/proposal/ProposalCustomerSection.vue",
            css: "common/proposal/ProposalCustomerSection/ProposalCustomerSection.css",
          },
          {
            name: "ProposalStockSection",
            file: "common/proposal/ProposalStockSection.vue",
            css: "common/proposal/ProposalStockSection/ProposalStockSection.css",
          },
          {
            name: "ProposalStockDetailCard",
            file: "common/proposal/ProposalStockDetailCard.vue",
            css: "common/proposal/ProposalStockDetailCard/ProposalStockDetailCard.css",
          },
          {
            name: "ProposalDeliveryMethod",
            file: "common/proposal/ProposalDeliveryMethod.vue",
            css: "common/proposal/ProposalDeliveryMethod/ProposalDeliveryMethod.css",
          },
          {
            name: "ProposalMessageEditor",
            file: "common/proposal/ProposalMessageEditor.vue",
            css: "common/proposal/ProposalMessageEditor/ProposalMessageEditor.css",
          },
        ],
      },
    ],
  },
  {
    name: "AI 매매신호 포착",
    file: "signals.vue",
    components: [
      {
        name: "TradingSignalCard",
        file: "signals/TradingSignalCard.vue",
        css: "pages/signals/TradingSignalCard/TradingSignalCard.css",
      },
      {
        name: "TradingSignalHistory",
        file: "signals/TradingSignalHistory.vue",
        css: "pages/signals/TradingSignalHistory/TradingSignalHistory.css",
      },
      {
        name: "AIReportContent",
        file: "signals/AIReportContent.vue",
        css: "pages/signals/AIReportContent/AIReportContent.css",
        children: [
          {
            name: "AIReportScore",
            file: "signals/modal/AIReportScore.vue",
            css: "pages/signals/AIReportScore/AIReportScore.css",
          },
          {
            name: "AIReportInvestment",
            file: "signals/modal/AIReportInvestment.vue",
            css: "pages/signals/AIReportInvestment/AIReportInvestment.css",
          },
          {
            name: "AIReportStockInfo",
            file: "signals/modal/AIReportStockInfo.vue",
            css: "pages/signals/AIReportStockInfo/AIReportStockInfo.css",
          },
          {
            name: "AIReportCustomerSend",
            file: "signals/modal/AIReportCustomerSend.vue",
            css: "pages/signals/AIReportCustomerSend/AIReportCustomerSend.css",
          },
        ],
      },
    ],
  },
  {
    name: "AI 인텔리전스 리포트",
    file: "discovery.vue",
    components: [
      {
        name: "AIReportCard",
        file: "discovery/AIReportCard.vue",
        css: "pages/discovery/AIReportCard/AIReportCard.css",
      },
      {
        name: "AIReportDetailModal",
        file: "discovery/AIReportDetailModal.vue",
        css: "pages/discovery/AIReportDetailModal/AIReportDetailModal.css",
      },
    ],
  },
  {
    name: "투자 정보",
    file: "investment.vue",
    components: [
      {
        name: "InvestmentIntelligenceCard",
        file: "investment/InvestmentIntelligenceCard.vue",
        css: "pages/investment/InvestmentIntelligenceCard/InvestmentIntelligenceCard.css",
      },
      {
        name: "BrokerReportCard",
        file: "investment/BrokerReportCard.vue",
        css: "pages/investment/BrokerReportCard/BrokerReportCard.css",
      },
    ],
  },
  {
    name: "AI 중장기 유망주",
    file: "strategic-stocks.vue",
    components: [
      {
        name: "StrategicStockCard",
        file: "strategic/StrategicStockCard.vue",
        css: "pages/strategic-stocks/StrategicStockCard/StrategicStockCard.css",
      },
      {
        name: "StrategicProposalModal",
        file: "strategic/StrategicProposalModal.vue",
        css: "pages/strategic-stocks/StrategicProposalModal/StrategicProposalModal.css",
        children: [
          {
            name: "StrategicClientList",
            file: "strategic/StrategicClientList.vue",
            css: "pages/strategic-stocks/StrategicClientList/StrategicClientList.css",
          },
          {
            name: "StrategicStockPreview",
            file: "strategic/StrategicStockPreview.vue",
            css: "pages/strategic-stocks/StrategicStockPreview/StrategicStockPreview.css",
          },
        ],
      },
    ],
  },
  {
    name: "AI 이슈 포착",
    file: "issues.vue",
    components: [
      {
        name: "IssueBubbleChart",
        file: "issues/IssueBubbleChart.vue",
        css: "pages/issues/IssueBubbleChart/IssueBubbleChart.css",
        logic: "D3.js 버블차트",
      },
      {
        name: "IssueDetailSection",
        file: "issues/IssueDetailSection.vue",
        css: "pages/issues/IssueDetailSection/IssueDetailSection.css",
        children: [
          {
            name: "IssueDetailStats",
            file: "issues/IssueDetailStats.vue",
            css: "pages/issues/IssueDetailStats/IssueDetailStats.css",
          },
          {
            name: "IssueDetailStockTable",
            file: "issues/IssueDetailStockTable.vue",
            css: "pages/issues/IssueDetailStockTable/IssueDetailStockTable.css",
          },
          {
            name: "IssueDetailAnalysis",
            file: "issues/IssueDetailAnalysis.vue",
            css: "pages/issues/IssueDetailAnalysis/IssueDetailAnalysis.css",
          },
          {
            name: "IssueDetailNews",
            file: "issues/IssueDetailNews.vue",
            css: "pages/issues/IssueDetailNews/IssueDetailNews.css",
          },
        ],
      },
      {
        name: "IssueAnalysisSide",
        file: "issues/IssueAnalysisSide.vue",
        css: "pages/issues/IssueAnalysisSide/IssueAnalysisSide.css",
      },
      {
        name: "IssueProposalModal",
        file: "issues/IssueProposalModal.vue",
        css: "pages/issues/IssueProposalModal/IssueProposalModal.css",
        children: [
          {
            name: "IssueProposalInfo",
            file: "issues/IssueProposalInfo.vue",
            css: "pages/issues/IssueProposalInfo/IssueProposalInfo.css",
          },
          {
            name: "IssueProposalForm",
            file: "issues/IssueProposalForm.vue",
            css: "pages/issues/IssueProposalForm/IssueProposalForm.css",
          },
          {
            name: "IssueProposalClients",
            file: "issues/IssueProposalClients.vue",
            css: "pages/issues/IssueProposalClients/IssueProposalClients.css",
          },
          {
            name: "IssueProposalContext",
            file: "issues/IssueProposalContext.vue",
            css: "pages/issues/IssueProposalContext/IssueProposalContext.css",
          },
          {
            name: "IssueProposalMethod",
            file: "issues/IssueProposalMethod.vue",
            css: "pages/issues/IssueProposalMethod/IssueProposalMethod.css",
          },
        ],
      },
    ],
  },
  {
    name: "고객 목록 (Client)",
    file: "clients.vue",
    components: [
      {
        name: "ClientUploadArea",
        file: "clients/ClientUploadArea.vue",
        css: "pages/clients/ClientUploadArea/ClientUploadArea.css",
      },
      {
        name: "ClientAiSearch",
        file: "clients/ClientAiSearch.vue",
        css: "pages/clients/ClientAiSearch/ClientAiSearch.css",
        logic: "autocompleter 라이브러리",
      },
      {
        name: "ClientListTable",
        file: "clients/ClientListTable.vue",
        css: "pages/clients/ClientListTable/ClientListTable.css",
      },
      {
        name: "ClientHoldingsModal",
        file: "clients/ClientHoldingsModal.vue",
        css: "pages/clients/ClientHoldingsModal/ClientHoldingsModal.css",
        children: [
          {
            name: "ClientHoldingsTable",
            file: "clients/ClientHoldingsTable.vue",
            css: "pages/clients/ClientHoldingsTable/ClientHoldingsTable.css",
          },
          {
            name: "ClientHoldingsSummary",
            file: "clients/ClientHoldingsSummary.vue",
            css: "pages/clients/ClientHoldingsSummary/ClientHoldingsSummary.css",
          },
          {
            name: "ClientHoldingsAnalysis",
            file: "clients/ClientHoldingsAnalysis.vue",
            css: "pages/clients/ClientHoldingsAnalysis/ClientHoldingsAnalysis.css",
          },
        ],
      },
      {
        name: "ClientInfoModal",
        file: "clients/ClientInfoModal.vue",
        css: "pages/clients/ClientInfoModal/ClientInfoModal.css",
        children: [
          {
            name: "ClientInfoHeader",
            file: "clients/ClientInfoHeader.vue",
            css: "pages/clients/ClientInfoHeader/ClientInfoHeader.css",
          },
          {
            name: "ClientInfoContent",
            file: "clients/ClientInfoContent.vue",
            css: "pages/clients/ClientInfoContent/ClientInfoContent.css",
          },
        ],
      },
      {
        name: "SmartOnboardingModal",
        file: "clients/SmartOnboardingModal.vue",
        css: "pages/clients/SmartOnboardingModal/SmartOnboardingModal.css",
        children: [
          {
            name: "SmartOnboardingExtract",
            file: "clients/SmartOnboardingExtract.vue",
            css: "pages/clients/SmartOnboardingExtract/SmartOnboardingExtract.css",
          },
          {
            name: "SmartOnboardingForm",
            file: "clients/SmartOnboardingForm.vue",
            css: "pages/clients/SmartOnboardingForm/SmartOnboardingForm.css",
          },
        ],
      },
    ],
  },
  {
    name: "고객 목록 (Customer)",
    file: "customers.vue",
    components: [
      {
        name: "CustomerAiSearch",
        file: "customers/CustomerAiSearch.vue",
        css: "pages/customers/CustomerAiSearch/CustomerAiSearch.css",
        logic: "autocompleter 라이브러리",
      },
      {
        name: "CustomerListTable",
        file: "customers/CustomerListTable.vue",
        css: "pages/customers/CustomerListTable/CustomerListTable.css",
      },
      {
        name: "CustomerHoldingsModal",
        file: "customers/CustomerHoldingsModal.vue",
        css: "pages/customers/CustomerHoldingsModal/CustomerHoldingsModal.css",
      },
      {
        name: "CustomerDetailModal",
        file: "customers/CustomerDetailModal.vue",
        css: "pages/customers/CustomerDetailModal/CustomerDetailModal.css",
        children: [
          {
            name: "CustomerDetailInfo",
            file: "customers/CustomerDetailInfo.vue",
            css: "pages/customers/CustomerDetailModal/CustomerDetailInfo.css",
          },
          {
            name: "CustomerDetailStats",
            file: "customers/CustomerDetailStats.vue",
            css: "pages/customers/CustomerDetailModal/CustomerDetailStats.css",
          },
          {
            name: "CustomerDetailHoldings",
            file: "customers/CustomerDetailHoldings.vue",
            css: "pages/customers/CustomerDetailModal/CustomerDetailHoldings.css",
          },
          {
            name: "CustomerDetailAnalysis",
            file: "customers/CustomerDetailAnalysis.vue",
            css: "pages/customers/CustomerDetailModal/CustomerDetailAnalysis.css",
          },
        ],
      },
    ],
  },
  {
    name: "일정 관리",
    file: "schedule.vue",
    components: [
      {
        name: "ScheduleHeader",
        file: "schedule/ScheduleHeader.vue",
        css: "pages/schedule/ScheduleHeader/ScheduleHeader.css",
      },
      {
        name: "ScheduleSidebar",
        file: "schedule/ScheduleSidebar.vue",
        css: "pages/schedule/ScheduleSidebar/ScheduleSidebar.css",
      },
      {
        name: "ScheduleWeekView",
        file: "schedule/ScheduleWeekView.vue",
        css: "pages/schedule/ScheduleWeekView/ScheduleWeekView.css",
      },
      {
        name: "ScheduleMonthView",
        file: "schedule/ScheduleMonthView.vue",
        css: "pages/schedule/ScheduleMonthView/ScheduleMonthView.css",
      },
      {
        name: "ScheduleDayView",
        file: "schedule/ScheduleDayView.vue",
        css: "pages/schedule/ScheduleDayView/ScheduleDayView.css",
      },
      {
        name: "SchedulePlaceholder",
        file: "schedule/SchedulePlaceholder.vue",
        css: "pages/schedule/SchedulePlaceholder/SchedulePlaceholder.css",
      },
      {
        name: "ScheduleSyncModal",
        file: "schedule/ScheduleSyncModal.vue",
        css: "pages/schedule/ScheduleSyncModal/ScheduleSyncModal.css",
      },
    ],
  },
  {
    name: "설정",
    file: "settings.vue",
    components: [
      {
        name: "SettingsAccountSection",
        file: "settings/SettingsAccountSection.vue",
        css: "pages/settings/SettingsAccountSection/SettingsAccountSection.css",
      },
      {
        name: "SettingsBillingInfo",
        file: "settings/SettingsBillingInfo.vue",
        css: "pages/settings/SettingsBillingInfo/SettingsBillingInfo.css",
      },
      {
        name: "SettingsPlanCard",
        file: "settings/SettingsPlanCard.vue",
        css: "pages/settings/SettingsPlanCard/SettingsPlanCard.css",
      },
    ],
  },
];
