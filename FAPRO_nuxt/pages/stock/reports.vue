<template>
  <div class="p-ai-report">
    <header class="p-ai-report__header">
      <h2 class="p-ai-report__title">AI 리포트 생성 종목</h2>
      <p class="p-ai-report__desc">AI가 실시간으로 분석하여 리포트를 생성한 종목들입니다.</p>
    </header>

    <div class="p-ai-report__grid">
      <div v-for="report in reports" :key="report.id" class="p-ai-report__card">
        <div class="p-ai-report__card-header">
          <div class="p-ai-report__stock">
            <h3 class="p-ai-report__stock-name">{{ report.stockName }}</h3>
            <span class="p-ai-report__stock-code">{{ report.stockCode }}</span>
          </div>
          <span class="p-ai-report__date">{{ report.date }}</span>
        </div>
        <p class="p-ai-report__summary">{{ report.summary }}</p>
        <div class="p-ai-report__actions">
          <button class="c-btn c-btn--primary c-btn--sm">리포트 보기</button>
          <button class="c-btn c-btn--ghost c-btn--sm">투자 인사이트</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StockAiReportPage',
  data() {
    return {
      reports: [
        { id: 1, stockName: '삼성전자', stockCode: '005930', date: '2024.02.06', summary: 'AI 반도체 수요 증가에 따른 HBM 매출 확대 전망. 파운드리 사업부의 턴어라운드 기대감 유효.' },
        { id: 2, stockName: 'NAVER', stockCode: '035420', date: '2024.02.05', summary: '광고 시장 회복세 및 커머스 부문의 견조한 성장. 하이퍼클로바X를 활용한 B2B 수익화 본격화.' },
        { id: 3, stockName: '현대차', stockCode: '005380', date: '2024.02.05', summary: '미국 시장 판매 호조 및 고부가가치 차종 비중 확대. 주주환원 정책 강화에 따른 밸류에이션 매력 증가.' },
        { id: 4, stockName: 'SK하이닉스', stockCode: '000660', date: '2024.02.04', summary: 'DRAM 가격 반등 및 재고 정상화. 엔비디아 향 HBM3 공급 독점으로 수익성 개선 가속화.' }
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/stock/ai-report.css';
</style>
