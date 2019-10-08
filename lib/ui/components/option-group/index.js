import UiOptionGroup from '../select/src/option-group'

/* istanbul ignore next */
UiOptionGroup.install = function (Vue) {
  Vue.component(UiOptionGroup.name, UiOptionGroup)
}

export default UiOptionGroup
