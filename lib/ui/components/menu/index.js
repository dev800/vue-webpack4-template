import FmMenu from './src/menu'

/* istanbul ignore next */
FmMenu.install = function (Vue) {
  Vue.component(FmMenu.name, FmMenu)
}

export default FmMenu
