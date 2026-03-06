<template>
  <div class="customer-info">
    <!-- Left: 기본 정보 -->
    <div class="customer-info__section">
      <span class="customer-info__section-title">기본 정보</span>
      <div class="customer-info__list">
        <!-- 연락처 -->
        <div class="customer-info__item">
          <phone-icon class="customer-info__icon" />
          <div class="customer-info__content">
            <span class="customer-info__label">연락처</span>
            <span class="customer-info__value">{{ customer.phone || "정보 없음" }}</span>
          </div>
        </div>

        <!-- 이메일 -->
        <div class="customer-info__item">
          <mail-icon class="customer-info__icon" />
          <div class="customer-info__content">
            <span class="customer-info__label">이메일</span>
            <span class="customer-info__value">{{ customer.email || "정보 없음" }}</span>
          </div>
        </div>

        <!-- 투자유형 -->
        <div class="customer-info__item">
          <user-icon class="customer-info__icon" />
          <div class="customer-info__content">
            <span class="customer-info__label">투자유형</span>
            <div class="mt-1">
              <span class="customer-info__badge">{{ customer.investmentType || "미분류" }}</span>
            </div>
          </div>
        </div>

        <!-- 총자산 -->
        <div class="customer-info__item">
          <briefcase-icon class="customer-info__icon" />
          <div class="customer-info__content">
            <span class="customer-info__label">총자산</span>
            <span class="customer-info__value">{{ customer.totalAssets || customer.currentValuation || "-" }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: 특이사항 / 메모 -->
    <div class="customer-info__section">
      <span class="customer-info__section-title">특이사항 / 메모</span>
      <div class="customer-info__memo-card">
        <file-text-icon class="customer-info__memo-icon" />
        <p class="customer-info__memo-text">
          {{ customer.memo || "등록된 특이사항이 없습니다." }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 정보 상세 및 메모 섹션 (Redesign)
 */
import {
  PhoneIcon,
  MailIcon,
  UserIcon,
  BriefcaseIcon,
  FileTextIcon
} from "vue-feather-icons";
import "~/assets/css/pages/customers/CustomerDetailModal/CustomerDetailInfo.css";

export default {
  name: "CustomerDetailInfo",
  components: {
    PhoneIcon,
    MailIcon,
    UserIcon,
    BriefcaseIcon,
    FileTextIcon
  },
  props: {
    customer: { type: Object, required: true },
  },
};
</script>
