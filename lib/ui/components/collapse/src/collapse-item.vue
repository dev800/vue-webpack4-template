<template>
  <div
    class="fm-collapse-item"
    :class="{'is-active': isActive, 'is-disabled': disabled }"
  >
    <div
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`fm-collapse-content-${id}`"
      :aria-describedby="`fm-collapse-content-${id}`"
    >
      <div
        :id="`fm-collapse-head-${id}`"
        class="fm-collapse-item__header"
        role="button"
        :tabindex="disabled ? undefined : 0"
        :class="{
          'focusing': focusing,
          'is-active': isActive
        }"
        @click="handleHeaderClick"
        @keyup.space.enter.stop="handleEnterClick"
        @focus="handleFocus"
        @blur="focusing = false"
      >
        <slot name="title">
          {{ title }}
        </slot>
        <i
          class="fm-collapse-item__arrow fm-icon-ios-arrow-right"
          :class="{'is-active': isActive}"
        />
      </div>
    </div>
    <fm-collapse-transition>
      <div
        v-show="isActive"
        :id="`fm-collapse-content-${id}`"
        class="fm-collapse-item__wrap"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`fm-collapse-head-${id}`"
      >
        <div class="fm-collapse-item__content">
          <slot />
        </div>
      </div>
    </fm-collapse-transition>
  </div>
</template>
<script>
import FmCollapseTransition from '../../collapse-transition'
import Emitter from '../../../js/mixins/emitter'
import { generateId } from '../../../js/utils/util'

export default {
  name: 'FmCollapseItem',

  componentName: 'FmCollapseItem',

  components: { FmCollapseTransition },

  mixins: [Emitter],

  props: {
    title: String,
    name: {
      type: [String, Number],
      default () {
        return this._uid
      }
    },
    disabled: Boolean
  },

  data () {
    return {
      contentWrapStyle: {
        height: 'auto',
        display: 'block'
      },
      contentHeight: 0,
      focusing: false,
      isClick: false,
      id: generateId()
    }
  },

  inject: ['collapse'],

  computed: {
    isActive () {
      return this.collapse.activeNames.indexOf(this.name) > -1
    }
  },

  methods: {
    handleFocus () {
      setTimeout(() => {
        if (!this.isClick) {
          this.focusing = true
        } else {
          this.isClick = false
        }
      }, 50)
    },
    handleHeaderClick () {
      if (this.disabled) return
      this.dispatch('FmCollapse', 'item-click', this)
      this.focusing = false
      this.isClick = true
    },
    handleEnterClick () {
      this.dispatch('FmCollapse', 'item-click', this)
    }
  }
}
</script>
