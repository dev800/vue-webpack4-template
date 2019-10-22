import 'babel-polyfill'
import Vue from 'vue'
import FarmerUI from '~/lib/ui/js/index'
import lang from '~/lib/ui/js/locale/lang/zh-CN.js'
// import locale from '~/lib/ui/js/locale/index.js'
import store from './js/store/index'
import router from './router/index'

const appDOM = document.querySelector('#app')

if (appDOM) {
  const App = require('./App').default

  // locale.use(lang)

  Vue.config.devtools = process.env.NODE_ENV === 'development' // 去掉注释来打开Vue调试工具
  Vue.use(FarmerUI, { lang })

  Vue.prototype.$store = store

  router.beforeEach((to, _from, next: () => void) => {
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
