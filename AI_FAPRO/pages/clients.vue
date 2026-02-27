<template>
  <div class="clients-page">
    <!-- Header -->
    <header class="clients-page__header">
      <div class="clients-page__header-left">
        <h1 class="clients-page__h1">고객 목록</h1>
        <p class="clients-page__h1-desc">
          엑셀 파일 업로드 및 스마트 추출로 간편하게 고객 정보를 관리하세요
        </p>
      </div>
      <div class="clients-page__header-actions">
        <button class="clients-page__onboard-btn" @click="isOnboardingOpen = true">
          <sparkles-icon class="w-4 h-4" />
          스마트 온보딩
        </button>
        <button class="clients-page__btn-outline" @click="handleDownloadTemplate">
          <download-icon class="w-4 h-4" />
          템플릿 다운로드
        </button>
        <button class="clients-page__btn-outline" @click="handleExport">
          <shared-download-icon class="w-4 h-4" />
          내보내기
        </button>
      </div>
    </header>

    <!-- Content Area -->
    <div class="clients-page__content">
      <!-- Upload Area -->
      <section class="clients-page__section">
        <client-upload-area @upload="handleFileUpload" />
      </section>

      <!-- AI Search & Filters -->
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

      <!-- Client Table -->
      <section class="clients-page__section mt-8">
        <client-list-table
          :clients="filteredClients"
          @view-holdings="openHoldingsModal"
          @view-info="openInfoModal"
        />
      </section>

      <!-- List Summary -->
      <footer class="clients-page__footer">
        <p>
          총
          <span class="font-black text-slate-900 dark:text-white">{{ filteredClients.length }}</span
          >명의 고객
          <span v-if="searchTerm || filterType !== '전체'" class="opacity-50 ml-1">
            (전체 {{ clients.length }}명 중)
          </span>
        </p>
        <p class="opacity-50">마지막 업데이트: 2026년 2월 13일 14:32</p>
      </footer>
    </div>

    <!-- Modals -->
    <client-holdings-modal :client="selectedClient" @close="selectedClient = null" />

    <client-info-modal
      :client="viewingClientInfo"
      :is-editing="isEditingInfo"
      @close="
        viewingClientInfo = null
        isEditingInfo = false
      "
      @edit="isEditingInfo = true"
      @cancel="isEditingInfo = false"
      @save="handleSaveClientInfo"
      @view-holdings="openHoldingsModalFromInfo"
    />

    <smart-onboarding-modal
      v-if="isOnboardingOpen"
      @close="isOnboardingOpen = false"
      @save="handleAddClient"
    />
  </div>
</template>

<script>
/**
 * 기능: 고객 목록 메인 페이지
 */
import ClientUploadArea from '~/components/clients/ClientUploadArea.vue'
import ClientAiSearch from '~/components/clients/ClientAiSearch.vue'
import ClientListTable from '~/components/clients/ClientListTable.vue'
import ClientHoldingsModal from '~/components/clients/ClientHoldingsModal.vue'
import ClientInfoModal from '~/components/clients/ClientInfoModal.vue'
import SmartOnboardingModal from '~/components/clients/SmartOnboardingModal.vue'
import { mockClients, aiSearchExamples } from '~/utils/clientMockData.js'
import { ZapIcon, DownloadIcon, DownloadIcon as SharedDownloadIcon } from 'vue-feather-icons'
import '~/assets/css/pages/clients/ClientsPage.css'

export default {
  name: 'ClientsPage',
  components: {
    ClientUploadArea,
    ClientAiSearch,
    ClientListTable,
    ClientHoldingsModal,
    ClientInfoModal,
    SmartOnboardingModal,
    ZapIcon,
    DownloadIcon,
    SharedDownloadIcon
  },
  layout: 'default',
  data() {
    return {
      clients: [...mockClients],
      searchTerm: '',
      filterType: '전체',
      isAiSearching: false,
      isOnboardingOpen: false,
      selectedClient: null,
      viewingClientInfo: null,
      isEditingInfo: false,
      aiSearchExamples
    }
  },
  computed: {
    filteredClients() {
      return this.clients.filter((client) => {
        const matchesSearch =
          client.name.includes(this.searchTerm) ||
          client.holdings.includes(this.searchTerm) ||
          client.phone.includes(this.searchTerm)
        const matchesType = this.filterType === '전체' || client.investmentType === this.filterType
        return matchesSearch && matchesType
      })
    }
  },
  methods: {
    handleFileUpload(file) {
      console.log('File uploaded:', file.name)
      // Simulate adding a new client from file
    },
    handleAiSearch(query) {
      this.isAiSearching = true
      this.searchTerm = query
      setTimeout(() => {
        this.isAiSearching = false
      }, 600)
    },
    handleClearSearch() {
      this.searchTerm = ''
    },
    handleDownloadTemplate() {
      console.log('Downloading template...')
    },
    handleExport() {
      console.log('Exporting data...')
    },
    openHoldingsModal(client) {
      this.selectedClient = client
    },
    openHoldingsModalFromInfo(client) {
      this.viewingClientInfo = null
      this.selectedClient = client
    },
    openInfoModal(client) {
      this.viewingClientInfo = client
      this.isEditingInfo = false
    },
    handleSaveClientInfo(updatedClient) {
      const idx = this.clients.findIndex((c) => c.name === this.viewingClientInfo.name)
      if (idx !== -1) {
        this.$set(this.clients, idx, updatedClient)
      }
      this.viewingClientInfo = null
      this.isEditingInfo = false
    },
    handleAddClient(newClient) {
      this.clients.push(newClient)
      this.isOnboardingOpen = false
    }
  }
}
</script>
