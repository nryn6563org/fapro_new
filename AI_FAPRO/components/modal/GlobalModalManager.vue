<template>
  <!-- Global Modal Manager acts as a portal anchor if needed, but Modal-Vanilla mounts to body -->
  <div class="global-modal-manager" style="display: none"></div>
</template>

<script>
import Modal from 'modal-vanilla'

export default {
  name: 'GlobalModalManager',
  data() {
    return {
      activeModal: null
    }
  },
  mounted() {
    this.$bus.$on('open-modal', this.handleOpenModal)
    this.$bus.$on('close-modal', this.handleCloseModal)
  },
  beforeDestroy() {
    this.$bus.$off('open-modal', this.handleOpenModal)
    this.$bus.$off('close-modal', this.handleCloseModal)
    if (this.activeModal) {
      this.activeModal.hide()
    }
  },
  methods: {
    handleOpenModal({ title, contentHtml, onConfirm, confirmText = '확인', cancelText = '취소' }) {
      if (this.activeModal) {
        this.activeModal.hide()
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
            if (onConfirm) onConfirm()
            modal.hide()
          },
          cancel: (e, modal) => {
            modal.hide()
          }
        },
        footer: `
          <div class="global-modal__actions">
            <button class="global-modal__btn global-modal__btn--outline" data-dismiss="modal" data-action="cancel">${cancelText}</button>
            <button class="global-modal__btn global-modal__btn--primary" data-action="confirm">${confirmText}</button>
          </div>
        `
      }

      this.activeModal = new Modal(modalOptions)
      this.activeModal.show()
    },
    handleCloseModal() {
      if (this.activeModal) {
        this.activeModal.hide()
        this.activeModal = null
      }
    }
  }
}
</script>

<style src="~/assets/css/modal/GlobalModal.css" />
