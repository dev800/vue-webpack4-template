import FmMenuItem from '../menu/src/menu-item'

/* istanbul ignore next */
FmMenuItem.install = function(Vue) {
  Vue.component(FmMenuItem.name, FmMenuItem)
}

export default FmMenuItem
