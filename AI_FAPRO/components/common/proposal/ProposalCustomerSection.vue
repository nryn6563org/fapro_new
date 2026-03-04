<template>
  <section class="proposal-section">
    <div class="proposal-section__header">
      <div class="proposal-section__title-row">
        <target-icon class="proposal-section__icon text-emerald-500" />
        <h3 class="proposal-section__title">제안 고객</h3>
      </div>
      <span v-if="badgeText" :class="['proposal-badge', badgeClass]">
        {{ badgeText }}
      </span>
    </div>

    <!-- Mode: Selection List (Multi-customer) -->
    <div v-if="mode === 'select'" class="proposal-list">
      <label 
        v-for="customer in customers" 
        :key="customer.id"
        class="proposal-item"
        :class="{ 'proposal-item--selected': isSelected(customer.id) }"
      >
        <div class="proposal-item__checkbox">
          <input 
            type="checkbox" 
            :value="customer.id" 
            :checked="isSelected(customer.id)"
            @change="toggleSelection(customer.id)"
          />
        </div>
        <div class="proposal-item__content">
          <div class="proposal-item__name-row">
            <strong class="proposal-item__name">{{ customer.name }}</strong>
            <span v-if="customer.investmentStyle" class="proposal-badge proposal-badge--outline">{{ customer.investmentStyle }}</span>
          </div>
          <div class="proposal-item__meta">
            {{ customer.email || '이메일 정보 없음' }} | 총 자산: {{ customer.assets || customer.portfolio || '0원' }}
          </div>
        </div>
      </label>
    </div>

    <!-- Mode: Single Display -->
    <div v-else class="flex items-center py-2">
      <strong class="text-base text-slate-900 dark:text-white">{{ singleCustomer.name }}</strong>
      <span v-if="singleCustomer.investmentStyle" class="proposal-badge proposal-badge--outline ml-2">
        {{ singleCustomer.investmentStyle }}
      </span>
    </div>
  </section>
</template>

<script>
/**
 * ProposalCustomerSection
 * 설명: 제안 대상 고객 표시 및 선택 섹션
 */
import { TargetIcon } from 'vue-feather-icons'

export default {
  name: 'ProposalCustomerSection',
  components: {
    TargetIcon
  },
  props: {
    mode: {
      type: String,
      default: 'display' // 'display', 'select'
    },
    customers: {
      type: Array,
      default: () => []
    },
    selectedIds: {
      type: Array,
      default: () => []
    },
    singleCustomer: {
      type: Object,
      default: () => ({ name: '고객명', investmentStyle: '공격투자형' })
    },
    badgeText: {
      type: String,
      default: ''
    },
    badgeType: {
      type: String,
      default: 'red' // 'red' (Buy), 'blue' (Sell)
    }
  },
  computed: {
    badgeClass() {
      return this.badgeType === 'blue' ? 'proposal-badge--blue' : 'proposal-badge--red'
    }
  },
  methods: {
    isSelected(id) {
      return this.selectedIds.includes(id)
    },
    toggleSelection(id) {
      const newIds = [...this.selectedIds]
      const index = newIds.indexOf(id)
      if (index > -1) {
        newIds.splice(index, 1)
      } else {
        newIds.push(id)
      }
      this.$emit('update:selectedIds', newIds)
    }
  }
}
</script>

