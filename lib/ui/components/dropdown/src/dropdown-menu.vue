<template>
  <transition
    name="fm-zoom-in-top"
    @after-leave="doDestroy"
  >
    <ul
      v-show="showPopper"
      class="fm-dropdown-menu fm-popper"
      :class="[size && `fm-dropdown-menu--${size}`]"
    >
      <slot />
    </ul>
  </transition>
</template>
<script>
import Popper from '../../../js/utils/vue-popper'

export default {
  name: 'FmDropdownMenu',

  componentName: 'FmDropdownMenu',

  mixins: [Popper],

  props: {
    visibleArrow: {
      type: Boolean,
      default: true
    },
    arrowOffset: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      size: this.dropdown.dropdownSize
    }
  },

  inject: ['dropdown'],

  watch: {
    'dropdown.placement': {
      immediate: true,
      handler (val) {
        this.currentPlacement = val
      }
    }
  },

  created () {
    this.$on('updatePopper', () => {
      if (this.showPopper) this.updatePopper()
    })
    this.$on('visible', val => {
      this.showPopper = val
    })
  },

  mounted () {
    this.dropdown.popperFmm = this.popperFmm = this.$el
    this.referenceFmm = this.dropdown.$el
    // compatible with 2.6 new v-slot syntax
    // issue link https://github.com/FmemeFE/element/issues/14345
    this.dropdown.initDomOperation()
  }
}
</script>
