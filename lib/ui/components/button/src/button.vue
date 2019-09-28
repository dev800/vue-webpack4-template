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
    <i
      v-if="loading"
      class="fm-icon-loading"
    />
    <i
      v-if="icon && !loading"
      :class="icon"
    />
    <span v-if="$slots.default"><slot /></span>
  </button>
</template>
<script>
export default {
  name: 'FmButton',

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
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
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize
    },
    buttonSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },
    buttonDisabled() {
      return this.disabled || (this.elForm || {}).disabled
    }
  },

  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
