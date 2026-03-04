<template>
  <div class="proposal-editor" :class="`proposal-editor--${deliveryMethod}`">
    <div class="proposal-editor__label">
      <edit-3-icon size="18" />
      메시지 내용
    </div>
    
    <div class="proposal-editor__textarea-wrapper">
      <textarea
        v-model="internalValue"
        class="proposal-editor__textarea"
        placeholder="전송할 메시지를 입력하세요..."
      ></textarea>
      
      <button 
        type="button" 
        class="proposal-editor__copy-btn"
        @click="copyContent"
      >
        <copy-icon size="14" />
        내용 복사
      </button>
    </div>

    <p class="proposal-editor__hint">
      메이시를 수정하여 개인화된 내용을 추가할 수 있습니다.
    </p>
  </div>
</template>

<script>
/**
 * ProposalMessageEditor
 * 설명: 제안 메시지 편집 및 복사 컴포넌트
 */
import { Edit3Icon, CopyIcon } from 'vue-feather-icons'

export default {
  name: 'ProposalMessageEditor',
  components: {
    Edit3Icon,
    CopyIcon
  },
  props: {
    value: { type: String, default: '' },
    deliveryMethod: { type: String, default: 'kakao' }
  },
  computed: {
    internalValue: {
      get() { return this.value },
      set(val) { this.$emit('input', val) }
    }
  },
  methods: {
    async copyContent() {
      try {
        await navigator.clipboard.writeText(this.internalValue)
        this.$emit('copy', this.internalValue)
        alert('내용이 복사 되었습니다.')
      } catch (err) {
        console.error('Failed to copy text: ', err)
      }
    }
  }
}
</script>
