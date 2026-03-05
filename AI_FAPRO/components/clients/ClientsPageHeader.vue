<template>
  <header class="clients-page__header">
    <div class="clients-page__header-left">
      <h1 class="clients-page__h1">고객 목록</h1>
      <p class="clients-page__h1-desc">
        엑셀 파일 업로드 및 스마트 추출로 간편하게 고객 정보를 관리하세요
      </p>
    </div>
    <div class="clients-page__header-actions">
      <button
        class="clients-page__onboard-btn"
        @click="$emit('open-onboarding')"
      >
        <zap-icon class="w-4 h-4" />
        스마트 온보딩
      </button>
      <button
        class="clients-page__btn-outline"
        @click="handleDownloadTemplate"
      >
        <download-icon class="w-4 h-4" />
        템플릿 다운로드
      </button>
      <button class="clients-page__btn-outline" @click="handleExport">
        <shared-download-icon class="w-4 h-4" />
        내보내기
      </button>
    </div>
  </header>
</template>

<script>
/**
 * 기능: 고객 목록 페이지의 상단 헤더 컴포넌트
 * 타이틀 및 주요 액션(스마트 온보딩, 다운로드 등) 버튼을 포함합니다.
 */
import {
  ZapIcon,
  DownloadIcon,
  DownloadIcon as SharedDownloadIcon,
} from "vue-feather-icons";

export default {
  name: "ClientsPageHeader",
  components: {
    ZapIcon,
    DownloadIcon,
    SharedDownloadIcon,
  },
  methods: {
    handleDownloadTemplate() {
      console.log("템플릿 다운로드 중...");
    },
    handleExport() {
      console.log("데이터 내보내기 중...");
    },
  },
};
</script>
