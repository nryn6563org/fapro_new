<template>
  <div class="c-guide">
    <header class="c-guide__header">
      <h1>FAPRO 프로젝트 가이드</h1>
      <p>프로젝트 구조, 컴포넌트 규격 및 프론트엔드 개발 가이드라인</p>
    </header>

    <div class="c-guide__content">
      <!-- 상세 프로젝트 트리 구조 -->
      <section class="c-guide__section">
        <h2 class="c-guide__section-title">프로젝트 상세 구조 (Tree Structure)</h2>
        <div class="c-guide__tree">
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
                  <!-- 3단계 트리 -->
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
      </section>

      <!-- 개발 가이드라인 섹션 추가 -->
      <section class="c-guide__section c-guide__rules">
        <h2 class="c-guide__section-title">프론트엔드 개발 규칙</h2>
        <div class="rules-container">
          <div class="rule-card">
            <h3>🎨 CSS & 퍼블리싱 스탠다드</h3>
            <ul>
              <li><strong>BEM (Block Element Modifier)</strong>: 모든 클래스 네이밍은 BEM 규칙을 따릅니다.</li>
              <li><strong>Tailwind CSS v3</strong>: `.vue` 템플릿 내 인라인 클래스 사용은 지양하며, 별도 `.css` 파일에서 `@apply` 문법을 사용합니다.</li>
              <li><strong>반응형 대응</strong>: 기본 1920px 해상도를 기준으로 하며, 필요 시 Tailwind 유틸리티를 @apply 내에 포함합니다.</li>
              <li><strong>다크모드</strong>: `.dark` 클래스 선택자를 활용하여 테마 별 스타일을 정의합니다.</li>
            </ul>
          </div>
          <div class="rule-card">
            <h3>✍️ 코드 코멘트 가이드 (주석)</h3>
            <ul>
              <li><strong>국문 주석 필수</strong>: 모든 소스 코드 내 주석은 한글로 작성합니다.</li>
              <li><strong>섹션 구분</strong>: CSS 및 JS 파일 내 주요 기능 단위로 상세 주석을 분리하여 작성합니다.</li>
              <li><strong>컴포넌트 문서화</strong>: Script 하단에 컴포넌트의 역할과 Props에 대한 상세 설명을 포함합니다.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * 프로젝트 프로젝트 가이드 페이지
   * 프론트엔드 개발자가 참고할 수 있는 구조도 및 개발 표준 문서를 제공합니다.
   */
  name: 'GuidePage',
  layout: 'default',
  data() {
    return {
      // 프로젝트 트리 데이터 구조 (한글 상세 설명 포함)
      projectTree: [
        {
          name: 'pages (라우팅 페이지)',
          type: 'folder',
          children: [
            { name: 'index.vue', type: 'file', desc: '메인 대시보드 (위젯 모음)', related: ['components/page/dashboard/*', 'assets/css/page/dashboard.css'] },
            { name: 'login.vue', type: 'file', desc: '로그인 및 인증 페이지' },
            { 
              name: 'stock (종목 관리)', type: 'folder', desc: '증권 관련 주요 기능 페이지',
              children: [
                { name: 'ranking.vue', type: 'file', desc: '고객 보유 종목 랭킹 리스트', related: ['assets/css/page/stock/ranking.css'] },
                { name: 'reports.vue', type: 'file', desc: 'AI 분석 리포트 리스트', related: ['assets/css/page/stock/report.css'] },
                { name: 'issue.vue', type: 'file', desc: '실시간 이슈 포착 종목 리스트', related: ['assets/css/page/stock/issue.css'] },
                { name: 'signals.vue', type: 'file', desc: '라씨 시그널 매수/매도 현황', related: ['assets/css/page/stock/signals.css'] },
                { name: 'detail/[code].vue', type: 'file', desc: '개별 종목 상세 대시보드', related: ['assets/css/page/stock/detail.css'] },
              ]
            },
            {
              name: 'customer (고객 관리)', type: 'folder', desc: 'FA 고객 데이터 관리 페이지',
              children: [
                { name: 'list.vue', type: 'file', desc: '전체 고객 명부 및 필터링', related: ['assets/css/page/customer/list.css'] },
                { name: 'statistics.vue', type: 'file', desc: '고객 포트폴리오 통계 데이터', related: ['assets/css/page/customer/statistics.css'] },
              ]
            }
          ]
        },
        {
          name: 'components (Vue 공통 컴포넌트)',
          type: 'folder',
          children: [
            {
              name: 'area', type: 'folder', desc: '전역 레이아웃 구성 영역',
              children: [
                { name: 'Header.vue', type: 'file', desc: '상단 GNB 및 프로필 메뉴', related: ['assets/css/area/header.css'] },
                { name: 'Sidebar.vue', type: 'file', desc: '좌측 메인 내비베이션 (LNB)', related: ['assets/css/area/sidebar.css'] },
              ]
            },
            {
              name: 'page', type: 'folder', desc: '도메인별 특화 컴포넌트 (BEM 적용 필수)',
              children: [
                { 
                  name: 'stock/ranking', type: 'folder', desc: '랭킹 페이지 전용 모달 및 아이템',
                  children: [
                    { name: 'StockItem.vue', type: 'file', desc: '랭킹 개별 종목 행 아이템' },
                    { name: 'modal/RankingNewsModal.vue', type: 'file', desc: '뉴스 요약 팝업' },
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'assets/css (스타일링 파트)',
          type: 'folder',
          children: [
            { name: 'main.css', type: 'file', desc: '전역 Tailwind 설정 및 베이스 스타일' },
            { name: 'page/**/*.css', type: 'file', desc: '페이지별 개별 스타일 파일 (분리 관리)' },
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
/* 가이드 페이지 전용 레이아웃 스타일 */
.c-guide {
  padding: 40px;
  background-color: #f8fafc;
  min-height: 100vh;
  color: #334155;
  font-family: 'Pretendard', sans-serif;
}

.c-guide__header {
  margin-bottom: 40px;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 24px;
}

.c-guide__header h1 {
  font-size: 34px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.025em;
  margin-bottom: 8px;
}

.c-guide__header p {
  color: #64748b;
  font-size: 16px;
}

.c-guide__section {
  margin-bottom: 50px;
}

.c-guide__section-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.c-guide__section-title::before {
  content: '';
  width: 4px;
  height: 18px;
  background: #3b82f6;
  border-radius: 2px;
}

.c-guide__tree {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.05);
  border: 1px solid #e2e8f0;
}

.tree-root {
  list-style: none;
  padding-left: 0;
}

.tree-children {
  list-style: none;
  padding-left: 28px;
  border-left: 1px dashed #cbd5e1;
  margin-left: 10px;
}

.tree-item {
  padding: 10px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.2s;
}

.tree-item:hover {
  transform: translateX(5px);
}

.tree-icon {
  font-size: 20px;
}

.tree-name {
  font-weight: 700;
  color: #1e293b;
}

.tree-desc {
  font-size: 14px;
  color: #64748b;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 6px;
}

.tree-related {
  display: flex;
  gap: 6px;
  margin-left: auto;
}

.tag {
  font-size: 11px;
  background: #eff6ff;
  color: #2563eb;
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid #bfdbfe;
  font-weight: 500;
}

/* 룰 카드 섹션 */
.rules-container {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 24px;
}

@media (min-width: 768px) {
  .rules-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.rule-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}

.rule-card h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #0f172a;
}

.rule-card ul {
  list-style: none;
  padding: 0;
}

.rule-card li {
  font-size: 14px;
  color: #475569;
  margin-bottom: 10px;
  line-height: 1.6;
  position: relative;
  padding-left: 20px;
}

.rule-card li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #3b82f6;
  font-weight: bold;
}
</style>
