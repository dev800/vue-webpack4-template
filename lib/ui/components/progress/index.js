import UiProgress from './src/progress'

/* istanbul ignore next */
UiProgress.install = function (Vue) {
  Vue.component(UiProgress.name, UiProgress)
}

export default UiProgress
