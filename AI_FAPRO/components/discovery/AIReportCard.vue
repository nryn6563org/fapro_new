<template>
  <div class="ai-report-card">
    <div class="ai-report-card__header">
      <div class="ai-report-card__header-info">
        <div class="ai-report-card__title-wrap">
          <h3 class="ai-report-card__title">{{ parsedTitle }}</h3>
          <span
            v-if="signalBadge"
            class="ai-report-card__signal-badge"
            :class="'ai-report-card__signal-badge--' + signalType"
          >
            {{ signalBadge }}
          </span>
        </div>
        <div class="ai-report-card__meta">
          <span class="ai-report-card__meta-item">
            <calendar-icon class="ai-report-card__meta-icon" />
            {{ report.generatedDate }}
          </span>
          <span class="ai-report-card__meta-item">
            <clock-icon class="ai-report-card__meta-icon" />
            {{ report.generatedTime }}
          </span>
        </div>
      </div>
      <div class="ai-report-card__header-actions">
        <button
          class="ai-report-card__btn-view"
          @click="$emit('open-report', report)"
        >
          <eye-icon class="ai-report-card__btn-icon" />
          리포트 보기
        </button>
      </div>
    </div>

    <div class="ai-report-card__body">
      <!-- 리포트 요약 -->
      <div class="ai-report-card__reason-box">
        <div class="ai-report-card__reason-header">
          <span class="ai-report-card__reason-icon">✨</span>
          <span class="ai-report-card__reason-title">리포트 요약</span>
        </div>
        <p class="ai-report-card__reason-text">{{ report.summary }}</p>
      </div>

      <!-- 시그널 발생 사유 -->
      <div class="ai-report-card__reason-box">
        <div class="ai-report-card__reason-header">
          <span class="ai-report-card__reason-icon">✨</span>
          <span class="ai-report-card__reason-title">시그널 발생 사유</span>
        </div>
        <p class="ai-report-card__reason-text">{{ report.reason }}</p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 종목발굴 페이지의 리포트 카드 (150라인 준수를 위한 분리)
 */
import { CalendarIcon, ClockIcon, EyeIcon } from "vue-feather-icons";
import "~/assets/css/pages/discovery/AIReportCard/AIReportCard.css";

export default {
  name: "AIReportCard",
  components: {
    CalendarIcon,
    ClockIcon,
    EyeIcon,
  },
  props: {
    report: {
      type: Object,
      required: true,
    },
  },
  computed: {
    parsedTitle() {
      // 제목에서 '-'를 기준으로 분리하여 시그널 배지 문자열을 추출
      return this.report.title.split(" - ")[0] || this.report.title;
    },
    signalBadge() {
      // "알테오젠 - 강력매도" 형식의 제목에서 시그널 부분을 임시 추출하는 로직
      if (this.report.signalBadge) return this.report.signalBadge;

      const parts = this.report.title.split(" - ");
      if (parts.length > 1) {
        // 예: "강력매도" -> "강력매도신호" 변환 처리
        let sig = parts[1];
        if (!sig.includes("신호")) sig += "신호";
        return sig;
      }
      return "";
    },
    signalType() {
      const type = this.signalBadge;
      if (type.includes("매수")) return "buy";
      if (type.includes("매도")) return "sell";
      return "neutral";
    },
  },
};
</script>
