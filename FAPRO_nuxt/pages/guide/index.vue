<template>
  <div class="c-guide">
    <header class="c-guide__header">
      <h1>FAPRO Project Guide</h1>
      <p>Project Structure & Component Documentation</p>
    </header>

    <div class="c-guide__content">
      <div class="c-guide__tree">
        <h2>Project Structure</h2>
        <ul class="tree-root">
          <li v-for="item in projectTree" :key="item.name">
            <div class="tree-item" :class="{'is-folder': item.children}">
              <span class="tree-icon">{{ item.type === 'folder' ? '📁' : '📄' }}</span>
              <span class="tree-name">{{ item.name }}</span>
              <span v-if="item.desc" class="tree-desc">({{ item.desc }})</span>
            </div>
            <ul v-if="item.children" class="tree-children">
              <li v-for="child in item.children" :key="child.name">
                <div class="tree-item" :class="{'is-folder': child.children}">
                  <span class="tree-icon">{{ child.type === 'folder' ? '📁' : '📄' }}</span>
                  <span class="tree-name">{{ child.name }}</span>
                  <span v-if="child.desc" class="tree-desc">{{ child.desc }}</span>
                  <div v-if="child.related" class="tree-related">
                    <span v-for="rel in child.related" :key="rel" class="tag">{{ rel }}</span>
                  </div>
                </div>
                <!-- 3rd Level -->
                <ul v-if="child.children" class="tree-children">
                  <li v-for="sub in child.children" :key="sub.name">
                    <div class="tree-item">
                      <span class="tree-icon">{{ sub.type === 'folder' ? '📁' : '📄' }}</span>
                      <span class="tree-name">{{ sub.name }}</span>
                      <span v-if="sub.desc" class="tree-desc">{{ sub.desc }}</span>
                       <div v-if="sub.related" class="tree-related">
                        <span v-for="rel in sub.related" :key="rel" class="tag">{{ rel }}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuidePage',
  layout: 'default',
  data() {
    return {
      projectTree: [
        {
          name: 'pages (라우팅 페이지)',
          type: 'folder',
          children: [
            { name: 'index.vue', type: 'file', desc: '메인 대시보드', related: ['components/page/dashboard/*', 'assets/css/page/dashboard.css'] },
            { name: 'login.vue', type: 'file', desc: '로그인 페이지' },
            { 
              name: 'stock', type: 'folder', desc: '종목 관리',
              children: [
                { name: 'ranking.vue', type: 'file', desc: '고객 보유 종목 랭킹', related: ['assets/css/page/stock/ranking.css'] },
                { name: 'reports.vue', type: 'file', desc: 'AI 리포트 생성 종목', related: ['assets/css/page/stock/report.css'] },
                { name: 'issue.vue', type: 'file', desc: '이슈 발생 종목', related: ['assets/css/page/stock/issue.css'] },
                { name: 'signals.vue', type: 'file', desc: '라씨 시그널 발생 종목', related: ['assets/css/page/stock/signals.css'] },
                { name: 'quant.vue', type: 'file', desc: '퀀트 종목', related: ['assets/css/page/stock/quant.css'] },
                { name: 'discovery.vue', type: 'file', desc: 'AI 종목 발굴', related: ['assets/css/page/stock/discovery.css'] },
                { name: 'detail/[code].vue', type: 'file', desc: '종목 상세 페이지', related: ['assets/css/page/stock/detail.css'] },
              ]
            },
            {
              name: 'customer', type: 'folder', desc: '고객 관리',
              children: [
                { name: 'statistics.vue', type: 'file', desc: '고객 통계', related: ['assets/css/page/customer/statistics.css'] },
                { name: 'list.vue', type: 'file', desc: '고객 리스트', related: ['assets/css/page/customer/list.css'] },
                { name: 'consultation.vue', type: 'file', desc: '고객 상담 노트', related: ['assets/css/page/customer/consultation.css'] },
              ]
            },
            {
              name: 'my', type: 'folder', desc: '마이 페이지',
              children: [
                { name: 'schedule.vue', type: 'file', desc: '일정 관리', related: ['assets/css/page/my/schedule.css'] },
                { name: 'stocks.vue', type: 'file', desc: 'MY 종목', related: ['assets/css/page/my/stocks.css'] },
                { name: 'investment.vue', type: 'file', desc: '투자 정보', related: ['assets/css/page/my/investment.css'] },
                { name: 'info.vue', type: 'file', desc: '나의 정보', related: ['assets/css/page/my/info.css'] },
                { name: 'payment.vue', type: 'file', desc: '결제 정보', related: ['assets/css/page/my/payment.css'] },
              ]
            }
          ]
        },
        {
          name: 'components (Vue 컴포넌트)',
          type: 'folder',
          children: [
            {
              name: 'area', type: 'folder', desc: '공통 레이아웃 영역',
              children: [
                { name: 'Header.vue', type: 'file', desc: '상단 GNB', related: ['assets/css/area/header.css'] },
                { name: 'Sidebar.vue', type: 'file', desc: '좌측 LNB', related: ['assets/css/area/sidebar.css'] },
                { name: 'RightPanel.vue', type: 'file', desc: '우측 유틸리티 패널', related: ['assets/css/area/right-panel.css'] },
                { name: 'AIBanner.vue', type: 'file', desc: 'AI 알림 배너', related: ['assets/css/area/ai-banner.css'] },
              ]
            },
            {
              name: 'page', type: 'folder', desc: '페이지별 컴포넌트',
              children: [
                { 
                  name: 'dashboard', type: 'folder', desc: '대시보드 위젯',
                  children: [
                    { name: 'StockBoard.vue', type: 'file', desc: 'AI 이슈 포착 (메인 차트)', related: ['assets/css/page/dashboard/stock-board.css'] },
                    { name: 'QuantStocks.vue', type: 'file', desc: '퀀트 종목 리스트', related: ['assets/css/page/dashboard/quant-stocks.css'] },
                    { name: 'ReportList.vue', type: 'file', desc: 'AI 리포트 리스트', related: ['assets/css/page/dashboard/report-list.css'] },
                    { name: 'CustomerStockRanking.vue', type: 'file', desc: '고객 보유 종목 랭킹', related: ['assets/css/page/dashboard/customer-stock-ranking.css'] },
                    { name: 'AIDiscovery.vue', type: 'file', desc: 'AI 종목 발굴 리스트', related: ['assets/css/page/dashboard/ai-discovery.css'] },
                    { name: 'CustomerEvents.vue', type: 'file', desc: '고객·일정 관리', related: ['assets/css/page/dashboard/customer-events.css'] },
                    { name: 'ConsultationManagement.vue', type: 'file', desc: '상담 관리', related: ['assets/css/page/dashboard/consultation-management.css'] },
                    { name: 'CustomerReturn.vue', type: 'file', desc: '고객 수익률 현황', related: ['assets/css/page/dashboard/customer-return.css'] },
                    { name: 'SignalList.vue', type: 'file', desc: '라씨 시그널', related: ['assets/css/page/dashboard/signal-list.css'] },
                    { name: 'CustomModal.vue', type: 'file', desc: '대시보드 편집 모달', related: ['assets/css/page/dashboard/custom-modal.css'] },
                  ]
                },
                {
                  name: 'stock', type: 'folder', desc: '종목 페이지 컴포넌트',
                  children: [
                    { name: 'discovery/Card.vue', type: 'file', desc: '종목 카드' },
                    { name: 'ranking/StockItem.vue', type: 'file', desc: '랭킹 아이템' },
                    { name: 'report/ReportCard.vue', type: 'file', desc: '리포트 카드' },
                  ]
                }
              ]
            },
            {
              name: 'function', type: 'folder', desc: '기능성 공통 컴포넌트',
              children: [
                { name: 'Card.vue', type: 'file', desc: '기본 카드 UI' },
                { name: 'QuantCard.vue', type: 'file', desc: '퀀트 카드 UI', related: ['assets/css/function/quant-card.css'] },
              ]
            }
          ]
        },
        {
          name: 'assets/css (스타일시트)',
          type: 'folder',
          children: [
            { name: 'main.css', type: 'file', desc: '전역 스타일 & Tailwind 설정' },
            { name: 'area/*.css', type: 'file', desc: '레이아웃 영역 스타일' },
            { name: 'page/**/*.css', type: 'file', desc: '페이지/컴포넌트 전용 스타일' },
            { name: 'function/*.css', type: 'file', desc: '기능 컴포넌트 스타일' },
            { name: 'layouts/*.css', type: 'file', desc: '레이아웃 템플릿 스타일' },
            { name: 'lib/animate.min.css', type: 'file', desc: '애니메이션 라이브러리' },
          ]
        },
        {
          name: 'plugins (플러그인)',
          type: 'folder',
          children: [
            { name: 'echarts.js', type: 'file', desc: '차트 라이브러리 (Vue-ECharts)' },
            { name: 'lucide.js', type: 'file', desc: '아이콘 시스템 (Lucide-Vue)' },
            { name: 'swiper.js', type: 'file', desc: '슬라이더 (Swiper)' },
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.c-guide {
  padding: 40px;
  background-color: #f8fafc;
  min-height: 100vh;
  color: #334155;
}

.c-guide__header {
  margin-bottom: 40px;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 20px;
}

.c-guide__header h1 {
  font-size: 32px;
  font-weight: 800;
  color: #0f172a;
}

.c-guide__tree {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.tree-root {
  list-style: none;
  padding-left: 0;
}

.tree-children {
  list-style: none;
  padding-left: 24px;
  border-left: 1px solid #e2e8f0;
  margin-left: 10px;
}

.tree-item {
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tree-icon {
  font-size: 18px;
}

.tree-name {
  font-weight: 600;
  color: #1e293b;
}

.tree-desc {
  font-size: 14px;
  color: #64748b;
}

.tree-related {
  display: flex;
  gap: 5px;
  margin-left: auto;
}

.tag {
  font-size: 10px;
  background: #f1f5f9;
  color: #475569;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
}
</style>
