import UiOption from '../select/src/option'

/* istanbul ignore next */
UiOption.install = function (Vue) {
  Vue.component(UiOption.name, UiOption)
}

export default UiOption
