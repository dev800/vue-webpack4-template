import FmTag from './src/tag'

/* istanbul ignore next */
FmTag.install = function(Vue) {
  Vue.component(FmTag.name, FmTag)
}

export default FmTag
