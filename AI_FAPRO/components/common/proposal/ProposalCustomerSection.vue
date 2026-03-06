<template>
  <section class="proposal-section">
    <div class="proposal-section__header">
      <div class="proposal-section__title-row">
        <target-icon class="proposal-section__icon--emerald" />
        <h3 class="proposal-section__title">제안 고객</h3>
      </div>
    </div>

    <!-- Mode: Selection List (Multi-customer) -->
    <div v-if="mode === 'select'" class="proposal-list">
      <label v-for="customer in customers" :key="customer.id" :class="isSelected(customer.id) ? 'proposal-item--selected' : 'proposal-item'">
        <div class="proposal-item__content">
          <div class="proposal-item__top-row">
            <div class="proposal-item__checkbox">
              <input type="checkbox" :value="customer.id" :checked="isSelected(customer.id)" @change="toggleSelection(customer.id)" />
            </div>
            <div class="proposal-item__name-row">
              <strong class="proposal-item__name">{{ customer.name }}</strong>
              <span v-if="customer.investmentStyle" class="proposal-item__style">{{ customer.investmentStyle }}</span>
            </div>
            <div class="proposal-item__action">
              <span :class="badgeClass">
                {{ badgeText || (badgeType === "blue" ? "매도 제안" : "매수 제안") }}
              </span>
            </div>
          </div>
          <div v-if="customer.reason" class="proposal-item__reason">
            {{ customer.reason }}
          </div>
          <div v-else class="proposal-item__meta">
            {{ customer.email || "이메일 정보 없음" }} | 총 자산:
            {{ customer.assets || customer.portfolio || "0원" }}
          </div>
        </div>
      </label>
    </div>

    <!-- Mode: Single Display -->
    <div v-else class="proposal-item--display">
      <div class="proposal-item__content">
        <div class="proposal-item__top-row">
          <div class="proposal-item__name-row">
            <strong class="proposal-item__name">{{ singleCustomer.name }}</strong>
            <span v-if="singleCustomer.investmentStyle" class="proposal-item__style">{{ singleCustomer.investmentStyle }}</span>
          </div>
          <div class="proposal-item__action">
            <span :class="badgeClass">
                {{ badgeText || (badgeType === "blue" ? "매도 제안" : "매수 제안") }}
            </span>
          </div>
        </div>
        <div v-if="singleCustomer.reason" class="proposal-item__reason">
          {{ singleCustomer.reason }}
        </div>
        <div v-else class="proposal-item__meta">
          {{ singleCustomer.portfolio || "포트폴리오 정보 없음" }} · {{ singleCustomer.investmentStyle || "투자성향 미지정" }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/**
 * ProposalCustomerSection
 * 기능: 제안 대상 고객 표시 및 선택 섹션
 */
import { TargetIcon } from "vue-feather-icons";
import "~/assets/css/common/proposal/ProposalCustomerSection/ProposalCustomerSection.css";

export default {
  name: "ProposalCustomerSection",
  components: {
    TargetIcon
  },
  props: {
    mode: {
      type: String,
      default: "display" // 'display', 'select'
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
      default: () => ({ name: "고객명", investmentStyle: "공격투자형" })
    },
    badgeText: {
      type: String,
      default: ""
    },
    badgeType: {
      type: String,
      default: "red" // 'red' (Buy), 'blue' (Sell)
    }
  },
  computed: {
    badgeClass() {
      return this.badgeType === "blue" ? "proposal-badge--blue" : "proposal-badge--red";
    }
  },
  methods: {
    isSelected(id) {
      return this.selectedIds.includes(id);
    },
    toggleSelection(id) {
      const newIds = [...this.selectedIds];
      const index = newIds.indexOf(id);
      if (index > -1) {
        newIds.splice(index, 1);
      } else {
        newIds.push(id);
      }
      this.$emit("update:selectedIds", newIds);
    }
  }
};
</script>
