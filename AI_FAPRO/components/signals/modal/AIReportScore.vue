<template>
  <div class="ai-report-score">
    <!-- AI 스코어 -->
    <div class="ai-report-score__card">
      <div
        class="ai-report-score__card-header ai-report-score__card-header--cyan"
      >
        <h3
          class="ai-report-score__card-title ai-report-score__card-title--between"
        >
          <span>AI스코어</span>
          <span class="ai-report-score__total">9.0</span>
        </h3>
      </div>
      <div
        class="ai-report-score__card-body ai-report-score__card-body--padded"
      >
        <div class="ai-report-score__progress-list">
          <!-- Iterate scores statically based on mock data -->
          <div class="ai-report-score__progress-item">
            <div class="ai-report-score__progress-label">밸류(Value)</div>
            <div class="ai-report-score__progress-bar">
              <div
                class="ai-report-score__progress-fill ai-report-score__progress-fill--red ai-report-score__progress-fill--w-30"
              ></div>
            </div>
            <div class="ai-report-score__progress-value">3.0</div>
          </div>

          <div class="ai-report-score__progress-item">
            <div class="ai-report-score__progress-label">우량성(Quality)</div>
            <div class="ai-report-score__progress-bar">
              <div
                class="ai-report-score__progress-fill ai-report-score__progress-fill--yellow ai-report-score__progress-fill--w-60"
              ></div>
            </div>
            <div class="ai-report-score__progress-value">6.0</div>
          </div>

          <div class="ai-report-score__progress-item">
            <div class="ai-report-score__progress-label">모멘텀(Momentum)</div>
            <div class="ai-report-score__progress-bar">
              <div
                class="ai-report-score__progress-fill ai-report-score__progress-fill--green ai-report-score__progress-fill--w-80"
              ></div>
            </div>
            <div class="ai-report-score__progress-value">8.0</div>
          </div>

          <div class="ai-report-score__progress-item">
            <div class="ai-report-score__progress-label">
              테크니컬(Technical)
            </div>
            <div class="ai-report-score__progress-bar">
              <div
                class="ai-report-score__progress-fill ai-report-score__progress-fill--green ai-report-score__progress-fill--w-100"
              ></div>
            </div>
            <div class="ai-report-score__progress-value">10.0</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 팩터 리뷰 -->
    <div class="ai-report-score__factors">
      <h3 class="ai-report-score__section-title">팩터리뷰</h3>
      <div class="ai-report-score__factors-grid">
        <!-- Buy Signal -->
        <div class="ai-report-score__card">
          <div class="ai-report-score__card-header">
            <h4 class="ai-report-score__card-subtitle">
              투자포인트 (Buy Signal)
            </h4>
          </div>
          <div
            class="ai-report-score__card-body ai-report-score__card-body--factors"
          >
            <ul class="ai-report-score__list">
              <li
                v-for="i in 5"
                :key="'buy' + i"
                class="ai-report-score__list-item"
              >
                <span class="ai-report-score__list-bullet">•</span>
                <span class="ai-report-score__list-text"
                  >Refer to page 3 of this report for more information on Schwab
                  Equity Ratings</span
                >
              </li>
            </ul>
          </div>
        </div>

        <!-- Sell Signal -->
        <div class="ai-report-score__card">
          <div class="ai-report-score__card-header">
            <h4 class="ai-report-score__card-subtitle">
              리스크요인 (Sell Signal)
            </h4>
          </div>
          <div
            class="ai-report-score__card-body ai-report-score__card-body--factors"
          >
            <ul class="ai-report-score__list">
              <li
                v-for="i in 5"
                :key="'sell' + i"
                class="ai-report-score__list-item"
              >
                <span class="ai-report-score__list-bullet">•</span>
                <span class="ai-report-score__list-text"
                  >Refer to page 3 of this report for more information on Schwab
                  Equity Ratings</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 리포트의 스코어 보드 및 팩터리뷰 영역 (좌측 하단부)
 */
import "~/assets/css/pages/signals/AIReportScore/AIReportScore.css";

export default {
  name: "AIReportScore",
};
</script>
