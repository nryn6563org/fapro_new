<template>
  <div class="c-card" :class="modifierClass">
    <div v-if="$slots.header || title" class="c-card__header">
      <div class="c-card__title">
        <slot name="title">
          <component :is="titleIcon" v-if="titleIcon" :size="18" :class="`c-card__title-icon--${titleIconColor}`" />
          {{ title }}
        </slot>
      </div>
      <slot name="header-actions"></slot>
    </div>
    <div class="c-card__content">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="c-card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FunctionCard',
  props: {
    title: { type: String, default: '' },
    titleIcon: { type: String, default: '' },
    titleIconColor: { type: String, default: '' },
    modifier: { type: String, default: '' }
  },
  computed: {
    modifierClass() {
      return this.modifier ? `c-card--${this.modifier}` : ''
    }
  }
}
</script>

<style scoped>
/* Styles are imported globally but defined in assets/css/function/ui.css */
</style>
