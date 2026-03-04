<template>
  <div
    class="customer-upload"
    :class="{ 'customer-upload--dragging': isDragging }"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop"
  >
    <div class="customer-upload__content">
      <div class="customer-upload__icon-box">
        <file-text-icon class="customer-upload__icon" />
      </div>
      <h3 class="customer-upload__title">엑셀 파일을 여기에 드래그하거나 클릭하여 업로드</h3>
      <p class="customer-upload__desc">.xlsx 또는 .xls 파일을 지원합니다</p>

      <input
        ref="fileInput"
        type="file"
        accept=".xlsx,.xls"
        @change="handleFileChange"
        class="hidden"
      />

      <button class="customer-upload__btn" @click="$refs.fileInput.click()">
        <upload-icon class="w-4 h-4 mr-2" />
        파일 선택
      </button>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 관리용 엑셀 업로드 영역
 */
import { FileTextIcon, UploadIcon } from 'vue-feather-icons'
import '~/assets/css/pages/customers/CustomerUploadArea/CustomerUploadArea.css'

export default {
  name: 'CustomerUploadArea',
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
