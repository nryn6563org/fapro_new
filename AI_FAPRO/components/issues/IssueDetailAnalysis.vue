<template>
  <div class="issue-detail__extra-info">
    <!-- Analysis Reason -->
    <div class="issue-detail__analysis-block issue-detail__analysis-block--reason">
      <div class="issue-detail__section-label">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M8.28086 12.9167C8.20647 12.6283 8.05615 12.3651 7.84555 12.1545C7.63494 11.9439 7.37176 11.7936 7.08336 11.7192L1.97086 10.4009C1.88364 10.3761 1.80687 10.3236 1.75221 10.2512C1.69754 10.1789 1.66797 10.0907 1.66797 10C1.66797 9.90937 1.69754 9.82118 1.75221 9.74884C1.80687 9.6765 1.88364 9.62397 1.97086 9.59921L7.08336 8.28004C7.37166 8.20572 7.63477 8.05552 7.84537 7.84508C8.05596 7.63463 8.20634 7.37162 8.28086 7.08338L9.5992 1.97088C9.6237 1.88331 9.67618 1.80616 9.74863 1.75121C9.82108 1.69625 9.90951 1.6665 10.0004 1.6665C10.0914 1.6665 10.1798 1.69625 10.2523 1.75121C10.3247 1.80616 10.3772 1.88331 10.4017 1.97088L11.7192 7.08338C11.7936 7.37177 11.9439 7.63496 12.1545 7.84556C12.3651 8.05616 12.6283 8.20648 12.9167 8.28088L18.0292 9.59838C18.1171 9.62263 18.1946 9.67505 18.2499 9.74761C18.3052 9.82016 18.3351 9.90884 18.3351 10C18.3351 10.0912 18.3052 10.1799 18.2499 10.2525C18.1946 10.325 18.1171 10.3775 18.0292 10.4017L12.9167 11.7192C12.6283 11.7936 12.3651 11.9439 12.1545 12.1545C11.9439 12.3651 11.7936 12.6283 11.7192 12.9167L10.4009 18.0292C10.3764 18.1168 10.3239 18.1939 10.2514 18.2489C10.179 18.3038 10.0905 18.3336 9.99961 18.3336C9.90868 18.3336 9.82025 18.3038 9.7478 18.2489C9.67535 18.1939 9.62287 18.1168 9.59836 18.0292L8.28086 12.9167Z"
            stroke="#F59E0B"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M16.667 2.5V5.83333" stroke="#F59E0B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M18.3333 4.16675H15" stroke="#F59E0B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M3.33301 14.1667V15.8334" stroke="#F59E0B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M4.16667 15H2.5" stroke="#F59E0B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <h5 class="issue-detail__section-title">이슈 생성 사유 상세</h5>
      </div>
      <div class="issue-detail__info-box issue-detail__info-box--orange">
        <p class="issue-detail__text">{{ issue.aiReason }}</p>
      </div>
    </div>
    <!-- Outlook -->
    <div class="issue-detail__analysis-block issue-detail__analysis-block--outlook">
      <div class="issue-detail__section-label">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="issue-detail__section-icon">
          <path d="M18.3337 5.83325L11.2503 12.9166L7.08366 8.74992L1.66699 14.1666" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M13.333 5.83325H18.333V10.8333" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <h5 class="issue-detail__section-title">이슈 전망 상세</h5>
      </div>
      <div class="issue-detail__info-box issue-detail__info-box--blue">
        <p class="issue-detail__text">{{ issue.outlook }}</p>
        <div class="issue-detail__outlook-grid">
          <div class="issue-detail__outlook-item">
            <div class="issue-detail__factor-header">
              <div class="issue-detail__factor-dot issue-detail__factor-dot--positive"></div>
              <span class="issue-detail__factor-label">긍정 요인</span>
            </div>
            <p class="issue-detail__factor-text">
              {{ issue.positiveProspects || "데이터가 없습니다." }}
            </p>
          </div>
          <div class="issue-detail__outlook-item">
            <div class="issue-detail__factor-header">
              <div class="issue-detail__factor-dot issue-detail__factor-dot--negative"></div>
              <span class="issue-detail__factor-label">리스크 요인</span>
            </div>
            <p class="issue-detail__factor-text">
              {{ issue.negativeProspects || "데이터가 없습니다." }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 이슈 관련 상세 분석 요약
 */
import "~/assets/css/pages/issues/IssueDetailAnalysis/IssueDetailAnalysis.css";

export default {
  name: "IssueDetailAnalysis",
  components: {},
  props: {
    issue: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
