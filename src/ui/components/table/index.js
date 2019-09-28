import FmTable from './src/table'

/* istanbul ignore next */
FmTable.install = function(Vue) {
  Vue.component(FmTable.name, FmTable)
}

export default FmTable
