<template>
  <div class="client-ai-search animate__animated animate__fadeIn">
    <div class="client-ai-search__card">
      <!-- Header -->
      <div class="client-ai-search__header">
        <div class="flex items-center gap-3">
          <div class="client-ai-search__icon-box">
            <search-icon class="client-ai-search__icon" />
          </div>
          <div>
            <h3 class="client-ai-search__title">AI 고객 검색</h3>
            <p class="client-ai-search__subtitle">자연어로 고객을 검색해 보세요</p>
          </div>
        </div>
        <div class="client-ai-search__badge">
          <zap-icon class="w-3 h-3 mr-1" />
          AI 검색
        </div>
      </div>

      <!-- Search Input -->
      <div class="client-ai-search__input-wrapper">
        <div class="relative">
          <search-icon class="client-ai-search__input-icon" />
          <input
            ref="searchInput"
            type="text"
            class="client-ai-search__input"
            placeholder="예: 안정형 고객 중 자산 5억 이상 고객 찾아줘"
            v-model="internalSearchTerm"
            @keydown.enter="handleSearch"
          />
          <button
            v-if="internalSearchTerm"
            @click="clearSearch"
            class="client-ai-search__clear-btn"
          >
            <x-icon class="w-4 h-4" />
          </button>
          <button
            class="client-ai-search__search-btn"
            @click="handleSearch"
            :disabled="isSearching || !internalSearchTerm"
          >
            <refresh-cw-icon v-if="isSearching" class="w-4 h-4 mr-1 animate-spin" />
            <search-icon v-else class="w-4 h-4 mr-1" />
            {{ isSearching ? '검색 중' : '검색' }}
          </button>
        </div>

        <div class="client-ai-search__example">
          <zap-icon class="w-3.5 h-3.5" />
          <span class="client-ai-search__example-label">자연어 검색 예시:</span>
          <span class="client-ai-search__example-text"
            >"공격투자형 고객 중 2차전지 관심 있는 고객 찾아줘"</span
          >
        </div>
      </div>

      <!-- Examples -->
      <div class="client-ai-search__recommends">
        <div class="flex items-center gap-2 mb-3">
          <zap-icon class="w-4 h-4 text-teal-500" />
          <span class="text-sm font-bold text-slate-700 dark:text-slate-200">추천 검색어</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(example, idx) in examples"
            :key="idx"
            @click="handleRecommend(example)"
            class="client-ai-search__recommend-btn"
          >
            {{ example }}
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="client-ai-search__filters">
        <div class="flex items-center gap-2">
          <filter-icon class="w-4 h-4 text-slate-500" />
          <span class="text-sm font-bold text-slate-700 dark:text-slate-200 mr-2"
            >투자유형 필터:</span
          >
          <div class="flex gap-2">
            <button
              v-for="type in types"
              :key="type"
              @click="$emit('update:filterType', type)"
              :class="[
                'client-ai-search__filter-btn',
                { 'client-ai-search__filter-btn--active': filterType === type }
              ]"
            >
              {{ type }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 고객 검색 및 필터 컴포넌트
 */
import { SearchIcon, ZapIcon, XIcon, RefreshCwIcon, FilterIcon } from 'vue-feather-icons'
import '~/assets/css/pages/clients/ClientAiSearch.css'

export default {
  name: 'ClientAiSearch',
  components: {
    SearchIcon,
    ZapIcon,
    XIcon,
    RefreshCwIcon,
    FilterIcon
  },
  props: {
    searchTerm: {
      type: String,
      default: ''
    },
    filterType: {
      type: String,
      default: '전체'
    },
    examples: {
      type: Array,
      default: () => []
    },
    isSearching: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      internalSearchTerm: this.searchTerm,
      types: ['전체', '공격형', '중립형', '안정형']
    }
  },
  watch: {
    searchTerm(newVal) {
      this.internalSearchTerm = newVal
    }
  },
  mounted() {
    this.$autocomplete(this.$refs.searchInput, {
      fetch: (text, update) => {
        text = text.toLowerCase()
        const suggestions = this.exampleQueries
          .filter((s) => s.toLowerCase().includes(text))
          .map((s) => ({ label: s, value: s }))
        update(suggestions)
      },
      onSelect: (item) => {
        this.internalQuery = item.value
        this.handleSearch()
      }
    })
  },
  methods: {
    handleSearch() {
      if (this.internalSearchTerm.trim()) {
        this.$emit('search', this.internalSearchTerm)
        this.$emit('update:searchTerm', this.internalSearchTerm)
      }
    },
    clearSearch() {
      this.internalSearchTerm = ''
      this.$emit('update:searchTerm', '')
      this.$emit('clear')
    },
    handleRecommend(text) {
      this.internalSearchTerm = text
      this.handleSearch()
    }
  }
}
</script>
