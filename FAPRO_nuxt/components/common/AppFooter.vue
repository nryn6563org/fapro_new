<template>
  <footer class="footer-container">
    <p class="footer-text">&copy; 2026 FA pro Dashboard. All rights reserved.</p>
  </footer>
</template>

<script>
/**
 * Footer 컴포넌트: 대시보드 하단 정보.
 * Footer Component: Dashboard footer information.
 */
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.footer-container {
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb; /* Gray-200 */
  text-align: center;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.footer-text {
  font-size: 0.75rem; /* text-xs */
  color: #6b7280; /* Gray-500 */
}
</style>
