import FmAutocomplete from './src/autocomplete'

/* istanbul ignore next */
FmAutocomplete.install = function(Vue) {
  Vue.component(FmAutocomplete.name, FmAutocomplete)
}

export default FmAutocomplete
