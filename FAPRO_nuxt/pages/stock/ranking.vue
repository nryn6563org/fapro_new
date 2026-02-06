<template>
  <div class="ranking-page">
    <!-- 헤더 영역 -->
    <header class="ranking-page__header">
      <div class="ranking-page__title-group">
        <h1 class="ranking-page__title">
          고객 보유 종목 랭킹
          <span class="ranking-page__badge ranking-page__badge--pro">PRO</span>
        </h1>
        <p class="ranking-page__subtitle">고객들이 가장 많이 보유한 핵심 포트폴리오 분석</p>
      </div>
      <div class="ranking-page__header-actions">
        <div class="ranking-page__search-box">
          <div class="ranking-page__search-icon-wrapper">
            <svg class="ranking-page__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="종목명 또는 코드 검색"
            class="ranking-page__search-input"
          />
        </div>
        <button class="ranking-page__btn-refresh" @click="refreshData">
          <svg class="ranking-page__btn-refresh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          데이터 갱신
        </button>
      </div>
    </header>

    <!-- 통계 카드 -->
    <section class="ranking-page__stats">
      <div class="ranking-page__stat-card">
        <div class="ranking-page__stat-content">
          <div class="ranking-page__stat-info">
            <div class="ranking-page__stat-label">Total Stocks</div>
            <div class="ranking-page__stat-value">{{ holdingStocks.length }}</div>
          </div>
          <svg class="ranking-page__stat-icon ranking-page__stat-icon--blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>
          </svg>
        </div>
      </div>

      <div class="stat-card ranking-page__stat-card">
        <div class="ranking-page__stat-content">
          <div class="ranking-page__stat-info">
            <div class="ranking-page__stat-label">Total Holders</div>
            <div class="ranking-page__stat-value">
              {{ totalCustomers }} <span class="ranking-page__stat-unit">명</span>
            </div>
          </div>
          <svg class="ranking-page__stat-icon ranking-page__stat-icon--green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
      </div>

      <div class="ranking-page__stat-card">
        <div class="ranking-page__stat-content">
          <div class="ranking-page__stat-info">
            <div class="ranking-page__stat-label">Avg Return</div>
            <div class="ranking-page__stat-value ranking-page__stat-value--up">+{{ avgChangeRate }}%</div>
          </div>
          <div class="ranking-page__stat-emoji">📈</div>
        </div>
      </div>

      <div class="ranking-page__stat-card">
        <div class="ranking-page__stat-content">
          <div class="ranking-page__stat-info">
            <div class="ranking-page__stat-label">Current Leader</div>
            <div class="ranking-page__stat-stock-name">{{ holdingStocks[0].name }}</div>
            <div class="ranking-page__stat-stock-desc">{{ holdingStocks[0].customers }}명 보유</div>
          </div>
          <div class="ranking-page__stat-emoji">👑</div>
        </div>
      </div>
    </section>

    <!-- 랭킹 리스트 카드 -->
    <article class="ranking-page__main-card">
      <div class="ranking-page__card-header">
        <div class="ranking-page__card-title-group">
          <div class="ranking-page__card-icon-box">
            <svg class="ranking-page__card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
          </div>
          <span class="ranking-page__card-title">보유 종목 랭킹 ({{ filteredStocks.length }}개)</span>
        </div>
        <div class="ranking-page__update-tag">
          <div class="ranking-page__update-dot"></div>
          <span class="ranking-page__update-text">{{ currentTime }} LIVE UPDATE</span>
        </div>
      </div>
      <div class="ranking-page__card-content">
        <div class="ranking-page__list">
          <div v-for="stock in filteredStocks" :key="stock.code" class="ranking-page__item">
            <div class="ranking-page__item-main">
              <!-- 순위 -->
              <div :class="['ranking-page__rank-badge', `ranking-page__rank-badge--${stock.rank}`]">
                {{ stock.rank }}
              </div>

              <!-- 종목 정보 -->
              <div class="ranking-page__stock-info">
                <div class="ranking-page__stock-name-row">
                  <nuxt-link :to="`/stock/detail/${stock.code}`" class="ranking-page__stock-link">
                    {{ stock.name }}
                  </nuxt-link>
                  <span class="ranking-page__stock-code">{{ stock.code }}</span>
                  <div class="ranking-page__change-tag" :class="stock.change >= 0 ? 'ranking-page__change-tag--up' : 'ranking-page__change-tag--down'">
                    <span class="ranking-page__change-text">{{ stock.change >= 0 ? '▲' : '▼' }} {{ Math.abs(stock.change) }}%</span>
                  </div>
                </div>
                <div class="ranking-page__stock-metrics">
                  <span class="ranking-page__metric">Holders <span class="ranking-page__metric-value">{{ stock.customers }}</span></span>
                  <span class="ranking-page__metric">Avg <span class="ranking-page__metric-value">{{ stock.avgHolding }}</span></span>
                  <span class="ranking-page__metric">Total Value <span class="ranking-page__metric-value">{{ stock.totalValue }}</span></span>
                </div>
              </div>

              <!-- 보유 고객 수 강조 -->
              <button class="ranking-page__holder-btn" @click="openRelatedCustomers(stock)">
                <span class="ranking-page__holder-label">Holder List</span>
                <div class="ranking-page__holder-value-wrapper">
                  <span class="ranking-page__holder-value">{{ stock.customers }}</span>
                  <span class="ranking-page__holder-unit">명</span>
                </div>
              </button>
            </div>

            <!-- 버튼 영역 -->
            <div class="ranking-page__item-actions">
              <button class="ranking-page__btn-action ranking-page__btn-action--insight" @click="openInsight(stock)">
                <svg class="ranking-page__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                투자인사이트
              </button>
              <button class="ranking-page__btn-action ranking-page__btn-action--ai" @click="openAIReport(stock)">
                <svg class="ranking-page__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                AI리포트
              </button>
              <button class="ranking-page__btn-action ranking-page__btn-action--news" @click="openNews(stock)">
                <svg class="ranking-page__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16L4 18V22z"></path>
                </svg>
                뉴스요약
              </button>
              <button class="ranking-page__btn-action ranking-page__btn-action--community" @click="openCommunity(stock)">
                <svg class="ranking-page__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                커뮤니티요약
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>

    <!-- 관련 고객 팝업 -->
    <div v-if="modals.customers.show" class="modal-overlay" @click.self="closeModal('customers')">
      <div class="modal">
        <header class="modal__header modal__header--blue">
          <div class="modal__header-info">
            <div class="modal__icon-box">
              <svg class="modal__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline>
              </svg>
            </div>
            <div class="modal__title-group">
              <h3 class="modal__title">관련 고객 목록</h3>
              <p class="modal__subtitle">{{ modals.customers.data.name }} 보유 실시간 리스트</p>
            </div>
          </div>
          <button class="modal__close-btn" @click="closeModal('customers')">
            <svg class="modal__close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        <div class="modal__content">
          <div class="customer-summary">
            <div class="customer-summary__info">
              <div class="customer-summary__dot"></div>
              <p class="customer-summary__text">
                총 <span class="customer-summary__count">{{ modals.customers.data.relatedCustomers.length }}명</span>의 고객이 해당 종목을 보유 중입니다.
              </p>
            </div>
            <button class="customer-summary__select-all" @click="toggleSelectAllCustomers">
              <div class="customer-summary__checkbox" :class="{'customer-summary__checkbox--checked': isAllCustomersSelected}">
                <svg v-if="isAllCustomersSelected" class="customer-summary__check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              {{ isAllCustomersSelected ? '선택 취소' : '전체 선택' }}
            </button>
          </div>
          <div class="customer-list">
            <div
              v-for="(cust, idx) in modals.customers.data.relatedCustomers"
              :key="idx"
              :class="['customer-item', { 'customer-item--selected': selectedCustomerIndices.includes(idx) }]"
              @click="toggleCustomerSelection(idx)"
            >
              <div class="customer-item__checkbox" :class="{'customer-item__checkbox--checked': selectedCustomerIndices.includes(idx)}">
                <svg v-if="selectedCustomerIndices.includes(idx)" class="customer-item__check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div class="customer-item__main">
                <div class="customer-item__info">
                  <span class="customer-item__name">{{ cust.name }}</span>
                  <div class="customer-item__meta-group">
                    <span class="customer-item__meta">Quantity: <span class="customer-item__meta-value">{{ cust.holdings }}</span></span>
                    <div class="customer-item__divider"></div>
                    <span class="customer-item__meta">Value: <span class="customer-item__meta-value">{{ cust.investAmount }}</span></span>
                  </div>
                </div>
                <div class="customer-item__return-tag" :class="cust.returnRate >= 0 ? 'customer-item__return-tag--up' : 'customer-item__return-tag--down'">
                  <span class="customer-item__return-text">{{ cust.returnRate >= 0 ? '▲' : '▼' }}{{ Math.abs(cust.returnRate) }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer class="modal__footer modal__footer--column">
          <div v-if="selectedCustomerIndices.length > 0" class="send-action">
            <p class="send-action__label">
              <svg class="send-action__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 2L11 13"></path><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              <span class="send-action__count">{{ selectedCustomerIndices.length }}명</span>의 고객에게 AI 투자 리포트를 발송하시겠습니까?
            </p>
            <div class="send-action__buttons">
              <button class="send-action__btn send-action__btn--kakao" @click="sendAlert('카카오톡')">
                <span class="send-action__btn-emoji">💬</span>
                카톡 공유
              </button>
              <button class="send-action__btn send-action__btn--email" @click="sendAlert('이메일')">
                <span class="send-action__btn-emoji">📧</span>
                메일 발송
              </button>
              <button class="send-action__btn send-action__btn--sms" @click="sendAlert('문자')">
                <span class="send-action__btn-emoji">📱</span>
                문자 발송
              </button>
            </div>
          </div>
          <button class="modal__btn-close-full" @click="closeModal('customers')">닫기</button>
        </footer>
      </div>
    </div>

    <!-- AI 리포트 모달 -->
    <div v-if="modals.ai.show" class="modal-overlay" @click.self="closeModal('ai')">
      <div class="modal">
        <header class="modal__header modal__header--purple">
          <div class="modal__header-info">
            <div class="modal__icon-box">
              <svg class="modal__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
            </div>
            <div class="modal__title-group">
              <h3 class="modal__title">AI 투자 리포트</h3>
              <p class="modal__subtitle">{{ modals.ai.data.name }} ({{ modals.ai.data.code }}) 분석 결과</p>
            </div>
          </div>
          <button class="modal__close-btn" @click="closeModal('ai')">
            <svg class="modal__close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        <div class="modal__content">
          <div class="report-opinion">
            <h4 class="report-opinion__title">
              <div class="report-opinion__dot"></div>
              AI 투자 통합 의견
            </h4>
            <p class="report-opinion__text">
              <span class="report-opinion__stock-name">{{ modals.ai.data.name }}</span>은(는) 현재 <span class="report-opinion__change" :class="modals.ai.data.change >= 0 ? 'report-opinion__change--up' : 'report-opinion__change--down'">{{ modals.ai.data.change >= 0 ? '+' : '' }}{{ modals.ai.data.change }}%</span>의 누적 수익률을 기록하고 있으며, 총 {{ modals.ai.data.customers }}명의 전문 고객이 전략적으로 보유 중인 종목입니다.
            </p>
          </div>
          <div class="metrics-grid">
            <div class="metric-item">
              <div class="metric-item__label">Avg Holding</div>
              <div class="metric-item__value">{{ modals.ai.data.avgHolding }}</div>
            </div>
            <div class="metric-item">
              <div class="metric-item__label">Total Volume</div>
              <div class="metric-item__value">{{ modals.ai.data.totalValue }}</div>
            </div>
            <div class="metric-item">
              <div class="metric-item__label">Holders</div>
              <div class="metric-item__value metric-item__value--blue">{{ modals.ai.data.customers }}명</div>
            </div>
            <div class="metric-item">
              <div class="metric-item__label">Change Rate</div>
              <div class="metric-item__value" :class="modals.ai.data.change >= 0 ? 'metric-item__value--up' : 'metric-item__value--down'">
                 {{ modals.ai.data.change >= 0 ? '▲' : '▼' }} {{ Math.abs(modals.ai.data.change) }}%
              </div>
            </div>
          </div>

          <div class="report-highlights">
            <div class="report-highlight report-highlight--strength">
              <div class="report-highlight__icon-box">
                <svg class="report-highlight__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div class="report-highlight__info">
                <div class="report-highlight__label">핵심 투자 강점 (Strength)</div>
                <p class="report-highlight__text">안정적인 수익률과 높은 고객 선호도를 보이고 있습니다. 시장 변동성에도 불구하고 꾸준한 매수세가 유입되고 있습니다.</p>
              </div>
            </div>
            <div class="report-highlight report-highlight--caution">
              <div class="report-highlight__icon-box">
                <svg class="report-highlight__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
              <div class="report-highlight__info">
                <div class="report-highlight__label">기술적 주의사항 (Caution)</div>
                <p class="report-highlight__text">단기 과열 양상을 보일 수 있으니 분할 매수를 통한 리스크 관리가 필요한 시점입니다.</p>
              </div>
            </div>
          </div>
        </div>

        <footer class="modal__footer modal__footer--spaced">
          <div class="modal__timestamp">
            <div class="modal__timestamp-dot"></div>
            <span class="modal__timestamp-text">AI Generated · 2026.02.05</span>
          </div>
          <button class="modal__btn-close-compact" @click="closeModal('ai')">닫기</button>
        </footer>
      </div>
    </div>

    <!-- 뉴스 요약 모달 -->
    <div v-if="modals.news.show" class="modal-overlay" @click.self="closeModal('news')">
      <div class="modal">
        <header class="modal__header modal__header--blue">
          <div class="modal__header-info">
            <div class="modal__icon-box">
              <svg class="modal__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16L4 18V22z"></path>
              </svg>
            </div>
            <div class="modal__title-group">
              <h3 class="modal__title">뉴스 핵심 요약</h3>
              <p class="modal__subtitle">{{ modals.news.data.name }} 관련 최신 이슈</p>
            </div>
          </div>
          <button class="modal__close-btn" @click="closeModal('news')">
            <svg class="modal__close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        <div class="modal__content">
          <div class="news-list">
            <div v-for="(news, nidx) in newsMockData" :key="nidx" class="news-item">
              <header class="news-item__header">
                <div class="news-item__info">
                  <span class="news-item__source">{{ news.source }}</span>
                  <h4 class="news-item__title">{{ news.title.replace('{stock}', modals.news.data.name) }}</h4>
                </div>
                <span class="news-item__time">{{ news.time }}</span>
              </header>
              <p class="news-item__summary">{{ news.summary }}</p>
              <footer class="news-item__footer">
                <div class="news-item__badge">
                  <div class="news-item__badge-dot"></div>
                  <span class="news-item__badge-text">실시간 연동 뉴스</span>
                </div>
                <button class="news-item__btn-read">
                  원문 읽기
                  <svg class="news-item__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </footer>
            </div>
          </div>
        </div>

        <footer class="modal__footer">
          <button class="modal__btn-close-full" @click="closeModal('news')">뉴스 영역 닫기</button>
        </footer>
      </div>
    </div>

    <!-- 커뮤니티 요약 모달 -->
    <div v-if="modals.community.show" class="modal-overlay" @click.self="closeModal('community')">
      <div class="modal">
        <header class="modal__header modal__header--green">
          <div class="modal__header-info">
            <div class="modal__icon-box">
              <svg class="modal__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div class="modal__title-group">
              <h3 class="modal__title">커뮤니티 요약</h3>
              <p class="modal__subtitle">{{ modals.community.data.name }} 관련 의견</p>
            </div>
          </div>
          <button class="modal__close-btn" @click="closeModal('community')">
            <svg class="modal__close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        <div class="modal__content">
          <div class="sentiment">
            <h4 class="sentiment__title">커뮤니티 감성 분석</h4>
            <div class="sentiment__grid">
              <div class="sentiment__item">
                <span class="sentiment__emoji">😊</span>
                <div class="sentiment__info">
                  <div class="sentiment__label">긍정</div>
                  <div class="sentiment__value sentiment__value--green">75%</div>
                </div>
              </div>
              <div class="sentiment__item">
                <span class="sentiment__emoji">😐</span>
                <div class="sentiment__info">
                  <div class="sentiment__label">중립</div>
                  <div class="sentiment__value">20%</div>
                </div>
              </div>
              <div class="sentiment__item">
                <span class="sentiment__emoji">😟</span>
                <div class="sentiment__info">
                  <div class="sentiment__label">부정</div>
                  <div class="sentiment__value sentiment__value--red">5%</div>
                </div>
              </div>
            </div>
          </div>

          <div class="post-list">
            <div v-for="(post, pidx) in communityMockData" :key="pidx" class="post-item">
              <header class="post-item__header">
                <div class="post-item__author-info">
                  <div class="post-item__avatar">
                    {{ post.author[0] }}
                  </div>
                  <div class="post-item__author-meta">
                    <div class="post-item__author-name">{{ post.author }}</div>
                    <div class="post-item__time">{{ post.time }}</div>
                  </div>
                </div>
                <span class="post-item__sentiment-emoji">{{ post.sentiment === 'positive' ? '👍' : '🤔' }}</span>
              </header>
              <p class="post-item__content">{{ post.content.replace('{stock}', modals.community.data.name) }}</p>
              <footer class="post-item__footer">
                <span class="post-item__metric">❤️ {{ post.likes }}</span>
                <span class="post-item__metric">💬 {{ post.comments }}</span>
              </footer>
            </div>
          </div>
        </div>

        <footer class="modal__footer">
          <button class="modal__btn-close-full" @click="closeModal('community')">닫기</button>
        </footer>
      </div>
    </div>

    <!-- 투자인사이트 모달 -->
    <div v-if="modals.insight.show" class="modal-overlay" @click.self="closeModal('insight')">
      <div class="modal">
        <header class="modal__header modal__header--orange">
          <div class="modal__header-info">
            <div class="modal__icon-box">
              <svg class="modal__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
            <div class="modal__title-group">
              <h3 class="modal__title">전문가 투자 인사이트</h3>
              <p class="modal__subtitle">{{ modals.insight.data.name }} 핵심 리포트</p>
            </div>
          </div>
          <button class="modal__close-btn" @click="closeModal('insight')">
            <svg class="modal__close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        <div class="modal__content">
          <div class="insight">
            <header class="insight__header">
              <div class="insight__title-group">
                <h3 class="insight__title">📌 종목 투자 요약 ({{ modals.insight.data.name }})</h3>
                <p class="insight__subtitle">데이터 기반의 객관적 투자 가이드</p>
              </div>
              <div class="insight__rating-box">
                <div class="insight__stars">
                  <span v-for="i in 5" :key="i" class="insight__star" :class="{'insight__star--active': i <= 4}">★</span>
                </div>
                <div class="insight__divider"></div>
                <span class="insight__rating-value">4.5</span>
              </div>
            </header>

            <div class="insight__memo">
              <div class="insight__memo-glow"></div>
              <h4 class="insight__memo-label">AI Recommendation Memo</h4>
              <p class="insight__memo-text">
                {{ modals.insight.data.name }}은(는) <span class="insight__highlight">성장 모멘텀</span>이 강화되는 국면입니다. 현재 주가는 적정가치 대비 매력적인 수준을 유지하고 있어, 중장기적 관점의 비중 확대를 추천합니다.
              </p>
            </div>

            <div class="insight__grid">
              <div class="insight__card insight__card--blue">
                <div class="insight__card-label">Investment Opinion</div>
                <div class="insight__card-value">적극 매수 (Strong Buy)</div>
                <div class="insight__card-desc">강력한 펀더멘털 개선 기대</div>
              </div>
              <div class="insight__card insight__card--purple">
                <div class="insight__card-label">Factor Analytics Score</div>
                <div class="insight__card-value">상위 5% 이내 (Elite)</div>
                <div class="insight__card-desc">밸류·성장·수급 종합 최우수</div>
              </div>
            </div>

            <div class="insight__checkpoints">
              <h4 class="insight__checkpoints-title">
                <div class="insight__checkpoints-dot"></div>
                핵심 체크포인트 리스트
              </h4>
              <ul class="insight__checkpoint-list">
                <li v-for="(point, idx) in ['현재 주가는 역사적 저평가 구간으로 가격적 매력이 매우 높음', '차세대 AI 반도체 및 핵심 부품 공급망 확보에 따른 실시간 수혜', '외국인 및 기관 투자자의 지속적인 순매수 유입으로 강력한 수급 기반 형성']" :key="idx" class="insight__checkpoint-item">
                  <div class="insight__checkpoint-number">{{ idx + 1 }}</div>
                  <span class="insight__checkpoint-text">{{ point }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <footer class="modal__footer modal__footer--spaced">
          <button class="modal__btn-download" @click="downloadPDF">
            <svg class="modal__btn-download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Full PDF 리포트 다운로드
          </button>
          <button class="modal__btn-close-compact" @click="closeModal('insight')">닫기</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StockRankingPage',
  data() {
    return {
      searchQuery: '',
      selectedCustomerIndices: [],
      modals: {
        customers: { show: false, data: {} },
        ai: { show: false, data: {} },
        news: { show: false, data: {} },
        community: { show: false, data: {} },
        insight: { show: false, data: {} }
      },
      holdingStocks: [
        {
          name: '삼성전자',
          code: '005930',
          change: 2.3,
          rank: 1,
          customers: 23,
          avgHolding: '520주',
          totalValue: '12억',
          relatedCustomers: [
            { name: '김철수', investAmount: '5,000만원', returnRate: 2.4, holdings: '500주' },
            { name: '이영희', investAmount: '3,200만원', returnRate: 2.1, holdings: '320주' },
            { name: '박민수', investAmount: '8,500만원', returnRate: 2.8, holdings: '850주' },
            { name: '최지연', investAmount: '2,100만원', returnRate: 1.9, holdings: '210주' }
          ]
        },
        {
          name: 'SK하이닉스',
          code: '000660',
          change: 1.8,
          rank: 2,
          customers: 18,
          avgHolding: '380주',
          totalValue: '8억',
          relatedCustomers: [
            { name: '이준형', investAmount: '12,000만원', returnRate: 2.5, holdings: '800주' },
            { name: '김나영', investAmount: '6,700만원', returnRate: 2.1, holdings: '450주' }
          ]
        },
        {
          name: 'NAVER',
          code: '035420',
          change: -0.5,
          rank: 3,
          customers: 15,
          avgHolding: '290주',
          totalValue: '7억',
          relatedCustomers: [
            { name: '박서현', investAmount: '10,000만원', returnRate: -0.5, holdings: '420주' }
          ]
        },
        { name: '카카오', code: '035720', change: 3.1, rank: 4, customers: 12, avgHolding: '850주', totalValue: '5억', relatedCustomers: [] },
        { name: 'LG에너지솔루션', code: '373220', change: 4.2, rank: 5, customers: 11, avgHolding: '120주', totalValue: '6억', relatedCustomers: [] },
        { name: '현대차', code: '005380', change: -1.2, rank: 6, customers: 10, avgHolding: '240주', totalValue: '5억', relatedCustomers: [] },
        { name: '셀트리온', code: '068270', change: 2.8, rank: 7, customers: 9, avgHolding: '180주', totalValue: '4억', relatedCustomers: [] },
        { name: '삼성바이오로직스', code: '207940', change: 1.5, rank: 8, customers: 8, avgHolding: '45주', totalValue: '4억', relatedCustomers: [] },
        { name: 'KB금융', code: '105560', change: -0.8, rank: 9, customers: 7, avgHolding: '680주', totalValue: '5억', relatedCustomers: [] },
        { name: '신한지주', code: '055550', change: 0.9, rank: 10, customers: 6, avgHolding: '520주', totalValue: '3억', relatedCustomers: [] }
      ],
      newsMockData: [
        { title: '{stock}, 올해 실적 전망 긍정적... 목표가 상향', source: '한국경제', time: '2시간 전', summary: '증권가에서 2026년 실적 개선을 예상하며 목표주가를 일제히 상향 조정했습니다.' },
        { title: '{stock} 신규 사업 진출... 미래 성장 동력 확보', source: '매일경제', time: '5시간 전', summary: '신규 사업 분야 진출을 공식 발표하며, 중장기 성장 전략을 구체화했습니다.' }
      ],
      communityMockData: [
        { author: '투자고수', time: '30분 전', content: '{stock} 장기 보유 중인데, 최근 실적 발표 이후 더 확신이 생기네요.', likes: 24, comments: 8, sentiment: 'positive' },
        { author: '주식왕초보', time: '1시간 전', content: '단기 조정이 있을 수 있지만, 중장기적으로는 우상향 예상합니다.', likes: 15, comments: 5, sentiment: 'neutral' }
      ]
    }
  },
  computed: {
    filteredStocks() {
      return this.holdingStocks.filter(stock =>
        stock.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        stock.code.includes(this.searchQuery)
      )
    },
    totalCustomers() {
      return this.holdingStocks.reduce((sum, stock) => sum + stock.customers, 0)
    },
    avgChangeRate() {
      const sum = this.holdingStocks.reduce((sum, stock) => sum + stock.change, 0)
      return (sum / this.holdingStocks.length).toFixed(1)
    },
    currentTime() {
      const d = new Date()
      return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
    },
    isAllCustomersSelected() {
      const related = this.modals.customers.data.relatedCustomers
      return related && related.length > 0 && this.selectedCustomerIndices.length === related.length
    }
  },
  methods: {
    refreshData() {
      alert('데이터가 갱신되었습니다.')
    },
    openRelatedCustomers(stock) {
      this.modals.customers.data = stock
      this.modals.customers.show = true
      this.selectedCustomerIndices = []
    },
    openInsight(stock) {
      this.modals.insight.data = stock
      this.modals.insight.show = true
    },
    openAIReport(stock) {
      this.modals.ai.data = stock
      this.modals.ai.show = true
    },
    openNews(stock) {
      this.modals.news.data = stock
      this.modals.news.show = true
    },
    openCommunity(stock) {
      this.modals.community.data = stock
      this.modals.community.show = true
    },
    closeModal(type) {
      this.modals[type].show = false
    },
    toggleCustomerSelection(index) {
      const pos = this.selectedCustomerIndices.indexOf(index)
      if (pos === -1) {
        this.selectedCustomerIndices.push(index)
      } else {
        this.selectedCustomerIndices.splice(pos, 1)
      }
    },
    toggleSelectAllCustomers() {
      if (this.isAllCustomersSelected) {
        this.selectedCustomerIndices = []
      } else {
        this.selectedCustomerIndices = this.modals.customers.data.relatedCustomers.map((_, i) => i)
      }
    },
    sendAlert(platform) {
      alert(`${platform}으로 ${this.selectedCustomerIndices.length}명의 고객에게 리포트를 발송합니다.`)
      this.closeModal('customers')
    },
    downloadPDF() {
      alert('PDF 리포트를 다운로드합니다.')
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/stock/ranking.css';
</style>
