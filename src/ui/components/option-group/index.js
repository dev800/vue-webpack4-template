import FmOptionGroup from '../select/src/option-group'

/* istanbul ignore next */
FmOptionGroup.install = function(Vue) {
  Vue.component(FmOptionGroup.name, FmOptionGroup)
}

export default FmOptionGroup
