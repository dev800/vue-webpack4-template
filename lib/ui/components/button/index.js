import UiButton from './src/button'

/* istanbul ignore next */
UiButton.install = function (Vue) {
  Vue.component(UiButton.name, UiButton)
}

export default UiButton
