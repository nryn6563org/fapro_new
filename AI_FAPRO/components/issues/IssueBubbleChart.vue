<template>
  <div class="issue-chart">
    <!-- Issue Type Tabs -->
    <div class="issue-chart__tabs">
      <div class="issue-chart__tabs-container">
        <button
          :class="[
            'issue-chart__tab',
            { 'issue-chart__tab--active': type === 'all' },
          ]"
          @click="$emit('update:type', 'all')"
        >
          종합이슈
        </button>
        <button
          :class="[
            'issue-chart__tab',
            { 'issue-chart__tab--active': type === 'small' },
          ]"
          @click="$emit('update:type', 'small')"
        >
          중소형주 이슈
        </button>
        <button
          :class="[
            'issue-chart__tab',
            { 'issue-chart__tab--active': type === 'large' },
          ]"
          @click="$emit('update:type', 'large')"
        >
          대형주 이슈
        </button>
      </div>
    </div>

    <!-- Bubble Chart Area -->
    <div class="issue-chart__area">
      <div
        v-for="(issue, index) in issues"
        :key="issue.id"
        :class="[
          'issue-chart__bubble-wrapper',
          { 'issue-chart__bubble-wrapper--selected': selectedId === issue.id },
        ]"
        :style="{
          top: issue.position.top,
          left: issue.position.left,
          width: issue.size + 'px',
          height: issue.size + 'px',
          transitionDelay: index * 0.05 + 's',
        }"
      >
        <button
          :class="[
            'issue-chart__bubble',
            'issue-chart__bubble--' + issue.type,
            { 'issue-chart__bubble--selected': selectedId === issue.id },
          ]"
          @click="$emit('select', issue.id)"
        >
          <div class="issue-chart__bubble-content">
            <trending-up-icon
              v-if="issue.type === 'up'"
              class="issue-chart__icon"
            />
            <trending-down-icon
              v-else-if="issue.type === 'down'"
              class="issue-chart__icon"
            />
            <minus-icon v-else class="issue-chart__icon" />

            <span class="issue-chart__name">{{ issue.name }}</span>
            <span class="issue-chart__percent">
              {{ issue.changePercent > 0 ? "+" : "" }}{{ issue.changePercent }}%
            </span>
          </div>

          <!-- Tooltip hint (CSS only) -->
          <div class="issue-chart__tooltip">
            {{ issue.relatedStocks.length }}개 종목
          </div>
        </button>
      </div>
    </div>

    <!-- Status Info -->
    <div v-if="selectedIssue" class="issue-chart__footer">
      <div class="issue-chart__time-badge">
        <calendar-icon class="issue-chart__footer-icon" />
        <span class="issue-chart__footer-text">{{
          selectedIssue.issueDate
        }}</span>
        <clock-icon
          class="issue-chart__footer-icon--spaced"
        />
        <span class="issue-chart__footer-text">{{
          selectedIssue.updatedAt
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 이슈 버블 차트 컴포넌트
 */
import {
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
  CalendarIcon,
  ClockIcon,
} from "vue-feather-icons";
import "~/assets/css/pages/issues/IssueBubbleChart/IssueBubbleChart.css";

export default {
  name: "IssueBubbleChart",
  components: {
    TrendingUpIcon,
    TrendingDownIcon,
    MinusIcon,
    CalendarIcon,
    ClockIcon,
  },
  props: {
    issues: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      default: "large",
    },
    selectedId: {
      type: [Number, String],
      default: null,
    },
  },
  computed: {
    selectedIssue() {
      return this.issues.find((i) => i.id === this.selectedId);
    },
  },
};
</script>
