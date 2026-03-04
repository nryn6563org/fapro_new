<template>
  <div class="issue-proposal__form">
    <!-- Context Information -->
    <IssueProposalContext :form-data.sync="localFormData" />

    <!-- Client Selection -->
    <IssueProposalClients 
      :clients="clients" 
      :selected-client-ids.sync="localSelectedClients" 
    />

    <!-- Send Method -->
    <IssueProposalMethod :send-method.sync="localSendMethod" />
  </div>
</template>

<script>
/**
 * 기능: 제안서 작성 입력 및 설정 폼 영역
 */
import IssueProposalContext from '~/components/issues/IssueProposalContext.vue'
import IssueProposalClients from '~/components/issues/IssueProposalClients.vue'
import IssueProposalMethod from '~/components/issues/IssueProposalMethod.vue'
import '~/assets/css/pages/issues/IssueProposalForm/IssueProposalForm.css'

export default {
  name: 'IssueProposalForm',
  components: {
    IssueProposalContext,
    IssueProposalClients,
    IssueProposalMethod
  },
  props: {
    formData: {
      type: Object,
      required: true
    },
    clients: {
      type: Array,
      default: () => []
    },
    selectedClientIds: {
      type: Array,
      default: () => []
    },
    sendMethod: {
      type: String,
      default: 'email'
    }
  },
  data() {
    return {
      localFormData: { ...this.formData }
    }
  },
  computed: {
    localSelectedClients: {
      get() {
        return this.selectedClientIds
      },
      set(val) {
        this.$emit('update:selectedClientIds', val)
      }
    },
    localSendMethod: {
      get() {
        return this.sendMethod
      },
      set(val) {
        this.$emit('update:sendMethod', val)
      }
    }
  },
  watch: {
    formData: {
      handler(newVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(this.localFormData)) {
          this.localFormData = { ...newVal }
        }
      },
      deep: true,
      immediate: true
    },
    localFormData: {
      handler(newVal) {
        this.$emit('update:formData', newVal)
      },
      deep: true
    }
  }
}
</script>
