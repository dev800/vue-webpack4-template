<template>
  <div
    class="ui-collapse-item"
    :class="{'is-active': isActive, 'is-disabled': disabled }"
  >
    <div
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`ui-collapse-content-${id}`"
      :aria-describedby="`ui-collapse-content-${id}`"
    >
      <div
        :id="`ui-collapse-head-${id}`"
        class="ui-collapse-item__header"
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
        <svg-icon
          icon-class="solid-check"
          class="solid-angle-right"
          :class="{'is-active': isActive}"
        ></svg-icon>
      </div>
    </div>
    <ui-collapse-transition>
      <div
        v-show="isActive"
        :id="`ui-collapse-content-${id}`"
        class="ui-collapse-item__wrap"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`ui-collapse-head-${id}`"
      >
        <div class="ui-collapse-item__content">
          <slot />
        </div>
      </div>
    </ui-collapse-transition>
  </div>
</template>
<script>
import UiCollapseTransition from '../../collapse-transition'
import Emitter from '../../../js/mixins/emitter'
import { generateId } from '../../../js/utils/util'

export default {
  name: 'UiCollapseItem',

  componentName: 'UiCollapseItem',

  components: { UiCollapseTransition },

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
      this.dispatch('UiCollapse', 'item-click', this)
      this.focusing = false
      this.isClick = true
    },
    handleEnterClick () {
      this.dispatch('UiCollapse', 'item-click', this)
    }
  }
}
</script>
