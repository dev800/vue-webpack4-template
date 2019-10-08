import UiDialog from './src/component'

/* istanbul ignore next */
UiDialog.install = function (Vue) {
  Vue.component(UiDialog.name, UiDialog)
}

export default UiDialog
