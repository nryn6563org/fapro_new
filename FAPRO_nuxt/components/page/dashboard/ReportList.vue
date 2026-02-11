<template>
  <div class="c-report-list">
    <div class="c-report-list__header">
      <div class="c-report-list__title-group">
        <FileText class="c-report-list__icon" :size="18" />
        <h3 class="c-report-list__title">AI리포트 생성 종목</h3>
      </div>
      <div class="c-report-list__info">
        <span class="c-report-list__time">08:45</span>
        <button class="c-report-list__refresh">
          <RefreshCw :size="14" />
        </button>
      </div>
    </div>

    <div class="c-report-list__body">
      <div class="c-report-row__container">
        <div v-for="report in reports" :key="report.id" class="c-report-row">
          <div class="c-report-row__inner">
            <div class="c-report-row__info">
              <div class="c-report-row__header-group">
                <span class="c-report-row__name">{{ report.name }}</span>
                <span class="c-report-row__change" :class="report.change >= 0 ? 'c-report-row__change--up' : 'c-report-row__change--down'"> {{ report.change >= 0 ? "+" : "" }}{{ report.change }}% </span>
              </div>
              <p class="c-report-row__description">{{ report.description }}</p>
              <span class="c-report-row__date">{{ report.date }} {{ report.time }}</span>
            </div>

            <div class="c-report-row__actions">
              <button class="c-btn-action c-btn-action--primary"><TrendingUp :size="12" /> 투자인사이트</button>
              <button class="c-btn-action c-btn-action--outline" @click="openReportModal(report)"><FileText :size="12" /> AI리포트</button>
              <button class="c-btn-action c-btn-action--outline"><Volume2 :size="12" /> 듣기</button>
              <button class="c-btn-action c-btn-action--outline" @click="openSummaryModal(report)"><FileText :size="12" /> 요약</button>
              <button class="c-btn-action c-btn-action--outline" @click="openCustomerModal(report)"><User :size="12" /> 고객</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="c-report-list__footer">
      <button class="c-report-list__more-btn">더보기</button>
    </div>

    <!-- Modals -->
    <StockReportModal
      :is-open="activeModal === 'report'"
      :stock-name="selectedReport?.name"
      :stock-code="selectedReport?.code"
      :report="selectedReport"
      @close="closeModal"
    />

    <ReportSummaryModal
      :is-open="activeModal === 'summary'"
      :stock-name="selectedReport?.name"
      :stock-code="selectedReport?.code"
      :summary="selectedReport?.summary"
      :reason="selectedReport?.reason"
      @close="closeModal"
    />

    <RelatedCustomersModal
      :is-open="activeModal === 'customers'"
      :stock-name="selectedReport?.name"
      :stock-code="selectedReport?.code"
      :customers="[]" 
      @close="closeModal"
    />
  </div>
</template>

<script>
import { FileText, Volume2, ClipboardList, User, RefreshCw, TrendingUp } from "lucide-vue";
import StockReportModal from '@/components/modal/StockReportModal.vue';
import ReportSummaryModal from '@/components/modal/ReportSummaryModal.vue';
import RelatedCustomersModal from '@/components/modal/RelatedCustomersModal.vue';

