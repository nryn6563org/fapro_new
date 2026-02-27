<template>
  <div
    class="client-upload"
    :class="{ 'client-upload--dragging': isDragging }"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop"
  >
    <div class="client-upload__content">
      <div class="client-upload__icon-box">
        <file-spreadsheet-icon class="client-upload__icon" />
      </div>
      <h3 class="client-upload__title">엑셀 파일을 여기에 드래그하거나 클릭하여 업로드</h3>
      <p class="client-upload__desc">.xlsx 또는 .xls 파일을 지원합니다</p>

      <input
        ref="fileInput"
        type="file"
        accept=".xlsx,.xls"
        @change="handleFileChange"
        class="hidden"
      />

      <button class="client-upload__btn" @click="$refs.fileInput.click()">
        <upload-icon class="w-4 h-4" />
        파일 선택
      </button>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 엑셀 파일 업로드 영역 컴포넌트
 */
import { FileTextIcon, UploadIcon } from 'vue-feather-icons'
import '~/assets/css/pages/clients/ClientUploadArea.css'

export default {
  name: 'ClientUploadArea',
  components: {
    FileTextIcon,
    UploadIcon
  },
  data() {
    return {
      isDragging: false
    }
  },
  methods: {
    handleDrop(e) {
      this.isDragging = false
      const file = e.dataTransfer.files[0]
      if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
        this.$emit('upload', file)
      }
    },
    handleFileChange(e) {
      const file = e.target.files[0]
      if (file) {
        this.$emit('upload', file)
      }
    }
  }
}
</script>
