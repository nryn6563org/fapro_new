<template>
  <aside class="c-right-panel">
    <div class="c-right-panel__inner">
      <!-- Schedule Section -->
      <section class="c-right-panel__section">
        <header class="c-section-header">
          <h2 class="c-section-header__title">일정 관리</h2>
          <button class="c-section-header__action">
            <Plus :size="16" />
          </button>
        </header>
        
        <client-only>
          <div class="c-calendar-widget">
            <v-calendar
              ref="calendar"
              v-model="selectedDate"
              is-expanded
              trim-weeks
              :attributes="calendarAttributes"
              :select-attribute="selectAttribute"
              :masks="{ title: 'YYYY.MM' }"
              @dayclick="onDayClick"
              class="c-calendar-v-override"
            />
          </div>
          <!-- Placeholder shown during SSR/Client Hydration -->
          <div slot="placeholder" class="c-calendar-widget c-calendar-skeleton">
            <div class="c-calendar-skeleton__header">
              <div class="c-calendar-skeleton__title"></div>
            </div>
            <div class="c-calendar-skeleton__grid">
              <div v-for="i in 28" :key="i" class="c-calendar-skeleton__day"></div>
            </div>
          </div>
        </client-only>
      </section>

      <!-- Real-time Feed Section -->
      <section class="c-right-panel__section c-right-panel__section--feed">
        <header class="c-feed-header">
          <div class="c-feed-header__top">
            <h2 class="c-feed-header__title">실시간 이슈/이벤트</h2>
            <button class="c-feed-header__refresh" @click="refreshFeed">
              <RefreshCw :size="12" />
            </button>
          </div>
          <p class="c-feed-header__desc">고객 보유 종목 랭킹 top10 종목과 내 관심목의 이벤트 발생내역을 실시간으로 알려드립니다.</p>
          <div class="c-feed-header__meta">
            <span class="c-feed-header__time">{{ lastRefreshed }}</span>
          </div>
        </header>

        <div class="c-timeline">
          <div 
            v-for="(event, index) in timelineEvents" 
            :key="event.id" 
            class="c-timeline__item"
            @click="openFeedModal(event)"
          >
            <!-- Timeline Line and Circle -->
            <div class="c-timeline__indicator">
              <div class="c-timeline__dot" :class="event.dotBorder"></div>
            </div>

            <!-- Content Card -->
            <div class="c-timeline__content">
              <div class="c-feed-card">
                <header class="c-feed-card__header">
                  <div class="c-feed-card__stock-info">
                    <span class="c-feed-card__tag" :class="event.badgeColor">{{ event.typeLabel }}</span>
                    <span class="c-feed-card__stock-name">{{ event.stockName }}</span>
                    <span class="c-feed-card__stock-code">({{ event.stockCode }})</span>
                  </div>
                  <div class="c-feed-card__actions">
                    <span class="c-feed-card__holders">
                      <User :size="10" /> {{ event.holders }}명 보유
                    </span>
                    <div 
                      v-if="event.hasAlarm" 
                      class="c-feed-card__alarm-wrapper"
                      :class="{ 'c-feed-card__alarm-wrapper--ping': index === 0 }"
                    >
                      <Bell 
                        :size="14" 
                        class="c-feed-card__alarm" 
                      />
                    </div>
                  </div>
                </header>
                
                <div class="c-feed-card__body">
                  <h4 class="c-feed-card__title">{{ event.title }}</h4>
                  <p class="c-feed-card__description">{{ event.desc }}</p>
                  <span class="c-feed-card__time-ago">{{ event.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Interactive Modals -->
    <ScheduleModal
      :is-open="isScheduleModalOpen"
      :date="selectedDateLabel"
      :schedules="selectedDaySchedules"
      @close="isScheduleModalOpen = false"
    />
    
    <IssueDetailModal
      :is-open="isIssueModalOpen"
      :issue="selectedIssue"
      @close="isIssueModalOpen = false"
    />
  </aside>
</template>

<script>
import { Plus, ChevronLeft, ChevronRight, RefreshCw, User, Bell } from 'lucide-vue'
import ScheduleModal from '@/components/function/ScheduleModal.vue'
import IssueDetailModal from '@/components/function/IssueDetailModal.vue'

export default {
  name: 'RightPanelComponent',
  components: {
    Plus,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
    User,
    Bell,
    ScheduleModal,
    IssueDetailModal
  },
  data() {
    return {
      lastRefreshed: '2026.02.09 13:27:37',
      isScheduleModalOpen: false,
      isIssueModalOpen: false,
      selectedDate: null,
      selectedDateLabel: '',
      selectedDaySchedules: [],
      selectedIssue: {},
      selectAttribute: {
        highlight: {
          color: 'blue',
          fillMode: 'solid',
        },
      },
      calendarAttributes: [
        {
          key: 'today',
          highlight: {
            color: 'blue',
            fillMode: 'solid',
          },
          dates: new Date(2026, 1, 9),
        },
        {
          key: 'schedules',
          dot: 'blue',
          dates: [
            new Date(2026, 1, 4),
            new Date(2026, 1, 6),
            new Date(2026, 1, 11),
            new Date(2026, 1, 15),
            new Date(2026, 1, 20),
          ],
        }
      ],
      schedulesData: {
        '2026-02-04': [
          { title: '월간 리포트 작성', description: '고객 월간 리포트 작성 마감일', target: 'VIP 50 members' }
        ],
        '2026-02-06': [
          { title: '신규 고객 미팅', description: '자산 배분 전략 상담', target: 'John Doe' }
        ],
        '2026-02-11': [
          { title: '시장 분석 회의', description: '반도체 섹터 전망 논의', target: 'Team A' }
        ]
      },
      timelineEvents: [
        { id: 1, type: 'signal', typeLabel: '신호', badgeColor: 'c-tag--signal', dotBorder: 'c-dot--signal', stockName: '삼성전자', stockCode: '005930', title: '매수 시그널 발생', desc: '라씨 AI 매수 신호 포착, 거래량 급증 감지', time: '5분 전', holders: 87, hasAlarm: true },
        { id: 2, type: 'news', typeLabel: '뉴스', badgeColor: 'c-tag--news', dotBorder: 'c-dot--news', stockName: 'SK하이닉스', stockCode: '000660', title: '반도체 업황 호전 기대', desc: '미국 AI칩 수요 증가로 HBM3 매출 확대 전망', time: '12분 전', holders: 52 },
        { id: 3, type: 'issue', typeLabel: '이슈', badgeColor: 'c-tag--issue', dotBorder: 'c-dot--issue', stockName: '현대차', stockCode: '005380', title: '급등 이슈 발생', desc: '미국 전기차 보조금 확대 소식에 7.2% 급등', time: '23분 전', holders: 63 },
        { id: 4, type: 'disclosure', typeLabel: '공시', badgeColor: 'c-tag--disclosure', dotBorder: 'c-dot--disclosure', stockName: 'NAVER', stockCode: '035420', title: '자사주 매입 공시', desc: '1,000억원 규모 자사주 매입 결정 공시', time: '35분 전', holders: 41 },
        { id: 5, type: 'report', typeLabel: '리포트', badgeColor: 'c-tag--report', dotBorder: 'c-dot--report', stockName: '카카오', stockCode: '035720', title: '투자의견 상향', desc: '광고 매출 회복세, 목표주가 7만원 상향 조정', time: '47분 전', holders: 38 },
        { id: 6, type: 'social', typeLabel: '소셜', badgeColor: 'c-tag--social', dotBorder: 'c-dot--social', stockName: 'LG에너지솔루션', stockCode: '373220', title: '소셜 언급량 급증', desc: '배터리 수주 관련 긍정적 여론 확산', time: '1시간 전', holders: 45 }
      ]
    }
  },
  methods: {
    onDayClick(day) {
      this.selectedDate = day.date; // Explicitly update bound model
      const dateStr = day.id; // YYYY-MM-DD
      this.selectedDateLabel = dateStr.replace(/-/g, '.');
      this.selectedDaySchedules = this.schedulesData[dateStr] || [];
      this.isScheduleModalOpen = true;
    },
    openFeedModal(event) {
      this.selectedIssue = event;
      this.isIssueModalOpen = true;
    },
    refreshFeed() {
      const now = new Date();
      this.lastRefreshed = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/area/right-panel.css';

/* v-calendar design overrides */
.c-calendar-v-override {
  @apply border-none bg-transparent !important;
}

::v-deep .vc-header {
  @apply mb-4 !important;
}

::v-deep .vc-title {
  @apply text-[11px] font-bold text-gray-700 dark:text-gray-300 !important;
}

::v-deep .vc-nav-arrow {
  @apply bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-1 !important;
}

::v-deep .vc-weeks {
  @apply p-0;
}

::v-deep .vc-weekday {
  @apply text-[10px] font-bold text-gray-500 dark:text-gray-400 pb-2;
}

::v-deep .vc-day {
  @apply min-h-[32px] p-0;
}

::v-deep .vc-day-content {
  @apply text-[10px] font-medium text-gray-700 dark:text-gray-300 transition-all hover:bg-white dark:hover:bg-gray-700 w-7 h-7 !important;
}

::v-deep .vc-day.is-not-in-month .vc-day-content {
  @apply text-gray-300 dark:text-gray-600 !important;
}

::v-deep .vc-highlight {
  @apply bg-blue-500 text-white !important;
}

::v-deep .vc-highlight span{
  @apply text-white !important;
}

::v-deep .vc-day.is-today .vc-day-content {
  @apply text-white !important;
}

::v-deep .vc-dot {
  @apply w-1 h-1 bg-blue-400 rounded-full mt-0.5 !important;
}

/* Skeleton UI */
.c-calendar-skeleton {
  @apply min-h-[200px] flex flex-col p-2;
}

.c-calendar-skeleton__header {
  @apply flex justify-center mb-6 pt-1;
}

.c-calendar-skeleton__title {
  @apply w-20 h-4 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse;
}

.c-calendar-skeleton__grid {
  @apply grid grid-cols-7 gap-y-4 gap-x-2;
}

.c-calendar-skeleton__day {
  @apply w-7 h-7 bg-gray-50 dark:bg-gray-800/50 rounded-full mx-auto animate-pulse;
}
</style>
