import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/fonts/IRANSans/IranSans.scss'
import './index.scss'
import { createPinia, PiniaVuePlugin } from 'pinia'
Vue.use(PiniaVuePlugin)
const pinia = createPinia()

Vue.config.productionTip = false

Vue.directive('seperator', {
  inserted: function (el, binding) {
    el.innerHTML = binding.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  },
  update: function (el, binding) {
    el.innerHTML = binding.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
})

Vue.filter('toCurrency', (value: any) => {
  if (!value)
    return "0"
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
})


new Vue({
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')
