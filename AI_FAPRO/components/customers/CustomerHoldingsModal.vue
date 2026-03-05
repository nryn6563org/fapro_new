<template>
  <div class="customer-holdings">
    <div class="customer-holdings__modal animate__animated animate__zoomIn">
      <!-- Header -->
      <div class="customer-holdings__header">
        <div class="customer-holdings__header-left">
          <div class="customer-holdings__avatar">
            <user-icon class="customer-holdings__avatar-icon" />
          </div>
          <div>
            <h2 class="customer-holdings__title">{{ customer.name }}</h2>
            <p class="customer-holdings__subtitle">보유종목 상세 정보</p>
          </div>
        </div>
        <div class="customer-holdings__header-right">
          <button class="customer-holdings__edit-btn" @click="handleEdit">
            <edit-icon class="customer-holdings__btn-icon" />
            수정
          </button>
          <button class="customer-holdings__close-btn" @click="$emit('close')">
            <x-icon class="customer-holdings__close-icon" />
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="customer-holdings__body">
        <!-- Summary Cards -->
        <div class="customer-holdings__sum-grid">
          <div
            class="customer-holdings__sum-card customer-holdings__sum-card--blue"
          >
            <p class="customer-holdings__sum-label">총 투자금액</p>
            <p class="customer-holdings__sum-value">10억 4,300만원</p>
          </div>
          <div
            class="customer-holdings__sum-card customer-holdings__sum-card--green"
          >
            <p class="customer-holdings__sum-label">현재 평가금액</p>
            <p class="customer-holdings__sum-value">12억</p>
          </div>
          <div
            class="customer-holdings__sum-card customer-holdings__sum-card--teal"
          >
            <p class="customer-holdings__sum-label">총 수익률</p>
            <div class="customer-holdings__sum-trend">
              <trending-up-icon class="customer-holdings__sum-trend-icon" />
              <p class="customer-holdings__sum-value">+15.02%</p>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="customer-holdings__table-box">
          <table class="customer-holdings__table">
            <thead>
              <tr>
                <th class="customer-holdings__th">종목명</th>
                <th class="customer-holdings__th">보유수량</th>
                <th class="customer-holdings__th">평균단가</th>
                <th class="customer-holdings__th">현재가</th>
                <th class="customer-holdings__th">평가금액</th>
                <th class="customer-holdings__th">손익</th>
                <th class="customer-holdings__th">수익률</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(holding, index) in customer.holdingDetails"
                :key="index"
              >
                <td class="customer-holdings__td customer-holdings__td--name">
                  {{ holding.name }}
                </td>
                <td class="customer-holdings__td">{{ holding.quantity }}</td>
                <td class="customer-holdings__td">{{ holding.avgPrice }}</td>
                <td class="customer-holdings__td">
                  {{ holding.currentPrice }}
                </td>
                <td class="customer-holdings__td customer-holdings__td--val">
                  {{ holding.value }}
                </td>
                <td class="customer-holdings__td customer-holdings__td--profit">
                  <div class="customer-holdings__profit-box">
                    <trending-up-icon class="customer-holdings__profit-icon" />
                    {{ holding.profit }}
                  </div>
                </td>
                <td class="customer-holdings__td customer-holdings__td--rate">
                  {{ holding.profitRate }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- AI Analysis -->
        <div class="customer-holdings__ai-analysis">
          <div class="customer-holdings__ai-header">
            <div class="customer-holdings__ai-icon-box">
              <zap-icon class="customer-holdings__ai-zap-icon" />
            </div>
            <div>
              <h3 class="customer-holdings__ai-title">AI 고객 분석</h3>
              <p class="customer-holdings__ai-subtitle">
                포트폴리오 및 투자 성향 분석
              </p>
            </div>
          </div>
          <div class="customer-holdings__ai-content">
            <div class="customer-holdings__ai-item">
              <div
                class="customer-holdings__dot customer-holdings__dot--teal"
              ></div>
              <p class="customer-holdings__ai-text">
                <span class="customer-holdings__ai-text--bold">투자 성향:</span>
                {{ customer.investmentType }} 고객으로 현재 포트폴리오는 성장주
                중심으로 구성되어 있습니다.
              </p>
            </div>
            <div class="customer-holdings__ai-item">
              <div
                class="customer-holdings__dot customer-holdings__dot--teal"
              ></div>
              <p class="customer-holdings__ai-text">
                <span class="customer-holdings__ai-text--bold"
                  >수익률 분석:</span
                >
                전체 포트폴리오가 +15.02%의 양호한 수익률을 보이고 있으며, 모든
                보유 종목이 수익 상태입니다.
              </p>
            </div>
            <div class="customer-holdings__ai-item">
              <div
                class="customer-holdings__dot customer-holdings__dot--amber"
              ></div>
              <p class="customer-holdings__ai-text">
                <span class="customer-holdings__ai-text--bold-amber"
                  >추천 액션:</span
                >
                섹터 다각화를 통한 리스크 분산을 고려해보시고, 2차전지 또는
                바이오 섹터 추가 편입을 제안합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 보유 종목 상세 및 AI 분석 모달 (Modal-Vanilla 호환)
 */
import {
  UserIcon,
  EditIcon,
  XIcon,
  TrendingUpIcon,
  ZapIcon,
} from "vue-feather-icons";
import "~/assets/css/pages/customers/CustomerHoldingsModal/CustomerHoldingsModal.css";

export default {
  name: "CustomerHoldingsModal",
  components: {
    UserIcon,
    EditIcon,
    XIcon,
    TrendingUpIcon,
    ZapIcon,
  },
  props: {
    customer: { type: Object, required: true },
  },
  methods: {
    handleEdit() {
      alert("수정 기능은 준비 중입니다.");
    },
  },
};
</script>
