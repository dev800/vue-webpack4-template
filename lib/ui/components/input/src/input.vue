<template>
  <div
    :class="[
      type === 'textarea' ? 'ui-textarea' : 'ui-input',
      inputSize ? 'ui-input--' + inputSize : '',
      {
        'is-disabled': inputDisabled,
        'is-exceed': inputExceed,
        'ui-input-group': $slots.prepend || $slots.append,
        'ui-input-group--append': $slots.append,
        'ui-input-group--prepend': $slots.prepend,
        'ui-input--prefix': $slots.prefix || prefixIcon,
        'ui-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
      }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div
        v-if="$slots.prepend"
        class="ui-input-group__prepend"
      >
        <slot name="prepend" />
      </div>
      <input
        v-if="type !== 'textarea'"
        ref="input"
        :tabindex="tabindex"
        class="ui-input__inner"
        v-bind="$attrs"
        :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :aria-label="label"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      >
      <!-- 前置内容 -->
      <span
        v-if="$slots.prefix || prefixIcon"
        class="ui-input__prefix"
      >
        <slot name="prefix" />
        <svg-icon
          v-if="prefixIcon"
          class="ui-input__icon"
          :icon-class="prefixIcon"
        ></svg-icon>
      </span>
      <!-- 后置内容 -->
      <span
        v-if="getSuffixVisible()"
        class="ui-input__suffix"
      >
        <span class="ui-input__suffix-inner">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix" />
            <svg-icon
              v-if="suffixIcon"
              class="ui-input__icon"
              :icon-class="suffixIcon"
            ></svg-icon>
          </template>
          <svg-icon
            v-if="showClear"
            class="ui-input__icon ui-input__clear"
            icon-class="regular-times-circle"
            @mousedown.prevent
            @click="clear"
          ></svg-icon>
          <svg-icon
            v-if="showPwdVisible && !passwordVisible"
            class="ui-input__icon ui-input__clear"
            icon-class="regular-eye"
            @click="handlePasswordVisible"
          ></svg-icon>
          <svg-icon
            v-if="showPwdVisible && passwordVisible"
            class="ui-input__icon ui-input__clear"
            icon-class="regular-eye-slash"
            @click="handlePasswordVisible"
          ></svg-icon>
          <span
            v-if="isWordLimitVisible"
            class="ui-input__count"
          >
            <span class="ui-input__count-inner">
              {{ textLength }}/{{ upperLimit }}
            </span>
          </span>
        </span>
        <svg-icon
          v-if="validateState"
          class="ui-input__icon"
          icon-class="regular-eye"
          @click="handlePasswordVisible"
        ></svg-icon>
        <svg-icon
          v-if="validateState"
          class="ui-input__icon ui-input__validate-icon"
          :class="[this.validateState === 'validating' ? 'animated spin infinite' : '']"
          :icon-class="validateIcon"
        ></svg-icon>
      </span>
      <!-- 后置元素 -->
      <div
        v-if="$slots.append"
        class="ui-input-group__append"
      >
        <slot name="append" />
      </div>
    </template>
    <textarea
      v-else
      ref="textarea"
      :tabindex="tabindex"
      class="ui-textarea__inner"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :style="textareaStyle"
      :aria-label="label"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    />
    <span
      v-if="isWordLimitVisible && type === 'textarea'"
      class="ui-input__count"
    >{{ textLength }}/{{ upperLimit }}</span>
  </div>
</template>
<script>
import emitter from '../../../js/mixins/emitter'
import Migrating from '../../../js/mixins/migrating'
import calcTextareaHeight from './calcTextareaHeight'
import merge from '../../../js/utils/merge'
import { isKorean } from '../../../js/utils/shared'

