import { ActionContext, ActionTree, MutationTree, GetterTree } from 'vuex'

class StateAsideMenu {
  // 模式(horizontal / vertical)：默认: vertical
  public mode: string = 'vertical'
  // 是否折叠
  public collapse: boolean = false

  constructor () { }
}

class State {
  public count: number
  public asideMenu: StateAsideMenu = new StateAsideMenu()
}

// getters
const getters: GetterTree<State, State> = {
  evenOrOdd (state: State): string {
    return state.count % 2 === 0 ? 'even' : 'odd'
  }
}

const mutationTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  SET_COUNT: 'SET_COUNT',
  ASIDE_MENU_COLLAPSE_TOGGLE: 'ASIDE_MENU_COLLAPSE_TOGGLE'
}

// actions
const actions: ActionTree<State, State> = {
  increment ({ commit }: ActionContext<State, State>): void {
    commit(mutationTypes.INCREMENT)
  },
  decrement ({ commit }: ActionContext<State, State>): void {
    commit(mutationTypes.DECREMENT)
  },
  setCount ({ commit }: ActionContext<State, State>, count: number): void {
    commit(mutationTypes.SET_COUNT, count)
  },
  asideMenuCollapseToggle ({ commit }: ActionContext<State, State>): void {
    commit(mutationTypes.ASIDE_MENU_COLLAPSE_TOGGLE)
  },
}

const mutations: MutationTree<State> = {
  [mutationTypes.INCREMENT] (state: State): void {
    state.count++
  },
  [mutationTypes.DECREMENT] (state: State): void {
    state.count--
  },
  [mutationTypes.SET_COUNT] (state: State, count: number): void {
    state.count = count
  },
  [mutationTypes.ASIDE_MENU_COLLAPSE_TOGGLE] (state: State): void {
    state.asideMenu.collapse = !state.asideMenu.collapse
  },
}

export default {
  namespaced: true,
  state: new State(),
  getters,
  actions,
  mutations
}
