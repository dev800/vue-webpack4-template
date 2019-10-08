<template>
  <div
    class="ui-select-dropdown ui-popper"
    :class="[{ 'is-multiple': $parent.multiple }, popperClass]"
    :style="{ minWidth: minWidth }"
  >
    <slot />
  </div>
</template>

<script type="text/babel">
import Popper from '../../../js/utils/vue-popper'

export default {
  name: 'UiSelectDropdown',

  componentName: 'UiSelectDropdown',

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
    this.referenceUim = this.$parent.$refs.reference.$el
    this.$parent.popperUim = this.popperUim = this.$el
    this.$on('updatePopper', () => {
      if (this.$parent.visible) this.updatePopper()
    })
    this.$on('destroyPopper', this.destroyPopper)
  }
}
</script>
