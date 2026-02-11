<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="c-modal-overlay" @click.self="$emit('close')">
      <div class="c-ranking-modal">
        <header class="c-ranking-modal__header">
          <div class="c-ranking-modal__title-group">
            <MessageSquare :size="20" class="text-white" />
            <div>
              <h3 class="c-ranking-modal__title">커뮤니티 투자자 반응</h3>
              <p class="c-ranking-modal__subtitle">{{ stockName }} ({{ stockCode }})</p>
            </div>
          </div>
          <button class="c-ranking-modal__close" @click="$emit('close')">
            <X :size="20" />
          </button>
        </header>

        <div class="c-ranking-modal__body">
          <div class="space-y-6">
            <!-- Sentiment Summary -->
            <div class="flex items-center justify-between p-5 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-900/20">
              <div>
                <span class="block text-[10px] text-green-500 font-bold mb-1">커뮤니티 위클리 심리</span>
                <span class="text-xl font-black text-green-600 dark:text-green-400">매우 낙관적 (Bullish)</span>
              </div>
              <div class="flex -space-x-2">
                <div v-for="i in 4" :key="i" class="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 flex items-center justify-center text-[10px] text-gray-500 overflow-hidden">
                  <User :size="14" />
                </div>
                <div class="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-green-500 flex items-center justify-center text-[10px] text-white font-bold">
                  +1.2k
                </div>
              </div>
            </div>

            <!-- Hot Topics -->
            <section>
              <h4 class="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <span class="w-1 h-4 bg-green-500 rounded-full"></span>
                실시간 핫 키워드
              </h4>
              <div class="flex flex-wrap gap-2">
                <div v-for="topic in hotTopics" :key="topic.name" class="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full shadow-sm">
                  <span class="text-xs font-medium text-gray-600 dark:text-gray-400">{{ topic.name }}</span>
                  <span class="text-[10px] text-red-500 font-bold">{{ topic.count }}+</span>
                </div>
              </div>
            </section>

            <!-- Community Posts Sample -->
            <section class="space-y-3">
              <h4 class="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">베스트 투자 의견</h4>
              <div v-for="(post, idx) in communityPosts" :key="idx" class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-2">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] font-bold text-gray-400">{{ post.author }}</span>
                    <span class="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
                    <span class="text-[10px] text-gray-400">{{ post.time }}</span>
                  </div>
                  <div class="flex items-center gap-3 text-[10px] text-gray-400">
                    <span class="flex items-center gap-0.5"><ThumbsUp :size="10" /> {{ post.likes }}</span>
                    <span class="flex items-center gap-0.5"><MessageCircle :size="10" /> {{ post.comments }}</span>
                  </div>
                </div>
                <p class="text-xs text-gray-700 dark:text-gray-300 font-medium">
                  {{ post.content }}
                </p>
              </div>
            </section>
          </div>
        </div>

        <footer class="c-ranking-modal__footer">
          <button class="c-btn c-btn--ghost c-btn--sm" @click="$emit('close')">닫기</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { X, MessageSquare, User, ThumbsUp, MessageCircle } from 'lucide-vue'

export default {
  name: 'RankingCommunityModal',
  components: { X, MessageSquare, User, ThumbsUp, MessageCircle },
  props: {
    isOpen: Boolean,
    stockName: String,
    stockCode: String
  },
  data() {
    return {
      hotTopics: [
        { name: '배당금', count: 450 },
        { name: '특별배당', count: 320 },
        { name: '외인매수', count: 210 },
        { name: '목표주가', count: 180 }
      ],
      communityPosts: [
        {
          author: '가치투자자',
          time: '1시간 전',
          likes: 85,
          comments: 24,
          content: '역시 대장주는 흔들림이 없네요. 이번 기회에 비중 더 늘렸습니다. 연말까지 홀딩 예정입니다.'
        },
        {
          author: '차트술사',
          time: '3시간 전',
          likes: 42,
          comments: 12,
          content: '주요 저항선 돌파 시점입니다. 내일 거래량만 받쳐주면 슈팅 나올 자리네요. 관심종목 등록!'
        }
      ]
    }
  }
}
</script>

<style scoped>
.c-modal-overlay {
  @apply fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm;
}

.c-ranking-modal {
  @apply bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden;
}

.c-ranking-modal__header {
  @apply flex items-center justify-between p-6 bg-gradient-to-r from-green-600 to-green-400 text-white;
}

.c-ranking-modal__title-group {
  @apply flex items-center gap-3;
}

.c-ranking-modal__title {
  @apply text-lg font-bold;
}

.c-ranking-modal__subtitle {
  @apply text-xs opacity-90;
}

.c-ranking-modal__close {
  @apply text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full;
}

.c-ranking-modal__body {
  @apply p-6 overflow-y-auto flex-1;
}

.c-ranking-modal__footer {
  @apply p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex justify-end;
}

</style>
