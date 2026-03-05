<template>
  <div class="strategic-modal__form-group">
    <div class="strategic-modal__form-header">
      <label class="strategic-modal__form-label">누구에게 보낼까요?</label>
      <span class="strategic-modal__client-summary-count"
        >{{ internalSelectedClients.length }}명 선택됨</span
      >
    </div>
    <div class="strategic-modal__client-list">
      <div
        v-for="(client, idx) in clients"
        :key="client.id"
        :class="[
          'strategic-modal__client-item',
          {
            'strategic-modal__client-item--border': idx !== clients.length - 1,
          },
        ]"
      >
        <input
          :id="'client-' + client.id"
          v-model="internalSelectedClients"
          type="checkbox"
          :value="client.id"
          class="strategic-modal__client-checkbox"
          @change="updateSelection"
        />
        <label
          :for="'client-' + client.id"
          class="strategic-modal__client-label"
        >
          <div class="strategic-modal__client-info">
            <div>
              <p class="strategic-modal__client-name">
                {{ client.name }}
                <span class="strategic-modal__client-email">{{
                  client.email
                }}</span>
              </p>
            </div>
            <div class="strategic-modal__client-portfolio">
              <p class="strategic-modal__client-portfolio-label">총 자산</p>
              <p class="strategic-modal__client-portfolio-value">
                {{ client.portfolio }}
              </p>
            </div>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 중장기 유망주 고객 선택 리스트
 */
import "~/assets/css/pages/strategic-stocks/StrategicClientList/StrategicClientList.css";

export default {
  name: "StrategicClientList",
  props: {
    clients: {
      type: Array,
      required: true,
    },
    selectedClients: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      internalSelectedClients: [...this.selectedClients],
    };
  },
  watch: {
    selectedClients(newVal) {
      this.internalSelectedClients = [...newVal];
    },
  },
  methods: {
    updateSelection() {
      this.$emit("update:selectedClients", this.internalSelectedClients);
    },
  },
};
</script>
