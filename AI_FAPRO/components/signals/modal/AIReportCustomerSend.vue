<template>
  <div class="ai-report-send">
    <div class="ai-report-send__card">
      <div
        class="ai-report-send__card-header pb-4 border-b border-slate-200 dark:border-slate-700"
      >
        <h3 class="ai-report-send__card-title">
          <mail-icon size="20" class="ai-report-send__title-icon" />
          이 종목을 제안 하면 좋을 고객
        </h3>
      </div>
      <div class="ai-report-send__card-body pt-4">
        <div class="ai-report-send__content-wrapper">
          <!-- 고객 선택 영역 -->
          <div class="ai-report-send__target-section">
            <div class="ai-report-send__target-header">
              <div class="ai-report-send__target-info">
                <label class="ai-report-send__target-label"
                  >전송 대상 선택</label
                >
                <span class="ai-report-send__target-desc"
                  >(전송 대상은 AI로직에 의해 해당 종목에 매칭된 고객이 추천
                  되었습니다.)</span
                >
              </div>
              <label class="ai-report-send__select-all">
                <input
                  v-model="selectAll"
                  type="checkbox"
                  class="ai-report-send__select-all-checkbox"
                  @change="toggleSelectAll"
                />
                <span class="ai-report-send__select-all-text">전체 선택</span>
              </label>
            </div>

            <!-- 고객 리스트 (그리드) -->
            <div class="ai-report-send__target-grid">
              <label
                v-for="(client, idx) in clients"
                :key="idx"
                class="ai-report-send__client-card"
                :class="{
                  'ai-report-send__client-card--active':
                    selectedClients.includes(client.id),
                }"
              >
                <input
                  v-model="selectedClients"
                  type="checkbox"
                  :value="client.id"
                  class="ai-report-send__client-checkbox"
                />
                <div class="ai-report-send__client-info">
                  <div class="ai-report-send__client-header">
                    <div class="ai-report-send__client-name-wrap">
                      <span class="ai-report-send__client-name">{{
                        client.name
                      }}</span>
                      <span class="ai-report-send__client-email"
                        >({{ client.email }})</span
                      >
                    </div>
                    <span
                      class="ai-report-send__client-badge"
                      :class="getBadgeClass(client.type)"
                    >
                      {{ client.type }}
                    </span>
                  </div>
                  <div class="ai-report-send__client-details">
                    <div :class="['ai-report-send__client-reason', isBuy ? 'ai-report-send__client-reason--red' : 'ai-report-send__client-reason--blue']">
                      제안 사유: {{ client.memo }}
                    </div>
                    <p class="ai-report-send__client-assets">
                      총 자산: {{ client.assets }} / 총 수익률:
                      {{ client.return }}
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <!-- 전송 버튼 영역 -->
          <div class="ai-report-send__action-group">
            <button
              class="ai-report-send__btn-primary"
              :disabled="selectedClients.length === 0"
            >
              <send-icon size="20" class="mr-2" />
              선택한 고객에게 이메일 전송
            </button>
            <button class="ai-report-send__btn-secondary">
              <download-icon size="20" class="mr-2" />
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
import { MailIcon, SendIcon, DownloadIcon } from "vue-feather-icons";
import "~/assets/css/pages/signals/AIReportCustomerSend/AIReportCustomerSend.css";

export default {
  name: "AIReportCustomerSend",
  components: {
    MailIcon,
    SendIcon,
    DownloadIcon,
  },
  props: {
    signal: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      selectAll: true,
      selectedClients: ["c1", "c2", "c3", "c4", "c5", "c6"],
      // Mock Data based on the UI flow #9
      clients: [
        {
          id: "c1",
          name: "김철수",
          email: "test@gmail.com",
          type: "공격투자형",
          memo: "AI반도체 관심 높음",
          assets: "3.2억",
          return: "23.1%",
        },
        {
          id: "c2",
          name: "이영희",
          email: "test@gmail.com",
          type: "안정형",
          memo: "AI반도체 관심 높음",
          assets: "3.2억",
          return: "23.1%",
        },
        {
          id: "c3",
          name: "박민수",
          email: "test@gmail.com",
          type: "공격투자형",
          memo: "AI반도체 관심 높음",
          assets: "3.2억",
          return: "23.1%",
        },
        {
          id: "c4",
          name: "최수진",
          email: "test@gmail.com",
          type: "단기매입형",
          memo: "AI반도체 관심 높음",
          assets: "3.2억",
          return: "23.1%",
        },
        {
          id: "c5",
          name: "정대호",
          email: "test@gmail.com",
          type: "공격투자형",
          memo: "AI반도체 관심 높음",
          assets: "3.2억",
          return: "23.1%",
        },
        {
          id: "c6",
          name: "강유진",
          email: "test@gmail.com",
          type: "중립형",
          memo: "AI반도체 관심 높음",
          assets: "3.2억",
          return: "23.1%",
        },
      ],
    };
  },
  computed: {
    isBuy() {
      return this.signal?.tradeHistory?.[0]?.signal === "매수";
    },
  },
  watch: {
    selectedClients(val) {
      this.selectAll =
        val.length === this.clients.length && this.clients.length > 0;
    },
  },
  methods: {
    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedClients = this.clients.map((c) => c.id);
      } else {
        this.selectedClients = [];
      }
    },
    getBadgeClass(type) {
      if (type === "공격투자형")
        return "ai-report-send__client-badge--aggressive";
      if (type === "안정형") return "ai-report-send__client-badge--stable";
      if (type === "단기매입형")
        return "ai-report-send__client-badge--shortterm";
      return "ai-report-send__client-badge--neutral";
    },
  },
};
</script>
