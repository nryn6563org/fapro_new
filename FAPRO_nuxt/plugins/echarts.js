import Vue from 'vue'
import * as echarts from 'echarts'

/**
 * ECharts를 Vue 프로토타입에 등록하여 모든 컴포넌트에서 $echarts로 접근 가능하게 합니다.
 * ECharts is registered to the Vue prototype so it can be accessed as $echarts in all components.
 */
Vue.prototype.$echarts = echarts

export default (_, inject) => {
  inject('echarts', echarts)
}
