<template>
  <header class="customers-page__header">
    <div class="customers-page__header-left">
      <h1 class="customers-page__h1">고객 목록</h1>
      <p class="customers-page__h1-desc">
        엑셀 파일 업로드로 간편하게 고객 정보를 관리하세요
      </p>
    </div>
    <div class="customers-page__header-actions">
      <button class="customers-page__btn-amber" @click="$emit('action', '스마트 온보딩')">
        <zap-icon class="customers-page__btn-icon" />
        스마트온보딩
      </button>
      <button class="customers-page__btn-outline" @click="$emit('action', '템플릿 다운로드')">
        <download-icon class="customers-page__btn-icon" />
        템플릿 다운로드
      </button>
      <button class="customers-page__btn-outline" @click="$emit('action', '내보내기')">
        <upload-icon class="customers-page__btn-icon" />
        내보내기
      </button>
    </div>
  </header>
</template>

<script>
/**
 * 기능: 고객 목록 페이지 - 헤더 영역
 */
import { ZapIcon, DownloadIcon, UploadIcon } from "vue-feather-icons";

export default {
  name: "CustomersPageHeader",
  components: {
    ZapIcon,
    DownloadIcon,
    UploadIcon,
  },
};
</script>
