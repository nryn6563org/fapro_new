<template>
  <div :class="`proposal-editor--${deliveryMethod}`">
    <div class="proposal-editor__label">
      <file-text-icon size="18" class="proposal-editor__label-icon" />
      메시지 내용
    </div>

    <div :class="['proposal-editor__preview-container', `proposal-editor__preview-container--${deliveryMethod}`]">
      <div class="proposal-editor__preview-card">
        <textarea
          v-model="internalValue"
          class="proposal-editor__textarea-message"
          placeholder="전송할 메시지를 입력하세요..."
        ></textarea>

        <button
          type="button"
          class="proposal-editor__copy-btn"
          @click="sendProposal"
        >
          <copy-icon size="14" />
          전송하기
        </button>
      </div>
    </div>

    <p class="proposal-editor__hint">
      메시지를 수정하여 개인화된 내용을 추가할 수 있습니다.
    </p>
  </div>
</template>

<script>
/**
 * ProposalMessageEditor
 * 기능: 제안 메시지 편집 및 전송 컴포넌트
 */
import { FileTextIcon, CopyIcon } from "vue-feather-icons";
import "~/assets/css/common/proposal/ProposalMessageEditor/ProposalMessageEditor.css";

export default {
  name: "ProposalMessageEditor",
  components: {
    FileTextIcon,
    CopyIcon,
  },
  props: {
    value: { type: String, default: "" },
    deliveryMethod: { type: String, default: "kakao" },
  },
  computed: {
    internalValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    sendProposal() {
      alert("준비중 입니다.");
    },
  },
};
</script>
