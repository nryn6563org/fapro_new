<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="c-modal-overlay" @click.self="$emit('close')">
      <div class="c-schedule-modal">
        <header class="c-schedule-modal__header">
          <h3 class="c-schedule-modal__title">{{ date }} 일정</h3>
          <button class="c-schedule-modal__close" @click="$emit('close')">
            <X :size="20" />
          </button>
        </header>
        
        <div class="c-schedule-modal__content">
          <div v-if="schedules.length === 0" class="c-schedule-modal__empty">
            일정이 없습니다.
          </div>
          <div v-else class="c-schedule-list">
            <div v-for="(item, index) in schedules" :key="index" class="c-schedule-item">
              <h4 class="c-schedule-item__title">{{ item.title }}</h4>
              <p class="c-schedule-item__desc">{{ item.description }}</p>
              <div class="c-schedule-item__meta">
                <span class="c-schedule-item__target">Target: {{ item.target }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <footer class="c-schedule-modal__footer">
          <button class="c-schedule-modal__btn" @click="$emit('close')">일정 관리로 이동</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { X } from 'lucide-vue'

export default {
  name: 'ScheduleModal',
  components: { X },
  props: {
    isOpen: Boolean,
    date: String,
    schedules: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/modal/schedule-modal.css';
</style>
