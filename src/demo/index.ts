import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import FarmerUI from '~/lib/ui/js/index'
import lang from '~/lib/ui/js/locale/lang/zh-CN.js'
// import locale from '~/lib/ui/js/locale/index.js'
import store from './js/store/index'

const appDOM = document.querySelector('#app')

if (appDOM) {
  // locale.use(lang)

  const App = require('./App').default

  Vue.config.devtools = process.env.NODE_ENV === 'development' // 去掉注释来打开Vue调试工具

  Vue.use(VueRouter)
  Vue.use(FarmerUI, { lang })

  Vue.prototype.$store = store

  const router = new VueRouter({
    // mode: 'history',
    routes: require('./router/index.ts').routes,
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  })

  router.beforeEach((to, from, next) => {
    if (to.meta.title) {
      document.title = to.meta.title
    } else {
      document.title = 'UI for vue'
    }

    next()
  })

  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}
