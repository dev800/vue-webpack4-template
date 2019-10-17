import { VNodeDirective } from 'vue'

export interface UIInfiniteScroll extends VNodeDirective {
  name: 'infinite-scroll',
  value: Function
}
