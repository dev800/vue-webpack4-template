import UiMenu from './src/menu'

/* istanbul ignore next */
UiMenu.install = function (Vue) {
  Vue.component(UiMenu.name, UiMenu)
}

export default UiMenu
