<template>
  <div class="issue-proposal-clients">
    <div class="issue-proposal-section__header mb-4">
      <h3 class="issue-proposal-section__title">고객 선택</h3>
    </div>
    <div class="issue-proposal-clients__list">
      <div
        v-for="client in clients"
        :key="client.id"
        class="issue-proposal-clients__item"
        :class="{ 'issue-proposal-clients__item--selected': internalSelectedClients.includes(client.id) }"
      >
        <div class="flex items-center gap-3">
          <input
            :id="'client-' + client.id"
            v-model="internalSelectedClients"
            type="checkbox"
            :value="client.id"
            class="issue-proposal-clients__checkbox"
          />
          <label :for="'client-' + client.id" class="issue-proposal-clients__info">
            <span class="issue-proposal-clients__name">{{ client.name }}</span>
            <span class="issue-proposal-clients__email">{{ client.email }}</span>
          </label>
        </div>
      </div>
    </div>
    <p class="issue-proposal-clients__footer-text">
      {{ internalSelectedClients.length }}명의 고객이 선택됨
    </p>
  </div>
</template>

<script>
/**
 * 기능: 이슈 제안 대상 고객 선택 컴포넌트
 */
import "~/assets/css/pages/issues/IssueProposalClients/IssueProposalClients.css";

export default {
  name: "IssueProposalClients",
  props: {
    clients: {
      type: Array,
      default: () => [],
    },
    selectedClientIds: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    internalSelectedClients: {
      get() {
        return this.selectedClientIds;
      },
      set(val) {
        this.$emit("update:selectedClientIds", val);
      },
    },
  },
};
</script>
