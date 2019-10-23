import { ActionContext, ActionTree, MutationTree, GetterTree } from 'vuex'

class MenuItemRoute {
  public url: string
  public params: object
}

class MenuItem {
  /** 自己菜单 */
  public children?: Array<MenuItem> = []
  /** 图标 */
  public icon?: string
  /** 标题 */
  public title?: string
  /** 路由 */
  public route?: MenuItemRoute = new MenuItemRoute()
  /** 跳转类型 */
  public jumpType?: string = '__self'
}

/** 侧栏菜单 */
class AsideMenu {
  // 模式(horizontal / vertical)：默认: vertical
  public mode?: string = 'vertical'
  // 是否折叠
  public collapse?: boolean = false
  // 菜单项
  public items?: Array<MenuItem> = []

  constructor () { }
}

class State {
  public count: number
  public asideMenu: AsideMenu = new AsideMenu()
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
  SET_COUNT = 'SET_COUNT',
  ASIDE_MENU_COLLAPSE_TOGGLE = 'ASIDE_MENU_COLLAPSE_TOGGLE'
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
  asideMenuCollapseToggle ({ commit }: ActionContext<State, State>): void {
    commit(MutationTypes.ASIDE_MENU_COLLAPSE_TOGGLE)
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
  [MutationTypes.ASIDE_MENU_COLLAPSE_TOGGLE] (state: State): void {
    state.asideMenu.collapse = !state.asideMenu.collapse
  },
}

const stateInstance = new State()

// stateInstance.asideMenu.items = [
//   {
//     children: [],
//     icon: 'th-large',
//     title: ''
//   }
// ]

export default {
  namespaced: true,
  state: stateInstance,
  getters,
  actions,
  mutations
}
