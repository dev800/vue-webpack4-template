import FmTimelineItem from '../timeline/src/item'

/* istanbul ignore next */
FmTimelineItem.install = function (Vue) {
  Vue.component(FmTimelineItem.name, FmTimelineItem)
}

export default FmTimelineItem
