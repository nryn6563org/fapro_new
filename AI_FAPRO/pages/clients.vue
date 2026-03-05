<template>
  <!-- ── 고객 목록 메인 페이지 ── -->
  <div class="clients-page">
    <!-- ── 페이지 헤더: 제목, 설명 및 주요 액션 버튼 영역 ── -->
    <clients-page-header @open-onboarding="$refs.modalsManager.openOnboarding()" />

    <!-- ── 콘텐츠 영역 ── -->
    <div class="clients-page__content">
      <!-- ── 파일 업로드 섹션 ── -->
      <section class="clients-page__section">
        <client-upload-area @upload="handleFileUpload" />
      </section>

      <!-- ── AI 검색 및 필터 섹션 ── -->
      <section class="clients-page__section mt-8">
        <client-ai-search
          :search-term.sync="searchTerm"
          :filter-type.sync="filterType"
          :examples="aiSearchExamples"
          :is-searching="isAiSearching"
          @search="handleAiSearch"
          @clear="handleClearSearch"
        />
      </section>

      <!-- ── 고객 목록 테이블 섹션 ── -->
      <section class="clients-page__section mt-8">
        <client-list-table
          :clients="filteredClients"
          @view-holdings="(client) => $refs.modalsManager.openHoldings(client)"
          @view-info="(client) => $refs.modalsManager.openInfo(client)"
        />
      </section>

      <clients-page-footer
        :total-count="clients.length"
        :filtered-count="filteredClients.length"
        :is-filtered="searchTerm !== '' || filterType !== '전체'"
      />
    </div>

    <!-- ── 모달 영역 ── -->

    <!-- 고객 관련 모든 모달(보유 종목, 정보, 온보딩) 상태/이벤트 관리 -->
    <clients-page-modals-manager
      ref="modalsManager"
      @update-client="handleUpdateClient"
      @add-client="handleAddClient"
    />
  </div>
</template>

<script>
/**
 * 기능: 고객 목록 메인 페이지
 * 엑셀 업로드, AI 검색·필터, 고객 테이블 조회, 보유 종목 및
 * 상세 정보 모달, 스마트 온보딩(신규 고객 추가) 기능을 제공합니다.
 */
import ClientUploadArea from "~/components/clients/ClientUploadArea.vue";
import ClientAiSearch from "~/components/clients/ClientAiSearch.vue";
import ClientListTable from "~/components/clients/ClientListTable.vue";
import ClientsPageModalsManager from "~/components/clients/ClientsPageModalsManager.vue";
import ClientsPageHeader from "~/components/clients/ClientsPageHeader.vue";
import ClientsPageFooter from "~/components/clients/ClientsPageFooter.vue";
import { mockClients, aiSearchExamples } from "~/utils/clientMockData.js";
import "~/assets/css/pages/clients/ClientsPage/ClientsPage.css";

export default {
  name: "ClientsPage",
  components: {
    ClientsPageHeader,
    ClientsPageFooter,
    ClientUploadArea,
    ClientAiSearch,
    ClientListTable,
    ClientsPageModalsManager,
  },
  layout: "default",
  data() {
    return {
      // 목 데이터로 초기화된 전체 고객 목록
      clients: [...mockClients],
      // AI 검색어
      searchTerm: "",
      // 투자 유형 필터 (기본값: '전체')
      filterType: "전체",
      // AI 검색 중 로딩 상태 플래그
      isAiSearching: false,
      // AI 검색 예시 목록
      aiSearchExamples,
    };
  },
  computed: {
    /**
     * @description 검색어와 투자 유형 필터를 적용한 고객 목록을 반환합니다.
     * 이름, 보유 종목, 전화번호 중 하나라도 검색어를 포함하면 결과에 포함됩니다.
     * @returns {Array} 필터링된 고객 객체 배열
     */
    filteredClients() {
      return this.clients.filter((client) => {
        const matchesSearch =
          client.name.includes(this.searchTerm) ||
          client.holdings.includes(this.searchTerm) ||
          client.phone.includes(this.searchTerm);
        const matchesType =
          this.filterType === "전체" ||
          client.investmentType === this.filterType;
        return matchesSearch && matchesType;
      });
    },
  },
  methods: {
    /**
     * @description 파일 업로드 이벤트를 처리합니다.
     * 업로드된 파일을 기반으로 신규 고객 데이터를 추가합니다.
     * @param {File} file - 업로드된 파일 객체
     */
    handleFileUpload(file) {
      console.log("파일 업로드됨:", file.name);
      // 파일 기반 고객 추가 처리 (구현 예정)
    },

    /**
     * @description AI 검색 실행 이벤트를 처리합니다.
     * 검색어를 설정하고 로딩 상태를 600ms 후 해제합니다.
     * @param {string} query - AI 검색 쿼리 문자열
     */
    handleAiSearch(query) {
      this.isAiSearching = true;
      this.searchTerm = query;
      setTimeout(() => {
        this.isAiSearching = false;
      }, 600);
    },

    /**
     * @description AI 검색을 초기화하여 검색어를 비웁니다.
     */
    handleClearSearch() {
      this.searchTerm = "";
    },

    /**
     * @description 데이터 목록에서 특정 고객의 정보를 업데이트합니다.
     * @param {Object} updatedClient - 수정된 고객 데이터
     */
    handleUpdateClient(updatedClient) {
      const idx = this.clients.findIndex((c) => c.name === updatedClient.name);
      if (idx !== -1) {
        this.$set(this.clients, idx, updatedClient);
      }
    },

    /**
     * @description 신규 고객을 목록에 추가합니다.
     * @param {Object} newClient - 새로 등록할 고객 객체
     */
    handleAddClient(newClient) {
      this.clients.unshift(newClient);
    },
  },
};
</script>
