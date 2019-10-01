import FmOption from '../select/src/option'

/* istanbul ignore next */
FmOption.install = function (Vue) {
  Vue.component(FmOption.name, FmOption)
}

export default FmOption
