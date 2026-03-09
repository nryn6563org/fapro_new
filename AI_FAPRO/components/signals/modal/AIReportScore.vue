<template>
  <div class="ai-report-score">
    <div class="ai-report-score__card">
      <div class="ai-report-score__layout">
        <!-- Left: Progress Bars -->
        <div class="ai-report-score__bars">
          <div class="ai-report-score__card-header border-b-0 pb-2">
            <h3 class="ai-report-score__card-title ai-report-score__card-title--between">
              <span>AI스코어</span>
              <span class="ai-report-score__total">{{ signal?.aiScore || '9.0' }}</span>
            </h3>
          </div>
          <div class="ai-report-score__progress-list">
            <div v-for="item in scoreItems" :key="item.label" class="ai-report-score__progress-item">
              <div class="ai-report-score__progress-label">{{ item.label }}</div>
              <div class="ai-report-score__progress-bar-container">
                <div class="ai-report-score__progress-bar">
                  <!-- Center reference line -->
                  <div class="ai-report-score__center-line"></div>
                  <!-- Progress Fill -->
                  <div 
                    :class="['ai-report-score__progress-fill', getBarColorClass(item.value)]"
                    :style="getBarStyle(item.value)"
                  ></div>
                </div>
              </div>
              <div class="ai-report-score__progress-value">{{ item.value.toFixed(1) }}</div>
            </div>
          </div>
        </div>

        <!-- Right: Radar Chart -->
        <div class="ai-report-score__radar">
          <div class="ai-report-score__radar-wrapper">
            <svg viewBox="0 0 200 200" class="w-full h-full">
              <!-- Radar Background (Diamond) -->
              <polygon points="100,20 180,100 100,180 20,100" fill="none" class="ai-report-score__radar-grid" />
              <polygon points="100,60 140,100 100,140 60,100" fill="none" class="ai-report-score__radar-grid" />
              <line x1="100" y1="20" x2="100" y2="180" class="ai-report-score__radar-grid" />
              <line x1="20" y1="100" x2="180" y2="100" class="ai-report-score__radar-grid" />

              <!-- Data Polygons -->
              <!-- Mock Industry Avg (Blue) -->
              <polygon points="100,50 160,100 100,130 50,100" class="ai-report-score__radar-polygon ai-report-score__radar-polygon--blue" />
              <!-- Stock Data (Green) -->
              <polygon points="100,23.2 146.4,100 100,113.6 62.4,100" class="ai-report-score__radar-polygon ai-report-score__radar-polygon--green" />

              <!-- Labels -->
              <text x="100" y="12" text-anchor="middle" class="ai-report-score__radar-label">Technical</text>
              <text x="185" y="104" text-anchor="start" class="ai-report-score__radar-label">Momentum</text>
              <text x="100" y="195" text-anchor="middle" class="ai-report-score__radar-label">Quality</text>
              <text x="15" y="104" text-anchor="end" class="ai-report-score__radar-label">Value</text>

              <!-- Data Values -->
              <text x="100" y="35" text-anchor="middle" class="ai-report-score__radar-val">96</text>
              <text x="140" y="115" text-anchor="middle" class="ai-report-score__radar-val">58</text>
              <text x="100" y="130" text-anchor="middle" class="ai-report-score__radar-val">17</text>
              <text x="65" y="115" text-anchor="middle" class="ai-report-score__radar-val">47</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 리포트의 스코어 보드 (Progress Bars + Radar Chart)
 */
import "~/assets/css/pages/signals/AIReportScore/AIReportScore.css";

export default {
  name: "AIReportScore",
  props: {
    signal: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    scoreItems() {
      return [
        { label: "밸류(Value)", value: this.signal?.scores?.value || 3.0 },
        { label: "퀄리티(Quality)", value: this.signal?.scores?.quality || 6.0 },
        { label: "모멘텀(Momentum)", value: this.signal?.scores?.momentum || 8.0 },
        { label: "테크니컬(Technical)", value: this.signal?.scores?.technical || 10.0 },
      ];
    },
  },
  methods: {
    getBarStyle(value) {
      const midpoint = 3.0; // 중앙 임계점
      const max = 10.0;
      
      if (value <= midpoint) {
        // 3.0 이하면 좌측으로 (0 ~ 3.0 범위를 0% ~ 50% 에 매핑)
        const percentage = (value / midpoint) * 50;
        return {
          left: `${percentage}%`,
          width: `${50 - percentage}%`,
        };
      } else {
        // 3.0 이상이면 우측으로 (3.0 ~ 10.0 범위를 50% ~ 100% 에 매핑)
        const percentage = 50 + ((value - midpoint) / (max - midpoint)) * 50;
        return {
          left: '50%',
          width: `${percentage - 50}%`,
        };
      }
    },
    getBarColorClass(value) {
      return value <= 3.0 ? 'ai-report-score__progress-fill--red' : 'ai-report-score__progress-fill--green';
    }
  }
};
</script>
