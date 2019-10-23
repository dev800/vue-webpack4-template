<template>
  <div
    class="ui-menu-item"
    role="menuitem"
    tabindex="-1"
    :style="[paddingStyle, itemStyle, { backgroundColor }]"
    :class="{
      'is-active': active,
      'is-disabled': disabled
    }"
    @click="handleClick"
    @mouseenter="onMouseEnter"
    @focus="onMouseEnter"
    @blur="onMouseLeave"
    @mouseleave="onMouseLeave"
  >
    <ui-tooltip
      v-if="parentMenu.$options.componentName === 'UiMenu' && rootMenu.collapse && $slots.title"
      effect="dark"
      placement="right"
    >
      <div slot="content">
        <slot name="title" />
      </div>
      <div style="position: absolute; left: 0; top: 0; height: 100%; width: 100%; display: inline-block;box-sizing: border-box; padding: 0 20px;">
        <slot />
      </div>
    </ui-tooltip>
    <template v-else>
      <slot />
      <slot name="title" />
    </template>
  </div>
</template>
<script>
import Menu from './menu-mixin'
import UiTooltip from '../../tooltip'
import Emitter from '../../../js/mixins/emitter'

export default {
  name: 'UiMenuItem',

  componentName: 'UiMenuItem',

  components: { UiTooltip },

  mixins: [Menu, Emitter],

  props: {
    index: {
      default: null,
      validator: val => typeof val === 'string' || val === null
    },
    route: {
      type: [String, Object],
      default: function () {
        return null
      }
    },
    disabled: Boolean
  },
  computed: {
    active () {
      return this.index === this.rootMenu.activeIndex
    },
    backgroundColor () {
      return this.rootMenu.backgroundColor || ''
    },
    activeTextColor () {
      return this.rootMenu.activeTextColor || ''
    },
    textColor () {
      return this.rootMenu.textColor || ''
    },
    mode () {
      return this.rootMenu.mode
    },
    itemStyle () {
      const style = {
        color: this.active ? this.activeTextColor : this.textColor
      }
      if (this.mode === 'horizontal' && !this.isNested) {
        style.borderBottomColor = this.active
          ? (this.rootMenu.activeTextColor ? this.activeTextColor : '')
          : 'transparent'
      }
      return style
    },
    isNested () {
      return this.parentMenu !== this.rootMenu
    }
  },
  mounted () {
    this.parentMenu.addItem(this)
    this.rootMenu.addItem(this)
  },
  beforeDestroy () {
    this.parentMenu.removeItem(this)
    this.rootMenu.removeItem(this)
  },
  methods: {
    onMouseEnter () {
      if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) return
    },
    onMouseLeave () {
      if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) return
      this.$el.style.backgroundColor = this.backgroundColor
    },
    handleClick () {
      if (!this.disabled) {
        this.dispatch('UiMenu', 'item-click', this)
        this.$emit('click', this)
      }
    }
  }
}
</script>
