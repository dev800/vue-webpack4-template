import UiTabs from './src/tabs'

/* istanbul ignore next */
UiTabs.install = function (Vue) {
  Vue.component(UiTabs.name, UiTabs)
}

export default UiTabs
