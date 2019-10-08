<template>
  <div
    class="ui-form-item"
    :class="[{
               'ui-form-item--feedback': uiForm && uiForm.statusIcon,
               'is-error': validateState === 'error',
               'is-validating': validateState === 'validating',
               'is-success': validateState === 'success',
               'is-required': isRequired || required,
               'is-no-asterisk': uiForm && uiForm.hideRequiredAsterisk
             },
             sizeClass ? 'ui-form-item--' + sizeClass : ''
    ]"
  >
    <label-wrap
      :is-auto-width="labelStyle && labelStyle.width === 'auto'"
      :update-all="form.labelWidth === 'auto'"
    >
      <label
        v-if="label || $slots.label"
        :for="labelFor"
        class="ui-form-item__label"
        :style="labelStyle"
      >
        <slot name="label">{{ label + form.labelSuffix }}</slot>
      </label>
    </label-wrap>
    <div
      class="ui-form-item__content"
      :style="contentStyle"
    >
      <slot />
      <transition name="ui-zoom-in-top">
        <slot
          v-if="validateState === 'error' && showMessage && form.showMessage"
          name="error"
          :error="validateMessage"
        >
          <div
            class="ui-form-item__error"
            :class="{
              'ui-form-item__error--inline': typeof inlineMessage === 'boolean'
                ? inlineMessage
                : (uiForm && uiForm.inlineMessage || false)
            }"
          >
            {{ validateMessage }}
          </div>
        </slot>
      </transition>
    </div>
  </div>
</template>
<script>
import AsyncValidator from 'async-validator'
import emitter from '../../../js/mixins/emitter'
import objectAssign from '../../../js/utils/merge'
import { noop, getPropByPath } from '../../../js/utils/util'
import LabelWrap from './label-wrap'
export default {
  name: 'UiFormItem',

  componentName: 'UiFormItem',
  components: {
    // use this component to calculate auto width
    LabelWrap
  },

  mixins: [emitter],

  provide () {
    return {
      uiFormItem: this
    }
  },

  inject: ['uiForm'],

  props: {
    label: String,
    labelWidth: String,
    prop: String,
    required: {
      type: Boolean,
      default: undefined
    },
    rules: [Object, Array],
    error: String,
    validateStatus: String,
    for: String,
    inlineMessage: {
      type: [String, Boolean],
      default: ''
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    size: String
  },
  data () {
    return {
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      validator: {},
      isNested: false,
      computedLabelWidth: ''
    }
  },
  computed: {
    labelFor () {
      return this.for || this.prop
    },
    labelStyle () {
      const ret = {}
      if (this.form.labelPosition === 'top') return ret
      const labelWidth = this.labelWidth || this.form.labelWidth
      if (labelWidth) {
        ret.width = labelWidth
      }
      return ret
    },
    contentStyle () {
      const ret = {}
      const label = this.label
      if (this.form.labelPosition === 'top' || this.form.inline) return ret
      if (!label && !this.labelWidth && this.isNested) return ret
      const labelWidth = this.labelWidth || this.form.labelWidth
      if (labelWidth === 'auto') {
        if (this.labelWidth === 'auto') {
          ret.marginLeft = this.computedLabelWidth
        } else if (this.form.labelWidth === 'auto') {
          ret.marginLeft = this.uiForm.autoLabelWidth
        }
      } else {
        ret.marginLeft = labelWidth
      }
      return ret
    },
    form () {
      let parent = this.$parent
      let parentName = parent.$options.componentName
      while (parentName !== 'UiForm') {
        if (parentName === 'UiFormItem') {
          this.isNested = true
        }
        parent = parent.$parent
        parentName = parent.$options.componentName
      }
      return parent
    },
    fieldValue () {
      const model = this.form.model
      if (!model || !this.prop) { return }

      let path = this.prop
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }

      return getPropByPath(model, path, true).v
    },
    isRequired () {
      const rules = this.getRules()
      let isRequired = false

      if (rules && rules.length) {
        rules.every(rule => {
          if (rule.required) {
            isRequired = true
            return false
          }
          return true
        })
      }
      return isRequired
    },
    _formSize () {
      return this.uiForm.size
    },
    uiFormItemSize () {
      return this.size || this._formSize
    },
    sizeClass () {
      return this.uiFormItemSize || (this.$ELEMENT || {}).size
    }
  },
  watch: {
    error: {
      immediate: true,
      handler (value) {
        this.validateMessage = value
        this.validateState = value ? 'error' : ''
      }
    },
    validateStatus (value) {
      this.validateState = value
    }
  },
  mounted () {
    if (this.prop) {
      this.dispatch('UiForm', 'ui.form.addField', [this])

      let initialValue = this.fieldValue
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue)
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue
      })

      this.addValidateEvents()
    }
  },
  beforeDestroy () {
    this.dispatch('UiForm', 'ui.form.removeField', [this])
  },
  methods: {
    validate (trigger, callback = noop) {
      this.validateDisabled = false
      const rules = this.getFilteredRule(trigger)
      if ((!rules || rules.length === 0) && this.required === undefined) {
        callback()
        return true
      }

      this.validateState = 'validating'

      const descriptor = {}
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger
        })
      }
      descriptor[this.prop] = rules

      const validator = new AsyncValidator(descriptor)
      const model = {}

      model[this.prop] = this.fieldValue

      validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''

        callback(this.validateMessage, invalidFields)
        this.uiForm && this.uiForm.$emit('validate', this.prop, !errors, this.validateMessage || null)
      })
    },
    clearValidate () {
      this.validateState = ''
      this.validateMessage = ''
      this.validateDisabled = false
    },
    resetField () {
      this.validateState = ''
      this.validateMessage = ''

      const model = this.form.model
      const value = this.fieldValue
      let path = this.prop
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }

      const prop = getPropByPath(model, path, true)

      this.validateDisabled = true
      if (Array.isArray(value)) {
        prop.o[prop.k] = [].concat(this.initialValue)
      } else {
        prop.o[prop.k] = this.initialValue
      }

      // reset validateDisabled after onFieldChange triggered
      this.$nextTick(() => {
        this.validateDisabled = false
      })

      this.broadcast('UiTimeSelect', 'fieldReset', this.initialValue)
    },
    getRules () {
      let formRules = this.form.rules
      const selfRules = this.rules
      const requiredRule = this.required !== undefined ? { required: !!this.required } : []

      const prop = getPropByPath(formRules, this.prop || '')
      formRules = formRules ? (prop.o[this.prop || ''] || prop.v) : []

      return [].concat(selfRules || formRules || []).concat(requiredRule)
    },
    getFilteredRule (trigger) {
      const rules = this.getRules()

      return rules.filter(rule => {
        if (!rule.trigger || trigger === '') return true
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1
        } else {
          return rule.trigger === trigger
        }
      }).map(rule => objectAssign({}, rule))
    },
    onFieldBlur () {
      this.validate('blur')
    },
    onFieldChange () {
      if (this.validateDisabled) {
        this.validateDisabled = false
        return
      }

      this.validate('change')
    },
    updateComputedLabelWidth (width) {
      this.computedLabelWidth = width ? `${width}px` : ''
    },
    addValidateEvents () {
      const rules = this.getRules()

      if (rules.length || this.required !== undefined) {
        this.$on('ui.form.blur', this.onFieldBlur)
        this.$on('ui.form.change', this.onFieldChange)
      }
    },
    removeValidateEvents () {
      this.$off()
    }
  }
}
</script>
