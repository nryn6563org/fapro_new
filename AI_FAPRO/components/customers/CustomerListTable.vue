<template>
  <div class="customer-table">
    <div class="customer-table__wrapper">
      <table class="customer-table__main">
        <thead class="customer-table__head">
          <tr>
            <th class="customer-table__th">고객명</th>
            <th class="customer-table__th">투자유형</th>
            <th class="customer-table__th">총자산</th>
            <th class="customer-table__th">보유종목</th>
            <th class="customer-table__th">특이사항</th>
            <th class="customer-table__th">고객 정보</th>
          </tr>
        </thead>
        <tbody class="customer-table__body">
          <tr v-for="customer in customers" :key="customer.id" class="customer-table__row">
            <td class="customer-table__td">
              <div class="customer-table__name-box">
                <div class="customer-table__avatar">
                  <user-icon class="w-4 h-4 text-white" />
                </div>
                <span class="customer-table__name">{{ customer.name }}</span>
              </div>
            </td>
            <td class="customer-table__td">
              <span :class="['customer-table__type-badge', getTypeClass(customer.investmentType)]">
                {{ customer.investmentType }}
              </span>
            </td>
            <td class="customer-table__td customer-table__td--slate">
              {{ customer.totalAssets }}
            </td>
            <td class="customer-table__td">
              <span class="text-slate-700 dark:text-slate-300">{{ customer.holdings }}</span>
            </td>
            <td class="customer-table__td customer-table__td--notes">
              {{ customer.notes }}
            </td>
            <td class="customer-table__td">
              <button class="customer-table__detail-btn" @click="$emit('view-detail', customer)">
                <user-icon class="w-4 h-4 mr-1" />
                상세보기
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 목록 테이블
 */
import { UserIcon } from 'vue-feather-icons'
import '~/assets/css/pages/customers/CustomerListTable/CustomerListTable.css'

export default {
  name: 'CustomerListTable',
  components: {
    UserIcon
  },
  props: {
    customers: { type: Array, required: true }
  },
  methods: {
    getTypeClass(type) {
      if (type === '공격형') return 'customer-table__type-badge--aggressive'
      if (type === '중립형') return 'customer-table__type-badge--neutral'
      return 'customer-table__type-badge--stable'
    }
  }
}
</script>
