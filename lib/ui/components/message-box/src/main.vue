<template>
  <transition name="msgbox-fade">
    <div
      v-show="visible"
      class="ui-message-box__wrapper"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      :aria-label="title || 'dialog'"
      @click.self="handleWrapperClick"
    >
      <div
        class="ui-message-box"
        :class="[customClass, center && 'ui-message-box--center']"
      >
        <div
          v-if="title !== null"
          class="ui-message-box__header"
        >
          <div class="ui-message-box__title">
            <div
              v-if="icon && center"
              :class="['ui-message-box__status', icon]"
            />
            <span>{{ title }}</span>
          </div>
          <button
            v-if="showClose"
            type="button"
            class="ui-message-box__headerbtn"
            aria-label="Close"
            @click="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
            @keydown.enter="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
          >
            <svg-icon
              class="ui-message-box__close"
              icon-class="solid-times"
            ></svg-icon>
          </button>
        </div>
        <div class="ui-message-box__content">
          <div class="ui-message-box__container">
            <svg-icon
              v-if="icon && !center && message !== ''"
              :class="['ui-message-box__status']"
              :icon-class="icon"
            />
            <div
              v-if="message !== ''"
              class="ui-message-box__message"
            >
              <slot>
                <p v-if="!dangerouslyUseHTMLString">
                  {{ message }}
                </p>
                <p
                  v-else
                  v-html="message"
                />
              </slot>
            </div>
          </div>
          <div
            v-show="showInput"
            class="ui-message-box__input"
          >
            <ui-input
              ref="input"
              v-model="inputValue"
              :type="inputType"
              :placeholder="inputPlaceholder"
              @keydown.enter.native="handleInputEnter"
            />
            <div
              class="ui-message-box__errormsg"
              :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }"
            >
              {{ editorErrorMessage }}
            </div>
          </div>
        </div>
        <div class="ui-message-box__btns">
          <ui-button
            v-if="showCancelButton"
            :loading="cancelButtonLoading"
            :class="[ cancelButtonClasses ]"
            :round="roundButton"
            size="small"
            @click.native="handleAction('cancel')"
            @keydown.enter="handleAction('cancel')"
          >
            {{ cancelButtonText || t('ui.messagebox.cancel') }}
          </ui-button>
          <ui-button
            v-show="showConfirmButton"
            ref="confirm"
            :loading="confirmButtonLoading"
            :class="[ confirmButtonClasses ]"
            :round="roundButton"
            size="small"
            @click.native="handleAction('confirm')"
            @keydown.enter="handleAction('confirm')"
          >
            {{ confirmButtonText || t('ui.messagebox.confirm') }}
          </ui-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
import Popup from '../../../js/utils/popup'
import Locale from '../../../js/mixins/locale'
import UiInput from '../../input'
import UiButton from '../../button'
import { addClass, removeClass } from '../../../js/utils/dom'
import { t } from '../../../js/locale'
import Dialog from '../../../js/utils/aria-dialog'

let messageBox
const typeMap = {
  success: 'solid-check-circle',
  info: 'solid-info-circle',
  warning: 'solid-exclamation-circle',
  error: 'solid-times-circle'
}

