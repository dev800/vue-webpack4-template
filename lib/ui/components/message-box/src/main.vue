<template>
  <transition name="msgbox-fade">
    <div
      v-show="visible"
      class="fm-message-box__wrapper"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      :aria-label="title || 'dialog'"
      @click.self="handleWrapperClick"
    >
      <div
        class="fm-message-box"
        :class="[customClass, center && 'fm-message-box--center']"
      >
        <div
          v-if="title !== null"
          class="fm-message-box__header"
        >
          <div class="fm-message-box__title">
            <div
              v-if="icon && center"
              :class="['fm-message-box__status', icon]"
            />
            <span>{{ title }}</span>
          </div>
          <button
            v-if="showClose"
            type="button"
            class="fm-message-box__headerbtn"
            aria-label="Close"
            @click="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
            @keydown.enter="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
          >
            <i class="fm-message-box__close fm-icon-close" />
          </button>
        </div>
        <div class="fm-message-box__content">
          <div class="fm-message-box__container">
            <div
              v-if="icon && !center && message !== ''"
              :class="['fm-message-box__status', icon]"
            />
            <div
              v-if="message !== ''"
              class="fm-message-box__message"
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
            class="fm-message-box__input"
          >
            <fm-input
              ref="input"
              v-model="inputValue"
              :type="inputType"
              :placeholder="inputPlaceholder"
              @keydown.enter.native="handleInputEnter"
            />
            <div
              class="fm-message-box__errormsg"
              :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }"
            >
              {{ editorErrorMessage }}
            </div>
          </div>
        </div>
        <div class="fm-message-box__btns">
          <fm-button
            v-if="showCancelButton"
            :loading="cancelButtonLoading"
            :class="[ cancelButtonClasses ]"
            :round="roundButton"
            size="small"
            @click.native="handleAction('cancel')"
            @keydown.enter="handleAction('cancel')"
          >
            {{ cancelButtonText || t('el.messagebox.cancel') }}
          </fm-button>
          <fm-button
            v-show="showConfirmButton"
            ref="confirm"
            :loading="confirmButtonLoading"
            :class="[ confirmButtonClasses ]"
            :round="roundButton"
            size="small"
            @click.native="handleAction('confirm')"
            @keydown.enter="handleAction('confirm')"
          >
            {{ confirmButtonText || t('el.messagebox.confirm') }}
          </fm-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
import Popup from '../../../js/utils/popup'
import Locale from '../../../js/mixins/locale'
import FmInput from '../../input'
import FmButton from '../../button'
import { addClass, removeClass } from '../../../js/utils/dom'
import { t } from '../../../js/locale'
import Dialog from '../../../js/utils/aria-dialog'

let messageBox
const typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}

export default {

  components: {
    FmInput,
    FmButton
  },
  mixins: [Popup, Locale],

  props: {
    modal: {
      default: true
    },
    lockScroll: {
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      default: true
    },
    closeOnPressEscape: {
      default: true
    },
    closeOnHashChange: {
      default: true
    },
    center: {
      default: false,
      type: Boolean
    },
    roundButton: {
      default: false,
      type: Boolean
    }
  },

  data() {
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
    icon() {
      const { type, iconClass } = this
      return iconClass || (type && typeMap[type] ? `fm-icon-${typeMap[type]}` : '')
    },

    confirmButtonClasses() {
      return `fm-button--primary ${this.confirmButtonClass}`
    },
    cancelButtonClasses() {
      return `${this.cancelButtonClass}`
    }
  },

  watch: {
    inputValue: {
      immediate: true,
      handler(val) {
        this.$nextTick(_ => {
          if (this.$type === 'prompt' && val !== null) {
            this.validate()
          }
        })
      }
    },

    visible(val) {
      if (val) {
        this.uid++
        if (this.$type === 'alert' || this.$type === 'confirm') {
          this.$nextTick(() => {
            this.$refs.confirm.$el.focus()
          })
        }
        this.focusAfterClosed = document.activeFmement
        messageBox = new Dialog(this.$el, this.focusAfterClosed, this.getFirstFocus())
      }

      // prompt
      if (this.$type !== 'prompt') return
      if (val) {
        setTimeout(() => {
          if (this.$refs.input && this.$refs.input.$el) {
            this.getInputFmement().focus()
          }
        }, 500)
      } else {
        this.editorErrorMessage = ''
        removeClass(this.getInputFmement(), 'invalid')
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      if (this.closeOnHashChange) {
        window.addEventListener('hashchange', this.close)
      }
    })
  },

  beforeDestroy() {
    if (this.closeOnHashChange) {
      window.removeEventListener('hashchange', this.close)
    }
    setTimeout(() => {
      messageBox.closeDialog()
    })
  },

  methods: {
    getSafeClose() {
      const currentId = this.uid
      return () => {
        this.$nextTick(() => {
          if (currentId === this.uid) this.doClose()
        })
      }
    },
    doClose() {
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

    handleWrapperClick() {
      if (this.closeOnClickModal) {
        this.handleAction(this.distinguishCancelAndClose ? 'close' : 'cancel')
      }
    },

    handleInputEnter() {
      if (this.inputType !== 'textarea') {
        return this.handleAction('confirm')
      }
    },

    handleAction(action) {
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

    validate() {
      if (this.$type === 'prompt') {
        const inputPattern = this.inputPattern
        if (inputPattern && !inputPattern.test(this.inputValue || '')) {
          this.editorErrorMessage = this.inputErrorMessage || t('el.messagebox.error')
          addClass(this.getInputFmement(), 'invalid')
          return false
        }
        const inputValidator = this.inputValidator
        if (typeof inputValidator === 'function') {
          const validateResult = inputValidator(this.inputValue)
          if (validateResult === false) {
            this.editorErrorMessage = this.inputErrorMessage || t('el.messagebox.error')
            addClass(this.getInputFmement(), 'invalid')
            return false
          }
          if (typeof validateResult === 'string') {
            this.editorErrorMessage = validateResult
            addClass(this.getInputFmement(), 'invalid')
            return false
          }
        }
      }
      this.editorErrorMessage = ''
      removeClass(this.getInputFmement(), 'invalid')
      return true
    },
    getFirstFocus() {
      const btn = this.$el.querySelector('.fm-message-box__btns .fm-button')
      const title = this.$el.querySelector('.fm-message-box__btns .fm-message-box__title')
      return btn || title
    },
    getInputFmement() {
      const inputRefs = this.$refs.input.$refs
      return inputRefs.input || inputRefs.textarea
    },
    handleClose() {
      this.handleAction('close')
    }
  }
}
</script>
