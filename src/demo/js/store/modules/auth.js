const state = {
  count: 0
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
  }) => commit('decrement')
}

// mutations
const mutations = {
  increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
