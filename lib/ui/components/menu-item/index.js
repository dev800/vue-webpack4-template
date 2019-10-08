import UiMenuItem from '../menu/src/menu-item'

/* istanbul ignore next */
UiMenuItem.install = function (Vue) {
  Vue.component(UiMenuItem.name, UiMenuItem)
}

export default UiMenuItem
