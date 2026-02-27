<template>
  <div class="ai-report-content">
    <div class="ai-report-content__grid">
      <!-- 왼쪽 2/3 영역 -->
      <div class="ai-report-content__col-main">
        <!-- 투자브리프 -->
        <div class="ai-report-content__card">
          <div class="ai-report-content__card-header">
            <h3 class="ai-report-content__card-title">투자브리프</h3>
          </div>
          <div class="ai-report-content__card-body">
            <p class="ai-report-content__text">
              {{ signal?.aiReport || '로딩 중...' }}
            </p>
          </div>
        </div>

        <!-- 팩터 리뷰 -->
        <div class="ai-report-content__factors">
          <h3 class="ai-report-content__section-title">팩터리뷰</h3>
          <div class="ai-report-content__factors-grid">
            <div class="ai-report-content__card">
              <div class="ai-report-content__card-header">
                <h4 class="ai-report-content__card-subtitle">투자포인트 (Buy Signal)</h4>
              </div>
              <div class="ai-report-content__card-body">
                <ul class="ai-report-content__list">
                  <li v-for="i in 3" :key="'buy' + i" class="ai-report-content__list-item">
                    해당 종목은 긍정적인 모멘텀을 보유하고 있습니다. (샘플 데이터)
                  </li>
                </ul>
              </div>
            </div>
            <div class="ai-report-content__card">
              <div class="ai-report-content__card-header">
                <h4 class="ai-report-content__card-subtitle">리스크요인 (Sell Signal)</h4>
              </div>
              <div class="ai-report-content__card-body">
                <ul class="ai-report-content__list">
                  <li v-for="i in 3" :key="'sell' + i" class="ai-report-content__list-item">
                    단기 과열로 인한 조정 리스크가 존재합니다. (샘플 데이터)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 오른쪽 1/3 영역 -->
      <div class="ai-report-content__col-side">
        <!-- 주가 팩트시트 -->
        <div class="ai-report-content__card">
          <div class="ai-report-content__card-header">
            <h3 class="ai-report-content__card-title">주가</h3>
          </div>
          <div class="ai-report-content__card-body">
            <div class="ai-report-content__summary-row">
              <span class="ai-report-content__summary-label">현재가</span>
              <span class="ai-report-content__summary-value">{{ signal?.price }}</span>
            </div>
            <div class="ai-report-content__summary-row mt-2">
              <span class="ai-report-content__summary-label">변동</span>
              <span class="ai-report-content__summary-value text-blue-600">{{
                signal?.change
              }}</span>
            </div>
          </div>
        </div>

        <!-- 발송 기능 모형 -->
        <div class="ai-report-content__card ai-report-content__card--highlight">
          <div class="ai-report-content__card-header">
            <h3 class="ai-report-content__card-title flex items-center gap-2">
              <mail-icon size="16" /> 고객에게 리포트 전송
            </h3>
          </div>
          <div class="ai-report-content__card-body">
            <p class="ai-report-content__text-sm mb-4">선택한 고객들에게 이 리포트를 발송합니다.</p>
            <button class="ai-report-content__btn-primary">
              <send-icon size="14" class="mr-2" /> 전송하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 리포트 모달 내부에 들어가는 컨텐츠
 */
import { MailIcon, SendIcon } from 'vue-feather-icons'
import '~/assets/css/pages/signals/AIReportContent.css'

export default {
  name: 'AIReportContent',
  components: {
    MailIcon,
    SendIcon
  },
  props: {
    signal: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
