import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import DashboardLayout from '@/layouts/Dashboard/Dashboard.vue'

Vue.config.productionTip = false

Vue.component('dashboard-layout', DashboardLayout)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
