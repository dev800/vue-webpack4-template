import UiCol from './src/col'

/* istanbul ignore next */
UiCol.install = function (Vue) {
  Vue.component(UiCol.name, UiCol)
}

export default UiCol
