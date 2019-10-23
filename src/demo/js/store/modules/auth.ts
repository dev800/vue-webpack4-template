import { ActionContext, ActionTree, MutationTree, GetterTree } from 'vuex'

class State {
  public count: number
}

// getters
const getters: GetterTree<State, State> = {
  evenOrOdd (state: State): string {
    return state.count % 2 === 0 ? 'even' : 'odd'
  }
}

const enum MutationTypes {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  SET_COUNT = 'SET_COUNT'
}

// actions
const actions: ActionTree<State, State> = {
  increment ({ commit }: ActionContext<State, State>): void {
    commit(MutationTypes.INCREMENT)
  },
  decrement ({ commit }: ActionContext<State, State>): void {
    commit(MutationTypes.DECREMENT)
  },
  setCount ({ commit }: ActionContext<State, State>, count: number): void {
    commit(MutationTypes.SET_COUNT, count)
  },
}

const mutations: MutationTree<State> = {
  [MutationTypes.INCREMENT] (state: State): void {
    state.count++
  },
  [MutationTypes.DECREMENT] (state: State): void {
    state.count--
  },
  [MutationTypes.SET_COUNT] (state: State, count: number): void {
    state.count = count
  },
}

export default {
  namespaced: true,
  state: new State(),
  getters,
  actions,
  mutations
}
