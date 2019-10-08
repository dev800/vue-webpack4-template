<template>
  <transition
    name="fm-message-fade"
    @after-leave="handleAfterLeave"
  >
    <div
      v-show="visible"
      :class="[
        'fm-message',
        type && !iconClass ? `fm-message--${ type }` : '',
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        customClass
      ]"
      :style="positionStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <svg-icon
        v-if="iconClass"
        :icon-class="iconClass"
      ></svg-icon>
      <svg-icon
        v-else
        class="fm-message__icon"
        :icon-class="typeClass"
      ></svg-icon>
      <slot>
        <p
          v-if="!dangerouslyUseHTMLString"
          class="fm-message__content"
        >
          {{ message }}
        </p>
        <p
          v-else
          class="fm-message__content"
          v-html="message"
        />
      </slot>
      <svg-icon
        v-if="showClose"
        class="fm-message__close-btn"
        icon-class="solid-times"
        @click="close"
      ></svg-icon>
    </div>
  </transition>
</template>

<script type="text/babel">
const typeMap = {
  success: 'solid-check-circle',
  info: 'solid-info-circle',
  warning: 'solid-exclamation-circle',
  error: 'solid-times-circle'
}

export default {
  data () {
    return {
      visible: false,
      message: '',
      duration: 3000,
      type: 'info',
      iconClass: '',
      customClass: '',
      onClose: null,
      showClose: false,
      closed: false,
      verticalOffset: 20,
      timer: null,
      dangerouslyUseHTMLString: false,
      center: false
    }
  },

  computed: {
    typeClass () {
      return this.type && !this.iconClass
        ? typeMap[this.type]
        : ''
    },
    positionStyle () {
      return {
        top: `${this.verticalOffset}px`
      }
    }
  },

  watch: {
    closed (newVal) {
      if (newVal) {
        this.visible = false
      }
    }
  },
  mounted () {
    this.startTimer()
    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.keydown)
  },

  methods: {
    handleAfterLeave () {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },

    close () {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    },

    clearTimer () {
      clearTimeout(this.timer)
    },

    startTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    },
    keydown (e) {
      if (e.keyCode === 27) {
        // esc关闭消息
        if (!this.closed) {
          this.close()
        }
      }
    }
  }
}
</script>
