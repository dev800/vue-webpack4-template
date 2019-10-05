const state = {
  count: 0,
  // 侧栏的菜单
  asideMenu: {
    // 模式(horizontal / vertical)：默认: vertical
    mode: 'vertical',
    // 是否折叠
    collapse: false,
    // 是否开启折叠动画
    collapseTransition: false
  }
}

// getters
const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

// actions
const actions = {
  increment: ({
    commit
  }) => commit('increment'),
  decrement: ({
    commit
  }) => commit('decrement'),
  asideMenuCollapseToggle: ({
    commit
  }) => commit('asideMenuCollapseToggle')
}

// mutations
const mutations = {
  increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  },
  asideMenuCollapseToggle (state) {
    state.asideMenu.collapse = !state.asideMenu.collapse
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
