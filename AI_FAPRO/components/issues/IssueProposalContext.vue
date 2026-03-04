<template>
  <div>
    <!-- AI Summary -->
    <div class="issue-proposal__form-group">
      <label class="issue-proposal__label">
        <zap-icon class="w-4 h-4 text-emerald-500 mr-2" />
        AI 이슈 요약 (수정 가능)
      </label>
      <textarea
        v-model="localFormData.aiReason"
        class="issue-proposal__textarea"
        placeholder="이슈 요약을 입력하세요..."
      ></textarea>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Market Background -->
      <div class="issue-proposal__form-group">
        <label class="issue-proposal__label">
          <bar-chart-2-icon class="w-4 h-4 text-blue-500 mr-2" />
          시장 배경 설명
        </label>
        <textarea
          v-model="localFormData.marketBackground"
          class="issue-proposal__textarea"
          placeholder="이슈가 발생한 시장 배경과 맥락을 설명하세요..."
        ></textarea>
      </div>

      <!-- Stock Logic -->
      <div class="issue-proposal__form-group">
        <label class="issue-proposal__label">
          <target-icon class="w-4 h-4 text-amber-500 mr-2" />
          해당 종목 투자 논리
        </label>
        <textarea
          v-model="localFormData.stockLogic"
          class="issue-proposal__textarea"
          placeholder="관련 종목들의 투자 논리와 이유를 설명하세요..."
        ></textarea>
      </div>

      <!-- Expected Scenario -->
      <div class="issue-proposal__form-group">
        <label class="issue-proposal__label">
          <trending-up-icon class="w-4 h-4 text-green-500 mr-2" />
          기대 시나리오
        </label>
        <textarea
          v-model="localFormData.expectedScenario"
          class="issue-proposal__textarea"
          placeholder="향후 전개될 시나리오와 기대 효과를 설명하세요..."
        ></textarea>
      </div>

      <!-- Risk Factors -->
      <div class="issue-proposal__form-group">
        <label class="issue-proposal__label text-rose-500">
          <alert-triangle-icon class="w-4 h-4 mr-2" />
          리스크 요인
        </label>
        <textarea
          v-model="localFormData.riskFactors"
          class="issue-proposal__textarea"
          placeholder="투자 시 고려해야 할 리스크 요인을 설명하세요..."
        ></textarea>
      </div>
    </div>

    <!-- FA Opinion -->
    <div class="issue-proposal__form-group">
      <label class="issue-proposal__label text-indigo-500">
        <message-circle-icon class="w-4 h-4 mr-2" />
        FA 개인 의견 추가
      </label>
      <textarea
        v-model="localFormData.faOpinion"
        class="issue-proposal__textarea"
        placeholder="고객에게 전달할 개인적인 의견과 조언을 작성하세요..."
      ></textarea>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 이슈 제안서 컨텍스트 및 의견 입력영역
 */
import {
  ZapIcon,
  BarChart2Icon,
  TargetIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  MessageCircleIcon
} from 'vue-feather-icons'

export default {
  name: 'IssueProposalContext',
  components: {
    ZapIcon,
    BarChart2Icon,
    TargetIcon,
    TrendingUpIcon,
    AlertTriangleIcon,
    MessageCircleIcon
  },
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localFormData: { ...this.formData }
    }
  },
  watch: {
    formData: {
      handler(newVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(this.localFormData)) {
          this.localFormData = { ...newVal }
        }
      },
      deep: true
    },
    localFormData: {
      handler(newVal) {
        this.$emit('update:formData', newVal)
      },
      deep: true
    }
  }
}
</script>
