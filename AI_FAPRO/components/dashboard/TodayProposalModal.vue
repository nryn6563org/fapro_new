<!--
  TodayProposalModal
  설명: "오늘의 제안" 섹션 內 제안하기 버튼을 클릭하면 열리는 Modal.
  용도: 고객 대상 맟춤 추천, 종목 맞춤 추천 정보를 카카오톡, SMS, 이메일로 발송
-->
<template>
  <div class="today-proposal-modal__container">
    <header class="today-proposal-modal__header">
      <h2 class="today-proposal-modal__title">
        <send-icon class="icon--teal mr-2" />
        투자 제안 전송
      </h2>
      <p class="today-proposal-modal__desc">
        선택한 {{ proposalType === 'customer' ? '고객에게' : '종목을' }} 카카오톡, SMS 또는 이메일로 제안합니다.
      </p>
    </header>

    <div class="today-proposal-modal__body">
      
      <!-- 선택된 제안 대상 (기준 정보) -->
      <section class="today-proposal-modal__section today-proposal-modal__section--target">
        <div class="section-header">
          <target-icon class="icon--teal mr-2" />
          <h3 class="section-header__title">제안 대상</h3>
          <span 
            v-if="proposalData"
            class="badge ml-auto"
            :class="proposalData.action === 'buy' ? 'badge--red' : 'badge--blue'"
          >
            {{ proposalData.action === 'buy' ? '매수 제안' : '매도 제안' }}
          </span>
        </div>
        
        <div v-if="proposalData" class="section-content">
          <!-- Type: Customer -->
          <div v-if="proposalType === 'customer'" class="target-info">
            <div class="target-info__row">
              <div class="flex items-center gap-2">
                <strong class="text-sm text-slate-800">{{ proposalData.name }}</strong>
                <span class="text-xs text-slate-500">→ {{ Array.isArray(proposalData.targetStock) ? proposalData.targetStock.join(', ') : proposalData.targetStock }}</span>
              </div>
              <span class="badge badge--outline">{{ proposalData.investmentStyle }}</span>
            </div>
            <div class="text-xs text-slate-600 mt-1">포트폴리오: {{ proposalData.portfolio }}</div>
            <div class="target-info__reason">
              {{ proposalData.reason }}
            </div>
          </div>

          <!-- Type: Stock & Issue -->
          <div v-else class="target-info">
            <div class="target-info__row">
              <strong class="text-sm text-slate-800">
                {{ proposalData.name }} <span class="text-xs text-slate-400">({{ proposalData.ticker }})</span>
              </strong>
              <span :class="['text-sm font-semibold', proposalData.change && proposalData.change.startsWith('+') ? 'text-red-600' : 'text-blue-600']">
                {{ proposalData.price }} {{ proposalData.change }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- AI 추천 고객 리스트 (종목/이슈 제안 시에만 표시) -->
      <section v-if="proposalType !== 'customer'" class="today-proposal-modal__section today-proposal-modal__section--recommend">
        <div class="section-header">
          <users-icon class="icon--teal mr-2" />
          <h3 class="section-header__title">AI 추천 고객</h3>
          <span class="badge badge--teal ml-auto">{{ selectedCustomerIds.length }}명 선택</span>
        </div>
        <p class="section-desc">이 종목에 관심있을 것으로 예측되는 고객들입니다.</p>
        
        <div class="list-wrapper">
          <div 
            v-for="idx in 3" :key="idx"
            class="selectable-item"
            :class="{'selectable-item--selected': true}"
          >
            <div class="selectable-item__checkbox">
              <input type="checkbox" checked />
            </div>
            <div class="selectable-item__content">
              <div class="flex justify-between items-center mb-1">
                <div class="flex items-center gap-2">
                  <strong>홍길동</strong>
                  <span class="badge badge--outline">공격투자형</span>
                </div>
              </div>
              <div class="text-xs text-slate-500 mb-1">포트폴리오: 2.5억</div>
              <div class="ai-hint">💡 게임 섹터 선호도 높음</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 전송 방법 선택 -->
      <section class="today-proposal-modal__section">
        <div class="section-header mb-3">
          <message-square-icon class="icon--orange mr-2" />
          <h3 class="section-header__title">전송 방법</h3>
        </div>
        <div class="send-method-grid">
          <button 
            class="send-method-btn"
            :class="{ 'send-method-btn--active-slate': sendMethod === 'sms' }"
            @click="sendMethod = 'sms'"
          >
            <phone-icon class="w-4 h-4 mr-1" /> 문자
          </button>
          <button 
            class="send-method-btn"
            :class="{ 'send-method-btn--active-yellow': sendMethod === 'kakao' }"
            @click="sendMethod = 'kakao'"
          >
            <message-square-icon class="w-4 h-4 mr-1" /> 카카오톡
          </button>
          <button 
            class="send-method-btn"
            :class="{ 'send-method-btn--active-teal': sendMethod === 'email' }"
            @click="sendMethod = 'email'"
          >
            <mail-icon class="w-4 h-4 mr-1" /> 이메일
          </button>
        </div>
      </section>

      <!-- 전송 메시지 미리보기 -->
      <section class="today-proposal-modal__section">
        <div class="section-header mb-2">
          <file-text-icon class="icon--slate mr-2" />
          <h3 class="section-header__title">전송 메시지 미리보기</h3>
        </div>
        <textarea 
          v-model="messageBody"
          class="message-textarea" 
          placeholder="전송할 메시지를 확인하고 수정하세요"
        ></textarea>
      </section>

    </div>
    
    <footer class="today-proposal-modal__footer">
      <button class="btn btn--outline" @click="close">취소</button>
      <button 
        class="btn btn--teal flex items-center justify-center flex-1"
        @click="handleSend"
      >
        <send-icon class="w-4 h-4 mr-2" /> 제안서 발송하기
      </button>
    </footer>
  </div>
</template>

<script>
import {
  SendIcon,
  TargetIcon,
  UsersIcon,
  MessageSquareIcon,
  PhoneIcon,
  MailIcon,
  FileTextIcon
} from 'vue-feather-icons'

export default {
  name: 'TodayProposalModal',
  components: {
    SendIcon, TargetIcon, UsersIcon, MessageSquareIcon, PhoneIcon, MailIcon, FileTextIcon
  },
  props: {
    proposalType: {
      type: String,
      default: 'customer' // 'customer', 'stock', 'issue'
    },
    proposalData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      modalOptions: {
        width: '600px',
        closeButton: false,
        transition: 'slide-up'
      },
      sendMethod: 'kakao',
      selectedCustomerIds: [1, 2, 3], // Mocked selection
      messageBody: '안녕하세요. AI 기반 맞춤형 투자 제안서입니다.\n\n해당 종목 및 시장 동향에 대해 궁금한 점 있으시면 언제든 연락바랍니다.'
    }
  },
  methods: {
    close() {
      // In $modalV programmatic structure, we access the hide method via DOM structure or emit an event
      this.$emit('close-modal')
    },
    handleSend() {
      alert(`${this.sendMethod} 방식으로 전송되었습니다.`)
      this.close()
    }
  }
}
</script>

<style src="~/assets/css/pages/index/TodayProposalModal/TodayProposalModal.css" />
