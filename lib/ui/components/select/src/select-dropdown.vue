<template>
  <div
    class="fm-select-dropdown fm-popper"
    :class="[{ 'is-multiple': $parent.multiple }, popperClass]"
    :style="{ minWidth: minWidth }"
  >
    <slot />
  </div>
</template>

<script type="text/babel">
import Popper from '../../../js/utils/vue-popper'

export default {
  name: 'FmSelectDropdown',

  componentName: 'FmSelectDropdown',

  mixins: [Popper],

  props: {
    placement: {
      default: 'bottom-start'
    },

    boundariesPadding: {
      default: 0
    },

    popperOptions: {
      default () {
        return {
          gpuAcceleration: false
        }
      }
    },

    visibleArrow: {
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      minWidth: ''
    }
  },

  computed: {
    popperClass () {
      return this.$parent.popperClass
    }
  },

  watch: {
    '$parent.inputWidth' () {
      this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px'
    }
  },

  mounted () {
    this.referenceFmm = this.$parent.$refs.reference.$el
    this.$parent.popperFmm = this.popperFmm = this.$el
    this.$on('updatePopper', () => {
      if (this.$parent.visible) this.updatePopper()
    })
    this.$on('destroyPopper', this.destroyPopper)
  }
}
</script>
