<script>
import Emitter from '../../../js/mixins/emitter'

export default {
  name: 'FmCheckboxGroup',

  componentName: 'FmCheckboxGroup',

  mixins: [Emitter],

  inject: {
    fmFormItem: {
      default: ''
    }
  },

  props: {
    value: {},
    disabled: Boolean,
    min: Number,
    max: Number,
    size: String,
    fill: String,
    textColor: String
  },

  computed: {
    _fmFormItemSize () {
      return (this.fmFormItem || {}).fmFormItemSize
    },
    checkboxGroupSize () {
      return this.size || this._fmFormItemSize || (this.$ELEMENT || {}).size
    }
  },

  watch: {
    value (value) {
      this.dispatch('FmFormItem', 'el.form.change', [value])
    }
  }
}
</script>

<template>
  <div
    class="fm-checkbox-group"
    role="group"
    aria-label="checkbox-group"
  >
    <slot />
  </div>
</template>