export default {
  components: {
    UiInput,
    UiButton
  },
  mixins: [Popup, Locale],

  props: {
    modal: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    closeOnHashChange: {
      type: Boolean,
      default: true
    },
    center: {
      default: false,
      type: Boolean
    },
    roundButton: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      uid: 1,
      title: undefined,
      message: '',
      type: '',
      iconClass: '',
      customClass: '',
      showInput: false,
      inputValue: null,
      inputPlaceholder: '',
      inputType: 'text',
      inputPattern: null,
      inputValidator: null,
      inputErrorMessage: '',
      showConfirmButton: true,
      showCancelButton: false,
      action: '',
      confirmButtonText: '',
      cancelButtonText: '',
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      confirmButtonClass: '',
      confirmButtonDisabled: false,
      cancelButtonClass: '',
      editorErrorMessage: null,
      callback: null,
      dangerouslyUseHTMLString: false,
      focusAfterClosed: null,
      isOnComposition: false,
      distinguishCancelAndClose: false
    }
  },

  computed: {
    icon () {
      const { type, iconClass } = this
      return (
        iconClass || (type && typeMap[type] ? `${typeMap[type]}` : '')
      )
    },

    confirmButtonClasses () {
      return `ui-button--primary ${this.confirmButtonClass}`
    },
    cancelButtonClasses () {
      return `${this.cancelButtonClass}`
    }
  },

  watch: {
    inputValue: {
      immediate: true,
      handler (val) {
        this.$nextTick(_ => {
          if (this.$type === 'prompt' && val !== null) {
            this.validate()
          }
        })
      }
    },

    visible (val) {
      if (val) {
        this.uid++
        if (this.$type === 'alert' || this.$type === 'confirm') {
          this.$nextTick(() => {
            this.$refs.confirm.$el.focus()
          })
        }
        this.focusAfterClosed = document.activeUiement
        messageBox = new Dialog(
          this.$el,
          this.focusAfterClosed,
          this.getFirstFocus()
        )
      }

      // prompt
      if (this.$type !== 'prompt') return
      if (val) {
        setTimeout(() => {
          if (this.$refs.input && this.$refs.input.$el) {
            this.getInputUiement().focus()
          }
        }, 500)
      } else {
        this.editorErrorMessage = ''
        removeClass(this.getInputUiement(), 'invalid')
      }
    }
  },

  mounted () {
    this.$nextTick(() => {
      if (this.closeOnHashChange) {
        window.addEventListener('hashchange', this.close)
      }
    })
  },

  beforeDestroy () {
    if (this.closeOnHashChange) {
      window.removeEventListener('hashchange', this.close)
    }
    setTimeout(() => {
      messageBox.closeDialog()
    })
  },

  methods: {
    getSafeClose () {
      const currentId = this.uid
      return () => {
        this.$nextTick(() => {
          if (currentId === this.uid) this.doClose()
        })
      }
    },
    doClose () {
      if (!this.visible) return
      this.visible = false
      this._closing = true

      this.onClose && this.onClose()
      messageBox.closeDialog() // 解绑
      if (this.lockScroll) {
        setTimeout(this.restoreBodyStyle, 200)
      }
      this.opened = false
      this.doAfterClose()
      setTimeout(() => {
        if (this.action) this.callback(this.action, this)
      })
    },

    handleWrapperClick () {
      if (this.closeOnClickModal) {
        this.handleAction(this.distinguishCancelAndClose ? 'close' : 'cancel')
      }
    },

    handleInputEnter () {
      if (this.inputType !== 'textarea') {
        return this.handleAction('confirm')
      }
    },

    handleAction (action) {
      if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
        return
      }
      this.action = action
      if (typeof this.beforeClose === 'function') {
        this.close = this.getSafeClose()
        this.beforeClose(action, this, this.close)
      } else {
        this.doClose()
      }
    },

    validate () {
      if (this.$type === 'prompt') {
        const inputPattern = this.inputPattern
        if (inputPattern && !inputPattern.test(this.inputValue || '')) {
          this.editorErrorMessage =
            this.inputErrorMessage || t('ui.messagebox.error')
          addClass(this.getInputUiement(), 'invalid')
          return false
        }
        const inputValidator = this.inputValidator
        if (typeof inputValidator === 'function') {
          const validateResult = inputValidator(this.inputValue)
          if (validateResult === false) {
            this.editorErrorMessage =
              this.inputErrorMessage || t('ui.messagebox.error')
            addClass(this.getInputUiement(), 'invalid')
            return false
          }
          if (typeof validateResult === 'string') {
            this.editorErrorMessage = validateResult
            addClass(this.getInputUiement(), 'invalid')
            return false
          }
        }
      }
      this.editorErrorMessage = ''
      removeClass(this.getInputUiement(), 'invalid')
      return true
    },
    getFirstFocus () {
      const btn = this.$el.querySelector('.ui-message-box__btns .ui-button')
      const title = this.$el.querySelector(
        '.ui-message-box__btns .ui-message-box__title'
      )
      return btn || title
    },
    getInputUiement () {
      const inputRefs = this.$refs.input.$refs
      return inputRefs.input || inputRefs.textarea
    },
    handleClose () {
      this.handleAction('close')
    }
  }
}
</script>
