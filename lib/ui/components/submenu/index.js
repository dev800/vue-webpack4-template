import UiSubmenu from '../menu/src/submenu'

/* istanbul ignore next */
UiSubmenu.install = function (Vue) {
  Vue.component(UiSubmenu.name, UiSubmenu)
}

export default UiSubmenu
