<template>
  <div class="proposal-editor" :class="`proposal-editor--${deliveryMethod}`">
    <div class="proposal-editor__label">
      <div v-if="sectionNumber" class="proposal-section__number">{{ sectionNumber }}</div>
      <file-text-icon size="18" class="text-indigo-500" />
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
      메시지를 수정하여 개인화된 내용을 추가할 수 있습니다.
    </p>
  </div>
</template>

<script>
/**
 * ProposalMessageEditor
 * 기능: 제안 메시지 편집 및 복사 컴포넌트
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
    sectionNumber: {
      type: [String, Number],
      default: "",
    },
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
    async copyContent() {
      try {
        await navigator.clipboard.writeText(this.internalValue);
        this.$emit("copy", this.internalValue);
        alert("내용이 복사 되었습니다.");
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    },
  },
};
</script>
