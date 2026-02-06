<template>
  <div class="customer-ranking-page">
    <!-- 헤더 영역 -->
    <div class="customer-ranking-page__header">
      <div class="customer-ranking-page__title-group">
        <h1 class="customer-ranking-page__title">고객 리스트</h1>
        <p class="customer-ranking-page__subtitle">고객 순위 및 상세 정보</p>
      </div>
      <div class="customer-ranking-page__actions">
        <div class="customer-ranking-page__search-wrapper">
          <svg class="customer-ranking-page__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="고객명 또는 이메일 검색"
            class="customer-ranking-page__search-input"
          />
        </div>
        <button class="customer-ranking-page__btn-refresh" @click="refreshData">
          새로고침
        </button>
      </div>
    </div>

    <!-- AI 고객 검색 섹션 -->
    <div class="customer-ranking-page__ai-search">
      <div class="customer-ranking-page__ai-search-content">
        <div class="customer-ranking-page__ai-search-form">
          <div class="customer-ranking-page__ai-badge">
            <div class="customer-ranking-page__ai-icon-circle">
              <svg class="customer-ranking-page__ai-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <span class="customer-ranking-page__ai-label">AI 고객 검색</span>
          </div>
          <div class="customer-ranking-page__ai-input-wrapper">
            <svg class="customer-ranking-page__ai-brain-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9.5 2A5.5 5.5 0 0 0 4 7.5c0 1.63.71 3.1 1.83 4.12.33.31.57.7.7 1.13.13.43.14.88.04 1.32-.1.44-.06.89.12 1.31.18.42.5.76.9 1 .4.24.87.35 1.34.32.47-.03.92-.2 1.28-.5.36-.3.62-.7.75-1.15.13-.45.14-.93.04-1.39-.1-.46-.06-.94.12-1.38.18-.44.52-.8.93-1.05.41-.25.9-.37 1.39-.34.49.03.96.21 1.34.52.38.31.65.73.79 1.19.14.46.14.95.04 1.42-.1.47-.05.96.13 1.41.18.45.54.82.97 1.07.43.25.93.36 1.43.32.5-.04.97-.22 1.35-.54z"></path>
            </svg>
            <input
              v-model="aiSearchQuery"
              type="text"
              placeholder='예: "적극투자형 10억이상 삼성전자 보유한 고객 찾아줘"'
              class="customer-ranking-page__ai-input"
              @keydown.enter="runAISearch"
            />
          </div>
          <button class="customer-ranking-page__btn-ai-search" @click="runAISearch">
            AI 검색
          </button>
        </div>

        <!-- AI 검색 결과 -->
        <div v-if="showAiResults" class="customer-ranking-page__ai-results">
          <div class="customer-ranking-page__ai-analysis">
            <p class="customer-ranking-page__ai-analysis-text">
              <span class="customer-ranking-page__ai-analysis-accent">검색 조건 분석:</span> "{{ aiSearchQuery }}"
            </p>
            <div class="customer-ranking-page__analysis-tags">
              <span v-if="aiSearchQuery.includes('적극')" class="customer-ranking-page__analysis-tag">투자성향: 적극투자형</span>
              <span v-if="aiSearchQuery.includes('10억')" class="customer-ranking-page__analysis-tag">자산규모: 10억 이상</span>
              <span v-if="aiSearchQuery.includes('삼성전자')" class="customer-ranking-page__analysis-tag">보유종목: 삼성전자</span>
            </div>
          </div>

          <div class="customer-ranking-page__results-list">
            <div
              v-for="(cust, idx) in aiSearchResults"
              :key="idx"
              class="customer-ranking-page__result-item"
              @click="openCustomerDetail(cust)"
            >
              <div class="customer-ranking-page__result-info">
                <div class="customer-ranking-page__result-avatar">{{ cust.name[0] }}</div>
                <div class="customer-ranking-page__result-name-group">
                  <span class="customer-ranking-page__result-name">
                    {{ cust.name }}
                    <span class="customer-ranking-page__type-badge customer-ranking-page__type-badge--purple">{{ cust.type }}</span>
                  </span>
                  <span class="customer-ranking-page__result-meta">자산 {{ cust.asset }} • {{ cust.stock }} 보유</span>
                </div>
              </div>
              <button class="customer-ranking-page__btn-detail">상세보기</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 순위 탭 -->
    <div class="customer-ranking-page__tabs">
      <div class="customer-ranking-page__tab-group">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="customer-ranking-page__tab-btn"
          :class="activeTab === tab.id ? 'customer-ranking-page__tab-btn--active' : 'customer-ranking-page__tab-btn--inactive'"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
      <button class="customer-ranking-page__btn-download">
        <svg class="customer-ranking-page__download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        리스트 다운로드 (CSV)
      </button>
    </div>

    <!-- 랭킹 테이블 -->
    <div class="customer-ranking-page__table-wrapper">
      <table class="customer-ranking-page__table">
        <thead>
          <tr>
            <th class="customer-ranking-page__th customer-ranking-page__th--rank">순위</th>
            <th class="customer-ranking-page__th">고객명</th>
            <th class="customer-ranking-page__th">투자유형</th>
            <th class="customer-ranking-page__th">자산규모</th>
            <th class="customer-ranking-page__th">수익률</th>
            <th class="customer-ranking-page__th">상담횟수</th>
            <th class="customer-ranking-page__th">가입일</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(cust, idx) in paginatedData"
            :key="idx"
            class="customer-ranking-page__tr"
            @click="openCustomerDetail(cust)"
          >
            <td class="customer-ranking-page__td customer-ranking-page__td--rank" :class="getRankClass(startIndex + idx + 1)">
              {{ startIndex + idx + 1 }}
            </td>
            <td class="customer-ranking-page__td">
              <div class="customer-ranking-page__name-cell">
                <span class="customer-ranking-page__name-text">{{ cust.name }}</span>
                <span v-if="cust.isFavorite" class="customer-ranking-page__favorite-icon">★</span>
              </div>
            </td>
            <td class="customer-ranking-page__td">
              <span class="customer-ranking-page__type-badge" :class="getTypeColorClass(cust.type)">{{ cust.type }}</span>
            </td>
            <td class="customer-ranking-page__td customer-ranking-page__td--value">{{ formatAsset(cust.asset) }}</td>
            <td class="customer-ranking-page__td customer-ranking-page__td--return" :class="cust.return >= 0 ? 'customer-ranking-page__td--return-up' : 'customer-ranking-page__td--return-down'">
              {{ cust.return >= 0 ? '+' : '' }}{{ cust.return }}%
            </td>
            <td class="customer-ranking-page__td customer-ranking-page__td--center">{{ cust.meetings }}회</td>
            <td class="customer-ranking-page__td customer-ranking-page__td--date">{{ cust.joinDate }}</td>
          </tr>
        </tbody>
      </table>

      <!-- 페이지네이션 -->
      <div class="customer-ranking-page__pagination">
        <div class="customer-ranking-page__pagination-info">
          총 <b>{{ filteredData.length }}</b>명 중 {{ startIndex + 1 }}-{{ Math.min(startIndex + itemsPerPage, filteredData.length) }} 표시
        </div>
        <div class="customer-ranking-page__pagination-controls">
          <button
            class="customer-ranking-page__pagination-btn"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            <svg class="customer-ranking-page__pagination-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <span class="customer-ranking-page__pagination-status">{{ currentPage }} / {{ totalPages }}</span>
          <button
            class="customer-ranking-page__pagination-btn"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            <svg class="customer-ranking-page__pagination-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 고객 상세 정보 모달 -->
    <div v-if="detailModal.show" class="customer-modal-overlay" @click.self="closeDetail">
      <div class="customer-modal">
        <!-- 모달 헤더 -->
        <div class="customer-modal__header">
          <div class="customer-modal__header-main">
            <div class="customer-modal__avatar">{{ detailModal.data.name[0] }}</div>
            <div class="customer-modal__title-group">
              <div class="customer-modal__name-row">
                <h2 class="customer-modal__name">{{ detailModal.data.name }}</h2>
                <span class="customer-modal__type-badge">{{ detailModal.data.type }}</span>
              </div>
              <div class="customer-modal__meta-row">
                <span class="customer-modal__meta-item">{{ detailModal.data.email }}</span>
                <span class="customer-modal__meta-divider">•</span>
                <span class="customer-modal__meta-item">{{ detailModal.data.phone }}</span>
              </div>
            </div>
          </div>
          <button class="customer-modal__btn-close" @click="closeDetail">
            <svg class="customer-modal__close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- 모달 탭 내비게이션 -->
        <div class="customer-modal__tabs">
          <div
            v-for="mt in modalTabs"
            :key="mt.id"
            class="customer-modal__tab-item"
            :class="{ 'customer-modal__tab-item--active': activeModalTab === mt.id }"
            @click="activeModalTab = mt.id"
          >
            {{ mt.label }}
          </div>
        </div>

        <!-- 모달 바디 -->
        <div class="customer-modal__body">
          <div v-if="activeModalTab === 'holdings'" class="customer-modal__holdings-grid">
            <div v-if="!detailModal.data.holdings || detailModal.data.holdings.length === 0" class="customer-modal__empty-state">
              보유 중인 종목이 없습니다.
            </div>
            <div v-for="(h, idx) in detailModal.data.holdings" :key="idx" class="customer-modal__holding-card">
              <div class="customer-modal__holding-header">
                <span class="customer-modal__holding-name">{{ h.stockName }}</span>
                <span class="customer-modal__holding-return" :class="h.return >= 0 ? 'customer-modal__holding-return--up' : 'customer-modal__holding-return--down'">
                  {{ h.return >= 0 ? '+' : '' }}{{ h.return }}%
                </span>
              </div>
              <div class="customer-modal__holding-body">
                <span class="customer-modal__holding-label">보유수량</span>
                <span class="customer-modal__holding-value">{{ h.quantity }}주</span>
                <span class="customer-modal__holding-label">평균단가</span>
                <span class="customer-modal__holding-value">{{ h.avgPrice.toLocaleString() }}원</span>
                <span class="customer-modal__holding-label">현재가</span>
                <span class="customer-modal__holding-value">{{ h.currentPrice.toLocaleString() }}원</span>
              </div>
            </div>
          </div>
          <div v-else class="customer-modal__coming-soon">
            {{ modalTabs.find(t => t.id === activeModalTab).label }} 준비 중...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Customer Ranking Migration
 * - React CustomerRanking을 Nuxt로 마이그레이션
 * - AI 검색 기능, 다중 정렬 탭, 상세 모달 구현
 * - 50명의 대규모 목 데이터 활용
 */

