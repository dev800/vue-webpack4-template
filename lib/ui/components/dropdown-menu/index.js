import FmDropdownMenu from '../dropdown/src/dropdown-menu'

/* istanbul ignore next */
FmDropdownMenu.install = function (Vue) {
  Vue.component(FmDropdownMenu.name, FmDropdownMenu)
}

export default FmDropdownMenu