export default {
  name: 'UiInput',

  componentName: 'UiInput',

  mixins: [emitter, Migrating],

  inheritAttrs: false,

  inject: {
    uiForm: {
      default: ''
    },
    uiFormItem: {
      default: ''
    }
  },

  props: {
    value: {
      type: [String, Number],
      default: function () {
        return null
      }
    },
    size: {
      type: String,
      default: null
    },
    resize: {
      type: String,
      default: null
    },
    form: {
      type: String,
      default: null
    },
    disabled: Boolean,
    readonly: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    suffixIcon: {
      type: String,
      default: null
    },
    prefixIcon: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      textareaCalcStyle: {},
      hovering: false,
      focused: false,
      isComposing: false,
      passwordVisible: false
    }
  },

  computed: {
    _uiFormItemSize () {
      return (this.uiFormItem || {}).uiFormItemSize
    },
    validateState () {
      return this.uiFormItem ? this.uiFormItem.validateState : ''
    },
    needStatusIcon () {
      return this.uiForm ? this.uiForm.statusIcon : false
    },
    validateIcon () {
      return {
        validating: 'solid-loading',
        success: 'solid-check',
        error: 'solid-times'
      }[this.validateState]
    },
    textareaStyle () {
      return merge({}, this.textareaCalcStyle, { resize: this.resize })
    },
    inputSize () {
      return this.size || this._uiFormItemSize || (this.$ELEMENT || {}).size
    },
    inputDisabled () {
      return this.disabled || (this.uiForm || {}).disabled
    },
    nativeInputValue () {
      return this.value === null || this.value === undefined
        ? ''
        : String(this.value)
    },
    showClear () {
      return (
        this.clearable &&
        !this.inputDisabled &&
        !this.readonly &&
        this.nativeInputValue &&
        (this.focused || this.hovering)
      )
    },
    showPwdVisible () {
      return (
        this.showPassword &&
        !this.inputDisabled &&
        !this.readonly &&
        (!!this.nativeInputValue || this.focused)
      )
    },
    isWordLimitVisible () {
      return (
        this.showWordLimit &&
        this.$attrs.maxlength &&
        (this.type === 'text' || this.type === 'textarea') &&
        !this.inputDisabled &&
        !this.readonly &&
        !this.showPassword
      )
    },
    upperLimit () {
      return this.$attrs.maxlength
    },
    textLength () {
      if (typeof this.value === 'number') {
        return String(this.value).length
      }

      return (this.value || '').length
    },
    inputExceed () {
      // show exceed style if length of initial value greater then maxlength
      return this.isWordLimitVisible && this.textLength > this.upperLimit
    }
  },

  watch: {
    value (val) {
      this.$nextTick(this.resizeTextarea)
      if (this.validateEvent) {
        this.dispatch('UiFormItem', 'ui.form.change', [val])
      }
    },
    // native input value is set explicitly
    // do not use v-model / :value in template
    // see: https://github.com/UiemeFE/element/issues/14521
    nativeInputValue () {
      this.setNativeInputValue()
    },
    // when change between <input> and <textarea>,
    // update DOM dependent value and styles
    // https://github.com/UiemeFE/element/issues/14857
    type () {
      this.$nextTick(() => {
        this.setNativeInputValue()
        this.resizeTextarea()
        this.updateIconOffset()
      })
    }
  },

  created () {
    this.$on('inputSelect', this.select)
  },

  mounted () {
    this.setNativeInputValue()
    this.resizeTextarea()
    this.updateIconOffset()
  },

  updated () {
    this.$nextTick(this.updateIconOffset)
  },

  methods: {
    focus () {
      this.getInput().focus()
    },
    blur () {
      this.getInput().blur()
    },
    getMigratingConfig () {
      return {
        props: {
          icon: 'icon is removed, use suffix-icon / prefix-icon instead.',
          'on-icon-click': 'on-icon-click is removed.'
        },
        events: {
          click: 'click is removed.'
        }
      }
    },
    handleBlur (event) {
      this.focused = false
      this.$emit('blur', event)
      if (this.validateEvent) {
        this.dispatch('UiFormItem', 'ui.form.blur', [this.value])
      }
    },
    select () {
      this.getInput().select()
    },
    resizeTextarea () {
      if (this.$isServer) return
      const { autosize, type } = this
      if (type !== 'textarea') return
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
        }
        return
      }
      const minRows = autosize.minRows
      const maxRows = autosize.maxRows

      this.textareaCalcStyle = calcTextareaHeight(
        this.$refs.textarea,
        minRows,
        maxRows
      )
    },
    setNativeInputValue () {
      const input = this.getInput()
      if (!input) return
      if (input.value === this.nativeInputValue) return
      input.value = this.nativeInputValue
    },
    handleFocus (event) {
      this.focused = true
      this.$emit('focus', event)
    },
    handleCompositionStart () {
      this.isComposing = true
    },
    handleCompositionUpdate (event) {
      const text = event.target.value
      const lastCharacter = text[text.length - 1] || ''
      this.isComposing = !isKorean(lastCharacter)
    },
    handleCompositionEnd (event) {
      if (this.isComposing) {
        this.isComposing = false
        this.handleInput(event)
      }
    },
    handleInput (event) {
      // should not emit input during composition
      // see: https://github.com/UiemeFE/element/issues/10516
      if (this.isComposing) return

      // hack for https://github.com/UiemeFE/element/issues/8548
      // should remove the following line when we don't support IE
      if (event.target.value === this.nativeInputValue) return

      this.$emit('input', event.target.value)

      // ensure native input value is controlled
      // see: https://github.com/UiemeFE/element/issues/12850
      this.$nextTick(this.setNativeInputValue)
    },
    handleChange (event) {
      this.$emit('change', event.target.value)
    },
    calcIconOffset (place) {
      const elList = [].slice.call(
        this.$el.querySelectorAll(`.ui-input__${place}`) || []
      )
      if (!elList.length) return
      let el = null
      for (let i = 0; i < elList.length; i++) {
        if (elList[i].parentNode === this.$el) {
          el = elList[i]
          break
        }
      }
      if (!el) return
      const pendantMap = {
        suffix: 'append',
        prefix: 'prepend'
      }

      const pendant = pendantMap[place]
      if (this.$slots[pendant]) {
        el.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${
          this.$el.querySelector(`.ui-input-group__${pendant}`).offsetWidth
          }px)`
      } else {
        el.removeAttribute('style')
      }
    },
    updateIconOffset () {
      this.calcIconOffset('prefix')
      this.calcIconOffset('suffix')
    },
    clear () {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
    },
    handlePasswordVisible () {
      this.passwordVisible = !this.passwordVisible
      this.focus()
    },
    getInput () {
      return this.$refs.input || this.$refs.textarea
    },
    getSuffixVisible () {
      return (
        this.$slots.suffix ||
        this.suffixIcon ||
        this.showClear ||
        this.showPassword ||
        this.isWordLimitVisible ||
        (this.validateState && this.needStatusIcon)
      )
    }
  }
}
</script>
