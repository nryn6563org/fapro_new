<template>
  <!-- Global Modal Manager acts as a portal anchor if needed, but Modal-Vanilla mounts to body -->
  <div class="global-modal-manager" style="display: none"></div>
</template>

<script>
/**
 * 기능: 전역 모달 관리자 컴포넌트
 * 이벤트 버스($bus)를 통해 open-modal / close-modal 이벤트를 수신하여
 * modal-vanilla 인스턴스를 생성하고 제어합니다.
 */
import Modal from "modal-vanilla";
import "~/assets/css/modal/GlobalModalManager/GlobalModalManager.css";

export default {
  name: "GlobalModalManager",
  data() {
    return {
      activeModal: null,
    };
  },
  mounted() {
    this.$bus.$on("open-modal", this.handleOpenModal);
    this.$bus.$on("close-modal", this.handleCloseModal);
  },
  beforeDestroy() {
    this.$bus.$off("open-modal", this.handleOpenModal);
    this.$bus.$off("close-modal", this.handleCloseModal);
    if (this.activeModal) {
      this.activeModal.hide();
    }
  },
  methods: {
    handleOpenModal({
      title,
      contentHtml,
      onConfirm,
      confirmText = "확인",
      cancelText = "취소",
    }) {
      if (this.activeModal) {
        this.activeModal.hide();
      }

      const modalOptions = {
        construct: true,
        title,
        content: contentHtml,
        header: true,
        transition: 300,
        backdrop: true,
        methods: {
          confirm: (e, modal) => {
            if (onConfirm) onConfirm();
            modal.hide();
          },
          cancel: (e, modal) => {
            modal.hide();
          },
        },
        footer: `
          <div class="global-modal__actions">
            <button class="global-modal__btn global-modal__btn--outline" data-dismiss="modal" data-action="cancel">${cancelText}</button>
            <button class="global-modal__btn global-modal__btn--primary" data-action="confirm">${confirmText}</button>
          </div>
        `,
      };

      this.activeModal = new Modal(modalOptions);
      this.activeModal.show();
      document.body.classList.add("modal-open");
    },
    handleCloseModal() {
      if (this.activeModal) {
        this.activeModal.hide();
        this.activeModal = null;
        document.body.classList.remove("modal-open");
      }
    },
  },
};
</script>

