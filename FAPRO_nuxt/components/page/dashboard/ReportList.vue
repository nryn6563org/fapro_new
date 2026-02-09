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
              <button class="c-btn-action c-btn-action--outline"><FileText :size="12" /> AI리포트</button>
              <button class="c-btn-action c-btn-action--outline"><Volume2 :size="12" /> 듣기</button>
              <button class="c-btn-action c-btn-action--outline"><FileText :size="12" /> 요약</button>
              <button class="c-btn-action c-btn-action--outline"><User :size="12" /> 고객</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="c-report-list__footer">
      <button class="c-report-list__more-btn">더보기</button>
    </div>
  </div>
</template>

<script>
import { FileText, Volume2, ClipboardList, User, RefreshCw, TrendingUp } from "lucide-vue";

export default {
  name: "DashboardReportList",
  components: { FileText, Volume2, ClipboardList, User, RefreshCw, TrendingUp },
  data() {
    return {
      reports: [
        { id: 1, name: "삼성전자", code: "005930", change: 2.3, description: "반도체 업황 회복과 AI 수요 증가로 실적 개선 전망", date: "01-30", time: "14:23", type: "AI" },
        { id: 2, name: "현대차", code: "005380", change: -1.2, description: "전기차 시장 둔화 우려, 하지만 신규 모델 출시로 반등 기대", date: "01-30", time: "11:15", type: "Tech" },
        { id: 3, name: "NAVER", code: "035420", change: -0.5, description: "검색 플랫폼 안정성과 AI 투자로 장기 성장 동력 확보", date: "01-29", time: "16:47", type: "AI" },
        { id: 4, name: "카카오", code: "035720", change: 3.1, description: "플랫폼 광고 매출 호조, 게임 부문 실적 개선 지속", date: "01-29", time: "09:20", type: "News" }
      ]
    };
  }
};
</script>

<style scoped>
@import "@/assets/css/page/dashboard/report-list.css";
</style>
