import FmProgress from './src/progress'

/* istanbul ignore next */
FmProgress.install = function(Vue) {
  Vue.component(FmProgress.name, FmProgress)
}

export default FmProgress
