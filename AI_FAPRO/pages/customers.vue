<template>
  <div class="customers-page">
    <CustomersPageHeader @action="handleAction" />

    <!-- Content -->
    <div class="customers-page__content">
      <!-- Upload Area -->
      <customer-upload-area @upload="onFileUpload" />

      <!-- AI Search & Filter -->
      <div class="customers-page__search-section">
        <customer-ai-search
          :search-query.sync="searchQuery"
          :recent-searches="recentCustomerSearches"
          :selected-filter.sync="selectedFilter"
          :filter-categories="customerQuickFilters"
          @search="onSearch"
        />
      </div>

      <!-- Table Section -->
      <div class="customers-page__table-section">
        <customer-list-table
          :customers="filteredCustomers"
          @view-detail="onViewDetail"
          @view-holdings="onViewHoldings"
        />
      </div>
    </div>

    <!-- 모달 영역 -->
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
 * 기능: 고객 목록 메인 페이지 (Rule 9 준수)
 */
import CustomerUploadArea from "~/components/customers/CustomerUploadArea.vue";
import CustomerAiSearch from "~/components/customers/CustomerAiSearch.vue";
import CustomerListTable from "~/components/customers/CustomerListTable.vue";
import CustomerDetailModal from "~/components/customers/CustomerDetailModal.vue";
import CustomerHoldingsModal from "~/components/customers/CustomerHoldingsModal.vue";
import CustomersPageHeader from "~/components/customers/CustomersPage/CustomersPageHeader.vue";
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
    CustomersPageHeader,
  },
  layout: "default",
  data() {
    return {
      customers: [...sampleCustomers],
      searchQuery: "",
      selectedFilter: "전체",
      recentCustomerSearches,
      customerQuickFilters,
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
      alert(`${file.name} 파일 업로드 처리를 시작합니다.`);
    },
    onSearch(query) {
      this.searchQuery = query;
    },
    onViewDetail(customer) {
      this.selectedCustomer = customer;
    },
    onViewHoldings(customer) {
      this.holdingsCustomer = customer;
    },
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
