<template>
  <modal-vanilla v-if="internalIsOpen" :is-open="internalIsOpen" custom-dialog-class="guidance-modal__dialog"
    @close="handleClose">
    <template #header>
      <div class="guidance-modal__header">
        <h2 class="guidance-modal__title">투자 제안 책임 및 유의사항 안내</h2>
        <button type="button" class="guidance-modal__close-btn" @click="handleClose">
          <x-icon size="24" />
        </button>
      </div>
    </template>

    <div class="guidance-modal__body">
      <div class="guidance-modal__content">
        <p>이 제안은 담당 FA의 독립적 판단과 책임을 기반으로 고객에게 <br>전달됩니다. </p>
        <p>고객의 투자 성향과 목적에 적합한지 한 번 더 확인해 주세요. </p>
        <p>확인 선택시 고객에게 제안 전송 됩니다. </p>
      </div>

      <div class="guidance-modal__footer w-full flex gap-3">
        <button type="button" class="guidance-modal__btn-confirm" @click="handleConfirm">
          확인
        </button>
        <button type="button" class="guidance-modal__btn-cancel" @click="handleClose">
          취소
        </button>
      </div>
    </div>
  </modal-vanilla>
</template>

<script>
/**
 * 기능: 투자 제안 전 확인을 위한 안내 레이어 팝업 (글로벌 싱글톤)
 */
import { XIcon } from "vue-feather-icons";
import ModalVanilla from "~/components/modal/ModalVanilla.vue";
import "~/assets/css/modal/ProposalGuidanceModal/ProposalGuidanceModal.css";

export default {
  name: "ProposalGuidanceModal",
  components: {
    XIcon,
    ModalVanilla,
  },
  data() {
    return {
      internalIsOpen: false,
      onConfirmCallback: null,
      onCancelCallback: null,
    };
  },
  mounted() {
    this.$bus.$on("open-proposal-guidance", this.handleOpen);
  },
  beforeDestroy() {
    this.$bus.$off("open-proposal-guidance", this.handleOpen);
  },
  methods: {
    handleOpen({ onConfirm, onCancel }) {
      this.onConfirmCallback = onConfirm;
      this.onCancelCallback = onCancel;
      this.internalIsOpen = true;
    },
    handleClose() {
      if (this.onCancelCallback) {
        this.onCancelCallback();
      }
      this.internalIsOpen = false;
      this.onConfirmCallback = null;
      this.onCancelCallback = null;
    },
    handleConfirm() {
      if (this.onConfirmCallback) {
        this.onConfirmCallback();
      }
      this.onCancelCallback = null;
      this.handleClose();
    },
  },
};
</script>
