<template>
  <div :id="modalId" ref="modal" class="modal fade" tabindex="-1" role="dialog">
    <div :class="['modal-dialog', 'animate__animated animate__fadeIn animate__faster', customDialogClass]" role="document">
      <div class="modal-content">
        <div v-if="title || $slots.header" class="modal-header">
          <slot name="header">
            <h5 class="modal-title font-bold text-lg text-slate-800 dark:text-slate-100">
              {{ title }}
            </h5>
            <button
              type="button"
              class="modal-close-btn"
              aria-label="Close"
              @click="close"
            >
              <x-icon
                size="20"
                class="text-slate-500 hover:text-slate-800 dark:text-slate-100 transition-colors"
              />
            </button>
          </slot>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: modal-vanilla Vue 래퍼 컴포넌트
 * Bootstrap 클래스명을 사용하지만, 실제 스타일링은 Tailwind CSS(@apply)로 재정의하여 적용합니다.
 * header / 기본 / footer 슬롯을 지원하며 isOpen prop으로 모달 표시를 제어합니다.
 */
import Modal from "modal-vanilla";
import { XIcon } from "vue-feather-icons";
import "~/assets/css/modal/ModalVanilla/ModalVanilla.css";

export default {
  name: "ModalVanilla",
  components: {
    XIcon,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    customDialogClass: {
      type: String,
      default: "",
    },
    modalId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      modalInstance: null,
    };
  },
  watch: {
    isOpen(val) {
      if (val) {
        this.modalInstance.show();
        document.body.classList.add("modal-open");
      } else if (this.modalInstance && this.modalInstance._visible) {
        // 모달이 열려 있는 상태에서만 hide() 호출 (내부적으로 classList 참조 에러 방지)
        this.modalInstance.hide();
        document.body.classList.remove("modal-open");
      }
    },
  },
  mounted() {
    // modal-vanilla 초기화
    this.modalInstance = new Modal({
      el: this.$refs.modal,
      animate: true,
      backdrop: true,
      keyboard: true,
    });

    // 닫힘 이벤트 연동 (백드롭 클릭, ESC 키 등)
    this.modalInstance.on("hidden", () => {
      this.$emit("update:isOpen", false);
      this.$emit("close");
    });

    if (this.isOpen) {
      this.modalInstance.show();
      document.body.classList.add("modal-open");
    }
  },
  beforeDestroy() {
    document.body.classList.remove("modal-open");
    if (this.modalInstance && this.modalInstance._visible) {
      // 컴포넌트 파괴 시 모달이 열려 있는 경우에만 안전하게 닫음
      this.modalInstance.hide();
    }
  },
  methods: {
    close() {
      if (this.modalInstance && this.modalInstance._visible) {
        this.modalInstance.hide();
      }
    },
  },
};
</script>
