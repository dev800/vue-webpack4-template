import Vue from 'vue'
import VueRouter from 'vue-router'
import FarmerUI from '~/lib/ui/js/index.js'
import lang from '~/lib/ui/js/locale/lang/zh-CN.js'
import store from './js/store/index'
// import locale from '~/lib/ui/js/locale/index.js'

const appDOM:any = document.querySelector('#app')

if (appDOM) {
  // locale.use(lang)

  const App = require('./App').default

  Vue.config.devtools = process.env.NODE_ENV === 'development' // 去掉注释来打开Vue调试工具

  Vue.use(VueRouter)
  Vue.use(FarmerUI, { lang })

  Vue.prototype.$store = store

  const router = new VueRouter({
    // mode: 'history',
    routes: require('./router/index').routes,
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  })

  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}
