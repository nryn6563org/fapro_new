<template>
  <div class="c-stock-board">
    <div class="c-stock-board__header">
      <div class="c-stock-board__title-group">
        <h2 class="c-stock-board__main-title">종목 보드 :: 시총 101위 이하의 중소형주 대상</h2>
        <div class="c-stock-board__sub-title-group">
          <div class="c-stock-board__sub-title-dot"></div>
          <h3 class="c-stock-board__sub-title">AI 이슈포착</h3>
        </div>
      </div>
      <div class="c-stock-board__actions">
        <div class="c-tab-group">
          <button 
            @click="activeTab = 'domestic'" 
            class="c-tab-item"
            :class="{ 'c-tab-item--active': activeTab === 'domestic' }"
          >국내 이슈 포착</button>
          <button 
            @click="activeTab = 'us'" 
            class="c-tab-item"
            :class="{ 'c-tab-item--active': activeTab === 'us' }"
          >미국 이슈 포착</button>
        </div>
        <button class="c-stock-board__refresh">
          <RefreshCw :size="16" />
        </button>
      </div>
    </div>
    
    <div class="c-stock-board__body">
      <client-only>
        <VChart 
          class="c-stock-board__chart" 
          :option="chartOption" 
          autoresize 
          @click="handleChartClick"
        />
      </client-only>
      
      <div class="c-stock-board__detail-panel">
        <div v-if="!selectedIssue" class="c-stock-board__empty-detail">
          <div class="c-stock-board__empty-icon">💭</div>
          <p class="c-stock-board__empty-text">좌측 버블을 클릭하세요<br>이슈 관련 상세 정보를 확인할 수 있습니다</p>
        </div>
        
        <div v-else class="c-issue-detail">
          <div class="c-issue-detail__header">
            <span class="c-issue-detail__badge" :style="{ backgroundColor: selectedIssue.color }">ISSUE</span>
            <h4 class="c-issue-detail__title">{{ selectedIssue.name.replace('\n', ' ') }}</h4>
          </div>
          
          <div class="c-issue-detail__content">
            <div class="c-issue-detail__chart-section">
              <h5 class="c-issue-detail__section-title">{{ selectedIssue.name.replace('\n', ' ') }} 검색빈도 및 종목 누적 등락률</h5>
              <div class="c-issue-detail__chart-container">
                <client-only>
                  <VChart :option="detailChartOption" autoresize />
                </client-only>
              </div>
            </div>

            <div class="c-issue-detail__stocks-section">
              <h5 class="c-issue-detail__section-title">주요종목</h5>
              <div class="c-issue-detail__stock-list">
                <div v-for="stock in selectedIssue.mainStocks" :key="stock.name" class="c-issue-detail__stock-item">
                  <div class="c-issue-detail__stock-main">
                    <span class="c-issue-detail__stock-dot" :style="{ backgroundColor: stock.color }"></span>
                    <span class="c-issue-detail__stock-name">{{ stock.name }}</span>
                  </div>
                  <span class="c-issue-detail__stock-change" :class="{ 'is-positive': stock.change >= 0 }">
                    {{ stock.change >= 0 ? '+' : '' }}{{ stock.change.toFixed(2) }}%
                  </span>
                </div>
              </div>
            </div>

            <div class="c-issue-detail__news-section">
              <h5 class="c-issue-detail__section-title">뉴스</h5>
              <div class="c-issue-detail__news-list">
                <div v-for="news in selectedIssue.news" :key="news.id" class="c-issue-detail__news-item group">
                  <p class="c-issue-detail__news-title">{{ news.title }}</p>
                  <span class="c-issue-detail__news-time">{{ news.time }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <button class="c-issue-detail__more" @click="selectedIssue = null">
            닫기
          </button>
        </div>
      </div>
    </div>

    <div class="c-stock-board__footer">
      <button class="c-stock-board__more-btn">더보기</button>
    </div>
  </div>
</template>

<script>
import { RefreshCw } from 'lucide-vue'

export default {
  name: 'StockBoard',
  components: { RefreshCw },
  data() {
    return {
      activeTab: 'domestic',
      selectedIssue: null,
      chartData: {
        domestic: [
          { 
            name: '여행', value: 30, symbolSize: 110, itemStyle: { color: '#EF4444' },
            description: '설 연휴 해외여행 수요 급증 및 LCC 항공사들의 노선 확대 소식입니다.',
            color: '#EF4444',
            mainStocks: [
              { name: '모두투어', change: 29.98, color: '#EF4444' },
              { name: '광명전기', change: 7.62, color: '#F59E0B' },
              { name: '롯데관광개발', change: 5.40, color: '#10B981' },
              { name: '하나투어', change: 4.44, color: '#3B82F6' }
            ],
            news: [
              { id: 1, title: "'최저 9일' 설 연휴 일본·중국 '가계'...여행업계, 추가 모객 '총력'", time: '1시간 전' },
              { id: 2, title: '해외여행 수요 폭발... 주요 여행사 예약률 전년비 50% 급증', time: '3시간 전' }
            ],
            history: {
              dates: ['01/05', '01/12', '01/19', '01/26', '02/02'],
              searchVolume: [15, 18, 16, 25, 45],
              returns: [2, 5, 8, 15, 30]
            }
          },
          { 
            name: 'HBM\n반도체', value: 25, symbolSize: 90, itemStyle: { color: '#FF7D00' },
            description: 'AI 가속기 수요 급증으로 인한 HBM3E 양산 가속화 소식입니다.',
            color: '#FF7D00',
            mainStocks: [
              { name: 'SK하이닉스', change: 4.5, color: '#FF7D00' },
              { name: '한미반도체', change: 12.3, color: '#F59E0B' }
            ],
            news: [{ id: 1, title: 'SK하이닉스, TSMC와 HBM4 협력 강화', time: '2시간 전' }],
            history: {
              dates: ['01/05', '01/12', '01/19', '01/26', '02/02'],
              searchVolume: [20, 25, 30, 45, 60],
              returns: [5, 12, 18, 25, 45]
            }
          },
          { 
            name: '카지노', value: 20, symbolSize: 85, itemStyle: { color: '#EF4444' },
            description: '중국 단체 관광객 복격 유입 및 실적 턴어라운드 기대감입니다.',
            color: '#EF4444',
            mainStocks: [{ name: '파라다이스', change: 5.2, color: '#EF4444' }],
            news: [{ id: 1, title: '제주 드림타워, 역대 최대 실적 경신', time: '5시간 전' }],
            history: {
              dates: ['01/05', '01/12', '01/19', '01/26', '02/02'],
              searchVolume: [10, 15, 12, 18, 25],
              returns: [1, 3, 2, 6, 12]
            }
          },
          { 
            name: '조선', value: 18, symbolSize: 80, itemStyle: { color: '#3B82F6' },
            description: '고부가가치 선박 위주의 선별 수주 및 카타르 LNG선 2차 프로젝트 기대감입니다.',
            color: '#3B82F6',
            mainStocks: [{ name: '삼성중공업', change: 3.8, color: '#3B82F6' }],
            news: [{ id: 1, title: '조선업계, 올해 수주 증가로 실적 개선 기대', time: '1일 전' }],
            history: {
              dates: ['01/05', '01/12', '01/19', '01/26', '02/02'],
              searchVolume: [12, 14, 15, 18, 22],
              returns: [2, 4, 3, 5, 8]
            }
          },
          { 
            name: '우주항공', value: 22, symbolSize: 88, itemStyle: { color: '#3B82F6' },
            description: '우주항공청 개청 및 민간 주도 우주 개발 가속화 기대감입니다.',
            color: '#3B82F6',
            mainStocks: [{ name: '한국항공우주', change: 4.5, color: '#3B82F6' }],
            news: [{ id: 1, title: '정부, 우주산업 육성에 1조원 투자', time: '6시간 전' }],
            history: {
              dates: ['01/05', '01/12', '01/19', '01/26', '02/02'],
              searchVolume: [15, 20, 25, 35, 40],
              returns: [3, 7, 12, 15, 22]
            }
          }
        ],
        us: [
          { 
            name: 'AI\nChip', value: 35, symbolSize: 110, itemStyle: { color: '#8B5CF6' },
            description: 'Next-generation AI chips demand remains strong across data centers.',
            color: '#8B5CF6',
            mainStocks: [{ name: 'NVIDIA', change: 5.4, color: '#8B5CF6' }],
            news: [{ id: 1, title: 'NVIDIA reveals new Blackwell details', time: '2 hours ago' }],
            history: {
              dates: ['01/05', '01/12', '01/19', '01/26', '02/02'],
              searchVolume: [40, 45, 55, 70, 85],
              returns: [10, 20, 35, 50, 65]
            }
          }
        ]
      }
    }
  },
  computed: {
    chartOption() {
      return {
        tooltip: { trigger: 'item', formatter: '{b}' },
        series: [{
          name: 'Issues',
          type: 'graph',
          layout: 'force',
          data: this.chartData[this.activeTab],
          draggable: true,
          label: { show: true, position: 'inside', formatter: '{b}', fontSize: 11, fontWeight: 'bold', color: '#fff' },
          force: { repulsion: 120, edgeLength: 10 },
          itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.1)' }
        }]
      }
    },
    detailChartOption() {
      if (!this.selectedIssue) return {}
      
      const { dates, searchVolume, returns } = this.selectedIssue.history
      
      return {
        grid: { top: 30, right: 40, bottom: 20, left: 40, containLabel: true },
        tooltip: { trigger: 'axis' },
        xAxis: {
          type: 'category',
          data: dates,
          axisLine: { lineStyle: { color: '#E5E7EB' } },
          axisLabel: { color: '#9CA3AF', fontSize: 10 }
        },
        yAxis: [
          {
            type: 'value',
            name: '누적 등락률(%)',
            nameTextStyle: { color: '#9CA3AF', fontSize: 9 },
            axisLabel: { color: '#9CA3AF', fontSize: 10 },
            splitLine: { lineStyle: { type: 'dashed', color: '#F3F4F6' } }
          },
          {
            type: 'value',
            name: '검색수',
            nameTextStyle: { color: '#9CA3AF', fontSize: 9 },
            axisLabel: { color: '#9CA3AF', fontSize: 10 },
            splitLine: { show: false }
          }
        ],
        series: [
          {
            name: '검색빈도',
            type: 'line',
            yAxisIndex: 1,
            data: searchVolume,
            smooth: true,
            showSymbol: false,
            lineStyle: { width: 2, color: '#3B82F6' }
          },
          {
            name: '종목 누적 등락률',
            type: 'line',
            data: returns,
            smooth: true,
            showSymbol: false,
            lineStyle: { width: 3, color: this.selectedIssue.color || '#EF4444' },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: (this.selectedIssue.color || '#EF4444') + '33' },
                  { offset: 1, color: (this.selectedIssue.color || '#EF4444') + '00' }
                ]
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    handleChartClick(params) {
      if (params.data) {
        this.selectedIssue = params.data
      }
    }
  },
  watch: {
    activeTab() {
      this.selectedIssue = null
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/dashboard/stock-board.css';
</style>
