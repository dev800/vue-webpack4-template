import UiTimelineItem from '../timeline/src/item'

/* istanbul ignore next */
UiTimelineItem.install = function (Vue) {
  Vue.component(UiTimelineItem.name, UiTimelineItem)
}

export default UiTimelineItem
