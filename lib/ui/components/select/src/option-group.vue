<template>
  <ul
    v-show="visible"
    class="fm-select-group__wrap"
  >
    <li class="fm-select-group__title">
      {{ label }}
    </li>
    <li>
      <ul class="fm-select-group">
        <slot />
      </ul>
    </li>
  </ul>
</template>

<script type="text/babel">
import Emitter from '../../../js/mixins/emitter'

export default {

  name: 'FmOptionGroup',
  mixins: [Emitter],

  componentName: 'FmOptionGroup',

  props: {
    label: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      visible: true
    }
  },

  watch: {
    disabled(val) {
      this.broadcast('FmOption', 'handleGroupDisabled', val)
    }
  },

  created() {
    this.$on('queryChange', this.queryChange)
  },

  mounted() {
    if (this.disabled) {
      this.broadcast('FmOption', 'handleGroupDisabled', this.disabled)
    }
  },

  methods: {
    queryChange() {
      this.visible = this.$children &&
          Array.isArray(this.$children) &&
          this.$children.some(option => option.visible === true)
    }
  }
}
</script>