export default {
  name: 'CustomerRankingPage',
  data() {
    return {
      searchQuery: '',
      aiSearchQuery: '',
      showAiResults: false,
      activeTab: 'return',
      currentPage: 1,
      itemsPerPage: 20,
      activeModalTab: 'holdings',
      tabs: [
        { id: 'return', label: '수익률 순위' },
        { id: 'investment', label: '투자금액 순위' },
        { id: 'consultation', label: '상담횟수 순위' }
      ],
      modalTabs: [
        { id: 'holdings', label: '보유종목' },
        { id: 'memo', label: '상담메모' },
        { id: 'consult', label: '상담내역' },
        { id: 'schedule', label: '상담일정' }
      ],
      detailModal: { show: false, data: {} },
      aiSearchResults: [
        { name: '김철수', asset: '15억', type: '공격형', stock: '삼성전자 500주' },
        { name: '이영희', asset: '12억', type: '중립형', stock: '삼성전자 350주' },
        { name: '박민수', asset: '18억', type: '공격형', stock: '삼성전자 600주' }
      ],
      // 50명의 고객 목 데이터
      allCustomers: [
        { name: '김철수', asset: 5200000000, return: 18.5, meetings: 12, phone: '010-1234-5678', email: 'kim@example.com', type: '공격형', joinDate: '2022.03.15', isFavorite: true, holdings: [{ stockName: '삼성전자', quantity: 500, avgPrice: 68000, currentPrice: 75000, return: 10.3 }, { stockName: 'SK하이닉스', quantity: 300, avgPrice: 120000, currentPrice: 145000, return: 20.8 }] },
        { name: '이영희', asset: 4800000000, return: 15.2, meetings: 10, phone: '010-2345-6789', email: 'lee@example.com', type: '중립형', joinDate: '2021.07.22', isFavorite: false, holdings: [{ stockName: '카카오', quantity: 400, avgPrice: 85000, currentPrice: 92000, return: 8.2 }] },
        { name: '박민수', asset: 4300000000, return: 14.8, meetings: 9, phone: '010-3456-7890', email: 'park@example.com', type: '공격형', joinDate: '2023.01.10', isFavorite: false, holdings: [] },
        { name: '정수진', asset: 3900000000, return: 13.2, meetings: 11, phone: '010-4567-8901', email: 'jung@example.com', type: '중립형', joinDate: '2022.09.05', isFavorite: false, holdings: [] },
        { name: '최현우', asset: 3500000000, return: 12.7, meetings: 8, phone: '010-5678-9012', email: 'choi@example.com', type: '안정형', joinDate: '2023.02.18', isFavorite: false, holdings: [] },
        { name: '강민지', asset: 3200000000, return: 11.9, meetings: 7, phone: '010-6789-0123', email: 'kang@example.com', type: '공격형', joinDate: '2021.11.30', isFavorite: false, holdings: [] },
        { name: '윤서연', asset: 2800000000, return: 11.3, meetings: 9, phone: '010-7890-1234', email: 'yoon@example.com', type: '중립형', joinDate: '2022.05.12', isFavorite: false, holdings: [] },
        { name: '임재현', asset: 2500000000, return: 10.8, meetings: 6, phone: '010-8901-2345', email: 'lim@example.com', type: '안정형', joinDate: '2023.04.08', isFavorite: false, holdings: [] },
        { name: '한지우', asset: 2300000000, return: 10.2, meetings: 8, phone: '010-9012-3456', email: 'han@example.com', type: '공격형', joinDate: '2022.08.25', isFavorite: false, holdings: [] },
        { name: '송민석', asset: 2100000000, return: 9.8, meetings: 5, phone: '010-0123-4567', email: 'song@example.com', type: '중립형', joinDate: '2023.06.14', isFavorite: false, holdings: [] },
        { name: '조유진', asset: 1950000000, return: 9.5, meetings: 7, phone: '010-1111-2222', email: 'jo@example.com', type: '안정형', joinDate: '2022.11.20', isFavorite: false, holdings: [] },
        { name: '오승민', asset: 1850000000, return: 9.2, meetings: 6, phone: '010-2222-3333', email: 'oh@example.com', type: '공격형', joinDate: '2023.03.08', isFavorite: false, holdings: [] },
        { name: '배지훈', asset: 1750000000, return: 8.9, meetings: 5, phone: '010-3333-4444', email: 'bae@example.com', type: '중립형', joinDate: '2021.12.15', isFavorite: false, holdings: [] },
        { name: '신혜원', asset: 1650000000, return: 8.7, meetings: 8, phone: '010-4444-5555', email: 'shin@example.com', type: '안정형', joinDate: '2022.07.30', isFavorite: false, holdings: [] },
        { name: '황태희', asset: 1550000000, return: 8.4, meetings: 4, phone: '010-5555-6666', email: 'hwang@example.com', type: '공격형', joinDate: '2023.05.12', isFavorite: false, holdings: [] },
        { name: '서민재', asset: 1450000000, return: 8.1, meetings: 7, phone: '010-6666-7777', email: 'seo@example.com', type: '중립형', joinDate: '2022.01.25', isFavorite: false, holdings: [] },
        { name: '권나영', asset: 1350000000, return: 7.9, meetings: 6, phone: '010-7777-8888', email: 'kwon@example.com', type: '안정형', joinDate: '2021.09.18', isFavorite: false, holdings: [] },
        { name: '유재석', asset: 1250000000, return: 7.6, meetings: 5, phone: '010-8888-9999', email: 'yoo@example.com', type: '공격형', joinDate: '2023.07.05', isFavorite: false, holdings: [] },
        { name: '홍길동', asset: 1150000000, return: 7.3, meetings: 9, phone: '010-9999-0000', email: 'hong@example.com', type: '중립형', joinDate: '2022.04.20', isFavorite: false, holdings: [] },
        { name: '장미선', asset: 1050000000, return: 7.0, meetings: 3, phone: '010-1010-2020', email: 'jang@example.com', type: '안정형', joinDate: '2023.08.15', isFavorite: false, holdings: [] },
        { name: '안성훈', asset: 980000000, return: 6.8, meetings: 6, phone: '010-2020-3030', email: 'ahn@example.com', type: '공격형', joinDate: '2021.10.12', isFavorite: false, holdings: [] },
        { name: '노수현', asset: 920000000, return: 6.5, meetings: 5, phone: '010-3030-4040', email: 'noh@example.com', type: '중립형', joinDate: '2022.06.08', isFavorite: false, holdings: [] },
        { name: '문지영', asset: 850000000, return: 6.2, meetings: 4, phone: '010-4040-5050', email: 'moon@example.com', type: '안정형', joinDate: '2023.09.22', isFavorite: false, holdings: [] },
        { name: '손태영', asset: 790000000, return: 5.9, meetings: 7, phone: '010-5050-6060', email: 'son@example.com', type: '공격형', joinDate: '2022.02.14', isFavorite: false, holdings: [] },
        { name: '진민호', asset: 730000000, return: 5.7, meetings: 6, phone: '010-6060-7070', email: 'jin@example.com', type: '중립형', joinDate: '2021.11.05', isFavorite: false, holdings: [] },
        { name: '표예진', asset: 680000000, return: 5.4, meetings: 5, phone: '010-7070-8080', email: 'pyo@example.com', type: '안정형', joinDate: '2023.01.28', isFavorite: false, holdings: [] },
        { name: '하동훈', asset: 630000000, return: 5.1, meetings: 4, phone: '010-8080-9090', email: 'ha@example.com', type: '공격형', joinDate: '2022.08.10', isFavorite: false, holdings: [] },
        { name: '곽민정', asset: 580000000, return: 4.9, meetings: 8, phone: '010-9090-1010', email: 'kwak@example.com', type: '중립형', joinDate: '2021.12.30', isFavorite: false, holdings: [] },
        { name: '남궁철', asset: 530000000, return: 4.6, meetings: 3, phone: '010-1212-3434', email: 'namgung@example.com', type: '안정형', joinDate: '2023.04.18', isFavorite: false, holdings: [] },
        { name: '선우진', asset: 490000000, return: 4.3, meetings: 7, phone: '010-3434-5656', email: 'sunwoo@example.com', type: '공격형', joinDate: '2022.10.05', isFavorite: false, holdings: [] },
        { name: '탁재욱', asset: 450000000, return: 4.0, meetings: 5, phone: '010-5656-7878', email: 'tak@example.com', type: '중립형', joinDate: '2021.08.22', isFavorite: false, holdings: [] },
        { name: '반소영', asset: 410000000, return: 3.8, meetings: 6, phone: '010-7878-9090', email: 'ban@example.com', type: '안정형', joinDate: '2023.06.09', isFavorite: false, holdings: [] },
        { name: '추성훈', asset: 380000000, return: 3.5, meetings: 4, phone: '010-9191-0101', email: 'choo@example.com', type: '공격형', joinDate: '2022.12.16', isFavorite: false, holdings: [] },
        { name: '설경구', asset: 350000000, return: 3.2, meetings: 7, phone: '010-0202-1313', email: 'sul@example.com', type: '중립형', joinDate: '2021.07.28', isFavorite: false, holdings: [] },
        { name: '봉준호', asset: 320000000, return: 2.9, meetings: 5, phone: '010-1313-2424', email: 'bong@example.com', type: '안정형', joinDate: '2023.02.11', isFavorite: false, holdings: [] },
        { name: '구혜선', asset: 290000000, return: 2.7, meetings: 6, phone: '010-2424-3535', email: 'goo@example.com', type: '공격형', joinDate: '2022.09.25', isFavorite: false, holdings: [] },
        { name: '류준열', asset: 260000000, return: 2.4, meetings: 3, phone: '010-3535-4646', email: 'ryu@example.com', type: '중립형', joinDate: '2021.10.18', isFavorite: false, holdings: [] },
        { name: '류수정', asset: 240000000, return: 2.1, meetings: 8, phone: '010-4646-5757', email: 'lyu@example.com', type: '안정형', joinDate: '2023.07.30', isFavorite: false, holdings: [] },
        { name: '도경수', asset: 220000000, return: 1.8, meetings: 4, phone: '010-5757-6868', email: 'do@example.com', type: '공격형', joinDate: '2022.05.14', isFavorite: false, holdings: [] },
        { name: '주지훈', asset: 200000000, return: 1.5, meetings: 5, phone: '010-6868-7979', email: 'joo@example.com', type: '중립형', joinDate: '2021.11.22', isFavorite: false, holdings: [] }
      ]
    }
  },
  computed: {
    sortedData() {
      const sorted = [...this.allCustomers]
      switch (this.activeTab) {
        case 'return': return sorted.sort((a, b) => b.return - a.return)
        case 'investment': return sorted.sort((a, b) => b.asset - a.asset)
        case 'consultation': return sorted.sort((a, b) => b.meetings - a.meetings)
        default: return sorted
      }
    },
    filteredData() {
      return this.sortedData.filter(c =>
        c.name.includes(this.searchQuery) || c.email.includes(this.searchQuery)
      )
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage)
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage
    },
    paginatedData() {
      return this.filteredData.slice(this.startIndex, this.startIndex + this.itemsPerPage)
    }
  },
  watch: {
    activeTab() {
      this.currentPage = 1
    },
    searchQuery() {
      this.currentPage = 1
    },
    // 라우트 변경 감지하여 탭 업데이트 (상단 메뉴 등에서 이동 시)
    '$route.query.tab'(newTab) {
      if (newTab && this.tabs.some(t => t.id === newTab)) {
        this.activeTab = newTab
      }
    }
  },
  mounted() {
    // URL 쿼리 파라미터에서 tab 값을 읽어 activeTab 설정
    const tabParam = this.$route.query.tab
    if (tabParam && this.tabs.some(t => t.id === tabParam)) {
      this.activeTab = tabParam
    }
  },
  methods: {
    runAISearch() {
      if (!this.aiSearchQuery.trim()) { return }
      this.showAiResults = true
    },
    getRankClass(rank) {
      if (rank === 1) { return 'customer-ranking-page__td--rank-1' }
      if (rank === 2) { return 'customer-ranking-page__td--rank-2' }
      if (rank === 3) { return 'customer-ranking-page__td--rank-3' }
      return ''
    },
    getTypeColorClass(type) {
      const colors = {
        공격형: 'customer-ranking-page__type-badge--red',
        중립형: 'customer-ranking-page__type-badge--blue',
        안정형: 'customer-ranking-page__type-badge--green'
      }
      return colors[type] || 'customer-ranking-page__type-badge--gray'
    },
    formatAsset(asset) {
      if (asset >= 100000000) { return `${(asset / 100000000).toFixed(0)}억` }
      return `${(asset / 10000).toLocaleString()}만`
    },
    openCustomerDetail(cust) {
      this.detailModal.data = cust
      this.detailModal.show = true
    },
    closeDetail() {
      this.detailModal.show = false
      this.activeModalTab = 'holdings'
    },
    refreshData() {
      alert('데이터가 갱신되었습니다.')
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/customer/ranking.css';
</style>
