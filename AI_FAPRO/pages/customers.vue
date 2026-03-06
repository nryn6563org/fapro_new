<template>
  <div class="customers-page">
    <!-- Header -->
    <header class="customers-page__header">
      <div class="customers-page__header-left">
        <h1 class="customers-page__h1">고객 목록</h1>
        <p class="customers-page__h1-desc">
          엑셀 파일 업로드로 간편하게 고객 정보를 관리하세요
        </p>
      </div>
      <div class="customers-page__header-actions">
        <button
          class="customers-page__btn-amber"
          @click="handleAction('스마트 온보딩')"
        >
          <zap-icon class="w-4 h-4 mr-2" />
          스마트온보딩
        </button>
        <button
          class="customers-page__btn-outline"
          @click="handleAction('템플릿 다운로드')"
        >
          <download-icon class="w-4 h-4 mr-2" />
          템플릿 다운로드
        </button>
        <button
          class="customers-page__btn-outline"
          @click="handleAction('내보내기')"
        >
          <upload-icon class="w-4 h-4 mr-2" />
          내보내기
        </button>
      </div>
    </header>

    <!-- Content -->
    <div class="customers-page__content">
      <!-- Upload Area -->
      <customer-upload-area @upload="onFileUpload" />

      <!-- AI Search & Filter -->
      <div class="mt-8">
        <customer-ai-search
          :search-query.sync="searchQuery"
          :recent-searches="recentCustomerSearches"
          :selected-filter.sync="selectedFilter"
          :filter-categories="customerQuickFilters"
          @search="onSearch"
        />
      </div>

      <!-- Table Section -->
      <div class="mt-8">
        <customer-list-table
          :customers="filteredCustomers"
          @view-detail="onViewDetail"
          @view-holdings="onViewHoldings"
        />
      </div>
    </div>

    <!-- 모달 영역: v-if 직접 렌더링 -->
    <customer-detail-modal
      v-if="selectedCustomer"
      :customer="selectedCustomer"
      @close="selectedCustomer = null"
      @view-holdings="onViewHoldingsFromModal"
    />

    <customer-holdings-modal
      v-if="holdingsCustomer"
      :customer="holdingsCustomer"
      @close="holdingsCustomer = null"
    />
  </div>
</template>

<script>
/**
 * 기능: 고객 목록 메인 페이지 (고객 관리)
 * 모달: v-if 직접 렌더링 방식 (fapro-modal 디자인 시스템 적용)
 */
import { ZapIcon, DownloadIcon, UploadIcon } from "vue-feather-icons";
import CustomerUploadArea from "~/components/customers/CustomerUploadArea.vue";
import CustomerAiSearch from "~/components/customers/CustomerAiSearch.vue";
import CustomerListTable from "~/components/customers/CustomerListTable.vue";
import CustomerDetailModal from "~/components/customers/CustomerDetailModal.vue";
import CustomerHoldingsModal from "~/components/customers/CustomerHoldingsModal.vue";
import {
  sampleCustomers,
  recentCustomerSearches,
  customerQuickFilters,
} from "~/utils/customerMockData.js";
import "~/assets/css/pages/customers/CustomersPage/CustomersPage.css";

export default {
  name: "CustomersPage",
  components: {
    CustomerUploadArea,
    CustomerAiSearch,
    CustomerListTable,
    CustomerDetailModal,
    CustomerHoldingsModal,
    ZapIcon,
    DownloadIcon,
    UploadIcon,
  },
  layout: "default",
  data() {
    return {
      customers: [...sampleCustomers],
      searchQuery: "",
      selectedFilter: "전체",
      recentCustomerSearches,
      customerQuickFilters,
      /* 모달 상태 관리 */
      selectedCustomer: null,
      holdingsCustomer: null,
    };
  },
  computed: {
    filteredCustomers() {
      return this.customers.filter((c) => {
        const query = (this.searchQuery || "").toLowerCase();
        const matchesQuery =
          !query ||
          (c.name || "").toLowerCase().includes(query) ||
          (c.holdings || "").toLowerCase().includes(query) ||
          (c.notes || "").toLowerCase().includes(query);
        const matchesFilter =
          this.selectedFilter === "전체" ||
          c.investmentType === this.selectedFilter;
        return matchesQuery && matchesFilter;
      });
    },
  },
  methods: {
    onFileUpload(file) {
      console.log("File processing...", file.name);
      alert(`${file.name} 파일 업로드 처리를 시작합니다.`);
    },
    onSearch(query) {
      this.searchQuery = query;
    },
    /* 고객 상세 모달 열기 */
    onViewDetail(customer) {
      this.selectedCustomer = customer;
    },
    /* 보유종목 모달 열기 */
    onViewHoldings(customer) {
      this.holdingsCustomer = customer;
    },
    /* 상세 모달에서 보유종목 모달로 전환 */
    onViewHoldingsFromModal(customer) {
      this.selectedCustomer = null;
      this.$nextTick(() => {
        this.holdingsCustomer = customer;
      });
    },
    handleAction(name) {
      alert(`${name} 서비스는 준비 중입니다.`);
    },
  },
};
</script>
