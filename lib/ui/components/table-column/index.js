import FmTableColumn from '../table/src/table-column'

/* istanbul ignore next */
FmTableColumn.install = function(Vue) {
  Vue.component(FmTableColumn.name, FmTableColumn)
}

export default FmTableColumn
