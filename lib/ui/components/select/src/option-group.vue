<template>
  <ul
    v-show="visible"
    class="ui-select-group__wrap"
  >
    <li class="ui-select-group__title">
      {{ label }}
    </li>
    <li>
      <ul class="ui-select-group">
        <slot />
      </ul>
    </li>
  </ul>
</template>

<script type="text/babel">
import Emitter from '../../../js/mixins/emitter'

export default {

  name: 'UiOptionGroup',
  mixins: [Emitter],

  componentName: 'UiOptionGroup',

  props: {
    label: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      visible: true
    }
  },

  watch: {
    disabled (val) {
      this.broadcast('UiOption', 'handleGroupDisabled', val)
    }
  },

  created () {
    this.$on('queryChange', this.queryChange)
  },

  mounted () {
    if (this.disabled) {
      this.broadcast('UiOption', 'handleGroupDisabled', this.disabled)
    }
  },

  methods: {
    queryChange () {
      this.visible = this.$children &&
        Array.isArray(this.$children) &&
        this.$children.some(option => option.visible === true)
    }
  }
}
</script>
