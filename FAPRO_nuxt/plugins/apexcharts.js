import Vue from 'vue'

export default ({ app }, inject) => {
  // 클라이언트 사이드에서만 실행
  if (process.client) {
    const register = () => {
      if (window.VueApexCharts && window.ApexCharts) {
        Vue.component('apexchart', window.VueApexCharts)
        window.$apexReady = true
        
        // 글로벌 Apex 설정
        window.Apex = {
          chart: {
            locales: [{
              "name": "ko",
              "options": {
                "months": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                "shortMonths": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                "days": ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
                "shortDays": ["일", "월", "화", "수", "목", "금", "토"],
                "toolbar": {
                  "exportToSVG": "SVG로 저장",
                  "exportToPNG": "PNG로 저장",
                  "exportToCSV": "CSV로 저장",
                  "menu": "메뉴",
                  "selection": "선택",
                  "selectionZoom": "선택 확대",
                  "zoomIn": "확대",
                  "zoomOut": "축소",
                  "pan": "이동",
                  "reset": "초기화"
                }
              }
            }],
            defaultLocale: "ko"
          }
        }
        return true
      }
      return false
    }

    if (!register()) {
      const interval = setInterval(() => {
        if (register()) clearInterval(interval)
      }, 50)
      setTimeout(() => clearInterval(interval), 5000)
    }
  }
}
