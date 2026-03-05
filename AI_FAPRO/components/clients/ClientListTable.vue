<template>
  <div class="client-table animate__animated animate__fadeIn">
    <div class="client-table__wrapper">
      <table class="client-table__main">
        <thead>
          <tr class="client-table__head-row">
            <th class="client-table__th">고객명</th>
            <th class="client-table__th">투자유형</th>
            <th class="client-table__th">총자산</th>
            <th class="client-table__th">보유종목</th>
            <th class="client-table__th">특이사항</th>
            <th class="client-table__th client-table__th--center">고객 정보</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="clients.length > 0">
            <tr
              v-for="(client, index) in clients"
              :key="index"
              class="client-table__row"
            >
              <td class="client-table__td">
                <span class="client-table__name">{{ client.name }}</span>
              </td>
              <td class="client-table__td">
                <span
                  :class="[
                    'client-table__type-badge',
                    getTypeClass(client.investmentType),
                  ]"
                >
                  {{ client.investmentType }}
                </span>
              </td>
              <td class="client-table__td">
                <span class="client-table__assets">{{
                  client.totalAssets
                }}</span>
              </td>
              <td class="client-table__td">
                <div class="flex items-center gap-2">
                  <span class="client-table__holdings" :title="client.holdings">
                    {{ formatHoldings(client.holdings) }}
                  </span>
                  <button
                    v-if="
                      client.holdingsDetail && client.holdingsDetail.length > 0
                    "
                    class="client-table__eye-btn"
                    title="보유종목 상세보기"
                    @click="$emit('view-holdings', client)"
                  >
                    <eye-icon class="w-4 h-4" />
                  </button>
                </div>
              </td>
              <td class="client-table__td">
                <span class="client-table__notes" :title="client.notes">
                  {{ client.notes }}
                </span>
              </td>
              <td class="client-table__td client-table__td--center">
                <button
                  class="client-table__info-btn"
                  @click="$emit('view-info', client)"
                >
                  <user-icon class="w-4 h-4 mr-1" />
                  상세보기
                </button>
              </td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="6" class="client-table__empty">
              <div class="client-table__empty-content">
                <search-icon class="client-table__empty-icon" />
                <p>검색 결과가 없습니다</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 목록 테이블 컴포넌트
 */
import { EyeIcon, UserIcon, SearchIcon } from "vue-feather-icons";
import "~/assets/css/pages/clients/ClientListTable/ClientListTable.css";

export default {
  name: "ClientListTable",
  components: {
    EyeIcon,
    UserIcon,
    SearchIcon,
  },
  props: {
    clients: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getTypeClass(type) {
      const classes = {
        공격형: "client-table__type-badge--aggressive",
        안정형: "client-table__type-badge--stable",
        중립형: "client-table__type-badge--neutral",
      };
      return classes[type] || "client-table__type-badge--neutral";
    },
    formatHoldings(holdings) {
      if (!holdings) return "-";
      const stocks = holdings.split(",").map((s) => s.trim());
      if (stocks.length <= 1) return stocks[0];
      return `${stocks[0]} 외 ${stocks.length - 1}종목`;
    },
  },
};
</script>
