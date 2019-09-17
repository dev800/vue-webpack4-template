import Vue from 'vue'
import router from './router'
import App from './App'

import 'assets/css/app.scss'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
