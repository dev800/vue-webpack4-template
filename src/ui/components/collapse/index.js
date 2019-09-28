import FmCollapse from './src/collapse'

/* istanbul ignore next */
FmCollapse.install = function(Vue) {
  Vue.component(FmCollapse.name, FmCollapse)
}

export default FmCollapse
