<template>
  <button
    class="fm-button"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'fm-button--' + type : '',
      buttonSize ? 'fm-button--' + buttonSize : '',
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
  name: 'FmButton',

  inject: {
    fmForm: {
      default: ''
    },
    fmFormItem: {
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
    _fmFormItemSize () {
      return (this.fmFormItem || {}).fmFormItemSize
    },
    buttonSize () {
      return this.size || this._fmFormItemSize || (this.$ELEMENT || {}).size
    },
    buttonDisabled () {
      return this.disabled || (this.fmForm || {}).disabled
    }
  },

  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
