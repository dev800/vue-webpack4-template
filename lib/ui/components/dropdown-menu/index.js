import UiDropdownMenu from '../dropdown/src/dropdown-menu'

/* istanbul ignore next */
UiDropdownMenu.install = function (Vue) {
  Vue.component(UiDropdownMenu.name, UiDropdownMenu)
}

export default UiDropdownMenu
