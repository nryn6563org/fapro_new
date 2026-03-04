<template>
  <div class="issue-proposal__form-group">
    <label class="issue-proposal__label">고객 선택</label>
    <div class="issue-proposal__client-list">
      <div v-for="client in clients" :key="client.id" class="issue-proposal__client-item">
        <input
          :id="'client-' + client.id"
          v-model="internalSelectedClients"
          type="checkbox"
          :value="client.id"
          class="issue-proposal__checkbox"
        />
        <label :for="'client-' + client.id" class="issue-proposal__client-info">
          <span class="issue-proposal__client-name">{{ client.name }}</span>
          <span class="issue-proposal__client-email">{{ client.email }}</span>
        </label>
      </div>
    </div>
    <p class="issue-proposal__count">총 {{ internalSelectedClients.length }}명의 고객 선택됨</p>
  </div>
</template>

<script>
/**
 * 기능: 이슈 제안 대상 고객 선택 컴포넌트
 */
export default {
  name: 'IssueProposalClients',
  props: {
    clients: {
      type: Array,
      default: () => []
    },
    selectedClientIds: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    internalSelectedClients: {
      get() {
        return this.selectedClientIds
      },
      set(val) {
        this.$emit('update:selectedClientIds', val)
      }
    }
  }
}
</script>
