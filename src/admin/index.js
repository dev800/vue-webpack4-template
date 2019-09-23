import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

Vue.config.devtools = true // 去掉注释来打开Vue调试工具
Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  routes: require('./router/index').routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
