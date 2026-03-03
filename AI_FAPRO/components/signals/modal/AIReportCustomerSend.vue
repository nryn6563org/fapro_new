<template>
  <div class="ai-report-send">
    <div class="ai-report-send__card">
      <div class="ai-report-send__card-header pb-4">
        <h3 class="ai-report-send__card-title">
          <mail-icon size="20" class="ai-report-send__title-icon" />
          고객에게 리포트 전송
        </h3>
      </div>
      <div class="ai-report-send__card-body">
        <div class="ai-report-send__content-wrapper">
          <!-- 고객 선택 영역 -->
          <div class="ai-report-send__target-section">
            <div class="ai-report-send__target-header">
              <label class="ai-report-send__target-label">전송 대상 선택</label>
              <button class="ai-report-send__select-all-btn">전체 선택</button>
            </div>
            
            <!-- 고객 리스트 (스크롤) -->
            <div class="ai-report-send__target-list">
              <label 
                v-for="(client, idx) in clients" 
                :key="idx"
                class="ai-report-send__client-item"
              >
                <input type="checkbox" class="ai-report-send__client-checkbox" />
                <div class="ai-report-send__client-info">
                  <div class="ai-report-send__client-header">
                    <span class="ai-report-send__client-name">{{ client.name }}</span>
                    <span 
                      class="ai-report-send__client-badge"
                      :class="client.status === 'VIP' ? 'ai-report-send__client-badge--vip' : 'ai-report-send__client-badge--normal'"
                    >
                      {{ client.status }}
                    </span>
                  </div>
                  <p class="ai-report-send__client-email">{{ client.email }}</p>
                  <p class="ai-report-send__client-portfolio">포트폴리오: {{ client.portfolio }}</p>
                </div>
              </label>
            </div>
          </div>

          <!-- 이메일 내용 미리보기 -->
          <div class="ai-report-send__preview-box">
            <div class="ai-report-send__preview-icon-wrapper">
              <message-circle-icon size="20" class="ai-report-send__preview-icon" />
            </div>
            <div class="ai-report-send__preview-content">
              <p class="ai-report-send__preview-title">이메일 제목</p>
              <p class="ai-report-send__preview-subject">[{{ signal?.name || '종목명' }}] AI 투자 리포트 - Alpha Platform</p>
              <p class="ai-report-send__preview-desc">
                고객님께 맞춤형 AI 분석 리포트를 보내드립니다. 
                종목 상세 정보, AI 스코어, 투자 포인트 및 리스크 분석이 포함됩니다.
              </p>
            </div>
          </div>

          <!-- 전송 버튼 영역 -->
          <div class="ai-report-send__action-group">
            <button class="ai-report-send__btn-primary">
              <send-icon size="16" class="mr-2" />
              선택한 고객에게 전송
            </button>
            <button class="ai-report-send__btn-secondary">
              <download-icon size="16" class="mr-2" />
              PDF 다운로드
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 리포트의 고객 발송 영역 (모달 하단 전체 너비)
 */
import { MailIcon, MessageCircleIcon, SendIcon, DownloadIcon } from 'vue-feather-icons'
import '~/assets/css/pages/signals/modal/AIReportCustomerSend.css'

export default {
  name: 'AIReportCustomerSend',
  components: {
    MailIcon,
    MessageCircleIcon,
    SendIcon,
    DownloadIcon
  },
  props: {
    signal: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // Mock Data based on the React legacy code
      clients: [
        { name: "김철수", email: "kim@example.com", portfolio: "3.2억", status: "VIP" },
        { name: "이영희", email: "lee@example.com", portfolio: "1.8억", status: "일반" },
        { name: "박민수", email: "park@example.com", portfolio: "5.1억", status: "VIP" },
        { name: "최수진", email: "choi@example.com", portfolio: "2.4억", status: "일반" },
        { name: "정대호", email: "jung@example.com", portfolio: "4.7억", status: "VIP" },
        { name: "강유진", email: "kang@example.com", portfolio: "1.5억", status: "일반" },
        { name: "윤서준", email: "yoon@example.com", portfolio: "3.9억", status: "VIP" },
        { name: "임하은", email: "lim@example.com", portfolio: "2.1억", status: "일반" },
        { name: "한지우", email: "han@example.com", portfolio: "6.3억", status: "VIP" },
      ]
    }
  }
}
</script>
