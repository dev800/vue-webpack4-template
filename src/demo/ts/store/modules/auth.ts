import { Module, ActionContext, ActionTree, MutationTree, GetterTree } from 'vuex'
import { RootState } from '../root-types'

class State {
  count: number
}

// getters
const getters: GetterTree<State, RootState> = {
  evenOrOdd (state: State): string {
    return state.count % 2 === 0 ? 'even' : 'odd'
  }
}

const MutationTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  SET_COUNT: 'SET_COUNT'
}

// actions
const actions: ActionTree<State, RootState> = {
  increment ({ commit }: ActionContext<State, RootState>): void {
    commit(MutationTypes.INCREMENT)
  },
  decrement ({ commit }: ActionContext<State, RootState>): void {
    commit(MutationTypes.DECREMENT)
  },
  setCount ({ commit }: ActionContext<State, RootState>, count: number): void {
    commit(MutationTypes.SET_COUNT, count)
  }
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
  }
}

export const auth: Module<State, RootState> = {
  namespaced: true,
  state: new State(),
  getters,
  actions,
  mutations
}
