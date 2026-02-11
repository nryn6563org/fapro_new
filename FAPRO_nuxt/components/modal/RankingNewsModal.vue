<template>
  <transition name="modal-fade">
    <!-- 모달 오버레이: 배경 클릭 시 닫기 기능 -->
    <div v-if="isOpen" class="c-news-modal-overlay" @click.self="$emit('close')">
      <!-- 랭킹 뉴스 모달 메인 컨테이너 -->
      <div class="c-ranking-news-modal">
        <!-- 모달 헤더: 제목 및 종목 정보 -->
        <header class="c-ranking-news-modal__header">
          <div class="c-ranking-news-modal__title-group">
            <Newspaper :size="20" class="c-ranking-news-modal__icon" />
            <div>
              <h3 class="c-ranking-news-modal__title">실시간 뉴스 요약</h3>
              <p class="c-ranking-news-modal__subtitle">{{ stockName }} ({{ stockCode }})</p>
            </div>
          </div>
          <!-- 닫기 버튼 -->
          <button class="c-ranking-news-modal__close" @click="$emit('close')">
            <X :size="20" />
          </button>
        </header>

        <!-- 모달 바디: 뉴스 리스트 및 분석 결과 -->
        <div class="c-ranking-news-modal__body">
          <div class="c-ranking-news-modal__list">
            <!-- 주요 뉴스 리스트 루프 -->
            <div v-for="(news, idx) in newsList" :key="idx" class="c-news-card">
              <div class="c-news-card__header">
                <span class="c-news-card__category">
                  {{ news.category }}
                </span>
                <span class="c-news-card__time">{{ news.time }}</span>
              </div>
              <h4 class="c-news-card__title">
                {{ news.title }}
              </h4>
              <p class="c-news-card__summary">
                {{ news.summary }}
              </p>
            </div>

            <!-- 뉴스 센티멘트 분석 섹션 -->
            <section class="c-news-sentiment">
              <h5 class="c-news-sentiment__title">뉴스 센티멘트 분석</h5>
              <div class="c-news-sentiment__content">
                <!-- 원형 차트 영역 -->
                <div class="c-sentiment-chart">
                  <svg class="w-full h-full" viewBox="0 0 36 36">
                    <path class="text-gray-200 dark:text-gray-700" stroke-width="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke-dasharray="100, 100" />
                    <path class="text-blue-500" stroke-width="3" stroke-linecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke-dasharray="72, 100" />
                  </svg>
                  <div class="c-sentiment-chart__label">
                    <span class="c-sentiment-chart__text">긍정</span>
                  </div>
                </div>
                <!-- 상세 분석 수치 영역 -->
                <div class="c-sentiment-info">
                  <div class="c-sentiment-info__row">
                    <span class="c-sentiment-info__label">긍정적인 소식</span>
                    <span class="c-sentiment-info__value">72%</span>
                  </div>
                  <!-- 프로그레스 바 -->
                  <div class="c-sentiment-bar">
                    <div class="c-sentiment-bar__fill" style="width: 72%"></div>
                  </div>
                  <p class="c-sentiment-info__note">지난 24시간 동안 보도된 24건의 뉴스를 분석한 결과입니다.</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <!-- 모달 푸터: 행션 버튼 -->
        <footer class="c-ranking-news-modal__footer">
          <button class="c-btn c-btn--ghost c-btn--sm" @click="$emit('close')">닫기</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { X, Newspaper } from 'lucide-vue'

export default {
  /**
   * 뉴스 요약 모달 컴포넌트
   * 특정 종목에 대한 실시간 뉴스 요약 및 감성 분석 결과를 보여줍니다.
   */
  name: 'RankingNewsModal',
  components: { X, Newspaper },
  props: {
    isOpen: Boolean,      // 모달 오픈 여부
    stockName: String,    // 종목명
    stockCode: String     // 종목코드
  },
  data() {
    return {
      // 뉴스 리스트 데이터 (실제 데이터 연동 필요)
      newsList: [
        {
          category: '특징주',
          time: '10분 전',
          title: '삼성전자, 차세대 HBM3E 12단 업계 최초 양산 성공...',
          summary: '삼성전자가 업계 최초로 36GB HBM3E 12단 제품 양산에 성공하며 엔비디아 공급망 진입 가속화가 기대됩니다.'
        },
        {
          category: '기업브리핑',
          time: '2시간 전',
          title: '글로벌 파운드리 고객사 전년비 20% 확대 소식에 강세',
          summary: '북미 지역 신규 팹 가동 준비와 함께 글로벌 팹리스 고객사들의 계약 문의가 쇄도하고 있다는 소식이 전해졌습니다.'
        },
        {
          category: '업종뉴스',
          time: '5시간 전',
          title: '반도체 수출 5개월 연속 플러스 행진, 전년비 66% 급증',
          summary: '산업통상자원부는 지난달 반도체 수출액이 역대 최대치를 경신하며 경기 회복의 견인차 역할을 하고 있다고 발표했습니다.'
        }
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/stock/modal/ranking-news-modal.css';
</style>
