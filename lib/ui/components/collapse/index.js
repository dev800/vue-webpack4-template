import UiCollapse from './src/collapse'

/* istanbul ignore next */
UiCollapse.install = function (Vue) {
  Vue.component(UiCollapse.name, UiCollapse)
}

export default UiCollapse
