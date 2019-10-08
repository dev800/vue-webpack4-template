import UiCarouselItem from '../carousel/src/item'

/* istanbul ignore next */
UiCarouselItem.install = function (Vue) {
  Vue.component(UiCarouselItem.name, UiCarouselItem)
}

export default UiCarouselItem
