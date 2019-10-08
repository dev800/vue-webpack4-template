<script>
import Emitter from '../../../js/mixins/emitter'

export default {
  name: 'UiCheckboxGroup',

  componentName: 'UiCheckboxGroup',

  mixins: [Emitter],

  inject: {
    uiFormItem: {
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
    _uiFormItemSize () {
      return (this.uiFormItem || {}).uiFormItemSize
    },
    checkboxGroupSize () {
      return this.size || this._uiFormItemSize || (this.$ELEMENT || {}).size
    }
  },

  watch: {
    value (value) {
      this.dispatch('UiFormItem', 'ui.form.change', [value])
    }
  }
}
</script>

<template>
  <div
    class="ui-checkbox-group"
    role="group"
    aria-label="checkbox-group"
  >
    <slot />
  </div>
</template>
