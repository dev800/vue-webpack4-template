import UiAutocomplete from './src/autocomplete'

/* istanbul ignore next */
UiAutocomplete.install = function (Vue) {
  Vue.component(UiAutocomplete.name, UiAutocomplete)
}

export default UiAutocomplete
