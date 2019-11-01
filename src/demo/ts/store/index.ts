import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './modules/auth'
import { ui } from './modules/ui'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    ui
  },
  strict: true,
  plugins: []
})
