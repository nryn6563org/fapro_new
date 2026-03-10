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
    desc: "애플리케이션의 전체적인 틀을 담당하며, 사이드바와 모달 관리자 등 공통 요소를 포함합니다.",
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
            desc: "메인 메뉴 및 서브 메뉴 항목들을 렌더링하는 내비게이션 바 컴포넌트입니다."
          },
          {
            name: "AppSidebarUser",
            file: "layout/AppSidebarUser.vue",
            css: "layout/AppSidebarUser/AppSidebarUser.css",
            desc: "사용자 프로필 이미지, 이름 및 설정 바를 포함하는 사용자 인터페이스입니다."
          }
        ]
      },
      {
        name: "GlobalModalManager",
        file: "modal/GlobalModalManager.vue",
        css: "modal/GlobalModalManager/GlobalModalManager.css",
        logic: "modal-vanilla 이벤트버스 통합"
      },
      {
        name: "ModalVanilla",
        file: "modal/ModalVanilla.vue",
        css: "modal/ModalVanilla/ModalVanilla.css",
        logic: "modal-vanilla Vue 래퍼"
      }
    ]
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
        desc: "금일의 추천 고객 및 종목 제안을 요약하여 보여주는 카드 형태의 위젯입니다.",
        children: [
          {
            name: "TodayProposalModal",
            file: "dashboard/TodayProposalModal.vue",
            css: "pages/index/TodayProposalModal/TodayProposalModal.css",
            desc: "추천 사유 및 제안 상세 내용을 팝업 형태로 제공합니다."
          }
        ]
      },
      {
        name: "CustomerIntelligenceCard",
        file: "dashboard/CustomerIntelligenceCard.vue",
        css: "pages/index/CustomerIntelligenceCard/CustomerIntelligenceCard.css",
        api: "utils/mockData.js (customerIntelligence)"
      },
      {
        name: "ContactProposalModal",
        file: "common/proposal/ContactProposalModal.vue",
        css: "common/proposal/ContactProposalModal/ContactProposalModal.css",
        desc: "고객에게 연락을 취하기 전, 제안 내용을 편집하고 발송 수단을 선택하는 통합 모달입니다.",
        children: [
          {
            name: "ProposalHeader",
            file: "common/proposal/ProposalHeader.vue",
            css: "common/proposal/ProposalHeader/ProposalHeader.css",
            desc: "제안서의 제목 및 관리 도구를 포함하는 상단 영역입니다."
          },
          {
            name: "ProposalCustomerSection",
            file: "common/proposal/ProposalCustomerSection.vue",
            css: "common/proposal/ProposalCustomerSection/ProposalCustomerSection.css",
            desc: "대상 고객의 기본 정보 및 연락처를 표시합니다."
          },
          {
            name: "ProposalStockSection",
            file: "common/proposal/ProposalStockSection.vue",
            css: "common/proposal/ProposalStockSection/ProposalStockSection.css",
            desc: "제안할 종목들의 리스트와 핵심 지표를 요약하여 보여줍니다."
          },
          {
            name: "ProposalStockDetailCard",
            file: "common/proposal/ProposalStockDetailCard.vue",
            css: "common/proposal/ProposalStockDetailCard/ProposalStockDetailCard.css",
            desc: "차트 및 정밀 분석 데이터를 포함한 개별 종목의 상세 분석 카드입니다."
          },
          {
            name: "ProposalDeliveryMethod",
            file: "common/proposal/ProposalDeliveryMethod.vue",
            css: "common/proposal/ProposalDeliveryMethod/ProposalDeliveryMethod.css",
            desc: "알림톡, 문자, 이메일 등 발송 수단을 결정하는 설정부입니다."
          },
          {
            name: "ProposalMessageEditor",
            file: "common/proposal/ProposalMessageEditor.vue",
            css: "common/proposal/ProposalMessageEditor/ProposalMessageEditor.css",
            desc: "고객에게 전달될 메시지 본문을 직접 편집하거나 템플릿을 선택하는 에디터입니다."
          }
        ]
      }
    ]
  },
  {
    name: "AI 매매신호 포착",
    file: "signals.vue",
    desc: "실시간 AI 매매 신호 현황 및 상세 분석 정보를 제공하는 대시보드 페이지입니다.",
    components: [
      {
        name: "SignalsPageHeader",
        file: "signals/SignalsPage/SignalsPageHeader.vue",
        css: "pages/signals/SignalsPage/SignalsPage.css",
        desc: "신호 발생 시각 및 데이터 갱신을 제어하는 상단 헤더입니다."
      },
      {
        name: "SignalsPageSignalColumn",
        file: "signals/SignalsPage/SignalsPageSignalColumn.vue",
        css: "pages/signals/SignalsPage/SignalsPage.css",
        desc: "매수/매도 각 유형별 신호 카드 목록을 관리하는 컬럼 영역입니다.",
        children: [
          {
            name: "TradingSignalCard",
            file: "signals/TradingSignalCard.vue",
            css: "pages/signals/TradingSignalCard/TradingSignalCard.css",
            desc: "개별 매수/매도 신호의 간략 정보와 발생 사유를 표시하는 카드 컴포넌트입니다."
          },
          {
            name: "TradingSignalHistory",
            file: "signals/TradingSignalHistory.vue",
            css: "pages/signals/TradingSignalHistory/TradingSignalHistory.css",
            desc: "해당 종목의 과거 매매 이력 리스트입니다."
          }
        ]
      },
      {
        name: "AIReportModal",
        file: "modal/AIReportModal.vue",
        css: "pages/signals/SignalsPage/SignalsPage.css",
        desc: "종합적인 AI 리포트를 팝업 형태로 보여주는 상세 모달입니다.",
        children: [
          {
            name: "AIReportContent",
            file: "signals/AIReportContent.vue",
            css: "pages/signals/AIReportContent/AIReportContent.css",
            desc: "스코어, 투자 의견, 종목 정보 등 리포트의 핵심 내용을 레이아웃팅합니다."
          }
        ]
      },
      {
        name: "AIAnalysisReportModal",
        file: "modal/AIAnalysisReportModal.vue",
        css: "pages/signals/AIAnalysisReportModal/AIAnalysisReportModal.css",
        logic: "종합 의견 및 대응 전략 상세 모달",
        desc: "기술적 분석 및 재무 펀더멘털을 바탕으로 한 AI의 구체적인 대응 전략을 담은 신규 모달입니다."
      }
    ]
  },
  {
    name: "AI 인텔리전스 리포트",
    file: "discovery.vue",
    desc: "AI가 분석한 유망 종목 리스트와 상세 인텔리전스 리포트를 제공하는 페이지입니다.",
    components: [
      {
        name: "AIReportCard",
        file: "discovery/AIReportCard.vue",
        css: "pages/discovery/AIReportCard/AIReportCard.css",
        desc: "종목명, 수익률, 분석 요약 등 리포트의 핵심 정보를 시각화한 카드입니다."
      },
      {
        name: "AIReportDetailModal",
        file: "discovery/AIReportDetailModal.vue",
        css: "pages/discovery/AIReportDetailModal/AIReportDetailModal.css",
        desc: "리포트 전체 내용과 심층 분석 데이터를 제공하는 상세 보기 모달입니다."
      }
    ]
  },
  {
    name: "투자 정보",
    file: "investment.vue",
    desc: "글로벌 증시 현황 및 브로커 리포트 등 투자에 필수적인 외부 정보를 집계합니다.",
    components: [
      {
        name: "InvestmentIntelligenceCard",
        file: "investment/InvestmentIntelligenceCard.vue",
        css: "pages/investment/InvestmentIntelligenceCard/InvestmentIntelligenceCard.css",
        desc: "거시 경제 지표 및 주요 지수 변동 사항을 요약 표시합니다."
      },
      {
        name: "BrokerReportCard",
        file: "investment/BrokerReportCard.vue",
        css: "pages/investment/BrokerReportCard/BrokerReportCard.css",
        desc: "주요 증권사에서 발행한 리포트와 전문가 분석 리스트입니다."
      }
    ]
  },
  {
    name: "AI 중장기 유망주",
    file: "strategic-stocks.vue",
    desc: "AI가 선별한 중장기 관점의 우량주와 투자 제안 기능을 제공하는 페이지입니다.",
    components: [
      {
        name: "StrategicStockCard",
        file: "strategic/StrategicStockCard.vue",
        css: "pages/strategic-stocks/StrategicStockCard/StrategicStockCard.css",
        desc: "AI가 계산한 중장기 목표가 및 기대 수익률을 포함한 종목 카드입니다."
      },
      {
        name: "StrategicProposalModal",
        file: "strategic/StrategicProposalModal.vue",
        css: "pages/strategic-stocks/StrategicProposalModal/StrategicProposalModal.css",
        desc: "우량주 기반의 맞춤형 투자 제안서를 구성하고 발송하는 모달입니다.",
        children: [
          {
            name: "StrategicClientList",
            file: "strategic/StrategicClientList.vue",
            css: "pages/strategic-stocks/StrategicClientList/StrategicClientList.css",
            desc: "해당 종목을 제안하기 적합한 타겟 고객 리스트입니다."
          },
          {
            name: "StrategicStockPreview",
            file: "strategic/StrategicStockPreview.vue",
            css: "pages/strategic-stocks/StrategicStockPreview/StrategicStockPreview.css",
            desc: "고객에게 발송될 제안 내용의 최종 프레젠테이션 프리뷰입니다."
          }
        ]
      }
    ]
  },
  {
    name: "AI 이슈 포착",
    file: "issues.vue",
    desc: "시장 이슈를 실시간으로 분석하고 관련 종목 및 통계 정보를 시각화하여 제공합니다.",
    components: [
      {
        name: "IssueBubbleChart",
        file: "issues/IssueBubbleChart.vue",
        css: "pages/issues/IssueBubbleChart/IssueBubbleChart.css",
        logic: "D3.js 버블차트",
        desc: "시장 이슈의 영향력과 연관성을 직관적으로 보여주는 D3 기반 시각화 차트입니다."
      },
      {
        name: "IssueDetailSection",
        file: "issues/IssueDetailSection.vue",
        css: "pages/issues/IssueDetailSection/IssueDetailSection.css",
        desc: "선택된 이슈에 대한 통계, 뉴스, 종목 리스트를 아우르는 상세 정보 영역입니다.",
        children: [
          {
            name: "IssueDetailStats",
            file: "issues/IssueDetailStats.vue",
            css: "pages/issues/IssueDetailStats/IssueDetailStats.css",
            desc: "이슈 등락률 및 4단계 강도(최저, 저, 중, 고) 시각화 지표입니다. 등락률 색상은 강도에 맞춰 동기화됩니다."
          },
          {
            name: "IssueDetailStockTable",
            file: "issues/IssueDetailStockTable.vue",
            css: "pages/issues/IssueDetailStockTable/IssueDetailStockTable.css",
            desc: "연관 종목 데이터 테이블입니다. 데이터 개수와 관계없이 항상 5개 행(빈 영역 포함)을 유지합니다."
          },
          {
            name: "IssueDetailAnalysis",
            file: "issues/IssueDetailAnalysis.vue",
            css: "pages/issues/IssueDetailAnalysis/IssueDetailAnalysis.css",
            desc: "이슈 발생 원인과 향후 전망에 대한 AI의 분석 리포트입니다."
          },
          {
            name: "IssueDetailNews",
            file: "issues/IssueDetailNews.vue",
            css: "pages/issues/IssueDetailNews/IssueDetailNews.css",
            desc: "이슈와 관련된 실시간 뉴스 클리핑 리스트입니다."
          }
        ]
      },
      {
        name: "IssueAnalysisSide",
        file: "issues/IssueAnalysisSide.vue",
        css: "pages/issues/IssueAnalysisSide/IssueAnalysisSide.css",
        desc: "이슈 상세 분석 사이드 패널입니다. 4단계 강도 지표와 동기화된 등락률 색상을 표시합니다."
      },
      {
        name: "IssueProposalModal",
        file: "issues/IssueProposalModal.vue",
        css: "pages/issues/IssueProposalModal/IssueProposalModal.css",
        desc: "이슈 관련 종목을 고객들에게 발송하기 위해 설계된 전용 제안 모달입니다.",
        children: [
          {
            name: "IssueProposalInfo",
            file: "issues/IssueProposalInfo.vue",
            css: "pages/issues/IssueProposalInfo/IssueProposalInfo.css",
            desc: "제안의 근거가 되는 이슈 요약 카드입니다. 4단계 강도와 등락률 색상 동기화 패치 버전이 적용되었습니다."
          },
          {
            name: "IssueProposalForm",
            file: "issues/IssueProposalForm.vue",
            css: "pages/issues/IssueProposalForm/IssueProposalForm.css",
            desc: "제안 메시지와 타겟 설정을 위한 입력 폼입니다."
          },
          {
            name: "IssueProposalClients",
            file: "issues/IssueProposalClients.vue",
            css: "pages/issues/IssueProposalClients/IssueProposalClients.css",
            desc: "이슈에 관심이 높을 것으로 예상되는 고객 추천 리스트입니다."
          },
          {
            name: "IssueProposalContext",
            file: "issues/IssueProposalContext.vue",
            css: "pages/issues/IssueProposalContext/IssueProposalContext.css",
            desc: "고객에게 전달될 제안서의 전체적인 맥락과 구성을 설정합니다."
          },
          {
            name: "IssueProposalMethod",
            file: "issues/IssueProposalMethod.vue",
            css: "pages/issues/IssueProposalMethod/IssueProposalMethod.css",
            desc: "최종 발송 방식 및 스케줄링을 관리합니다."
          }
        ]
      }
    ]
  },
  {
    name: "고객 목록 (Client)",
    file: "clients.vue",
    desc: "잠재 또는 기존 고객 리스트를 통합 관리하고 상세 정보를 탐색하는 페이지입니다.",
    components: [
      {
        name: "ClientUploadArea",
        file: "clients/ClientUploadArea.vue",
        css: "pages/clients/ClientUploadArea/ClientUploadArea.css",
        desc: "고객 데이터(엑셀 등)를 업로드하여 시스템에 등록하는 영역입니다."
      },
      {
        name: "ClientAiSearch",
        file: "clients/ClientAiSearch.vue",
        css: "pages/clients/ClientAiSearch/ClientAiSearch.css",
        logic: "autocompleter 라이브러리",
        desc: "AI 기반의 초고속 고객 검색 및 필터링 도구입니다."
      },
      {
        name: "ClientListTable",
        file: "clients/ClientListTable.vue",
        css: "pages/clients/ClientListTable/ClientListTable.css",
        desc: "등록된 고객의 핵심 정보를 일괄 표시하는 메인 테이블입니다."
      },
      {
        name: "ClientHoldingsModal",
        file: "clients/ClientHoldingsModal.vue",
        css: "pages/clients/ClientHoldingsModal/ClientHoldingsModal.css",
        desc: "특정 고객의 전반적인 자산 보유 현황과 수익률 분석을 제공하는 모달입니다.",
        children: [
          {
            name: "ClientHoldingsTable",
            file: "clients/ClientHoldingsTable.vue",
            css: "pages/clients/ClientHoldingsTable/ClientHoldingsTable.css",
            desc: "고객이 보유한 개별 종목들의 상세 리스트입니다."
          },
          {
            name: "ClientHoldingsSummary",
            file: "clients/ClientHoldingsSummary.vue",
            css: "pages/clients/ClientHoldingsSummary/ClientHoldingsSummary.css",
            desc: "총 자산, 평가 손익 등 주요 지표를 시각화하여 요약합니다."
          },
          {
            name: "ClientHoldingsAnalysis",
            file: "clients/ClientHoldingsAnalysis.vue",
            css: "pages/clients/ClientHoldingsAnalysis/ClientHoldingsAnalysis.css",
            desc: "보유 종목의 포트폴리오 비중 및 위험도를 AI가 분석합니다."
          }
        ]
      },
      {
        name: "ClientInfoModal",
        file: "clients/ClientInfoModal.vue",
        css: "pages/clients/ClientInfoModal/ClientInfoModal.css",
        desc: "고객의 개인 프로필 및 상세 거래 이력을 보여주는 창입니다.",
        children: [
          {
            name: "ClientInfoHeader",
            file: "clients/ClientInfoHeader.vue",
            css: "pages/clients/ClientInfoHeader/ClientInfoHeader.css",
            desc: "성명, 등급, 최근 접촉일 등 기본 프로필 헤더입니다."
          },
          {
            name: "ClientInfoContent",
            file: "clients/ClientInfoContent.vue",
            css: "pages/clients/ClientInfoContent/ClientInfoContent.css",
            desc: "상담 내역, 개인 메모 등 상세 정보가 포함된 탭 영역입니다."
          }
        ]
      },
      {
        name: "SmartOnboardingModal",
        file: "clients/SmartOnboardingModal.vue",
        css: "pages/clients/SmartOnboardingModal/SmartOnboardingModal.css",
        desc: "AI를 활용해 고객의 외부 자산 데이터를 자동으로 추출하고 등록을 돕는 온보딩 툴입니다.",
        children: [
          {
            name: "SmartOnboardingExtract",
            file: "clients/SmartOnboardingExtract.vue",
            css: "pages/clients/SmartOnboardingExtract/SmartOnboardingExtract.css",
            desc: "이미지나 텍스트에서 데이터를 인식하고 정규화하는 과정입니다."
          },
          {
            name: "SmartOnboardingForm",
            file: "clients/SmartOnboardingForm.vue",
            css: "pages/clients/SmartOnboardingForm/SmartOnboardingForm.css",
            desc: "추출된 데이터를 확인하고 최종 등록하기 위한 편집 폼입니다."
          }
        ]
      }
    ]
  },
  {
    name: "고객 목록 (Customer)",
    file: "customers.vue",
    desc: "관리 중인 고객 리스트와 각 고객별 보유 종목 및 성과를 관리하는 페이지입니다.",
    components: [
      {
        name: "CustomerAiSearch",
        file: "customers/CustomerAiSearch.vue",
        css: "pages/customers/CustomerAiSearch/CustomerAiSearch.css",
        logic: "autocompleter 라이브러리",
        desc: "보유 고객 DB에서 이름, 연락처 등으로 빠르게 대상을 찾는 AI 검색 바입니다."
      },
      {
        name: "CustomerListTable",
        file: "customers/CustomerListTable.vue",
        css: "pages/customers/CustomerListTable/CustomerListTable.css",
        desc: "관리 중인 모든 고객의 수익률, 자산 규모 등을 한눈에 비교하는 메인 리스트입니다."
      },
      {
        name: "CustomerHoldingsModal",
        file: "customers/CustomerHoldingsModal.vue",
        css: "pages/customers/CustomerHoldingsModal/CustomerHoldingsModal.css",
        desc: "개별 고객이 현재 보유 중인 종목군의 상세 성과와 포트폴리오 구성을 심층 분석하는 모달입니다."
      },
      {
        name: "CustomerDetailModal",
        file: "customers/CustomerDetailModal.vue",
        css: "pages/customers/CustomerDetailModal/CustomerDetailModal.css",
        desc: "고객의 개인화된 금융 리포트와 히스토리를 종합적으로 제공하는 상세 정보 인터페이스입니다.",
        children: [
          {
            name: "CustomerDetailInfo",
            file: "customers/CustomerDetailInfo.vue",
            css: "pages/customers/CustomerDetailModal/CustomerDetailInfo.css",
            desc: "고객의 직업, 선호 투자 성향 및 기본 인적 사항입니다."
          },
          {
            name: "CustomerDetailStats",
            file: "customers/CustomerDetailStats.vue",
            css: "pages/customers/CustomerDetailModal/CustomerDetailStats.css",
            desc: "누적 수익 기록, 상담 횟수 등 활동 통계 데이터입니다."
          },
          {
            name: "CustomerDetailHoldings",
            file: "customers/CustomerDetailHoldings.vue",
            css: "pages/customers/CustomerDetailModal/CustomerDetailHoldings.css",
            desc: "보유 종목별 매수평단가 및 개별 종목 성과 지표입니다."
          },
          {
            name: "CustomerDetailAnalysis",
            file: "customers/CustomerDetailAnalysis.vue",
            css: "pages/customers/CustomerDetailModal/CustomerDetailAnalysis.css",
            desc: "고객 포트폴리오의 안정성과 향후 투자 방향에 대한 전문가 제언입니다."
          }
        ]
      }
    ]
  },
  {
    name: "일정 관리",
    file: "schedule.vue",
    desc: "상담 일정 및 주요 금융 일정을 캘린더 형태로 관리하는 기능입니다.",
    components: [
      {
        name: "ScheduleHeader",
        file: "schedule/ScheduleHeader.vue",
        css: "pages/schedule/ScheduleHeader/ScheduleHeader.css",
        desc: "연/월 이동 및 보기 모드(일/주/월)를 전환하는 상단 컨트롤러입니다."
      },
      {
        name: "ScheduleSidebar",
        file: "schedule/ScheduleSidebar.vue",
        css: "pages/schedule/ScheduleSidebar/ScheduleSidebar.css",
        desc: "미니 캘린더와 일정 카테고리 필터링 기능을 제공하는 사이드 바입니다."
      },
      {
        name: "ScheduleWeekView",
        file: "schedule/ScheduleWeekView.vue",
        css: "pages/schedule/ScheduleWeekView/ScheduleWeekView.css",
        desc: "현재 주의 일정을 1시간 단위의 타임라인으로 보여주는 주간 보기 화면입니다."
      },
      {
        name: "ScheduleMonthView",
        file: "schedule/ScheduleMonthView.vue",
        css: "pages/schedule/ScheduleMonthView/ScheduleMonthView.css",
        desc: "한 달간의 전체 일정을 격자 형태로 조망하는 월간 보기 화면입니다."
      },
      {
        name: "ScheduleDayView",
        file: "schedule/ScheduleDayView.vue",
        css: "pages/schedule/ScheduleDayView/ScheduleDayView.css",
        desc: "특정 일의 세부 일정을 집중적으로 관리하는 일간 보기 화면입니다."
      },
      {
        name: "SchedulePlaceholder",
        file: "schedule/SchedulePlaceholder.vue",
        css: "pages/schedule/SchedulePlaceholder/SchedulePlaceholder.css",
        desc: "일정 로딩 중이거나 데이터가 없을 때 표시되는 빈 화면 플레이스홀더입니다."
      },
      {
        name: "ScheduleSyncModal",
        file: "schedule/ScheduleSyncModal.vue",
        css: "pages/schedule/ScheduleSyncModal/ScheduleSyncModal.css",
        desc: "외부 캘린더(Google, Outlook 등)와의 일정 동기화를 설정하는 모달입니다."
      }
    ]
  },
  {
    name: "설정",
    file: "settings.vue",
    desc: "사용자 계정 정보, 알림 수신 설정 및 결제 플랜을 관리하는 공간입니다.",
    components: [
      {
        name: "SettingsAccountSection",
        file: "settings/SettingsAccountSection.vue",
        css: "pages/settings/SettingsAccountSection/SettingsAccountSection.css",
        desc: "이름, 비밀번호, 프로필 사진 등 기본적인 계정 정보를 수정합니다."
      },
      {
        name: "SettingsBillingInfo",
        file: "settings/SettingsBillingInfo.vue",
        css: "pages/settings/SettingsBillingInfo/SettingsBillingInfo.css",
        desc: "결제 카드 관리 및 이전 결제 내역을 확인하는 섹션입니다."
      },
      {
        name: "SettingsPlanCard",
        file: "settings/SettingsPlanCard.vue",
        css: "pages/settings/SettingsPlanCard/SettingsPlanCard.css",
        desc: "현재 이용 중인 멤버십 플랜 정보와 업그레이드 옵션을 안내합니다."
      }
    ]
  }
];
