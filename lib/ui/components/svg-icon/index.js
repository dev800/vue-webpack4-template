import SvgIcon from './src/svg-icon.vue'

/* istanbul ignore next */
SvgIcon.install = function (Vue) {
  Vue.component(SvgIcon.name, SvgIcon)
}

const requireContext = require.context('../../icons/svg', false, /\.svg$/)
requireContext.keys().map(requireContext)

export default SvgIcon
