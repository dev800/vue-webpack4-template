import UiTag from './src/tag'

/* istanbul ignore next */
UiTag.install = function (Vue) {
  Vue.component(UiTag.name, UiTag)
}

export default UiTag
