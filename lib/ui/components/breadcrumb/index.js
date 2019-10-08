import UiBreadcrumb from './src/breadcrumb'

/* istanbul ignore next */
UiBreadcrumb.install = function (Vue) {
  Vue.component(UiBreadcrumb.name, UiBreadcrumb)
}

export default UiBreadcrumb
