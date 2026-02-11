<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="c-custom-modal-overlay" @click.self="close">
      <div class="c-custom-modal">
        <div class="c-custom-modal__header">
          <h3 class="c-custom-modal__title">대시보드 커스텀하기</h3>
          <button class="c-custom-modal__close" @click="close">
            <X :size="20" />
          </button>
        </div>
        
        <div class="c-custom-modal__body">
          <p class="c-custom-modal__description">화면에 표시할 항목을 선택해주세요.</p>
          
          <div class="c-custom-modal__list">
            <div v-for="item in items" :key="item.id" class="c-custom-modal__item">
              <span class="c-custom-modal__item-name">{{ item.name }}</span>
              <button 
                class="c-toggle-switch" 
                :class="{ 'c-toggle-switch--active': item.visible }"
                @click="toggleItem(item)"
              >
                <div class="c-toggle-switch__handle"></div>
              </button>
            </div>
          </div>
        </div>
        
        <div class="c-custom-modal__footer">
          <button class="c-btn-apply" @click="apply">적용하기</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { X } from 'lucide-vue'

export default {
  name: 'DashboardCustomModal',
  components: { X },
  props: {
    isOpen: { type: Boolean, default: false }
  },
  data() {
    return {
      items: [
        { id: 'stock-board', name: '종목 보드 (AI 이슈포착)', visible: true },
        { id: 'report-list', name: 'AI리포트 생성 종목', visible: true },
        { id: 'customer-events', name: '고객 이벤트 발생', visible: true },
        { id: 'signal-list', name: '라씨 시그널 발생 종목', visible: true },
        { id: 'quant-stocks', name: '퀀트 종목', visible: true },
        { id: 'customer-ranking', name: '고객 보유종목 랭킹', visible: true },
        { id: 'ai-discovery', name: 'AI종목 발굴', visible: true },
        { id: 'consultation', name: '상담 관리', visible: true },
        { id: 'return-analysis', name: '고객 수익률 분석', visible: true }
      ]
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    toggleItem(item) {
      item.visible = !item.visible
    },
    apply() {
      this.$emit('apply', this.items)
      this.close()
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/dashboard/custom-modal.css';
</style>
