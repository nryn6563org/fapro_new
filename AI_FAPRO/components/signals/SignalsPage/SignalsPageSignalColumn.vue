<template>
  <div :class="['signals-page__column', `signals-page__column--${type}`]">
    <div :class="['signals-page__column-header', `signals-page__column-header--${type}`]">
      <div class="signals-page__column-title-box">
        <div :class="['signals-page__column-icon-bg', `signals-page__column-icon-bg--${type}`]">
          <component :is="iconComponent" class="signals-page__column-icon" />
        </div>
        <h2 class="signals-page__column-title">
          {{ type === "buy" ? "매수 신호 발생" : "매도 신호 발생" }}
        </h2>
      </div>
      <span :class="['signals-page__column-badge', `signals-page__column-badge--${type}`]">
        <span class="signals-page__column-badge-num">{{ filteredSignals.length }}</span>
        <span class="signals-page__column-badge-unit">건</span>
      </span>
    </div>
    <div class="signals-page__column-content">
      <!-- 타임라인 필터 영역 -->
      <div class="signals-page__timeline-filter">
        <div class="signals-page__timeline-row">
          <div class="signals-page__timeline-spacer"></div>
          <div 
            class="signals-page__timeline-all"
            :class="{ 'signals-page__timeline-slot--active': selectedTime === 'all' }"
            @click="selectTime('all')"
          >
            전체보기
          </div>
        </div>
        <div class="signals-page__timeline-row">
          <div class="signals-page__timeline-label signals-page__timeline-label--am">오전</div>
          <div 
            v-for="slot in amSlots" 
            :key="slot" 
            class="signals-page__timeline-slot"
            :class="{ 'signals-page__timeline-slot--active': selectedTime === slot }"
            @click="selectTime(slot)"
          >
            {{ slot }}
          </div>
        </div>
        <div class="signals-page__timeline-row">
          <div class="signals-page__timeline-label signals-page__timeline-label--pm">오후</div>
          <div 
            v-for="slot in pmSlots" 
            :key="slot" 
            class="signals-page__timeline-slot"
            :class="{ 'signals-page__timeline-slot--active': selectedTime === slot }"
            @click="selectTime(slot)"
          >
            {{ slot }}
          </div>
        </div>
      </div>

      <!-- 선택된 타임라인 요약 -->
      <div class="signals-page__timeline-summary">
        <div class="signals-page__timeline-summary-time">
          {{ selectedTime === 'all' ? '전체보기' : selectedTime }}
        </div>
        <div class="signals-page__timeline-summary-text">
          {{ type === "buy" ? "매수신호 발생 종목" : "매도신호 발생 종목" }}
        </div>
      </div>

      <!-- 시그널 카드 리스트 -->
      <div class="signals-page__card-list">
        <trading-signal-card
          v-for="signal in filteredSignals"
          :key="signal.id"
          :signal="signal"
          :type="type"
          :is-detail-open="openKeys.includes(signal.id)"
          @toggle-detail="$emit('toggle-detail', signal.id)"
          @open-report="$emit('open-report', signal)"
          @open-analysis="$emit('open-analysis', signal)"
        />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI매매신호 페이지의 매수/매도 신호 컬럼
 * 특정 유형(Buy/Sell)의 신호 카드 목록을 렌더링합니다.
 */
import { ArrowUpIcon, ArrowDownIcon } from "vue-feather-icons";
import TradingSignalCard from "~/components/signals/TradingSignalCard.vue";

export default {
  name: "SignalsPageSignalColumn",
  components: {
    ArrowUpIcon,
    ArrowDownIcon,
    TradingSignalCard,
  },
  props: {
    // 컬럼 유형 ('buy' 또는 'sell')
    type: {
      type: String,
      required: true,
      validator: (val) => ["buy", "sell"].includes(val),
    },
    // 표시할 신호 데이터 목록
    signals: {
      type: Array,
      default: () => [],
    },
    // 현재 상세 정보가 열려있는 카드의 ID 목록
    openKeys: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedTime: "all",
      amSlots: [
        "09:00", "09:20", "09:40", "10:00", "10:20",
        "10:40", "11:00", "11:20", "11:40", "12:00"
      ],
      pmSlots: [
        "12:20", "12:40", "13:00", "13:20", "13:40",
        "14:00", "14:20", "14:40", "15:00", "15:20"
      ]
    };
  },
  computed: {
    // 유형에 따른 아이콘 컴포넌트 반환
    iconComponent() {
      return this.type === "buy" ? "ArrowUpIcon" : "ArrowDownIcon";
    },
    // 선택된 탭에 따라 신호 필터링
    filteredSignals() {
      if (this.selectedTime === "all") return this.signals;
      return this.signals.filter((signal) => {
        if (!signal.time) return false;
        const [hour, minute] = signal.time.split(":").map(Number);
        const totalMinutes = hour * 60 + minute;
        
        const [slotHour, slotMinute] = this.selectedTime.split(":").map(Number);
        const slotTotalMinutes = slotHour * 60 + slotMinute;

        // 20분 단위 슬롯 매칭
        return totalMinutes >= slotTotalMinutes && totalMinutes < slotTotalMinutes + 20;
      });
    }
  },
  methods: {
    selectTime(time) {
      this.selectedTime = time;
    }
  }
};
</script>
