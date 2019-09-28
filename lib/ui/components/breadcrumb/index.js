import FmBreadcrumb from './src/breadcrumb'

/* istanbul ignore next */
FmBreadcrumb.install = function(Vue) {
  Vue.component(FmBreadcrumb.name, FmBreadcrumb)
}

export default FmBreadcrumb
