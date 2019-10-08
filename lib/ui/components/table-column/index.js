import UiTableColumn from '../table/src/table-column'

/* istanbul ignore next */
UiTableColumn.install = function (Vue) {
  Vue.component(UiTableColumn.name, UiTableColumn)
}

export default UiTableColumn
