<template>
  <transition
    name="dialog-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
  >
    <div
      v-show="visible"
      class="fm-dialog__wrapper"
      @click.self="handleWrapperClick"
    >
      <div
        :key="key"
        ref="dialog"
        role="dialog"
        aria-modal="true"
        :aria-label="title || 'dialog'"
        :class="['fm-dialog', { 'is-fullscreen': fullscreen, 'fm-dialog--center': center }, customClass]"
        :style="style"
      >
        <div class="fm-dialog__header">
          <slot name="title">
            <span class="fm-dialog__title">{{ title }}</span>
          </slot>
          <button
            v-if="showClose"
            type="button"
            class="fm-dialog__headerbtn"
            aria-label="Close"
            @click="handleClose"
          >
            <svg-icon
              icon-class="solid-times"
              class="fm-dialog__close"
            ></svg-icon>
          </button>
        </div>
        <div
          v-if="rendered"
          class="fm-dialog__body"
        >
          <slot />
        </div>
        <div
          v-if="$slots.footer"
          class="fm-dialog__footer"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from '../../../js/utils/popup'
import Migrating from '../../../js/mixins/migrating'
import emitter from '../../../js/mixins/emitter'

export default {
  name: 'FmDialog',

  mixins: [Popup, emitter, Migrating],

  props: {
    title: {
      type: String,
      default: ''
    },

    modal: {
      type: Boolean,
      default: true
    },

    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: false
    },

    lockScroll: {
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

    showClose: {
      type: Boolean,
      default: true
    },

    width: String,

    fullscreen: Boolean,

    customClass: {
      type: String,
      default: ''
    },

    top: {
      type: String,
      default: '15vh'
    },
    beforeClose: Function,
    center: {
      type: Boolean,
      default: false
    },

    destroyOnClose: Boolean
  },

  data () {
    return {
      closed: false,
      key: 0
    }
  },

  computed: {
    style () {
      const style = {}
      if (!this.fullscreen) {
        style.marginTop = this.top
        if (this.width) {
          style.width = this.width
        }
      }
      return style
    }
  },

  watch: {
    visible (val) {
      if (val) {
        this.closed = false
        this.$emit('open')
        this.$el.addEventListener('scroll', this.updatePopper)
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0
        })
        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
      } else {
        this.$el.removeEventListener('scroll', this.updatePopper)
        if (!this.closed) this.$emit('close')
        if (this.destroyOnClose) {
          this.$nextTick(() => {
            this.key++
          })
        }
      }
    }
  },

  mounted () {
    if (this.visible) {
      this.rendered = true
      this.open()
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    }
  },

  destroyed () {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },

  methods: {
    getMigratingConfig () {
      return {
        props: {
          size: 'size is removed.'
        }
      }
    },
    handleWrapperClick () {
      if (!this.closeOnClickModal) return
      this.handleClose()
    },
    handleClose () {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    },
    hide (cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false)
        this.$emit('close')
        this.closed = true
      }
    },
    updatePopper () {
      this.broadcast('FmSelectDropdown', 'updatePopper')
      this.broadcast('FmDropdownMenu', 'updatePopper')
    },
    afterEnter () {
      this.$emit('opened')
    },
    afterLeave () {
      this.$emit('closed')
    }
  }
}
</script>
