<template>
  <div v-if="issue" class="issue-detail">
    <div class="issue-detail__card">
      <!-- Title Section -->
      <div class="issue-detail__header">
        <div class="issue-detail__title-info">
          <div :class="['issue-detail__icon-box', 'issue-detail__icon-box--' + issue.type]">
            <trending-up-icon v-if="issue.type === 'up'" class="issue-detail__icon" />
            <trending-down-icon v-else-if="issue.type === 'down'" class="issue-detail__icon" />
            <minus-icon v-else class="issue-detail__icon" />
          </div>
          <div>
            <h3 class="issue-detail__title">{{ issue.name }} 관련 이슈 분석</h3>
            <p class="issue-detail__subtitle">AI 기반 심층 분석 리포트</p>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="issue-detail__stats-grid">
        <!-- Change Info -->
        <div class="issue-detail__stat-card issue-detail__stat-card--orange">
          <div class="issue-detail__stat-header">
            <p class="issue-detail__stat-label">등락률</p>
            <div class="issue-detail__intensity-bars">
              <div
                v-for="i in 3"
                :key="i"
                :class="[
                  'issue-detail__intensity-bar',
                  i <= intensityLevel
                    ? i === 3
                      ? 'bg-rose-500'
                      : i === 2
                      ? 'bg-orange-500'
                      : 'bg-slate-400'
                    : 'bg-slate-200 dark:bg-slate-800'
                ]"
              ></div>
            </div>
          </div>
          <p
            :class="[
              'issue-detail__stat-value',
              issue.type === 'up'
                ? 'text-red-600'
                : issue.type === 'down'
                ? 'text-blue-600'
                : 'text-slate-600'
            ]"
          >
            {{ issue.changePercent > 0 ? '+' : '' }}{{ issue.changePercent }}%
          </p>
          <p class="issue-detail__stat-desc">{{ intensityText }}</p>
        </div>

        <!-- Related Count -->
        <div class="issue-detail__stat-card issue-detail__stat-card--teal">
          <p class="issue-detail__stat-label mb-2">연관 종목 수</p>
          <p class="issue-detail__stat-value text-teal-500">{{ issue.relatedStocks.length }}개</p>
          <p class="issue-detail__stat-desc">분석 대상 종목</p>
        </div>

        <!-- Frequency -->
        <div class="issue-detail__stat-card issue-detail__stat-card--blue">
          <p class="issue-detail__stat-label mb-2">이슈 발생 / 2월</p>
          <p class="issue-detail__stat-value text-blue-600">18번</p>
          <p class="issue-detail__stat-desc">
            <span class="text-red-600 font-semibold">12번 상승</span> ·
            <span class="text-blue-600 font-semibold">6번 하락</span>
          </p>
        </div>
      </div>

      <!-- Segment Details (Small/Large Cap) -->
      <div class="issue-detail__segment">
        <div class="issue-detail__section-label">
          <percent-icon class="issue-detail__section-icon" />
          <h5 class="issue-detail__section-title">중소형주 비중 상세</h5>
        </div>
        <div class="issue-detail__segment-box">
          <div class="issue-detail__segment-grid">
            <div class="text-center">
              <p class="issue-detail__segment-label">시가총액 1000억 이하</p>
              <p class="issue-detail__segment-value">45%</p>
            </div>
            <div class="text-center">
              <p class="issue-detail__segment-label">1000억 - 5000억</p>
              <p class="issue-detail__segment-value">38%</p>
            </div>
            <div class="text-center">
              <p class="issue-detail__segment-label">5000억 - 1조</p>
              <p class="issue-detail__segment-value issue-detail__segment-value--teal">12%</p>
            </div>
            <div class="text-center">
              <p class="issue-detail__segment-label">1조 초과</p>
              <p class="issue-detail__segment-value issue-detail__segment-value--muted">5%</p>
            </div>
          </div>
          <div class="issue-detail__progress-bar">
            <div class="bg-teal-500 h-full" style="width: 45%"></div>
            <div class="bg-teal-500/80 h-full" style="width: 38%"></div>
            <div class="bg-teal-600 h-full" style="width: 12%"></div>
            <div class="bg-slate-400 h-full" style="width: 5%"></div>
          </div>
          <p class="issue-detail__segment-desc">
            해당 이슈는 <span class="text-teal-500 font-bold">중소형주 중심</span>으로 구성되어
            있으며, 시가총액 5000억 이하 종목이 <span class="font-bold">83%</span>를 차지합니다.
          </p>
        </div>
      </div>

      <!-- Full Stock Table -->
      <div class="issue-detail__table-section">
        <div class="issue-detail__section-label">
          <target-icon class="issue-detail__section-icon" />
          <h5 class="issue-detail__section-title">
            연관 종목 전체 리스트 (총 {{ sortedStocks.length }}종목)
          </h5>
        </div>
        <div class="issue-detail__table-wrapper">
          <table class="issue-detail__table">
            <thead>
              <tr>
                <th class="issue-detail__th text-left">종목명</th>
                <th class="issue-detail__th text-right">현재가</th>
                <th class="issue-detail__th text-right">등락률</th>
                <th class="issue-detail__th text-center">시그널점수</th>
                <th class="issue-detail__th text-center">AI시그널</th>
                <th class="issue-detail__th text-center">다른 이슈</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(stock, idx) in sortedStocks"
                :key="idx"
                :class="{ 'issue-detail__row--highlight': Math.abs(stock.changePercent) >= 5 }"
              >
                <td class="issue-detail__td">
                  <span class="font-bold text-slate-900 dark:text-white">{{ stock.name }}</span>
                </td>
                <td class="issue-detail__td text-right font-semibold text-slate-700 dark:text-slate-300">
                  {{ Math.round(10000 * (1 + stock.changePercent / 100)).toLocaleString() }}원
                </td>
                <td
                  :class="[
                    'issue-detail__td text-right font-bold',
                    stock.changePercent >= 0 ? 'text-red-600' : 'text-blue-600'
                  ]"
                >
                  {{ stock.changePercent > 0 ? '+' : '' }}{{ stock.changePercent }}%
                </td>
                <td class="issue-detail__td text-center">
                  <span
                    :class="[
                      'issue-detail__badge',
                      stock.alphaScore >= 85
                        ? 'issue-detail__badge--green'
                        : stock.alphaScore >= 75
                        ? 'issue-detail__badge--teal'
                        : 'issue-detail__badge--orange'
                    ]"
                  >
                    {{ stock.alphaScore }}
                  </span>
                </td>
                <td class="issue-detail__td text-center">
                  <span
                    :class="[
                      'issue-detail__badge',
                      stock.riskGrade === '저'
                        ? 'issue-detail__badge--red'
                        : stock.riskGrade === '중'
                        ? 'issue-detail__badge--yellow'
                        : 'issue-detail__badge--blue'
                    ]"
                  >
                    {{
                      stock.riskGrade === '저' ? '매수' : stock.riskGrade === '중' ? '관망' : '매도'
                    }}
                  </span>
                </td>
                <td class="issue-detail__td text-center">
                  <div class="issue-detail__other-issues">
                    <span
                      v-for="tag in ['AI반도체', '데이터센터']"
                      :key="tag"
                      class="issue-detail__tag"
                      >{{ tag }}</span
                    >
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Detailed Analysis -->
      <div class="issue-detail__extra-info">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Analysis Reason -->
          <div>
            <div class="issue-detail__section-label">
              <zap-icon class="issue-detail__section-icon text-amber-500" />
              <h5 class="issue-detail__section-title">AI 이슈 생성 사유 상세</h5>
            </div>
            <div class="issue-detail__info-box issue-detail__info-box--orange">
              <p class="issue-detail__text">{{ issue.aiReason }}</p>
            </div>
          </div>
          <!-- Outlook -->
          <div>
            <div class="issue-detail__section-label">
              <trending-up-icon class="issue-detail__section-icon text-blue-500" />
              <h5 class="issue-detail__section-title">이슈 전망 상세</h5>
            </div>
            <div class="issue-detail__info-box issue-detail__info-box--blue">
              <p class="issue-detail__text">{{ issue.outlook }}</p>
              <div class="issue-detail__outlook-grid">
                <div class="issue-detail__outlook-item">
                  <div class="flex items-center gap-2 mb-1">
                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                    <span class="text-xs font-bold dark:text-slate-300">긍정 요인</span>
                  </div>
                  <p class="text-[11px] text-slate-500">정부 정책 지원 강화, 수출 실적 증가</p>
                </div>
                <div class="issue-detail__outlook-item">
                  <div class="flex items-center gap-2 mb-1">
                    <div class="w-2 h-2 rounded-full bg-red-500"></div>
                    <span class="text-xs font-bold dark:text-slate-300">리스크 요인</span>
                  </div>
                  <p class="text-[11px] text-slate-500">글로벌 정세 불확실성, 환율 변동성</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- News Detail -->
      <div v-if="issue.newsSummary" class="issue-detail__news-detail">
        <div class="issue-detail__section-label">
          <book-open-icon class="issue-detail__section-icon text-teal-500" />
          <h5 class="issue-detail__section-title">관력 뉴스 상세</h5>
        </div>
        <div class="issue-detail__news-content">
          <div class="issue-detail__news-summary-box">
            <div class="flex items-center gap-2 mb-2">
              <zap-icon class="w-4 h-4 text-teal-500" />
              <p class="text-xs font-bold text-teal-600">AI 뉴스 요약</p>
            </div>
            <p class="text-sm text-slate-700 dark:text-slate-300">{{ issue.newsSummary }}</p>
          </div>
          <div class="issue-detail__news-list">
            <div
              v-for="(source, idx) in issue.newsSources"
              :key="idx"
              class="issue-detail__news-item"
            >
              <img
                :src="source.favicon"
                :alt="source.name"
                class="issue-detail__news-fav"
                @error="$event.target.style.display = 'none'"
              />
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-sm font-bold text-slate-900 dark:text-white">{{
                    source.name
                  }}</span>
                  <span class="issue-detail__news-time">{{
                    idx === 0 ? '최신' : idx + 1 + '시간 전'
                  }}</span>
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-400">
                  관련 산업 수주 확대 및 기술 개발 성공 소식 전해져...
                </p>
              </div>
              <chevron-right-icon class="w-4 h-4 text-slate-300" />
            </div>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div class="issue-detail__footer">
        <button class="issue-detail__btn-propose" @click="$emit('propose', issue)">
          <zap-icon class="w-5 h-5 mr-2" />
          이 이슈로 제안서 만들기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 이슈 심층 분석 섹션 (하단)
 */
import {
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
  PercentIcon,
  TargetIcon,
  ZapIcon,
  ChevronRightIcon,
  BookOpenIcon
} from 'vue-feather-icons'
import { featuredStocks } from '~/utils/issueDetectionMockData.js'
import '~/assets/css/pages/issues/IssueDetailSection.css'

export default {
  name: 'IssueDetailSection',
  components: {
    TrendingUpIcon,
    TrendingDownIcon,
    MinusIcon,
    PercentIcon,
    TargetIcon,
    ZapIcon,
    ChevronRightIcon,
    BookOpenIcon
  },
  props: {
    issue: {
      type: Object,
      default: null
    }
  },
  computed: {
    intensityLevel() {
      if (!this.issue) return 0
      const abs = Math.abs(this.issue.changePercent)
      if (abs > 5) return 3
      if (abs > 3) return 2
      return 1
    },
    intensityText() {
      if (this.intensityLevel === 3) return '매우 강함'
      if (this.intensityLevel === 2) return '강함'
      return '보통'
    },
    sortedStocks() {
      if (!this.issue) return []
      return featuredStocks
        .filter((stock) => this.issue.relatedStocks.includes(stock.ticker))
        .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
        .slice(0, 10)
    }
  }
}
</script>