export default {
  name: "DashboardReportList",
  components: { 
    FileText, 
    Volume2, 
    ClipboardList, 
    User, 
    RefreshCw, 
    TrendingUp, 
    StockReportModal,
    ReportSummaryModal,
    RelatedCustomersModal
  },
  data() {
    return {
      activeModal: null, // null, 'report', 'summary', 'customers'
      selectedReport: null,
      reports: [
        { 
          id: 1, 
          name: "삼성전자", 
          code: "005930", 
          change: 2.3, 
          description: "반도체 업황 회복과 AI 수요 증가로 실적 개선 전망", 
          date: "01-30", 
          time: "14:23", 
          type: "AI",
          // Modal Data
          summary: '반도체 업황 회복과 AI 수요 증가로 인해 향후 실적 개선이 뚜렷할 것으로 전망됩니다.',
          marketTrends: '글로벌 AI 칩 수요 폭발 및 HBM3 시장 선점으로 인한 우호적인 시장 환경이 조성되고 있습니다.',
          financialAnalysis: '1분기 영업이익은 전년 동기 대비 약 150% 증가한 6조 원대를 기록할 것으로 예상되며, 고부가가치 제품 비중 확대로 이익률이 개선될 것입니다.',
          investmentOpinion: '투자의견 BUY 유지 및 목표주가 85,000원으로 상향 조정합니다.',
          riskFactors: '글로벌 경기 침체 우려 및 규제 이슈가 잠재적 리스크로 작용할 수 있습니다.',
          reason: "HBM3 메모리 수요 급증으로 실적 개선 전망"
        },
        { 
          id: 2, 
          name: "현대차", 
          code: "005380", 
          change: -1.2, 
          description: "전기차 시장 둔화 우려, 하지만 신규 모델 출시로 반등 기대", 
          date: "01-30", 
          time: "11:15", 
          type: "Tech",
          // Modal Data
          summary: '전기차 시장 성장 둔화에도 불구하고, 하이브리드 판매 호조와 신규 EV 라인업 확대로 실적 방어가 예상됩니다.',
          marketTrends: '글로벌 완성차 시장의 경쟁 심화와 전기차 보조금 축소 이슈가 있으나, SUV 및 제네시스 브랜드의 판매량이 견고합니다.',
          financialAnalysis: '매출액은 소폭 증가할 것으로 보이나, 마케팅 비용 증가로 영업이익률은 다소 하락할 가능성이 있습니다.',
          investmentOpinion: '투자의견 BUY 유지, 목표주가 280,000원. 저평가 매력과 배당 매력이 여전히 유효합니다.',
          riskFactors: '환율 변동성 및 원자재 가격 상승이 수익성에 부정적인 영향을 줄 수 있습니다.',
          reason: "전기차 판매 둔화로 단기 실적 부담 우려"
        },
        { 
          id: 3, 
          name: "NAVER", 
          code: "035420", 
          change: -0.5, 
          description: "검색 플랫폼 안정성과 AI 투자로 장기 성장 동력 확보", 
          date: "01-29", 
          time: "16:47", 
          type: "AI",
          // Modal Data
          summary: '광고 시장 회복 지연에도 불구하고, 커머스 부문의 성장과 AI 기술 도입을 통한 비용 효율화가 진행 중입니다.',
          marketTrends: '생성형 AI 검색 서비스 도입과 숏폼 콘텐츠 강화로 플랫폼 경쟁력을 높이고 있습니다.',
          financialAnalysis: '비용 통제 노력으로 영업이익은 시장 컨센서스를 부합할 것으로 예상됩니다.',
          investmentOpinion: '투자의견 HOLD, 목표주가 230,000원. AI 사업의 구체적인 수익화 모델 확인이 필요합니다.',
          riskFactors: '플랫폼 규제 법안 발의 및 경쟁 플랫폼의 약진이 리스크 요인입니다.',
          reason: "검색광고 안정성과 AI 투자 확대"
        },
        { 
          id: 4, 
          name: "카카오", 
          code: "035720", 
          change: 3.1, 
          description: "플랫폼 광고 매출 호조, 게임 부문 실적 개선 지속", 
          date: "01-29", 
          time: "09:20", 
          type: "News",
          // Modal Data
          summary: '톡비즈 매출의 견조한 성장과 비용 절감 효과가 가시화되고 있으며, 계열사 경영 쇄신 노력이 긍정적입니다.',
          marketTrends: '오픈채팅 기반의 광고 수익 모델 강화와 헬스케어 등 신사업 확장이 기대됩니다.',
          financialAnalysis: '지난해 기저효과로 영업이익의 큰 폭 개선이 예상되며, 순이익 흑자 전환이 기대됩니다.',
          investmentOpinion: '투자의견 BUY, 목표주가 65,000원. 사법 리스크 해소 과정과 실적 개선 속도가 주가 반등의 열쇠입니다.',
          riskFactors: '경영진 사법 리스크 및 골목상권 침해 논란 지속 가능성이 있습니다.',
          reason: "플랫폼 광고 매출 호조"
        }
      ]
    };
  },
  methods: {
    openReportModal(report) {
      this.selectedReport = report;
      this.activeModal = 'report';
    },
    openSummaryModal(report) {
      this.selectedReport = report;
      this.activeModal = 'summary';
    },
    openCustomerModal(report) {
      this.selectedReport = report;
      this.activeModal = 'customers';
    },
    closeModal() {
      this.activeModal = null;
      this.selectedReport = null;
    }
  }
};
</script>

<style scoped>
@import "@/assets/css/page/dashboard/report-list.css";
</style>
