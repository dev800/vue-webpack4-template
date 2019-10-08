<template>
  <button
    class="ui-button"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'ui-button--' + type : '',
      buttonSize ? 'ui-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
    @click="handleClick"
  >
    <svg-icon
      v-if="loading"
      icon-class="solid-loading"
      class="animated spin infinite"
    ></svg-icon>
    <svg-icon
      v-if="icon && !loading"
      :icon-class="icon"
    ></svg-icon>
    <span v-if="$slots.default">
      <slot /></span>
  </button>
</template>
<script>
export default {
  name: 'UiButton',

  inject: {
    uiForm: {
      default: ''
    },
    uiFormItem: {
      default: ''
    }
  },

  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'small'
    },
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },

  computed: {
    _uiFormItemSize () {
      return (this.uiFormItem || {}).uiFormItemSize
    },
    buttonSize () {
      return this.size || this._uiFormItemSize || (this.$ELEMENT || {}).size
    },
    buttonDisabled () {
      return this.disabled || (this.uiForm || {}).disabled
    }
  },

  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
