<template>
  <div class="customer-table">
    <div class="customer-table__wrapper">
      <table class="customer-table__main">
        <thead class="customer-table__head">
          <tr>
            <th class="customer-table__th">고객명</th>
            <th class="customer-table__th">투자유형</th>
            <th class="customer-table__th">총자산</th>
            <th class="customer-table__th">보유종목</th>
            <th class="customer-table__th">특이사항</th>
            <th class="customer-table__th">고객 정보</th>
          </tr>
        </thead>
        <tbody class="customer-table__body">
          <tr
            v-for="customer in pagedCustomers"
            :key="customer.id"
            class="customer-table__row"
          >
            <td class="customer-table__td">
              <div class="customer-table__name-box">
                <div class="customer-table__avatar">
                  <user-icon class="w-4 h-4 text-white" />
                </div>
                <span class="customer-table__name">{{ customer.name }}</span>
              </div>
            </td>
            <td class="customer-table__td">
              <span
                :class="[
                  'customer-table__type-badge',
                  getTypeClass(customer.investmentType),
                ]"
              >
                {{ customer.investmentType }}
              </span>
            </td>
            <td class="customer-table__td customer-table__td--slate">
              {{ customer.totalAssets }}
            </td>
            <td class="customer-table__td">
              <span class="text-slate-700 dark:text-slate-300">{{
                customer.holdings
              }}</span>
            </td>
            <td class="customer-table__td customer-table__td--notes">
              {{ customer.notes }}
            </td>
            <td class="customer-table__td">
              <button
                class="customer-table__detail-btn"
                @click="$emit('view-detail', customer)"
              >
                <user-icon class="w-4 h-4 mr-1" />
                상세보기
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 페이징 -->
    <div v-if="totalPages > 1" class="customer-table__pagination">
      <button
        class="customer-table__page-btn"
        :class="{ 'customer-table__page-btn--disabled': currentPage === 1 }"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        <chevron-left-icon class="w-3.5 h-3.5" />
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        class="customer-table__page-btn"
        :class="{ 'customer-table__page-btn--active': page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <button
        class="customer-table__page-btn"
        :class="{ 'customer-table__page-btn--disabled': currentPage === totalPages }"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        <chevron-right-icon class="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 목록 테이블 (15행 페이징)
 */
import { UserIcon, ChevronLeftIcon, ChevronRightIcon } from "vue-feather-icons";
import "~/assets/css/pages/customers/CustomerListTable/CustomerListTable.css";

const PAGE_SIZE = 15;

export default {
  name: "CustomerListTable",
  components: {
    UserIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  props: {
    customers: { type: Array, required: true },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.customers.length / PAGE_SIZE);
    },
    pagedCustomers() {
      const start = (this.currentPage - 1) * PAGE_SIZE;
      return this.customers.slice(start, start + PAGE_SIZE);
    },
  },
  watch: {
    customers() {
      this.currentPage = 1;
    },
  },
  methods: {
    getTypeClass(type) {
      if (type === "공격형") return "customer-table__type-badge--aggressive";
      if (type === "중립형") return "customer-table__type-badge--neutral";
      return "customer-table__type-badge--stable";
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
};
</script>
