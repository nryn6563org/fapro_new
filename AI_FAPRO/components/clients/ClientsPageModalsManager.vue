<template>
  <div>
    <client-holdings-modal
      v-if="selectedClient"
      :client="selectedClient"
      @close="selectedClient = null"
    />

    <client-info-modal
      v-if="viewingClientInfo"
      :client="viewingClientInfo"
      :is-editing="isEditingInfo"
      @close="closeInfoModal"
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
 * 기능: 고객 페이지의 모든 모달 상태를 통합 관리하는 컴포넌트
 * 보유 종목 모달, 상세 정보 모달, 온보딩 모달의 상태와 열림/닫힘 로직을 캡슐화합니다.
 */
import ClientHoldingsModal from "~/components/clients/ClientHoldingsModal.vue";
import ClientInfoModal from "~/components/clients/ClientInfoModal.vue";
import SmartOnboardingModal from "~/components/clients/SmartOnboardingModal.vue";

export default {
  name: "ClientsPageModalsManager",
  components: {
    ClientHoldingsModal,
    ClientInfoModal,
    SmartOnboardingModal,
  },
  data() {
    return {
      isOnboardingOpen: false,
      selectedClient: null,
      viewingClientInfo: null,
      isEditingInfo: false,
    };
  },
  methods: {
    /**
     * @description 신규 고객 등록(스마트 온보딩) 모달을 엽니다.
     */
    openOnboarding() {
      this.isOnboardingOpen = true;
    },

    /**
     * @description 고객 보유 종목 모달을 엽니다.
     * @param {Object} client 대상 고객 객체
     */
    openHoldings(client) {
      this.selectedClient = client;
    },

    /**
     * @description 고객 상세 정보 모달을 엽니다.
     * @param {Object} client 대상 고객 객체
     */
    openInfo(client) {
      this.viewingClientInfo = client;
      this.isEditingInfo = false;
    },

    /**
     * @description 고객 정보 모달을 닫습니다.
     */
    closeInfoModal() {
      this.viewingClientInfo = null;
      this.isEditingInfo = false;
    },

    /**
     * @description 정보 모달에서 보유 종목 모달로 전환합니다.
     * @param {Object} client 대상 고객 객체
     */
    openHoldingsModalFromInfo(client) {
      this.closeInfoModal();
      this.openHoldings(client);
    },

    /**
     * @description 고객 정보 수정 내역을 부모로 올려보냅니다.
     * @param {Object} updatedClient 수정된 고객 객체
     */
    handleSaveClientInfo(updatedClient) {
      this.$emit("update-client", updatedClient);
      this.closeInfoModal();
    },

    /**
     * @description 신규 등록된 고객 데이터를 부모로 올려보냅니다.
     * @param {Object} newClient 신규 고객 객체
     */
    handleAddClient(newClient) {
      this.$emit("add-client", newClient);
      this.isOnboardingOpen = false;
    },
  },
};
</script>
